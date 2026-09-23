# rnd-ui-lib

A publishable, Tailwind CSS v4–styled Angular component library implementing a dark "Bitcoin DeFi" design system — roughly 70 standalone, signal-based components (buttons, form controls, overlays, feedback, layout, navigation, and wallet-specific pieces like transaction rows and QR codes) for building fintech-style Angular apps.

Built with Angular 22 standalone components and signal `input()`/`model()`/`output()` APIs — no NgModules, no `cva`/`clsx`, no icon library dependency. Every component is documented in [`docs/`](./docs), linked from the table below.

## Requirements

- Angular `^22.1.0` (`@angular/common`, `@angular/core`, `@angular/router` are peer dependencies)
- Tailwind CSS is **not** a peer dependency — the library ships its CSS pre-built, so consuming apps don't need Tailwind installed at all.

## Installation & setup

This library currently lives inside the `rnd-angular` monorepo and isn't published to a registry yet. Two ways to consume it:

**Within this workspace** (e.g. from `consumer-app`, or another app added to this workspace): it's already wired up — `node_modules/rnd-ui-lib` is a directory link to `dist/rnd-ui-lib`, and the root `tsconfig.json` maps the `rnd-ui-lib` import specifier to the built output. Just run `npm run build:lib` (see [Development](#development) below) after any change to the library, then `import { RndButton, ... } from 'rnd-ui-lib';` and add `@import 'rnd-ui-lib/styles.css';` to your app's global stylesheet.

**As a standalone package in another project**: build it (`npm run build:lib` from the repo root), then either `npm install <path-to>/dist/rnd-ui-lib` (local path/tarball) or `cd dist/rnd-ui-lib && npm publish` to publish it, then install normally. Once installed:

```ts
import { RndButton, RndCard } from 'rnd-ui-lib';
```

```css
/* your global styles.css */
@import 'rnd-ui-lib/styles.css';
```

Importing the stylesheet gives you the dark theme's `background`/`foreground` colors and fonts automatically (see [Theming](#theming)) — no extra setup needed.

## Quick start

```ts
import { Component } from '@angular/core';
import { RndButton, RndCard } from 'rnd-ui-lib';

@Component({
  selector: 'app-example',
  imports: [RndButton, RndCard],
  template: `
    <rnd-card>
      <div rndCardContent class="p-6">
        <h3 class="font-heading text-xl font-semibold">Send Bitcoin</h3>
        <rnd-button variant="primary" (click)="send()">Send</rnd-button>
      </div>
    </rnd-card>
  `,
})
export class ExampleComponent {
  send() {
    /* ... */
  }
}
```

## Theming

The whole library is **dark-mode only** — there's no light theme and no toggle. All design tokens (colors, fonts) are defined as a single Tailwind v4 `@theme` block in `src/theme.css` and exposed as ordinary Tailwind utility classes (`bg-primary`, `text-muted`, `font-heading`, etc.), not raw CSS custom properties. Full token reference: [`docs/foundations.md`](./docs/foundations.md#design-tokens).

## Components

Every exported component/service is documented in one of these category files:

| Category | Contents | Docs |
|---|---|---|
| Foundations | Icon (+ full icon reference), design tokens | [`docs/foundations.md`](./docs/foundations.md) |
| Buttons & Triggers | Button, SplitButton, DropdownItem, Toggle, SegmentedControl/SegmentedOption, CopyField, Kbd | [`docs/buttons-triggers.md`](./docs/buttons-triggers.md) |
| Overlays & Popovers | Modal, Sheet, CommandPalette, ContextMenu, DropdownMenu, HoverCard, Tooltip, Popover, Combobox, DatePicker, Calendar, ConfirmService/ConfirmOutlet | [`docs/overlays-popovers.md`](./docs/overlays-popovers.md) |
| Form Inputs | Input, Textarea, PasswordInput, SearchInput, NumberStepper, InputOtp, TagInput, Select, Checkbox, RadioGroup/RadioOption, Switch, FormField, Slider, TimePicker | [`docs/form-inputs.md`](./docs/form-inputs.md) |
| Feedback & Status | Alert, ProgressBar, RadialProgress, Sparkline, Skeleton, Spinner, StatCard, Timeline/TimelineItem, EmptyState, RouteProgress, ToastService/ToastOutlet/Toast | [`docs/feedback-status.md`](./docs/feedback-status.md) |
| Display & Layout | Avatar/AvatarGroup, Badge, Card, Carousel/CarouselSlide, Divider, Accordion/AccordionItem, Collapsible, Table | [`docs/display-layout.md`](./docs/display-layout.md) |
| Navigation | Breadcrumb, Pagination, Tabs/Tab, Navbar, Sidebar | [`docs/navigation.md`](./docs/navigation.md) |
| Wallet | AssetRow, QrCode, TransactionItem | [`docs/wallet.md`](./docs/wallet.md) |

Each doc covers, per component: selector, a real usage snippet, an inputs table, an outputs table, and notes on anything non-obvious (content-projection slots, required parent/child pairings, services that need an outlet mounted once in your app shell, etc.).

## Development

Commands below assume the repo root (`rnd-angular/`), not this `projects/rnd-ui-lib/` directory.

| Task | Command |
|---|---|
| Build the library | `npm run build:lib` |
| Library JS only | `npm run build:lib:ng` |
| Library CSS only | `npm run build:lib:tailwind` |
| All tests | `ng test rnd-ui-lib --watch=false` |
| One spec file | `ng test rnd-ui-lib --watch=false --include=**/rnd-button.spec.ts` |
| Format | `npx prettier --write .` |

**`npm run build:lib` is two steps and you need both.** `build:lib:ng` (ng-packagr) compiles the TypeScript/templates; `build:lib:tailwind` (a separate `@tailwindcss/cli` invocation) generates `dist/rnd-ui-lib/styles.css` from `src/styles.css`. Running only the ng step leaves the stylesheet missing or stale — the symptom is an unstyled app, not a build error, so it's easy to miss. Always run the combined `npm run build:lib` after changing anything in this library, then rebuild/restart the consumer app to pick it up.

### Adding a new component

1. `projects/rnd-ui-lib/src/lib/<name>/<name>.{ts,html,css,spec.ts}` — folder per component, no `.component.` infix.
2. Class is `Rnd`-prefixed with no `Component` suffix (`RndButton`); selector `rnd-<name>`.
3. Standalone by default (no `standalone: true` needed); `imports: []` even when empty; `@Component` keys ordered alphabetically (`imports`, `selector`, `styleUrl`, `templateUrl`).
4. Style with the `@theme` tokens via ordinary Tailwind utilities — never hardcode hex values.
5. For variant-driven components, use signal `input()`s plus a `computed()` built from `Record<Variant, string>` lookup tables (see `RndButton` for the canonical pattern) — no `cva`/`clsx`. For icon slots, use named content projection rather than an icon library.
6. Export it from `projects/rnd-ui-lib/src/public-api.ts`.
7. Add its entry to the relevant `docs/*.md` file (or a new one, linked from the table above).
8. `npm run build:lib`.
