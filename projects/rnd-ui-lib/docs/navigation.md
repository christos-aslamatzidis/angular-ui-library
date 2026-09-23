# Navigation

Documentation for the navigation-family components in `rnd-ui-lib`: `RndBreadcrumb`, `RndPagination`, `RndTabs`/`RndTab`, `RndNavbar`, and `RndSidebar`.

## Breadcrumb (`rnd-breadcrumb`)

Renders a horizontal trail of links with a `/` separator, ending in the current (non-link) page.

```html
<rnd-breadcrumb [items]="breadcrumbItems" />
```

```ts
protected breadcrumbItems: RndBreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Wallets', href: '/wallets' },
  { label: 'Lightning' },
];
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `RndBreadcrumbItem[]` | `[]` | Ordered list of crumbs, root first, current page last. |

**Outputs**

None.

**Notes**

`RndBreadcrumbItem` is an exported interface:

```ts
export interface RndBreadcrumbItem {
  label: string;
  href?: string;
}
```

- `label` is always shown as text.
- `href` is optional. An item renders as an `<a>` only when it has an `href` **and** is not the last item in the array — the last item always renders as a plain `<span>` (current-page semantics), even if it has an `href`.
- The last item gets `text-foreground`; all others get `text-muted` (or the link hover state `hover:text-primary`).
- Separators (`/`) are rendered between every item except after the last one.
- Tracking is by `item.label`, so labels should be unique within a given `items` array.

## Pagination (`rnd-pagination`)

Numbered page control with previous/next buttons, supporting both "show all pages" and ng-bootstrap-style windowed/rotating display for large page counts.

```html
<!-- Default: shows every page -->
<rnd-pagination [page]="3" [totalPages]="7" />

<!-- Windowed + rotating: shows a sliding window of 5 page buttons -->
<rnd-pagination [page]="10" [totalPages]="20" [maxSize]="5" [rotate]="true" />
```

**Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `page` | `number` (model) | `1` | Current active page (1-based). Two-way bindable via `[(page)]`. |
| `totalPages` | `number` | `1` | Total number of pages. |
| `maxSize` | `number` | `0` | Max number of page buttons to display at once. `0` means "show all pages" (unchanged legacy behavior). |
| `rotate` | `boolean` | `false` | When `maxSize > 0`, controls how the visible window is positioned relative to the current page. |

**Outputs**

None (`page` is a writable `model()`, so bind `[(page)]` to react to changes instead of listening for an event).

**Notes**

- `page` is a signal `model()`, so it supports two-way binding: `[(page)]="currentPage"`.
- **`maxSize <= 0` or `maxSize >= totalPages`**: every page from `1` to `totalPages` is rendered — identical to the component's original behavior before windowing was added.
- **`maxSize > 0` and `rotate === false`** (fixed blocks): the page range is divided into fixed blocks of `maxSize` pages each (block boundaries computed as `Math.floor((page - 1) / maxSize) * maxSize + 1`). Navigating within a block does not move the window; crossing into the next/previous block jumps the whole window to that block. E.g. with `maxSize=5`, pages 1-5 are one block, 6-10 the next, etc.
- **`maxSize > 0` and `rotate === true`** (sliding window): the window recenters around the current page every time it changes (`start = current - floor(maxSize / 2)`), clamped so it never starts before page 1 or extends past `totalPages` (window end is capped at `totalPages`, pulling `start` back if needed). This keeps the current page roughly centered as the user pages through.
- Clicking Previous/Next at the first/last page is a no-op (buttons are `disabled`); `goTo()` also guards against out-of-range values.
- Depends on `RndIcon` (`chevron-left` / `chevron-right`) for the nav buttons.

## Tabs (`rnd-tabs` + `rnd-tab`)

Parent/child pair: `RndTabs` owns the active-tab state and visual variant; each `RndTab` is a projected trigger button that reads that state via DI.

```html
<!-- Underline variant (default) -->
<rnd-tabs activeValue="overview">
  <rnd-tab value="overview">Overview</rnd-tab>
  <rnd-tab value="activity">Activity</rnd-tab>
  <rnd-tab value="settings">Settings</rnd-tab>
</rnd-tabs>

<!-- Pills variant -->
<rnd-tabs activeValue="overview" variant="pills">
  <rnd-tab value="overview">Overview</rnd-tab>
  <rnd-tab value="activity">Activity</rnd-tab>
  <rnd-tab value="settings">Settings</rnd-tab>
</rnd-tabs>
```

**`RndTabs` Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `activeValue` | `string` (model) | `''` | The `value` of the currently active `RndTab`. Two-way bindable via `[(activeValue)]`. |
| `variant` | `RndTabsVariant` (`'underline' \| 'pills'`) | `'underline'` | Visual style for the tab list and its children. |

**`RndTabs` Outputs**

None (`activeValue` is a writable `model()`).

**`RndTab` Inputs**

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (required) | — | Unique identifier for this tab; compared against the parent's `activeValue`. |

**`RndTab` Outputs**

None — clicking a tab calls `tabs.activeValue.set(value())` on the injected parent directly.

**Notes**

- `RndTab` uses `inject(RndTabs)` to read the parent's `activeValue` and `variant` signals, so an `<rnd-tab>` **must** be used inside an `<rnd-tabs>` ancestor — it has no standalone behavior.
- `variant` lives only on `RndTabs`; `RndTab` reads `tabs.variant()` reactively rather than taking its own `variant` input, so all tabs in a group always share the parent's variant.
- `underline` variant: container is `flex gap-6 border-b border-border`; the active tab gets an animated gradient underline (`from-secondary to-primary`) rendered as an absolutely-positioned span beneath it.
- `pills` variant: container is `flex items-center gap-2`; the active tab gets a full pill background (`bg-gradient-to-r from-secondary to-primary`) instead of an underline.
- `RndTabsVariant` (`'underline' | 'pills'`) is exported from the library for typing consumer code.

## Navbar (`rnd-navbar`)

Sticky top app-shell header with named projection slots for a brand mark and trailing actions. Takes no inputs — it is a pure content-projection shell.

```html
<rnd-navbar>
  <a rndNavbarBrand routerLink="/" class="font-heading text-lg font-semibold text-foreground">
    rnd-ui-lib
  </a>
</rnd-navbar>
```

**Inputs**

None.

**Outputs**

None.

**Notes**

- `RndNavbar` has two named content-projection slots:
  - `[rndNavbarBrand]` — left-aligned group, typically a logo/wordmark link.
  - `[rndNavbarActions]` — right-aligned group, for trailing controls (e.g. theme toggle, user menu). The consumer app's current usage only fills the brand slot and leaves actions empty.
- It renders as a `sticky top-0` blurred header (`bg-background/80 backdrop-blur-lg`) with a bottom border, so it stays pinned while the page scrolls.
- **Usage pattern**: unlike the other components documented here, `RndNavbar` is not exercised on a per-feature demo page. It is mounted exactly once, in the application root shell (`projects/consumer-app/src/app/app.html`), wrapping the whole routed app rather than being dropped into individual pages.

## Sidebar (`rnd-sidebar`)

Fixed-width app-shell side panel for primary navigation. Takes no inputs — content is fully unprojected (single default slot).

```html
<rnd-sidebar>
  <nav class="flex flex-col gap-6">
    @for (group of navGroups; track group.title) {
      <div class="flex flex-col gap-1">
        <h3 class="px-4 pb-1 font-mono text-xs tracking-wider text-muted uppercase">
          {{ group.title }}
        </h3>
        @for (item of group.items; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-primary/10 text-primary"
            class="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground"
          >
            {{ item.label }}
          </a>
        }
      </div>
    }
  </nav>
</rnd-sidebar>
```

**Inputs**

None.

**Outputs**

None.

**Notes**

- `RndSidebar` itself takes no data input — it's `<aside class="w-64 shrink-0 ...">` with a single default `<ng-content />`. All navigation data/markup (including any `navGroups` structure) is owned and rendered by the *consuming* component, not the sidebar itself.
- In `projects/consumer-app/src/app/app.ts`, the app root (`App`) defines the grouped nav data consumed by the template above:

  ```ts
  interface NavItem {
    label: string;
    path: string;
  }

  interface NavGroup {
    title: string;
    items: NavItem[];
  }

  protected readonly navGroups: NavGroup[] = [
    { title: 'Foundations', items: [{ label: 'Icon', path: '/components/icon' }, /* ... */] },
    // ...
  ];
  ```

  This `NavGroup`/`NavItem` shape is an **app-level convention**, not part of the `RndSidebar` component's API — it lives in `app.ts`, and the sidebar just projects whatever markup the consumer builds from it (here, `routerLink`/`routerLinkActive` anchors grouped under uppercase mono headings).
- **Usage pattern**: like `RndNavbar`, `RndSidebar` is mounted once in the application root shell (`app.html`), alongside `<router-outlet>`, rather than being used per-page. It's meant to persist across route changes as the primary navigation surface.
