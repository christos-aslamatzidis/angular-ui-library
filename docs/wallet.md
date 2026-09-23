# Wallet

Domain-specific components for wallet/DeFi UIs: an asset balance row, a QR code
renderer, and a transaction list item. All three are standalone, signal-based
(`input()`/`computed()`), and styled entirely with `@theme` tokens (`text-success`,
`text-warning`, `text-error`, `text-muted`, etc. — see `projects/rnd-ui-lib/src/theme.css`).

## RndAssetRow

`<rnd-asset-row>`

A single row showing a holding's name, symbol, balance, fiat value, and an optional
percentage delta (colored by trend).

```html
<div class="flex flex-col divide-y divide-border rounded-xl border border-border">
  <rnd-asset-row name="Bitcoin" symbol="BTC" balance="0.42" value="$40,536" [delta]="2.4" />
  <rnd-asset-row name="Ethereum" symbol="ETH" balance="1.85" value="$6,200" [delta]="-1.2" />
  <rnd-asset-row name="Solana" symbol="SOL" balance="120" value="$18,000" />
</div>
```

This is typically rendered in a loop over a holdings array (one `<rnd-asset-row>` per
asset), as in the snippet above — `wallet-page.html` in the consumer app renders it
statically with three hand-written rows rather than a `@for` loop, but the usage per
item is identical either way.

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `name` | `string` (required) | — | Asset display name, e.g. `"Bitcoin"`. |
| `symbol` | `string` (required) | — | Ticker symbol, rendered uppercase, e.g. `"BTC"`. |
| `balance` | `string` (required) | — | Pre-formatted balance amount, e.g. `"0.42"`. |
| `value` | `string \| undefined` | `undefined` | Pre-formatted fiat value, e.g. `"$40,536"`. Hidden when omitted. |
| `delta` | `number \| undefined` | `undefined` | Percentage change (e.g. `2.4` or `-1.2`). Hidden when omitted; drives the trend color. |

**Outputs**

None.

**Notes**

- `balance` and `value` are plain strings — the component does no number formatting or
  currency conversion; format the values yourself before passing them in.
- `delta` drives an internal `trend` computed (`'up' | 'down' | 'neutral'`, exported as
  the `RndAssetRowTrend` type): `delta > 0` → `up` (`text-success`), `delta < 0` → `down`
  (`text-error`), and `delta === undefined || delta === 0` → `neutral` (`text-muted`).
  The `%` suffix is appended by the template, so pass the bare number (`2.4`, not `"2.4%"`).
- An icon/logo slot is available via content projection: `<span rndAssetRowIcon>…</span>`
  (or an `<img>`/inline SVG) projected before the name/symbol column. The consumer-app
  example doesn't use it since no icon library is installed in this repo (per the
  library's icon-slot convention — see root `CLAUDE.md`).

## RndQrCode

`<rnd-qr-code>`

Renders a QR code onto a `<canvas>` from an arbitrary string value (address, payment
URI, etc.), using the `qrcode` npm package.

```html
<rnd-qr-code value="bitcoin:bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" [size]="200" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (required) | — | The string to encode (address, payment URI, etc.). |
| `size` | `number` | `200` | QR code width/height in pixels, passed through to `QRCode.toCanvas`. |

**Outputs**

None.

**Notes**

- Rendering is done imperatively inside an `effect()` in the constructor, which calls
  `QRCode.toCanvas(canvasEl, value, { width: size, margin: 1, color: { dark: '#030304', light: '#ffffff' } })`
  — an async, Promise-based call from the `qrcode` package. The effect re-runs whenever
  `value` or `size` changes, redrawing the canvas.
- **SSR-safe by design**: the effect checks `isPlatformBrowser(inject(PLATFORM_ID))` and
  returns early on the server, since `<canvas>` 2D contexts aren't implemented in
  Angular's server-side rendering DOM. The canvas is left empty during SSR/prerender and
  is drawn once the client-side hydration pass runs the effect.
- **Invalid input is swallowed silently**: `QRCode.toCanvas(...)` returns a promise that
  is caught with an empty `.catch(() => {})` — e.g. passing an empty string leaves the
  canvas blank rather than throwing or emitting an error. There is no output/event for
  encode failures; callers cannot observe them from outside the component.
- The canvas gets `rounded-xl` styling from the template; colors are fixed (`#030304`
  dark modules on `#ffffff` light background) and are not currently configurable via
  inputs.

## RndTransactionItem

`<rnd-transaction-item>`

A single transaction row showing direction (in/out), title, amount, status, and an
optional relative timestamp.

```html
<div class="rounded-xl border border-border">
  <rnd-transaction-item
    direction="in"
    title="Received"
    amount="0.02 BTC"
    status="confirmed"
    timestamp="2h ago"
  />
</div>
```

This is typically rendered in a loop over a transactions array; `wallet-page.html`
renders three such items side by side (one per status: `confirmed`, `pending`,
`failed`) to demonstrate the states, e.g.:

```html
<rnd-transaction-item
  direction="out"
  title="Sent"
  amount="0.01 BTC"
  status="pending"
  timestamp="10m ago"
/>
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `direction` | `'in' \| 'out'` (required) | — | Transaction direction; drives icon-wrapper background, amount color, and the `+`/`-` prefix. |
| `title` | `string` (required) | — | Row label, e.g. `"Received"` / `"Sent"`. |
| `amount` | `string` (required) | — | Pre-formatted amount, e.g. `"0.02 BTC"` (do not include a sign — it's prefixed automatically). |
| `status` | `'confirmed' \| 'pending' \| 'failed'` | `'confirmed'` | Transaction status; drives the status label's color via a `STATUS_CLASSES` lookup. |
| `timestamp` | `string \| undefined` | `undefined` | Pre-formatted relative/absolute time, e.g. `"2h ago"`. Hidden when omitted. |

**Outputs**

None.

**Notes**

- `direction` is exported as the `RndTransactionDirection` type, `status` as
  `RndTransactionStatus`.
- `amount` is a bare string with no sign — the template prepends `+` for `in` and `-`
  for `out` (`amountPrefix` computed), so pass `"0.02 BTC"`, not `"+0.02 BTC"`.
- Status colors come from a `STATUS_CLASSES: Record<RndTransactionStatus, string>`
  lookup: `confirmed` → `text-success`, `pending` → `text-warning`, `failed` →
  `text-error`. The status text itself is rendered via `capitalize` (so the input can
  stay lowercase).
- `direction === 'in'` gives the icon wrapper a `bg-success/15 text-success` pill and
  colors the amount `text-success`; `direction === 'out'` gives a neutral `bg-white/5
  text-muted` wrapper and a plain `text-foreground` amount.
- An icon slot is available via content projection: `<span rndTransactionItemIcon>…</span>`
  projected inside the colored icon wrapper (e.g. an arrow-in/arrow-out glyph). As with
  `RndAssetRow`, the consumer-app example leaves it empty since no icon library is
  installed.
