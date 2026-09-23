# Foundations

## Icon

### RndIcon

`<rnd-icon>`

Renders a single SVG glyph from the library's built-in icon set, in a chosen stroke weight and theme color.

```html
<rnd-icon name="bell" [weight]="weight" [size]="32" />

<rnd-icon name="check-circle" weight="solid" [variant]="variant" [size]="28" />

<rnd-icon [name]="name" weight="outline" [size]="20" />
<rnd-icon [name]="name" weight="solid" [size]="20" />
<rnd-icon [name]="name" weight="duotone" [size]="20" variant="primary" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `name` | `RndIconName` (required) | — | Which icon to render. See the icon reference below for every valid value. |
| `weight` | `'outline' \| 'solid' \| 'duotone'` | `'outline'` | Stroke/fill treatment for the glyph. |
| `variant` | `'inherit' \| 'primary' \| 'secondary' \| 'accent' \| 'foreground' \| 'muted' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'inherit'` | Sets the icon's color via a `text-*` theme utility class. `'inherit'` applies no class, so the icon takes `currentColor` from its ancestor. |
| `size` | `number` | `20` | Pixel width/height of the rendered `<svg>` (square). |

**Notes**

- `weight` is not a font-weight — it changes how each path is drawn: `outline` is a plain stroked line, `solid` is a bolder stroke (or, for icons with a natural closed silhouette such as `circle`/`mail`/`user`, a genuinely filled shape), and `duotone` layers a soft low-opacity pass behind a crisp foreground pass.
- `variant` maps to Tailwind theme color utilities (e.g. `primary` → `text-primary`); it does not affect `weight`.
- The rendered markup is sanitized via `DomSanitizer.bypassSecurityTrustHtml` — icon paths are trusted, hand-authored SVG, not user input.

**Available icon names (`RndIconName`)**

115 icons, grouped by category:

- **Nav / direction:** `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`, `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`, `arrow-up-right`, `external-link`, `log-out`
- **Actions:** `close`, `check`, `plus`, `minus`, `plus-circle`, `minus-circle`, `trash`, `edit`, `copy`, `save`, `refresh`, `undo`, `redo`, `search`, `filter`, `sort`, `share`, `download`, `upload`, `print`
- **Toggles / visibility:** `eye`, `eye-off`, `star`, `heart`, `bookmark`, `pin`, `lock`, `unlock`
- **Status / communication:** `bell`, `mail`, `info`, `alert-triangle`, `alert-circle`, `check-circle`, `x-circle`, `help-circle`
- **Objects:** `calendar`, `clock`, `folder`, `file`, `image`, `link`, `tag`, `flag`, `home`, `settings`, `user`, `users`, `globe`, `menu`, `more-horizontal`, `more-vertical`, `grid`, `list`
- **Commerce:** `cart`, `bag`, `receipt`, `credit-card`, `dollar-sign`, `percent`, `gift`
- **Charts / stats:** `trending-up`, `trending-down`, `bar-chart`, `pie-chart`, `activity`
- **Location:** `map`, `map-pin`, `navigation`, `compass`
- **Communication:** `message-circle`, `message-square`, `send`, `phone`, `at-sign`
- **Media / device:** `camera`, `mic`, `mic-off`, `volume`, `volume-x`, `video`, `wifi`
- **Files / data:** `paperclip`, `inbox`, `archive`, `cloud`, `database`, `server`, `code`
- **Layout / interaction:** `layers`, `sliders`, `maximize`, `minimize`, `move`, `grip-vertical`
- **Status / security:** `shield`, `shield-check`, `key`, `circle`, `thumbs-up`, `thumbs-down`
- **Misc:** `hash`, `zoom-in`, `zoom-out`

The registry data itself — `RND_ICON_PATHS` (the map of icon name to per-weight SVG markup, each entry typed `RndIconMarkupSet = { outline: string; solid: string; duotone: string }`) and the `RndIconName` type (`keyof typeof RND_ICON_PATHS`) — is also exported from `rnd-ui-lib`, so consumers can import `RndIconName` to type a variable or prop (e.g. `icon: RndIconName`) without hardcoding the union, or inspect `RND_ICON_PATHS`/`RndIconMarkupSet` if they need the raw path data. This is plain data, not a component, so there's no separate API table for it.

## Design Tokens

`projects/rnd-ui-lib/src/theme.css` defines a single Tailwind v4 `@theme` block. It is **dark-mode only** — there is no light theme and no toggle; `:root` is hardcoded to `color-scheme: dark` and `body` gets `bg-background font-body text-foreground` via an `@layer base` rule, so any app that imports the library's CSS gets the correct background/text automatically.

| Token | CSS variable | Tailwind utilities |
|---|---|---|
| Background (True Void, `#030304`) | `--color-background` | `bg-background`, `text-background`, `border-background` |
| Surface (Dark Matter, `#0f1115`) | `--color-surface` | `bg-surface`, `text-surface`, `border-surface` |
| Foreground (`#ffffff`) | `--color-foreground` | `bg-foreground`, `text-foreground`, `border-foreground` |
| Muted (Stardust, `#94a3b8`) | `--color-muted` | `bg-muted`, `text-muted`, `border-muted` |
| Border (Dim Boundary, `#1e293b`) | `--color-border` | `bg-border`, `text-border`, `border-border` |
| Primary (Bitcoin Orange, `#f7931a`) | `--color-primary` (+ `--color-primary-foreground`) | `bg-primary`, `text-primary`, `border-primary` |
| Secondary (Burnt Orange, `#ea580c`) | `--color-secondary` (+ `--color-secondary-foreground`) | `bg-secondary`, `text-secondary`, `border-secondary` |
| Accent (Digital Gold, `#ffd600`) | `--color-accent` (+ `--color-accent-foreground`) | `bg-accent`, `text-accent`, `border-accent` |
| Success (Emerald, `#22c55e`) | `--color-success` (+ `--color-success-foreground`) | `bg-success`, `text-success`, `border-success` |
| Warning (Amber, `#f59e0b`) | `--color-warning` (+ `--color-warning-foreground`) | `bg-warning`, `text-warning`, `border-warning` |
| Error (Red, `#ef4444`) | `--color-error` (+ `--color-error-foreground`) | `bg-error`, `text-error`, `border-error` |
| Info (Sky, `#38bdf8`) | `--color-info` (+ `--color-info-foreground`) | `bg-info`, `text-info`, `border-info` |
| Heading font (Space Grotesk) | `--font-heading` | `font-heading` |
| Body font (Inter) | `--font-body` | `font-body` |
| Mono font (JetBrains Mono) | `--font-mono` | `font-mono` |

Each color also has a paired `*-foreground` variable (e.g. `--color-primary-foreground`) intended for text/icon color placed on top of a filled surface of that color, exposed via the same `bg-*`/`text-*`/`border-*` utility pattern (e.g. `text-primary-foreground`).

### Type scale

`projects/consumer-app/src/app/pages/typography/typography-page.html` (backed by `typography-page.ts`) demos the scale as three tracks, all just ordinary Tailwind size/weight utilities layered on the theme fonts — there's no custom type-scale token set beyond the three `font-*` families above:

- **Font families:** `font-heading` (Space Grotesk), `font-body` (Inter), `font-mono` (JetBrains Mono), shown side by side at `text-3xl`.
- **Weights:** heading supports `font-normal`/`font-medium`/`font-semibold`/`font-bold` (400–700), body supports `font-normal`/`font-medium`/`font-semibold` (400–600), mono supports `font-normal`/`font-medium` (400–500).
- **Heading scale:** `text-4xl` down to `text-sm`, rendered with `font-heading font-semibold`.
- **Body scale:** `text-lg`, `text-base`, `text-sm`, rendered with plain `font-body`.
- **Code:** inline code uses `font-mono font-medium text-primary`; code blocks use `font-mono text-sm font-normal` on a `bg-surface` panel.
