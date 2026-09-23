# Display & Layout

## RndAvatar / RndAvatarGroup

### RndAvatar

`<rnd-avatar>`

Circular avatar that renders an image (with graceful fallback to initials on load error) or initials, with an optional size and online/away/offline status dot.

```html
<rnd-avatar size="xs" initials="SK" />
<rnd-avatar size="sm" initials="SK" />
<rnd-avatar size="md" initials="SK" />
<rnd-avatar size="lg" initials="SK" />
<rnd-avatar size="xl" initials="SK" />

<rnd-avatar initials="ON" status="online" />
<rnd-avatar initials="AW" status="away" />
<rnd-avatar initials="OF" status="offline" />

<rnd-avatar src="https://broken-image-url.invalid/avatar.png" initials="FB" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `src` | `string \| undefined` | `undefined` | Image URL. If omitted, or if the image fails to load, `initials` is shown instead. |
| `initials` | `string \| undefined` | `undefined` | Fallback text shown when there is no `src` or the image errors. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls avatar diameter and font size. |
| `status` | `'online' \| 'offline' \| 'away' \| undefined` | `undefined` | When set, renders a colored status dot (`success`/`muted`/`warning` respectively) in the bottom-right corner. Omit to hide the dot entirely. |

**Outputs**

None.

**Notes**

- Image-load failure is tracked internally via a signal (`imageFailed`); once an image errors it permanently falls back to rendering `initials`, even if `src` later changes are not re-checked automatically.
- No named content-projection slots — content is fully data-driven via `src`/`initials`.

### RndAvatarGroup

`<rnd-avatar-group>`

Stacks projected `<rnd-avatar>` elements with a tight negative-margin overlap, and can append a `+N` overflow badge for avatars not rendered inline.

```html
<rnd-avatar-group [overflowCount]="3">
  <rnd-avatar initials="AB" />
  <rnd-avatar initials="CD" />
  <rnd-avatar initials="EF" />
</rnd-avatar-group>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `overflowCount` | `number` | `0` | Number to show in a trailing `+N` badge. Badge is only rendered when this is greater than `0`; the group itself does not count or truncate projected `<rnd-avatar>` children for you — you pass the remainder count explicitly. |

**Outputs**

None.

**Notes**

- Uses default (unnamed) content projection (`<ng-content />`) — project any number of `<rnd-avatar>` elements directly as children.
- The group does not limit how many avatars are actually displayed; it just lays out whatever you project plus the `+N` badge. Slicing your avatar list to a visible subset and passing the remaining count as `overflowCount` is the caller's responsibility.

## RndBadge

`<rnd-badge>`

Small pill-shaped label for statuses, tags, or counts, with color variants, two sizes, an optional pulsing "live" dot, and an optional remove button.

```html
<rnd-badge variant="primary">Primary</rnd-badge>
<rnd-badge variant="secondary">Secondary</rnd-badge>
<rnd-badge variant="accent">Accent</rnd-badge>
<rnd-badge variant="outline">Outline</rnd-badge>
<rnd-badge variant="muted">Muted</rnd-badge>
<rnd-badge variant="success">Success</rnd-badge>
<rnd-badge variant="warning">Warning</rnd-badge>
<rnd-badge variant="error">Error</rnd-badge>
<rnd-badge variant="info">Info</rnd-badge>

<rnd-badge size="sm">Small</rnd-badge>
<rnd-badge size="md">Medium</rnd-badge>

<rnd-badge variant="success" [dot]="true">Live</rnd-badge>

<rnd-badge variant="outline" [removable]="true">BTC</rnd-badge>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'outline' \| 'muted' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Color scheme; also drives the color of the pulsing dot. |
| `size` | `'sm' \| 'md'` | `'md'` | Height/padding/font-size of the badge. |
| `dot` | `boolean` | `false` | Shows a small animated (`animate-ping`) pulsing dot before the content, e.g. for "live" indicators. |
| `removable` | `boolean` | `false` | Shows a trailing remove (×) button that emits `remove`. |

**Outputs**

| Output | Payload | Description |
|---|---|---|
| `remove` | `void` | Emitted when the remove button is clicked. `event.stopPropagation()` is called internally, so it won't bubble to a parent click handler. The badge does not remove itself — the consumer must handle removal (e.g. filter it out of a list) in response to this event. |

**Notes**

- Content is projected via default `<ng-content />` between the optional dot and the optional remove button.
- Uses `RndIcon` (`name="close"`) for the remove button icon.

## RndCard

`<rnd-card>`

Generic surface/container with `standard` and `glass` (frosted, translucent) variants and an optional hover-lift effect, built around three named content-projection slots for header/content/footer regions.

```html
<rnd-card [hoverable]="true">
  <div rndCardHeader class="p-8 pb-4">
    <h4 class="font-heading text-2xl font-semibold">Lightning Wallet</h4>
    <p class="mt-1 text-sm text-muted">Instant, low-fee Bitcoin payments.</p>
  </div>
  <div rndCardContent class="p-8 pt-0">
    <p class="text-sm text-muted">
      Send and receive sats in milliseconds, with fees measured in fractions of a cent.
    </p>
  </div>
  <div rndCardFooter class="flex items-center justify-between p-8 pt-0">
    <rnd-badge variant="accent">New</rnd-badge>
    <rnd-button size="sm">Open</rnd-button>
  </div>
</rnd-card>

<!-- Glass variant -->
<rnd-card variant="glass">
  <div rndCardContent class="p-8">
    <p class="font-mono text-sm text-muted">Floating / overlay surface</p>
  </div>
</rnd-card>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'standard' \| 'glass'` | `'standard'` | `standard` is an opaque `bg-surface` card; `glass` is a translucent, backdrop-blurred surface for overlays/floating panels. |
| `hoverable` | `boolean` | `false` | Adds a lift-on-hover transform, orange-tinted border, and glow shadow. |

**Outputs**

None.

**Notes**

- `RndCard` supplies no padding of its own — the header/content/footer slots require the caller to add padding utilities (e.g. `p-8 pb-4`) directly on the projected element, as shown above.
- Three named content-projection slots, selected by attribute, in this fixed render order:
  - `rndCardHeader` — top region (e.g. title/subtitle).
  - `rndCardContent` — main body.
  - `rndCardFooter` — bottom region (e.g. actions/badges).
- A fourth, unnamed `<ng-content />` is also present after the three named slots, so plain (non-attributed) children are still projected — but named slots always render first regardless of source order, since Angular content projection matches by selector, not document position.
- These are plain HTML attributes (`rndCardHeader`, not `[rndCardHeader]` or a structural directive) — apply them directly to whatever element you want projected into that region.

## RndCarousel / RndCarouselSlide

`<rnd-carousel>` / `<rnd-carousel-slide>`

Parent/child pair for a sliding carousel: `RndCarousel` renders the track, prev/next controls, and dot indicators; each direct `<rnd-carousel-slide>` child is one slide. Supports looping, interval-based autoplay that pauses on hover/focus, and left/right arrow-key navigation.

```html
<rnd-carousel [loop]="true" [interval]="4000">
  <rnd-carousel-slide>
    <div class="flex h-48 flex-col items-center justify-center gap-1 bg-gradient-to-br from-secondary to-primary p-6 text-center">
      <p class="font-heading text-xl font-semibold text-white">Bitcoin</p>
      <p class="text-sm text-white/80">The original decentralized currency.</p>
    </div>
  </rnd-carousel-slide>
  <rnd-carousel-slide>
    <div class="flex h-48 flex-col items-center justify-center gap-1 bg-gradient-to-br from-primary to-accent p-6 text-center">
      <p class="font-heading text-xl font-semibold text-white">Lightning</p>
      <p class="text-sm text-white/80">Instant, low-fee payments on Layer 2.</p>
    </div>
  </rnd-carousel-slide>
  <rnd-carousel-slide>
    <div class="flex h-48 flex-col items-center justify-center gap-1 bg-gradient-to-br from-surface to-secondary p-6 text-center">
      <p class="font-heading text-xl font-semibold text-white">Self-Custody</p>
      <p class="text-sm text-white/80">Your keys, your coins.</p>
    </div>
  </rnd-carousel-slide>
</rnd-carousel>
```

**RndCarousel Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `activeIndex` | `model<number>` | `0` | Two-way-bindable index of the currently visible slide (`[(activeIndex)]="…"` supported since it's a `model()`). |
| `loop` | `boolean` | `false` | When `true`, previous/next wrap around at the ends instead of disabling the button. |
| `interval` | `number` | `0` | Autoplay interval in milliseconds. `0` (default) disables autoplay. |

**RndCarousel Outputs**

None explicit — use two-way binding on `activeIndex` (`[(activeIndex)]`) to observe slide changes.

**RndCarouselSlide Inputs / Outputs**

None. `RndCarouselSlide` is a plain wrapper (`host: { class: 'block w-full shrink-0' }`) around projected content — it has no inputs, outputs, or logic of its own.

**Notes**

- **Parent/child pairing is required and structural**: `RndCarousel` finds its slides via `contentChildren(RndCarouselSlide)`, so every slide must be a direct `<rnd-carousel-slide>` element projected into `<rnd-carousel>` — arbitrary elements are not treated as slides, and the prev/next buttons, dot count, and `canGoPrevious`/`canGoNext` bounds are all computed from `slides().length`.
- Autoplay: when `interval > 0`, an internal `setInterval` calls `goTo(activeIndex + 1)` (wrapping via modulo, independent of `loop`). It automatically pauses on mouse hover, and also on keyboard focus/blur (`focusin`/`focusout`), and is cleaned up via `DestroyRef` on destroy.
- Keyboard: `ArrowLeft`/`ArrowRight` on the carousel's root element (which has `tabindex="0"`) call `previous()`/`next()`, respecting `loop`.
- Dot indicators are generated from `slides()` and clicking one calls `goTo(index)`.
- The root element has `role="region"` and `aria-roledescription="carousel"`, plus a visually-hidden `aria-live="polite"` "Slide X of Y" announcer.

## RndDivider

`<rnd-divider>`

Thin horizontal or vertical rule for separating content, with an optional centered text label (horizontal only).

```html
<!-- Horizontal -->
<rnd-divider />

<!-- Labeled -->
<rnd-divider label="OR" />

<!-- Vertical -->
<rnd-divider orientation="vertical" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Vertical renders a fixed `h-4 w-px` rule meant to sit inline between elements (e.g. inside a flex row with `items-center`); `label` is ignored in this orientation. |
| `label` | `string \| undefined` | `undefined` | When set (and orientation is horizontal), renders the label centered between two rule segments instead of one continuous line. |

**Outputs**

None.

**Notes**

- No content projection — this is a self-closing element (`<rnd-divider />`); the `label` input is the only way to put text on it.
- Vertical dividers don't stretch to fill their container automatically in every layout — the example wraps it in a fixed-height flex row (`class="flex h-10 items-center gap-4"`).

## RndAccordion / RndAccordionItem

`<rnd-accordion>` / `<rnd-accordion-item>`

Parent/child pair implementing an accordion: `RndAccordion` owns the set of expanded item values and toggle logic; each `<rnd-accordion-item>` is one collapsible section identified by a unique `value`.

```html
<!-- Single open (default) -->
<rnd-accordion [expandedValues]="['fees']">
  <rnd-accordion-item value="fees" label="What are network fees?">
    Network fees are paid to miners to confirm your transaction on-chain.
  </rnd-accordion-item>
  <rnd-accordion-item value="custody" label="Is this wallet custodial?">
    No, you hold your own private keys at all times.
  </rnd-accordion-item>
  <rnd-accordion-item value="support" label="Which assets are supported?">
    Bitcoin, Lightning, and select Layer 2 networks.
  </rnd-accordion-item>
</rnd-accordion>

<!-- Flush (no outer border/rounding) -->
<rnd-accordion [flush]="true" [expandedValues]="['fees']">
  <rnd-accordion-item value="fees" label="What are network fees?">
    Network fees are paid to miners to confirm your transaction on-chain.
  </rnd-accordion-item>
  <rnd-accordion-item value="custody" label="Is this wallet custodial?">
    No, you hold your own private keys at all times.
  </rnd-accordion-item>
</rnd-accordion>
```

**RndAccordion Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `expandedValues` | `model<string[]>` | `[]` | Two-way-bindable list of currently expanded item `value`s. Bind with `[(expandedValues)]` to observe/control open state externally, or use `[expandedValues]` one-way as shown above for an initial state. |
| `multiple` | `boolean` | `false` | When `false` (default), opening an item replaces `expandedValues` with just that item's value (single-open behavior). When `true`, items accumulate in `expandedValues`. |
| `flush` | `boolean` | `false` | Removes the outer border and rounded corners, leaving only the `divide-y` separators between items — for embedding the accordion inside another bordered container (e.g. a card) without a double border. |

**RndAccordion Outputs**

None explicit — observe `[(expandedValues)]` two-way binding.

**RndAccordionItem Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (required, `input.required`) | — | Unique identifier for the item, used as the key in the parent's `expandedValues` array. |
| `label` | `string` | `''` | Header text shown in the clickable toggle button. |

**RndAccordionItem Outputs**

None.

**Notes**

- **Parent/child pairing is required**: `RndAccordionItem` does `inject(RndAccordion)` in its constructor, so it must be used inside an injector hierarchy under `<rnd-accordion>` (i.e. projected as a descendant) — using it standalone will throw an injection error.
- Content projected into `<rnd-accordion-item>` (default `<ng-content />`) is the expanded panel body, only rendered in the DOM (`@if (expanded())`) when that item's `value` is in the parent's `expandedValues`.
- Toggling is driven by `RndAccordionItem` calling `accordion.toggle(value)`, which itself respects the parent's `multiple` flag.

## RndCollapsible

`<rnd-collapsible>`

Single show/hide disclosure section with a chevron-icon toggle button and a text label — the single-item equivalent of an accordion item, with no external parent required.

```html
<rnd-collapsible label="Show advanced options">
  <p>Custom fee rate, RBF, and coin selection controls would go here.</p>
</rnd-collapsible>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `''` | Text shown next to the chevron in the toggle button. |
| `open` | `model<boolean>` | `false` | Two-way-bindable expanded state; bind `[(open)]` to control/observe it externally. |

**Outputs**

None explicit — observe `[(open)]` two-way binding.

**Notes**

- Default `<ng-content />` is the collapsible body, rendered only when `open()` is `true`.
- The chevron (`RndIcon`, `name="chevron-right"`) rotates 90° via `[class.rotate-90]="open()"` rather than swapping icons.
- Unlike `RndAccordion`/`RndAccordionItem`, this is a single self-contained component — no parent wrapper is needed for grouping.

## RndTable

`<rnd-table>`

Thin styling shell around a native `<table>` — wraps it in a bordered, rounded, horizontally-scrollable container and applies base text styling, with opt-in striped rows and hover highlighting. The caller supplies the entire `<thead>`/`<tbody>` (and any other table content) directly via content projection; `RndTable` renders no cells or headers itself.

```html
<rnd-table>
  <thead class="border-b border-border bg-white/5 font-mono text-xs tracking-wider text-muted uppercase">
    <tr>
      <th class="p-4 font-medium">Hash</th>
      <th class="p-4 font-medium">Amount</th>
      <th class="p-4 font-medium">Status</th>
    </tr>
  </thead>
  <tbody>
    @for (tx of transactions; track tx.hash) {
      <tr class="border-b border-border/50 last:border-b-0 hover:bg-white/5">
        <td class="p-4 font-mono">{{ tx.hash }}</td>
        <td class="p-4">{{ tx.amount }}</td>
        <td class="p-4 text-muted">{{ tx.status }}</td>
      </tr>
    }
  </tbody>
</rnd-table>

<!-- Striped + hoverable -->
<rnd-table [striped]="true" [hoverable]="true">
  <thead class="border-b border-border bg-white/5 font-mono text-xs tracking-wider text-muted uppercase">
    <tr>
      <th class="p-4 font-medium">Hash</th>
      <th class="p-4 font-medium">Amount</th>
      <th class="p-4 font-medium">Status</th>
    </tr>
  </thead>
  <tbody>
    @for (tx of transactions; track tx.hash) {
      <tr class="border-b border-border/50 last:border-b-0">
        <td class="p-4 font-mono">{{ tx.hash }}</td>
        <td class="p-4">{{ tx.amount }}</td>
        <td class="p-4 text-muted">{{ tx.status }}</td>
      </tr>
    }
  </tbody>
</rnd-table>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `striped` | `boolean` | `false` | Applies `bg-white/5` to odd `<tbody>` rows via `[&>tbody>tr:nth-child(odd)]`. |
| `hoverable` | `boolean` | `false` | Applies a hover background (`bg-white/10`) with a color transition to `<tbody>` rows via `[&>tbody>tr:hover]`. |

**Outputs**

None.

**Notes**

- `RndTable` is a pure content-projection shell: it renders `<div class="overflow-x-auto rounded-xl border border-border"><table [class]="tableClasses()"><ng-content /></table></div>` and nothing else — you must supply your own `<thead>`, `<tbody>`, `<tr>`, `<th>`/`<td>` markup and styling (borders between rows, header background/uppercase styling, cell padding, etc., as in the examples above), since `RndTable` only styles the `<table>` element itself plus the `striped`/`hoverable` row behaviors.
- Because `striped`/`hoverable` are implemented as Tailwind arbitrary-variant selectors scoped to `>tbody>tr`, they only affect direct `<tr>` children of a `<tbody>` — nested tables or rows outside a `<tbody>` won't be styled by these inputs.
