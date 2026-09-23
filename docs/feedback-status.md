# Feedback & Status

Documentation for the feedback-and-status component group in `rnd-ui-lib`: alerts, progress
indicators, loading placeholders, stat display, timelines, empty states, route-level progress,
and toast notifications.

## RndAlert (`rnd-alert`)

Inline banner for contextual info/success/warning/error messages, with an optional leading icon
slot and an optional dismiss button.

```html
<rnd-alert variant="info">Network fees are updated every 10 minutes.</rnd-alert>
<rnd-alert variant="success">Transaction confirmed on-chain.</rnd-alert>
<rnd-alert variant="warning">Wallet balance is running low.</rnd-alert>
<rnd-alert variant="error" [dismissible]="true">Failed to broadcast transaction.</rnd-alert>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Controls border/background/text color via a `VARIANT_CLASSES` lookup (e.g. `border-info bg-info/10 text-info`). |
| `dismissible` | `boolean` | `false` | Shows a close button when `true`. |

**Outputs**

| Output | Payload | Description |
|---|---|---|
| `dismiss` | `void` | Emitted when the dismiss button is clicked. `RndAlert` does not remove itself from the DOM — the consumer must react (e.g. toggle an `@if`) to actually hide it. |

**Notes**

The message body is default (unnamed) content projection. A leading icon goes into the
`[rndAlertIcon]` slot, e.g. `<rnd-icon rndAlertIcon name="info" />`, projected before the message
text. The root element has `role="alert"`.

## RndProgressBar (`rnd-progress-bar`)

Horizontal, determinate or indeterminate progress bar with optional diagonal stripe texture and
stripe animation.

```html
<rnd-progress-bar [value]="35" size="sm" />
<rnd-progress-bar [value]="60" size="md" />
<rnd-progress-bar [value]="85" size="lg" />

<rnd-progress-bar [indeterminate]="true" />

<rnd-progress-bar [value]="70" [striped]="true" [animated]="true" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Fill percentage. Internally clamped to `[0, 100]` before being applied as `width.%`. Ignored (not read for width) when `indeterminate` is `true`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Track height: `h-1`, `h-2`, `h-3` respectively. |
| `indeterminate` | `boolean` | `false` | When `true`, renders a fixed `w-1/3` fill that sweeps left-to-right on a 1.2s infinite loop instead of reflecting `value`. `aria-valuenow` is omitted (`null`) in this mode. |
| `striped` | `boolean` | `false` | Overlays a repeating 45° diagonal stripe gradient (`1rem` tile) on the fill. |
| `animated` | `boolean` | `false` | Adds the `rnd-progress-bar-animated` class, which animates `background-position` (1s linear infinite) — intended to be combined with `striped` for a "marching stripes" effect, but works independently of it (it still animates the fill's background-position even without stripes). |

**Notes**

Fill color is a fixed `bg-gradient-to-r from-secondary to-primary` gradient (not variant-driven).
The track has `role="progressbar"` with `aria-valuemin="0"`/`aria-valuemax="100"`, and
`aria-valuenow` set to the clamped value (or `null` when indeterminate).

## RndRadialProgress (`rnd-radial-progress`)

Circular SVG progress ring with the percentage value rendered as centered text.

```html
<rnd-radial-progress [value]="25" />
<rnd-radial-progress [value]="60" />
<rnd-radial-progress [value]="90" [size]="120" [strokeWidth]="10" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Progress percentage. Clamped to `[0, 100]` internally (`clampedValue`) and used both for the stroke-dashoffset calculation and the displayed `{{ clampedValue() }}%` label. |
| `size` | `number` | `80` | Diameter of the SVG in pixels (applied to both the wrapper `div` and the `svg` width/height). |
| `strokeWidth` | `number` | `8` | Stroke width of the ring in pixels; also factored into the radius (`(size - strokeWidth) / 2`) so the ring doesn't clip. |

**Notes**

Track ring uses `text-surface`, progress ring uses `text-primary` (both via `stroke="currentColor"`
+ a Tailwind text-color utility). The SVG is rotated `-90deg` so progress starts at 12 o'clock.
No `Outputs`.

## RndSparkline (`rnd-sparkline`)

Minimal inline line chart (SVG polyline) for a short numeric series, e.g. a price trend.

```html
<rnd-sparkline [data]="sparklineUpData" trend="up" />
<rnd-sparkline [data]="sparklineDownData" trend="down" />
```
```ts
protected sparklineUpData = [10, 12, 11, 14, 18, 17, 22, 25];
protected sparklineDownData = [25, 23, 24, 20, 18, 16, 14, 12];
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `data` | `number[]` | `[]` | Series to plot. Values are normalized against their own min/max (`range = max - min \|\| 1`) to fill the available height; fewer than 2 points renders nothing (`points` computed returns `''`). |
| `width` | `number` | `100` | SVG viewport width in pixels. |
| `height` | `number` | `32` | SVG viewport height in pixels. |
| `trend` | `'up' \| 'down' \| 'neutral'` | `'neutral'` | Stroke color only — `up` → `text-success`, `down` → `text-error`, `neutral` → `text-primary`. Purely cosmetic; it does not affect the line shape or auto-detect direction from `data`. |

**Notes**

No fill, 2px rounded stroke line (`stroke-linecap`/`stroke-linejoin: round`). Since normalization
is per-instance (min/max of that one `data` array), two sparklines are not visually comparable in
absolute scale — only their own shape.

## RndSkeleton (`rnd-skeleton`)

Pulsing placeholder block used while content is loading.

```html
<rnd-skeleton shape="circle" width="3rem" height="3rem" />
<rnd-skeleton shape="text" width="60%" />
<rnd-skeleton shape="text" width="90%" />
<rnd-skeleton shape="rect" width="100%" height="8rem" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `shape` | `'text' \| 'circle' \| 'rect'` | `'text'` | Corner radius: `text`→`rounded-md`, `circle`→`rounded-full`, `rect`→`rounded-lg`. |
| `width` | `string` | `'100%'` | Any CSS width value, applied via `[style.width]`. |
| `height` | `string` | `'1rem'` | Any CSS height value, applied via `[style.height]`. |

**Notes**

Renders as a single `<span style="display:block">` with `animate-pulse bg-surface`. No content
projection — compose multiple `rnd-skeleton` elements to build a placeholder layout (as in the
avatar + two text lines example above).

## RndSpinner (`rnd-spinner`)

Small rotating loading indicator (SVG).

```html
<rnd-spinner size="sm" />
<rnd-spinner size="md" />
<rnd-spinner size="lg" />

<rnd-spinner variant="primary" />
<rnd-spinner variant="foreground" />
<rnd-spinner variant="muted" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Pixel dimensions: `h-4 w-4`, `h-6 w-6`, `h-10 w-10` respectively. |
| `variant` | `'primary' \| 'foreground' \| 'muted'` | `'primary'` | Stroke color: `text-primary`, `text-foreground`, `text-muted`. |

**Notes**

Root `<svg>` has `role="status"` and `aria-label="Loading"`, and spins via Tailwind's
`animate-spin`. No `Outputs`.

## RndStatCard (`rnd-stat-card`)

Dashboard tile showing a labeled metric with an optional delta/trend indicator, e.g. a KPI or
price card.

```html
<rnd-stat-card label="BTC Price" value="$96,420" [delta]="2.4" />
<rnd-stat-card label="Portfolio" value="0.42 BTC" [delta]="-1.1" />
<rnd-stat-card label="Network Fee" value="12 sat/vB" trend="neutral" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string` (required) | — | Small uppercase caption above the value. |
| `value` | `string` (required) | — | The headline metric text. |
| `delta` | `number` | `undefined` | Percentage change, rendered as `{{ delta }}%` next to the value. Only shown when `delta !== undefined` (so `0` is still shown). |
| `trend` | `'up' \| 'down' \| 'neutral'` | `undefined` | Explicit trend override. If omitted, `resolvedTrend` derives it from `delta`'s sign (`delta > 0` → `up`, `delta < 0` → `down`, `delta === 0` or `undefined` → `neutral`). |

**Notes**

`resolvedTrend` drives both the delta text color (`up`→`text-success`, `down`→`text-error`,
`neutral`→`text-muted`) and which chevron icon (`chevron-up`/`chevron-down`, 12px) is shown next
to the delta — no chevron for `neutral`. An icon slot is available via `[rndStatCardIcon]` next to
the label (see `RndIcon`). No `Outputs`.

## RndTimeline + RndTimelineItem (`rnd-timeline` / `rnd-timeline-item`)

A vertical step/event timeline. `RndTimeline` is a pure layout wrapper (draws the connecting rail)
and `RndTimelineItem` renders each numbered step; they're always used together, one or more
`rnd-timeline-item` projected as children of `rnd-timeline`.

```html
<rnd-timeline>
  <rnd-timeline-item
    [step]="1"
    title="Connect wallet"
    description="Link your self-custody wallet."
  />
  <rnd-timeline-item
    [step]="2"
    title="Fund address"
    description="Send BTC to your generated address."
  />
  <rnd-timeline-item
    [step]="3"
    title="Confirm on-chain"
    description="Wait for network confirmations."
  />
</rnd-timeline>
```

**`RndTimeline` Inputs**

None — `RndTimeline` takes no inputs. It renders a default `<ng-content />` slot plus an
absolutely-positioned vertical gradient rail (`from-primary to-transparent`) behind the projected
items.

**`RndTimelineItem` Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `step` | `number` (required) | — | Number displayed inside the circular badge. |
| `title` | `string` (required) | — | Heading text for the step. |
| `description` | `string` | `undefined` | Optional supporting text below the title; only rendered when truthy. |

**Notes**

`RndTimelineItem` has no `Outputs` and no content projection of its own — it's a fully
data-driven leaf. `RndTimeline`'s rail is purely decorative (`absolute`, `left-6`, spans
`top-2`/`bottom-2`); item badges are `z-10` circles so they sit on top of it. There's no
"active"/"completed" state on either component — styling is uniform across all steps.

## RndEmptyState (`rnd-empty-state`)

Placeholder block for empty lists/tables/screens, with an optional icon and an optional
call-to-action.

```html
<rnd-empty-state
  title="No transactions yet"
  description="Once you send or receive BTC, it will show up here."
>
  <rnd-icon rndEmptyStateIcon name="list" [size]="40" variant="muted" />
  <rnd-button rndEmptyStateAction size="sm">Send BTC</rnd-button>
</rnd-empty-state>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `title` | `string` (required) | — | Heading text. |
| `description` | `string` | `undefined` | Optional supporting copy, only rendered when truthy. |

**Notes**

Two named content-projection slots, both optional: `[rndEmptyStateIcon]` (rendered above the
title) and `[rndEmptyStateAction]` (rendered below the description, typically an `RndButton`).
No `Outputs`.

## RndRouteProgress (`rnd-route-progress`)

A slim top-of-viewport progress bar that automatically tracks Angular Router navigations — no
per-page usage.

```html
<!-- app.html (app shell), mounted once -->
<rnd-route-progress />
```

**Inputs / Outputs**

None. `RndRouteProgress` takes no inputs and emits no outputs — it is entirely self-driven.

**Notes**

This is a "fit and forget" component: mount it **exactly once, at the top of the app shell**
(in this repo, `projects/consumer-app/src/app/app.html`, as the first element inside the root
`<div class="flex min-h-screen flex-col">`, before the navbar/sidebar/router-outlet). Internally
it `inject()`s Angular's `Router` and subscribes (via `takeUntilDestroyed()`) to `router.events`:
`NavigationStart` sets an internal `loading` signal to `true`; `NavigationEnd`, `NavigationCancel`,
or `NavigationError` sets it back to `false`. While `loading()` is `true`, it renders a fixed,
`z-[100]` bar (`h-0.5`, full width) with a `w-1/3` gradient (`from-secondary to-primary`) segment
that sweeps across on a 1s infinite loop; while not loading it renders nothing (`@if (loading())`).
Do not add it to individual feature pages — a second instance would just duplicate the same
router-wide behavior with no per-page configuration to differentiate them.

## RndToastService + RndToastOutlet + RndToast (`rnd-toast-outlet` / `rnd-toast`)

A toast-notification trio: inject `RndToastService` anywhere to push a toast; mount
`RndToastOutlet` once in the app shell to actually render them; `RndToast` is the visual card and
is not used directly by consumers.

```ts
import { Component, inject } from '@angular/core';
import { RndToastService } from 'rnd-ui-lib';

@Component({ /* ... */ })
export class OverlaysPopoversPage {
  private toastService = inject(RndToastService);

  protected showInfo(): void {
    this.toastService.show('Broadcasting transaction...', 'info');
  }

  protected showSuccess(): void {
    this.toastService.show('Transaction confirmed.', 'success');
  }

  protected showWarning(): void {
    this.toastService.show('Fee is higher than usual.', 'warning');
  }

  protected showError(): void {
    this.toastService.show('Failed to broadcast transaction.', 'error');
  }
}
```

```html
<!-- app.html (app shell), mounted once, alongside <router-outlet> -->
<rnd-toast-outlet />
```

### `RndToastService`

Injectable, `providedIn: 'root'` — a single app-wide instance backs every `RndToastOutlet`.

**API**

| Member | Signature | Description |
|---|---|---|
| `entries` | `Signal<RndToastEntry[]>` (readonly) | Current queue of active toasts. Consumed by `RndToastOutlet`; not typically read by feature code. |
| `show(message, variant?, duration?)` | `(message: string, variant: RndToastVariant = 'info', duration = 4000) => number` | Enqueues a toast and returns its numeric id. Auto-dismisses itself after `duration` ms via `setTimeout`. |
| `dismiss(id)` | `(id: number) => void` | Removes a toast from the queue immediately (also called internally by the auto-dismiss timer and by `RndToastOutlet`'s close button). |

`RndToastVariant` is `'info' | 'success' | 'warning' | 'error'` (re-exported from `RndToast`).
`RndToastEntry` is `{ id: number; message: string; variant: RndToastVariant }`.

### `RndToastOutlet` (`rnd-toast-outlet`)

**Inputs / Outputs**

None — it reads `RndToastService.entries()` directly (injected internally) and needs no
bindings.

**Notes**

Must be mounted **exactly once**, in the app shell (in this repo,
`projects/consumer-app/src/app/app.html`, near the end, alongside `<rnd-confirm-outlet />`), not
per-page. It renders a fixed `top-4 right-4 z-50` stack (`max-w-sm`, `flex flex-col gap-2`) and
`@for`-loops `toastService.entries()` (tracked by `toast.id`), rendering an `RndToast` for each
with `[message]`/`[variant]` bound from the entry and `(dismiss)` wired to
`toastService.dismiss(toast.id)`. The outer container is `pointer-events-none` so it doesn't block
clicks elsewhere on screen, while each toast wrapper is `pointer-events-auto` so its own dismiss
button remains clickable.

### `RndToast` (`rnd-toast`)

The underlying toast card. Normally you never instantiate this directly — call
`RndToastService.show(...)` instead and let `RndToastOutlet` render it. Documented here for
completeness / for anyone building a custom outlet.

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `message` | `string` (required) | — | Toast body text. |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Border/text color via `VARIANT_CLASSES` (e.g. `border-info/40 text-info`). |

**Outputs**

| Output | Payload | Description |
|---|---|---|
| `dismiss` | `void` | Emitted when the toast's close button is clicked. `RndToastOutlet` wires this to `toastService.dismiss(id)`; it does not auto-remove itself. |

**Notes**

Root element has `role="status"`, a frosted-glass background (`bg-[#0f1115]/95 backdrop-blur-lg`)
and drop shadow, with a `close` `rnd-icon` (12px) as the dismiss button.
