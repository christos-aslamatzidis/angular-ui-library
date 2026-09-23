# Buttons & Triggers

Documentation for the button/trigger family of `rnd-ui-lib` components: `RndButton`, `RndSplitButton` (with `RndDropdownItem`), `RndToggle`, `RndSegmentedControl`/`RndSegmentedOption`, `RndCopyField`, and `RndKbd`.

### RndButton

`<rnd-button>`

Primary interactive button with variant, size, and icon-only styling, driven by Tailwind utility lookup tables.

```html
<rnd-button variant="primary">Primary</rnd-button>
<rnd-button variant="outline">Outline</rnd-button>
<rnd-button variant="ghost">Ghost</rnd-button>
<rnd-button variant="link">Link</rnd-button>

<rnd-button size="sm">Small</rnd-button>
<rnd-button size="md">Medium</rnd-button>
<rnd-button size="lg">Large</rnd-button>

<rnd-button variant="primary">
  <rnd-icon rndIconLeading name="arrow-right" [size]="16" />
  Connect Wallet
</rnd-button>

<rnd-button variant="outline">
  Learn More
  <rnd-icon rndIconTrailing name="arrow-right" [size]="16" />
</rnd-button>

<rnd-button variant="ghost" [iconOnly]="true" ariaLabel="Close">
  <rnd-icon rndIconLeading name="close" [size]="16" />
</rnd-button>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `RndButtonVariant` (`'primary' \| 'outline' \| 'ghost' \| 'link'`) | `'primary'` | Visual style. `link` ignores size/icon-only sizing entirely. |
| `size` | `RndButtonSize` (`'sm' \| 'md' \| 'lg'`) | `'md'` | Height/padding/text-size scale. No effect when `variant` is `'link'`. |
| `iconOnly` | `boolean` | `false` | Switches to a fixed square sizing (no horizontal padding) for icon-only buttons. |
| `disabled` | `boolean` | `false` | Disables the native `<button>` and applies disabled styling. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native `type` attribute of the rendered `<button>`. |
| `ariaLabel` | `string \| undefined` | `undefined` | Sets `aria-label`; required in practice for `iconOnly` buttons since they have no visible text. |

**Outputs**

None — `RndButton` renders a plain `<button>` with no `output()`s; consumers bind the native `(click)` event themselves.

**Notes**

Three content-projection slots are available: `[rndIconLeading]` (before default content), the default `<ng-content />` (label text), and `[rndIconTrailing]` (after default content). There is no built-in icon dependency — the library ships `RndIcon` separately and consumers pass it into the slots via the `rndIconLeading`/`rndIconTrailing` attributes, as shown above. When `iconOnly` is `true`, always set `ariaLabel` since the button has no text content for assistive tech.

### RndSplitButton (with RndDropdownItem)

`<rnd-split-button>` / `<rnd-dropdown-item>`

A primary action button fused with a caret trigger that opens a native Popover API menu of `RndDropdownItem` entries.

```html
<rnd-split-button label="Send BTC">
  <rnd-dropdown-item>Send via Lightning</rnd-dropdown-item>
  <rnd-dropdown-item>Send on-chain</rnd-dropdown-item>
  <rnd-dropdown-item>Schedule send</rnd-dropdown-item>
</rnd-split-button>
```

**`RndSplitButton` Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string` (required) | — | Text label of the primary (left) button. |
| `disabled` | `boolean` | `false` | Disables both the primary button and the caret trigger button. |

**`RndSplitButton` Outputs**

| Output | Type | Description |
|---|---|---|
| `action` | `output<void>` | Emitted when the primary (left) button is clicked. |

**`RndDropdownItem` Inputs / Outputs**

None — `RndDropdownItem` has no inputs or outputs. It is a styling wrapper around a `<button>` with a single default `<ng-content />` slot for the item's label/content.

**Notes**

`RndSplitButton`'s caret button toggles a `popover`-attribute `<div>` panel using the native Popover API (`showPopover()`/`hidePopover()`), positioned via the shared `positionPopoverPanel` helper and re-positioned on `window:scroll`/`window:resize` (wired via the component's `host` bindings). The default `<ng-content />` inside `<rnd-split-button>` projects into that popover panel and is where `<rnd-dropdown-item>` children go — `RndDropdownItem` does not open/close anything itself, it only renders as a menu row; clicking it does not automatically close the parent popover.

### RndToggle

`<rnd-toggle>`

A two-state icon toggle button (pressed/unpressed) for things like pin/star/favorite actions.

```html
<rnd-toggle ariaLabel="Star">
  <rnd-icon name="star" [size]="16" />
</rnd-toggle>
<rnd-toggle ariaLabel="Pin" [pressed]="true">
  <rnd-icon name="pin" [size]="16" />
</rnd-toggle>
<rnd-toggle ariaLabel="Disabled" [disabled]="true">
  <rnd-icon name="lock" [size]="16" />
</rnd-toggle>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `pressed` | `model<boolean>` | `false` | Two-way bindable pressed state (`[(pressed)]` supported since it's a `model()`). |
| `disabled` | `boolean` | `false` | Disables the button; clicking no longer toggles `pressed`. |
| `ariaLabel` | `string \| undefined` | `undefined` | Sets `aria-label` — required since the button typically contains only an icon. |

**Outputs**

None declared explicitly, but `pressed` is a `model()`, so it doubles as a two-way-bindable output (`pressedChange`) in addition to being settable as an input.

**Notes**

Clicking the button internally flips `pressed` via `this.pressed.set(!this.pressed())` (guarded by `disabled`), and `aria-pressed` reflects the current state. Styling is a binary lookup: pressed state uses `border-primary bg-primary/15 text-primary`, unpressed uses muted/transparent styling. There is a single default `<ng-content />` slot, typically filled with an `<rnd-icon>`.

### RndSegmentedControl + RndSegmentedOption

`<rnd-segmented-control>` / `<rnd-segmented-option>`

A pill-shaped tab-like control (`role="tablist"`/`role="tab"`) for switching between a small set of mutually-exclusive string values, e.g. time ranges.

```html
<rnd-segmented-control activeValue="1d">
  <rnd-segmented-option value="1h">1H</rnd-segmented-option>
  <rnd-segmented-option value="1d">1D</rnd-segmented-option>
  <rnd-segmented-option value="1w">1W</rnd-segmented-option>
  <rnd-segmented-option value="1m">1M</rnd-segmented-option>
</rnd-segmented-control>
```

**`RndSegmentedControl` Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `activeValue` | `model<string>` | `''` | The currently-selected value; two-way bindable (`[(activeValue)]`). Must match one of the child options' `value`s to show a selection. |

**`RndSegmentedControl` Outputs**

None declared explicitly — `activeValue` being a `model()` provides `activeValueChange` as an implicit output for two-way binding.

**`RndSegmentedOption` Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (required) | — | The value this option represents; compared against the parent's `activeValue` to determine active styling, and written to the parent when clicked. |

**`RndSegmentedOption` Outputs**

None — selection is communicated purely through the shared parent `activeValue` model, not a per-option output.

**Notes**

`RndSegmentedOption` uses `inject(RndSegmentedControl)` to obtain its parent directly via Angular DI — it has **no `@Input()` reference to the control** — so `<rnd-segmented-option>` elements only work when nested inside a `<rnd-segmented-control>` ancestor (DI resolution will fail/throw otherwise). Clicking an option calls `this.control.activeValue.set(this.value())` on the injected parent, which is what drives the parent's `model()` and re-renders all sibling options' active styling.

### RndCopyField

`<rnd-copy-field>`

A read-only, monospaced field for displaying a value (e.g. a Bitcoin address) with a one-click copy-to-clipboard button and optional truncation.

```html
<rnd-copy-field value="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" />

<rnd-copy-field value="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" [truncate]="true" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (required) | — | The full value to display and copy to the clipboard. |
| `truncate` | `boolean` | `false` | When `true` and `value` is longer than 14 characters, displays it as `first8...last4` instead of the full string (the full `value` is still what gets copied). |

**Outputs**

None — copy state is internal (a private `copied` signal), there is no `output()` emitted on copy.

**Notes**

Copying uses `navigator.clipboard.writeText(this.value())` and flips an internal `copied` signal to `true` for 2000ms (via `setTimeout`), during which the copy button's icon swaps from `copy` to `check` (with `text-success` styling) and its `aria-label` changes from `'Copy'` to `'Copied'`. There is no content-projection slot — the display value and copy button are fully templated internally; it depends on `RndIcon` for the button icons.

### RndKbd

`<rnd-kbd>`

A small inline element for rendering keyboard shortcut labels (e.g. `⌘K`, `Esc`).

```html
<rnd-kbd>⌘K</rnd-kbd>
<rnd-kbd>Ctrl</rnd-kbd>
<rnd-kbd>Esc</rnd-kbd>
<rnd-kbd>Enter</rnd-kbd>
```

```html
<div class="flex items-center gap-2">
  <span class="text-sm text-muted">or press</span>
  <rnd-kbd>⌘K</rnd-kbd>
</div>
```

**Inputs / Outputs**

None — `RndKbd` has no inputs or outputs. It renders a styled native `<kbd>` element with a single default `<ng-content />` slot for the key label text.

**Notes**

Purely presentational; commonly paired inline with body text or next to a `<rnd-button>` to hint at a keyboard shortcut (see the command-palette example in the overlays/popovers demo page).
