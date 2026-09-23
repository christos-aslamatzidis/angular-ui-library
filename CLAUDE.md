# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Angular 22 workspace with two projects. `rnd-ui-lib` (`projects/rnd-ui-lib`) is the actual deliverable — a publishable, Tailwind-styled UI component library built with ng-packagr. `consumer-app` (`projects/consumer-app`) is an SSR demo app that exists to dogfood the library. The repo is greenfield: one commit, one component (`RndButton`), no directives/services/pipes yet.

## Commands

| Task | Command |
|---|---|
| **Build the library** | `npm run build:lib` |
| Library JS only | `npm run build:lib:ng` |
| Library CSS only | `npm run build:lib:tailwind` |
| Serve consumer-app (dev, :4200) | `npm start` |
| Build consumer-app | `npm run build` |
| Serve SSR build (:4000) | `npm run serve:ssr:consumer-app` |
| All tests | `npm test` |
| One project's tests | `ng test rnd-ui-lib --watch=false` |
| One spec file | `ng test rnd-ui-lib --watch=false --include=**/rnd-button.spec.ts` |
| Format | `npx prettier --write .` |

`ng test` watches by default in an interactive terminal — pass `--watch=false` for a single run.

There is no `format` script and no ESLint configured. Prettier config lives in `.prettierrc` (`printWidth: 100`, `singleQuote: true`, Angular parser for `*.html`).

## Architecture: the library/app build coupling

**Read this before touching the library.** The consumer app resolves `rnd-ui-lib` from the *built output*, not from source. Three mechanisms make that work:

1. Root `tsconfig.json` maps `"rnd-ui-lib": ["./dist/rnd-ui-lib"]` — note it points at `dist/`, not `projects/rnd-ui-lib/src/public-api.ts` (which is the Angular CLI default).
2. `node_modules/rnd-ui-lib` is a **symlink to `dist/rnd-ui-lib`**. This is what lets the CSS `@import "rnd-ui-lib/styles.css"` resolve, since TypeScript `paths` do not apply to CSS.
3. `dist/rnd-ui-lib/package.json` exports both `.` and `./styles.css`.

Consequences:

- **Run `npm run build:lib` after every library change.** Nothing else picks it up — `ng serve` and `npm run watch` do not rebuild the library.
- `build:lib` is two steps: `build:lib:ng` (ng-packagr) **then** `build:lib:tailwind` (standalone Tailwind CLI → `dist/rnd-ui-lib/styles.css`). Running only the ng step leaves the stylesheet missing, which shows up as an **unstyled app, not a build error**.

## Styling & Tailwind (v4)

The Tailwind setup is two-track and asymmetric. There is **no `tailwind.config.js`** — all configuration is CSS-first via `projects/rnd-ui-lib/src/theme.css`'s `@theme` block.

- **Library track:** `projects/rnd-ui-lib/src/styles.css` loads Google Fonts, then `@import "tailwindcss"`, then `./theme.css`. It is compiled by a separate `@tailwindcss/cli` invocation (see `build:lib:tailwind`), whose auto content-detection scans **only the library source**.
- **App track:** `projects/consumer-app/src/styles.css` is one line — `@import "rnd-ui-lib/styles.css"` — with no `@import "tailwindcss"` of its own.

**Therefore: Tailwind utility classes written in `consumer-app` templates are silently dropped.** The app only receives the utilities the library itself used. There is no `@source` directive correcting this. If you need new utilities in the app, that gap has to be addressed deliberately (add Tailwind to the app's stylesheet, or add `@source` to the library's).

Because the tokens are registered as Tailwind `--color-*`/`--font-*` theme variables (not plain custom properties), components use ordinary generated utilities — `bg-primary`, `text-muted`, `font-heading` — rather than the `bg-(--var)` arbitrary-property shorthand.

## Theming

`projects/rnd-ui-lib/src/theme.css` is a single Tailwind v4 `@theme` block — **dark-mode only**, no light theme and no toggle. It defines the Bitcoin DeFi palette from `.claude/rules/USER-INTERFACE.MD`:

```css
@theme {
  --color-background: #030304;   /* True Void */
  --color-surface: #0f1115;      /* Dark Matter */
  --color-foreground: #ffffff;
  --color-muted: #94a3b8;
  --color-border: #1e293b;

  --color-primary: #f7931a;      /* Bitcoin Orange */
  --color-secondary: #ea580c;    /* Burnt Orange, used in the primary-button gradient */
  --color-accent: #ffd600;       /* Digital Gold */

  --font-heading: 'Space Grotesk', ...;
  --font-body: 'Inter', ...;
  --font-mono: 'JetBrains Mono', ...;
}
```

plus an `@layer base` that sets `body` to `bg-background font-body text-foreground` and `color-scheme: dark` on `:root` — any consumer importing the library's CSS gets the void background and correct body text automatically, no per-app setup needed.

There is no `[data-ui-theme]` attribute, no `toggleTheme()`, and no `--ui-*` prefix any more — those all belonged to the old light/dark system and have been fully removed (including `projects/rnd-ui-lib/src/themes/`, which no longer exists).

## Adding a component to the library

1. Create `projects/rnd-ui-lib/src/lib/<name>/<name>.{ts,html,css,spec.ts}` — folder per component, **no `.component.` infix** in filenames.
2. Class is `Rnd`-prefixed with **no `Component` suffix** (`RndButton`); selector is `rnd-<name>`. Note `angular.json` declares `"prefix": "lib"`, but the convention actually in use is `rnd-`.
3. Standalone by default — do not add `standalone: true`. Existing code writes `imports: []` even when empty and orders `@Component` keys alphabetically (`imports`, `selector`, `styleUrl`, `templateUrl`). Use singular `styleUrl`.
4. Style with the `@theme` tokens via ordinary Tailwind utilities (`bg-primary`, `text-muted`, `border-border`, `font-heading`, …). Do not hardcode hex values.
5. For variant-driven components (see `RndButton`), use signal `input()`s plus a `computed()` that builds the class string from `Record<Variant, string>` lookup tables — no `cva`/`clsx`, neither is installed. For icon slots, use named content projection (e.g. `<ng-content select="[rndIconLeading]" />`) rather than an icon library — none is installed either.
6. Export from `projects/rnd-ui-lib/src/public-api.ts` (`export * from './lib/<name>/<name>';`).
7. `npm run build:lib`.

## Design system

`.claude/rules/USER-INTERFACE.MD` describes the visual direction — a dark "Bitcoin DeFi" aesthetic (`#030304` void, `#F7931A` Bitcoin orange, `#FFD600` gold; Space Grotesk / Inter / JetBrains Mono; pill buttons; colored glow shadows) — and it is now **implemented**: `theme.css` carries the palette and fonts, and `RndButton`'s `primary`/`outline`/`ghost`/`link` variants and glow shadows are lifted directly from the doc's Buttons section.

One mismatch remains, and is deliberate: the doc is written for **React/shadcn** — it mandates `lucide-react` and `cva`. This is Angular 22; neither is installed. Variants use signal `input()` + `computed()` lookup tables instead of `cva`, and icons use content-projection slots instead of an icon library (see "Adding a component" above). Follow that pattern for any other design-system component, rather than introducing React tooling.

## Testing

Vitest 4 + jsdom, run through the Angular builder `@angular/build:unit-test`. There is **no `vitest.config.ts` and no setup file**.

`tsconfig.spec.json` sets `"types": ["vitest/globals"]`, so `describe`/`it`/`expect` are global — **spec files do not import from `vitest`**. Standalone components go in TestBed `imports`, never `declarations`, and specs use `await fixture.whenStable()` rather than `fixture.detectChanges()`.

## Conventions & gotchas

- **`"strict": true` is absent** from the root `tsconfig.json`, as are `strictTemplates` and `moduleResolution`. But `noPropertyAccessFromIndexSignature`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and `isolatedModules` are all on — index-signature access in particular trips people up.
- `tsconfig.lib.prod.json` sets `compilationMode: "partial"` (partial-Ivy, npm-publishable) and is the default build configuration.
- `tailwindcss` is deliberately **not** a peer dependency of the library, since the library ships prebuilt CSS.
- Package manager is pinned: `npm@11.19.0`.
