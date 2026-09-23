# Form Inputs

Reference for the form-control components in `rnd-ui-lib`. All components are standalone,
`Rnd`-prefixed, and built on signal `input()`/`model()`/`computed()` — no `ReactiveFormsModule`
integration (no `ControlValueAccessor`) is implemented by any of them. Two-way binding is done
via signal `model()`s, so use Angular's `[(value)]`-style banana-in-a-box syntax.

---

### RndInput

`<rnd-input>`

Single-line text input with a bottom-border style, optional prefix/suffix content projection,
and invalid/disabled states.

```html
<rnd-input placeholder="Wallet address" />
<rnd-input placeholder="Invalid amount" [invalid]="true" />
<rnd-input placeholder="Disabled" [disabled]="true" />

<rnd-input placeholder="0.00" type="number">
  <span rndInputPrefix class="font-mono text-sm text-muted">BTC</span>
</rnd-input>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `type` | `'text' \| 'email' \| 'password' \| 'number'` | `'text'` | Native `<input type>` passed through. |
| `placeholder` | `string` | `''` | Placeholder text. |
| `disabled` | `boolean` | `false` | Disables the field and dims it. |
| `invalid` | `boolean` | `false` | Switches the border/focus ring to the error color. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Two-way bindable (`[(value)]`) current text value. |

**Notes**

Two named content-projection slots let you decorate the field: `[rndInputPrefix]` (e.g. a
`BTC` unit label before the text) and `[rndInputSuffix]` (after the text) — apply the attribute
directly to the projected element, e.g. `<span rndInputPrefix>...</span>`.

---

### RndTextarea

`<rnd-textarea>`

Multi-line text input, same bottom-border visual language as `RndInput`.

```html
<rnd-textarea placeholder="Transaction memo" [rows]="4" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `''` | Placeholder text. |
| `disabled` | `boolean` | `false` | Disables the field and dims it. |
| `invalid` | `boolean` | `false` | Switches the border/focus ring to the error color. |
| `rows` | `number` | `3` | Native `rows` attribute. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Two-way bindable (`[(value)]`) current text value. |

**Notes**

The `<textarea>` is `resize-none` — resizing is disabled by the component's own styles.

---

### RndPasswordInput

`<rnd-password-input>`

Password field with a built-in show/hide toggle button.

```html
<rnd-password-input placeholder="Enter your password" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `''` | Placeholder text. |
| `disabled` | `boolean` | `false` | Disables the field and dims it. |
| `invalid` | `boolean` | `false` | Switches the border/focus ring to the error color. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Two-way bindable (`[(value)]`) current text value. |

**Notes**

Visibility is local UI state (an internal `signal`, not an input) — the field renders
`type="password"` until the eye button is clicked, which flips the native input to
`type="text"`. Uses `RndIcon` (`eye` / `eye-off`) for the toggle button icon; no icon-slot
projection is exposed here.

---

### RndSearchInput

`<rnd-search-input>`

Search field with a leading search icon and a clear ("×") button that appears once there's a
value.

```html
<rnd-search-input placeholder="Search transactions..." />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `'Search...'` | Placeholder text. |
| `disabled` | `boolean` | `false` | Disables the field. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Two-way bindable (`[(value)]`) current text value. |

**Notes**

No `invalid` input (unlike `RndInput`/`RndTextarea`). The clear button (`rnd-icon name="close"`)
only renders `@if (value())` and calls `value.set('')` — there's no dedicated `(clear)` output,
just watch the `value` model reset to `''`.

---

### RndNumberStepper

`<rnd-number-stepper>`

Numeric input flanked by decrement/increment buttons, with min/max/step clamping.

```html
<rnd-number-stepper [value]="1" [min]="1" [max]="10" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | `-Infinity` | Lower bound; decrement button disables at this value. |
| `max` | `number` | `Infinity` | Upper bound; increment button disables at this value. |
| `step` | `number` | `1` | Amount added/subtracted per click. |
| `disabled` | `boolean` | `false` | Disables both buttons (the text input itself can still be disabled independently via its own `[disabled]` binding on the native `<input>`, but there is no separate input for that — `disabled` only gates the buttons' `canIncrement`/`canDecrement` computed values and is also bound to the native input's `disabled` attribute). |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Two-way bindable (`[(value)]`) current numeric value. |

**Notes**

The text input commits on native `(change)` (blur/Enter), not `(input)` — so typing doesn't
push partial values into `value` until the field loses focus, at which point the raw number is
clamped into `[min, max]`. This is the building block `RndTimePicker` uses internally for its
hour/minute controls.

---

### RndInputOtp

`<rnd-input-otp>`

Segmented one-time-passcode input: one single-character `<input>` per digit, with auto-advance
on entry and auto-backtrack on Backspace.

```html
<rnd-input-otp [length]="6" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `length` | `number` | `6` | Number of digit cells rendered. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Two-way bindable (`[(value)]`) concatenated digit string (length ≤ `length`). |

**Notes**

Each cell strips non-numeric characters (`replace(/[^0-9]/g, '')`) and keeps only the last
typed character (`maxlength="1"` plus `.slice(-1)`). Typing a digit auto-focuses the next cell;
Backspace on an empty cell auto-focuses and clears the previous cell. No `disabled` input exists.

---

### RndTagInput

`<rnd-tag-input>`

Freeform tag/chip editor: Enter commits the draft text as a tag pill, Backspace on an empty
draft removes the last tag.

```html
<rnd-tag-input [tags]="['bc1q...4k2']" placeholder="Add watched address..." />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `'Add a tag...'` | Placeholder for the draft text field. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `tags` | `string[]` | `[]` | Two-way bindable (`[(tags)]`) list of committed tags. |

**Notes**

Duplicate tags are silently rejected (`!this.tags().includes(value)`), and the trimmed draft is
cleared after each commit. Each tag pill has its own remove (`×`) button. No `disabled` or
`invalid` input exists.

---

### RndSelect

`<rnd-select>`

**Not a native `<select>`.** This is a custom popover-based listbox: a trigger `<button>` using
the native Popover API (`popovertarget`) that opens a positioned floating panel of option
buttons (positioning handled by the internal `positionPopoverPanel` helper, matched to trigger
width).

```html
<rnd-select [options]="selectOptions" placeholder="Choose an asset" />
```
```ts
protected selectOptions: RndSelectOption[] = [
  { label: 'Bitcoin', value: 'btc' },
  { label: 'Ethereum', value: 'eth' },
  { label: 'Solana', value: 'sol' },
];
```

**The `RndSelectOption` interface**

```ts
export interface RndSelectOption {
  label: string;
  value: string;
}
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `RndSelectOption[]` | `[]` | The list of selectable options. |
| `placeholder` | `string` | `''` | Text shown on the trigger when nothing is selected. |
| `disabled` | `boolean` | `false` | Disables the trigger button. |
| `invalid` | `boolean` | `false` | Switches the border/focus styling to the error color. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Two-way bindable (`[(value)]`) selected option's `value`. The displayed label is derived via `computed()` lookup against `options`. |

**Notes**

Because it's popover-based (not a native `<select>`/`<option>` pair), there's no
`<option>`-style content projection — pass all choices through the `options` array. The panel
repositions on `window:scroll`/`window:resize` while open. Selecting an option calls
`panel.hidePopover()` to close it. Each `RndSelect` instance gets an auto-generated unique
`panelId` (`rnd-select-<n>`) used to wire the `popovertarget` attribute.

---

### RndCheckbox

`<rnd-checkbox>`

Checkbox with a custom-styled box (native input is visually hidden via `opacity-0` but remains
in the DOM/tab order) supporting checked, indeterminate, and disabled states, plus an optional
inline label.

```html
<rnd-checkbox label="Accept terms" />
<rnd-checkbox label="Checked" [checked]="true" />
<rnd-checkbox label="Indeterminate" [indeterminate]="true" />
<rnd-checkbox label="Disabled" [disabled]="true" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `indeterminate` | `boolean` | `false` | Renders the dash/indeterminate glyph instead of the checkmark; visually takes priority over `checked` for the filled box style. |
| `disabled` | `boolean` | `false` | Disables the native input and dims the box. |
| `label` | `string \| undefined` | `undefined` | Optional inline text label rendered next to the box. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Two-way bindable (`[(checked)]`) checked state. |

**Notes**

`indeterminate` is a purely visual/style input here — it is not synced to the native DOM
`indeterminate` property, it only affects Tailwind classes and which glyph (`rnd-icon
name="check"` vs. a dash `<span>`) is shown.

---

### RndRadioGroup + RndRadioOption

`<rnd-radio-group>` (parent) / `<rnd-radio-option>` (child)

A radio group: the parent owns the shared `name` and selected `value`; each child option
`inject()`s the parent (`RndRadioGroup`) directly rather than receiving inputs, so
`RndRadioOption` **must** be used inside an `<rnd-radio-group>` ancestor (it calls
`inject(RndRadioGroup)` with no `optional` flag — using it standalone throws an injection
error).

```html
<rnd-radio-group value="standard">
  <rnd-radio-option value="economy" label="Economy" />
  <rnd-radio-option value="standard" label="Standard" />
  <rnd-radio-option value="priority" label="Priority" />
</rnd-radio-group>
```

**`RndRadioGroup` inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | `'rnd-radio-group-<n>'` (auto-incrementing) | Shared native `name` attribute so the radio inputs behave as one group. |
| `disabled` | `boolean` | `false` | Disables every child option (read by each `RndRadioOption` from the injected group). |

**`RndRadioGroup` model**

| Model | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Two-way bindable (`[(value)]`) selected option's `value`, settable either on the group or by clicking a child option. |

**`RndRadioOption` inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | *required* | This option's value; selecting it sets the parent group's `value` model. |
| `label` | `string \| undefined` | `undefined` | Optional inline text label. |

**Notes**

`RndRadioOption` has no inputs/outputs of its own for `checked` or `disabled` — both are derived
(`checked` via `computed()` comparing to `group.value()`; `disabled` read straight off
`group.disabled()`). Content projection is not used here; options are regular sibling components
inside the group's `<ng-content />`.

---

### RndSwitch

`<rnd-switch>`

A toggle switch (`role="switch"` button), styled with a gradient track when on.

```html
<rnd-switch ariaLabel="Off" />
<rnd-switch ariaLabel="On" [checked]="true" />
<rnd-switch ariaLabel="Disabled" [disabled]="true" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Disables the button and dims it; also short-circuits `toggle()`. |
| `ariaLabel` | `string \| undefined` | `undefined` | Bound to `[attr.aria-label]` since the switch has no visible text label of its own. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Two-way bindable (`[(checked)]`) on/off state. |

**Notes**

Entirely a `<button role="switch">` — no hidden native `<input type="checkbox">` underneath, so
`aria-checked`/`aria-label` are the only accessibility hooks (always pass `ariaLabel` when there
is no adjacent visible label).

---

### RndFormField

`<rnd-form-field>`

A layout wrapper that projects a form control and decorates it with a label, required-marker,
and either an error or hint message underneath.

```html
<rnd-form-field label="Email" hint="We'll never share your email." [required]="true">
  <rnd-input type="email" placeholder="you@example.com" />
</rnd-form-field>

<rnd-form-field label="Wallet address" error="Invalid Bitcoin address." [required]="true">
  <rnd-input placeholder="bc1..." [invalid]="true" />
</rnd-form-field>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string \| undefined` | `undefined` | Label text rendered above the projected control; omitted entirely if not set. |
| `hint` | `string \| undefined` | `undefined` | Helper text shown below the control — only rendered when there is no `error`. |
| `error` | `string \| undefined` | `undefined` | Error text shown below the control; takes priority over `hint` (`@if (error()) {...} @else if (hint()) {...}`). |
| `required` | `boolean` | `false` | Renders a red `*` after the label. |

**Notes**

`RndFormField` has a single default `<ng-content />` — it does not project into named slots and
does not itself set `invalid`/`aria-*` on the projected control; pairing `error` on the field
with `[invalid]="true"` on the inner `RndInput`/etc. is a convention you apply manually at the
call site, as shown above. Any single projected control (or group of elements) works, not just
`RndInput`.

---

### RndSlider

`<rnd-slider>`

A native `<input type="range">` restyled with a gradient fill up to the current value.

```html
<rnd-slider [value]="25" [min]="1" [max]="50" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | `0` | Native `min`. |
| `max` | `number` | `100` | Native `max`. |
| `step` | `number` | `1` | Native `step`. |

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `50` | Two-way bindable (`[(value)]`) current value. |

**Notes**

No `disabled` or `invalid` input. The gradient fill (secondary → primary color, then a dim
track) is computed as an inline `background` style based on `(value - min) / (max - min)`; if
`max === min` the fill percent is clamped to `0` to avoid a division by zero.

---

### RndTimePicker

`<rnd-time-picker>`

An **always-visible inline** time picker — there is no popup/trigger button; hour and minute
`RndNumberStepper`s plus an AM/PM `RndSegmentedControl` are rendered directly in the component's
template.

```html
<rnd-time-picker />
```

**The `RndTimeValue` interface**

```ts
export interface RndTimeValue {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
}
```

**Model**

| Model | Type | Default | Description |
|---|---|---|---|
| `selected` | `RndTimeValue \| null` | `null` | Two-way bindable (`[(selected)]`) selected time. While `null`, the displayed draft falls back to an internal default (`{ hour: 12, minute: 0, period: 'AM' }`) without writing that default back into `selected` until the user interacts with a stepper/toggle. |

**Notes**

No inputs of its own (no `disabled`, no 12h/24h format option). Internally composed from three
other library components: `RndNumberStepper` (hour, clamped `1`–`12`; minute, clamped `0`–`59`)
and `RndSegmentedControl`/`RndSegmentedOption` (AM/PM, using `[activeValue]`/
`(activeValueChange)`, not a `model()`). Any change to hour, minute, or period spreads over the
current draft and calls `selected.set({ ...draft, <field>: newValue })`, so partial edits don't
clobber the other fields.
