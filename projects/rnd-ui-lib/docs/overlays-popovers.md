# Overlays & Popovers

This library implements its overlay components on top of two native browser primitives rather than a custom overlay engine:

- The **`<dialog>` element** (`showModal()` / `close()`) for true modal surfaces: `RndModal`, `RndSheet`, `RndCommandPalette`, and `RndConfirmOutlet`. These trap focus, render in the top layer, and dim the page via the `::backdrop` pseudo-element.
- The **HTML Popover API** (`popover` attribute, `showPopover()` / `hidePopover()`, `:popover-open`) for lighter-weight, non-modal surfaces: `RndContextMenu`, `RndDropdownMenu`, `RndPopover`, `RndCombobox`, and `RndDatePicker` (which wraps `RndCalendar`). `RndHoverCard` and `RndTooltip` use neither — they're plain conditionally-rendered/CSS-driven absolutely-positioned `<div>`s.

Components that use the Popover API position their panel manually via a shared helper, `positionPopoverPanel()` (`projects/rnd-ui-lib/src/lib/popover-position.ts`), which sets `left`/`top` (and optionally `width`) from the trigger's `getBoundingClientRect()` on open, on window `scroll`, and on window `resize`. There is no floating-UI/popper dependency.

---

## RndModal

`<rnd-modal>` — a centered modal dialog built on the native `<dialog>` element, with named-slot header/body/footer projection.

```html
<rnd-modal [(open)]="modalOpen">
  <span rndModalHeader>Confirm transaction</span>
  <p>You're about to send 0.05 BTC. This action cannot be undone.</p>
  <div rndModalFooter class="flex gap-2">
    <rnd-button variant="ghost" (click)="modalOpen.set(false)">Cancel</rnd-button>
    <rnd-button (click)="modalOpen.set(false)">Confirm</rnd-button>
  </div>
</rnd-modal>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` (model) | `false` | Two-way-bindable open state. Setting it `true` calls `showModal()`; `false` calls `close()`. |
| `closeOnBackdropClick` | `boolean` | `true` | When `true`, clicking the `<dialog>` backdrop (i.e. a click whose target is the dialog element itself) sets `open` to `false`. |

**Outputs**

None directly — bind `[(open)]` (a `model()`) to observe closes, including native ones (Esc key fires the dialog's `close` event, which the component listens to and syncs back into `open`).

**Notes**

Uses `<dialog>` + `showModal()`, not the Popover API — it is a true modal (focus-trapped, `::backdrop`-dimmed). Content projection uses three named slots: `[rndModalHeader]`, default (body), and `[rndModalFooter]`. Pressing Esc closes it natively via the dialog's `close` event, which the component maps back to `open.set(false)`.

---

## RndSheet

`<rnd-sheet>` — a slide-in side panel (drawer), also built on `<dialog>` + `showModal()`, docked to the left or right edge of the viewport.

```html
<rnd-sheet [(open)]="sheetOpen" side="right">
  <span rndSheetHeader>Wallet details</span>
  <p>Address, balance, and recent activity for this wallet would appear here.</p>
  <div rndSheetFooter>
    <rnd-button variant="ghost" (click)="sheetOpen.set(false)">Close</rnd-button>
  </div>
</rnd-sheet>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` (model) | `false` | Two-way-bindable open state, same semantics as `RndModal`. |
| `side` | `'left' \| 'right'` (`RndSheetSide`) | `'right'` | Which viewport edge the sheet docks to; drives fixed positioning and the border side. |
| `closeOnBackdropClick` | `boolean` | `true` | Same as `RndModal` — click on the `<dialog>` backdrop closes it. |

**Outputs**

None directly — same `[(open)]` model pattern as `RndModal`.

**Notes**

Built on `<dialog>` + `showModal()` (not the Popover API), with `fixed` full-height positioning pinned to the chosen `side` instead of centering. Same named-slot structure as `RndModal`: `[rndSheetHeader]`, default body (scrollable, `overflow-y-auto`), `[rndSheetFooter]`.

---

## RndCommandPalette

`<rnd-command-palette>` — a ⌘K-style searchable command list rendered in a modal `<dialog>`.

```html
<rnd-command-palette
  [(open)]="commandPaletteOpen"
  [items]="commandPaletteItems"
  (select)="onCommandSelect($event)"
/>
```

```ts
protected commandPaletteItems: RndCommandItem[] = [
  { id: 'send', label: 'Send BTC', description: 'Send Bitcoin to an address' },
  { id: 'receive', label: 'Receive BTC', description: 'Show your receive address' },
  { id: 'swap', label: 'Swap assets', description: 'Exchange one asset for another' },
  { id: 'settings', label: 'Settings', description: 'Manage wallet preferences' },
];

protected onCommandSelect(id: string): void {
  this.commandPaletteLastSelected.set(id);
}
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `RndCommandItem[]` (`{ id: string; label: string; description?: string }`) | `[]` | The full list of commands; filtered client-side against the search query. |
| `open` | `boolean` (model) | `false` | Two-way-bindable open state. |

**Outputs**

| Output | Type | Description |
|---|---|---|
| `select` | `string` (item `id`) | Emitted when a command is chosen (click or Enter). The palette also closes itself (`open.set(false)`) when this fires. |

**Notes**

Built on `<dialog>` + `showModal()`. The component listens globally (`(document:keydown)` host binding) for **Ctrl/Cmd+K** and opens itself regardless of where focus is, resetting the query and highlight index — so it's safe to mount once near the app root and trigger it purely via keyboard as well as `open`. Arrow Up/Down move the highlighted item (wrapping), Enter chooses the highlighted item, and filtering matches `label` or `description` (case-insensitive substring).

---

## RndContextMenu

`<rnd-context-menu>` — a right-click context menu anchored at the cursor position, using the native Popover API.

```html
<rnd-context-menu>
  <div
    rndContextMenuTrigger
    class="flex h-40 w-full items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted"
  >
    Right-click here
  </div>
  <rnd-dropdown-item>Copy address</rnd-dropdown-item>
  <rnd-dropdown-item>View on explorer</rnd-dropdown-item>
  <rnd-dropdown-item>Remove</rnd-dropdown-item>
</rnd-context-menu>
```

**Inputs**

None.

**Outputs**

None.

**Notes**

Uses a bare `popover` attribute (default `"auto"` state) on the panel `<div>`. The `contextmenu` event on the wrapper is intercepted (`event.preventDefault()`), the panel is positioned at `event.clientX`/`clientY`, and `showPopover()` is called manually — it is **not** wired via `popovertarget`. The default content (menu items) is projected via the default `<ng-content>`; only the trigger uses a named slot (`[rndContextMenuTrigger]`). The panel is force-dismissed on window `scroll`/`resize` via host listeners that call `hidePopover()` if `:popover-open` matches.

---

## RndDropdownMenu

`<rnd-dropdown-menu>` — a button-triggered dropdown menu using the native Popover API and `popovertarget`.

```html
<rnd-dropdown-menu label="Actions">
  <rnd-dropdown-item>View details</rnd-dropdown-item>
  <rnd-dropdown-item>Copy address</rnd-dropdown-item>
  <rnd-dropdown-item>Disconnect</rnd-dropdown-item>
</rnd-dropdown-menu>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `'Menu'` | Text shown on the trigger button (next to a chevron-down icon). |

**Outputs**

None.

**Notes**

The trigger `<button>` uses `[attr.popovertarget]="menuId"` (an auto-generated unique id, `rnd-dropdown-menu-N`) to open/close the panel natively — no click handler is needed for toggling. The panel `<div popover>` uses the default `"auto"` popover state, so the browser handles light-dismiss (outside click, Esc) for you. The component listens for the panel's native `toggle` event to reposition itself (via `positionPopoverPanel`) only when the new state is `'open'`, and also repositions on window `scroll`/`resize` while open. Menu content is default-projected — commonly `<rnd-dropdown-item>` children (not covered in this doc).

---

## RndHoverCard

`<rnd-hover-card>` — a rich content card shown on hover/focus of a trigger element, with an open/close delay to avoid flicker.

```html
<rnd-hover-card>
  <a rndHoverCardTrigger href="javascript:void(0)" class="text-sm font-medium text-primary hover:underline">
    @satoshi
  </a>
  <div class="flex flex-col gap-2">
    <rnd-avatar initials="SN" size="md" />
    <p class="font-heading text-sm font-semibold text-foreground">Satoshi Nakamoto</p>
    <p class="text-xs text-muted">Pseudonymous creator of Bitcoin. Joined 2009.</p>
  </div>
</rnd-hover-card>
```

**Inputs**

None.

**Outputs**

None.

**Notes**

**Does not use the Popover API.** The card is a plain `@if`-conditional `<div>` with `absolute` positioning inside a `relative` wrapper span — visibility is driven entirely by an internal `open` signal. Hovering the trigger schedules opening after a 200ms `setTimeout`; leaving either the trigger or the card itself schedules closing after 150ms, with each schedule clearing the other's pending timer (so moving the mouse from the trigger into the card keeps it open). Trigger content goes in `[rndHoverCardTrigger]`; card content is default-projected.

---

## RndTooltip

`<rnd-tooltip>` — a small text label shown on hover/focus, positioned relative to its projected content.

```html
<rnd-tooltip text="Top tooltip" placement="top">
  <rnd-button variant="outline" size="sm">Top</rnd-button>
</rnd-tooltip>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `text` | `string` (required) | — | The tooltip's text content. |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` (`RndTooltipPlacement`) | `'top'` | Which side of the trigger the tooltip is anchored to. |

**Outputs**

None.

**Notes**

**Does not use the Popover API or any signal-driven visibility state.** It's pure CSS: the tooltip `<span role="tooltip">` is always in the DOM with `opacity-0 pointer-events-none`, and becomes visible via Tailwind's `group-hover:opacity-100`/`group-focus-within:opacity-100` on the wrapping `group relative` span. There is no trigger slot — content is default-projected directly as the hoverable/focusable element.

---

## RndPopover

`<rnd-popover>` — a generic click-triggered popover for arbitrary rich content (forms, menus, filters, etc.), using the native Popover API.

```html
<rnd-popover>
  <rnd-button rndPopoverTrigger variant="outline">Filter</rnd-button>
  <div class="flex flex-col gap-3">
    <h3 class="font-heading text-sm font-semibold">Filter by status</h3>
    <p class="text-sm text-muted">
      Arbitrary rich content can go here — forms, swatches, anything.
    </p>
  </div>
</rnd-popover>
```

**Inputs**

None.

**Outputs**

None.

**Notes**

The panel `<div popover>` uses the default `"auto"` state (native light-dismiss on outside click/Esc). Unlike `RndDropdownMenu`, opening/closing is driven by a manual `(click)` handler on the trigger wrapper rather than `popovertarget` — the handler toggles via `showPopover()`/`hidePopover()` after checking `:popover-open`, and repositions the panel (via `positionPopoverPanel`) before every open, plus on window `scroll`/`resize` while open. Trigger content uses `[rndPopoverTrigger]`; popover body content is default-projected.

---

## RndCombobox

`<rnd-combobox>` — a searchable single-select input with a filtered options list, combining a text `<input role="combobox">` with a manually-controlled popover listbox.

```html
<rnd-combobox [options]="comboboxOptions" placeholder="Search assets..." />
```

```ts
protected comboboxOptions: RndComboboxOption[] = [
  { label: 'Bitcoin', value: 'btc' },
  { label: 'Ethereum', value: 'eth' },
  { label: 'Solana', value: 'sol' },
  { label: 'Litecoin', value: 'ltc' },
  { label: 'Polkadot', value: 'dot' },
  { label: 'Cardano', value: 'ada' },
];
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `RndComboboxOption[]` (`{ label: string; value: string }`) | `[]` | The full option list; filtered client-side (case-insensitive substring on `label`) against the typed query. |
| `placeholder` | `string` | `'Search...'` | Input placeholder text. |
| `value` | `string` (model) | `''` | Two-way-bindable selected option's `value`. |

**Outputs**

None directly — bind `[(value)]` (a `model()`) to observe selection changes.

**Notes**

The listbox panel uses `popover="manual"` (not `"auto"`) — this is deliberate, since the component fully owns open/close logic itself: focusing or clicking the input opens it, a `(document:click)` host listener closes it on any click outside both the input and panel, and `(blur)` closes it unless focus is moving into the panel. `"manual"` also suppresses the browser's own light-dismiss/Esc handling, which would otherwise fight the component's own Escape-key handling (`onKeydown` closes on `Escape`). Arrow Up/Down move the highlighted option (with wraparound and `scrollIntoView`), Enter chooses it. Repositioning happens via `positionPopoverPanel(..., { matchWidth: true })`, so the panel width always matches the input's width, on open and on window `scroll`/`resize`.

---

## RndDatePicker

`<rnd-date-picker>` — a text-field trigger that opens an `RndCalendar` in a popover for date selection.

```html
<rnd-date-picker placeholder="Schedule send date" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `selected` | `Date \| null` (model) | `null` | Two-way-bindable selected date. |
| `placeholder` | `string` | `'Select date'` | Placeholder text shown in the trigger button when nothing is selected. |

**Outputs**

None directly — bind `[(selected)]` (a `model()`) to observe date changes.

**Notes**

The trigger is a `<button>` (not an `<input>`) that formats the selected date via `toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })`. The popover panel **is the `<rnd-calendar>` component itself** — the `popover` attribute (default `"auto"` state) is applied directly to the `<rnd-calendar>` host element in the template (`<rnd-calendar #panel popover [selected]="selected()" (selectedChange)="onSelect($event)" />`), and `RndDatePicker` drives it with the same manual `showPopover()`/`hidePopover()` + `positionPopoverPanel()` pattern as `RndPopover`. Selecting a day in the calendar (`selectedChange`) both updates `selected` and calls `hidePopover()` to close the panel immediately.

---

## RndCalendar

`<rnd-calendar>` — a standalone month day-grid, usable inline on its own (without any trigger/popover) or embedded as `RndDatePicker`'s panel.

```html
<rnd-calendar [selected]="date" (selectedChange)="date = $event" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `selected` | `Date \| null` (model) | `null` | Two-way-bindable selected date, highlighted in the grid with a gradient (`from-secondary to-primary`) fill. |

**Outputs**

None directly — bind `[(selected)]` or `(selectedChange)` (from the `model()`) to observe day selection.

**Notes**

This is a plain, non-overlay component — it renders a fixed `w-72` card with month navigation (`previousMonth()`/`nextMonth()`) and a 6-week (42-cell) day grid computed from an internal `viewDate` signal (defaults to today's month). Days outside the current month are shown dimmed but still selectable. `RndDatePicker` composes this component as its popover panel by putting the `popover` attribute directly on `<rnd-calendar>`; used standalone (as above) it needs no popover/trigger machinery at all.

---

## RndConfirmService + RndConfirmOutlet

A service/outlet pair for promise-based confirm dialogs: inject `RndConfirmService` anywhere to request a confirmation, and mount `<rnd-confirm-outlet>` once to actually render it.

```ts
private confirmService = inject(RndConfirmService);

protected async askConfirm(): Promise<void> {
  const confirmed = await this.confirmService.confirm({
    title: 'Send 0.05 BTC?',
    message: 'This action cannot be undone once broadcast to the network.',
    confirmLabel: 'Send',
    cancelLabel: 'Cancel',
  });

  this.confirmResult.set(confirmed ? 'Confirmed' : 'Cancelled');
}
```

```html
<!-- mounted once in projects/consumer-app/src/app/app.html, alongside <rnd-toast-outlet /> -->
<rnd-toast-outlet />
<rnd-confirm-outlet />
```

**`RndConfirmService` API**

| Member | Type | Description |
|---|---|---|
| `confirm(options)` | `(options: RndConfirmOptions) => Promise<boolean>` | Requests a confirmation dialog; resolves `true`/`false` based on the user's choice. Only one request can be pending at a time (a new call overwrites `current`). |
| `respond(confirmed)` | `(confirmed: boolean) => void` | Resolves the pending request's promise and clears it. Called internally by `RndConfirmOutlet`; not normally called by consumers directly. |
| `current` | `Signal<RndConfirmRequest \| null>` (readonly) | The in-flight request, if any. Read by `RndConfirmOutlet` to render. |

`RndConfirmOptions`:

| Field | Type | Default | Description |
|---|---|---|---|
| `title` | `string` (required) | — | Dialog title. |
| `message` | `string` | — (omitted if not provided) | Optional body text. |
| `confirmLabel` | `string` | `'Confirm'` (applied by the outlet template) | Confirm button label. |
| `cancelLabel` | `string` | `'Cancel'` (applied by the outlet template) | Cancel button label. |
| `variant` | `'default' \| 'destructive'` | — | Declared on the options type but not currently read by `RndConfirmOutlet`'s template (no styling branches on it yet). |

**`RndConfirmOutlet`**

`<rnd-confirm-outlet>` — no inputs/outputs. Renders a `<dialog>` (via `showModal()`/`close()`, same pattern as `RndModal`) driven entirely by `RndConfirmService.current()`. Clicking the outlet's ghost/primary buttons calls `respond(false)`/`respond(true)`; closing the dialog natively (Esc) also resolves it as `false` via the dialog's `close` event.

**Notes**

**`RndConfirmOutlet` must be mounted exactly once, high in the component tree (e.g. the root app component), for `RndConfirmService.confirm()` to have anywhere to render.** The service itself has no UI — calling `confirm()` only pushes a request signal (`current`); if no `RndConfirmOutlet` instance is present anywhere in the app, the returned promise simply never resolves. In this repo it's mounted in `projects/consumer-app/src/app/app.html` at the app shell level, next to `<rnd-toast-outlet />`. Because `current` is a single signal (not a queue), calling `confirm()` again while one is already pending will replace the in-flight request without resolving its promise.
