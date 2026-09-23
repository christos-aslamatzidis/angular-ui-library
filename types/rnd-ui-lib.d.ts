import * as _angular_core from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

declare class RndAccordion {
    expandedValues: _angular_core.ModelSignal<string[]>;
    multiple: _angular_core.InputSignal<boolean>;
    flush: _angular_core.InputSignal<boolean>;
    protected containerClasses: _angular_core.Signal<"flex flex-col divide-y divide-border" | "flex flex-col divide-y divide-border rounded-xl border border-border">;
    toggle(value: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndAccordion, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndAccordion, "rnd-accordion", never, { "expandedValues": { "alias": "expandedValues"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "flush": { "alias": "flush"; "required": false; "isSignal": true; }; }, { "expandedValues": "expandedValuesChange"; }, never, ["*"], true, never>;
}

declare class RndAccordionItem {
    value: _angular_core.InputSignal<string>;
    label: _angular_core.InputSignal<string>;
    protected accordion: RndAccordion;
    protected expanded: _angular_core.Signal<boolean>;
    protected onToggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndAccordionItem, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndAccordionItem, "rnd-accordion-item", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

type RndAlertVariant = 'info' | 'success' | 'warning' | 'error';
declare class RndAlert {
    variant: _angular_core.InputSignal<RndAlertVariant>;
    dismissible: _angular_core.InputSignal<boolean>;
    dismiss: _angular_core.OutputEmitterRef<void>;
    protected classes: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndAlert, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndAlert, "rnd-alert", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "dismissible": { "alias": "dismissible"; "required": false; "isSignal": true; }; }, { "dismiss": "dismiss"; }, never, ["[rndAlertIcon]", "*"], true, never>;
}

type RndAssetRowTrend = 'up' | 'down' | 'neutral';
declare class RndAssetRow {
    name: _angular_core.InputSignal<string>;
    symbol: _angular_core.InputSignal<string>;
    balance: _angular_core.InputSignal<string>;
    value: _angular_core.InputSignal<string | undefined>;
    delta: _angular_core.InputSignal<number | undefined>;
    protected trend: _angular_core.Signal<RndAssetRowTrend>;
    protected deltaClasses: _angular_core.Signal<"text-muted" | "text-success" | "text-error">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndAssetRow, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndAssetRow, "rnd-asset-row", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "symbol": { "alias": "symbol"; "required": true; "isSignal": true; }; "balance": { "alias": "balance"; "required": true; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "delta": { "alias": "delta"; "required": false; "isSignal": true; }; }, {}, never, ["[rndAssetRowIcon]"], true, never>;
}

type RndAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RndAvatarStatus = 'online' | 'offline' | 'away';
declare class RndAvatar {
    src: _angular_core.InputSignal<string | undefined>;
    initials: _angular_core.InputSignal<string | undefined>;
    size: _angular_core.InputSignal<RndAvatarSize>;
    status: _angular_core.InputSignal<RndAvatarStatus | undefined>;
    protected imageFailed: _angular_core.WritableSignal<boolean>;
    protected classes: _angular_core.Signal<string>;
    protected statusClasses: _angular_core.Signal<string>;
    protected onImageError(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndAvatar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndAvatar, "rnd-avatar", never, { "src": { "alias": "src"; "required": false; "isSignal": true; }; "initials": { "alias": "initials"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "status": { "alias": "status"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class RndAvatarGroup {
    overflowCount: _angular_core.InputSignal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndAvatarGroup, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndAvatarGroup, "rnd-avatar-group", never, { "overflowCount": { "alias": "overflowCount"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

type RndBadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'muted' | 'success' | 'warning' | 'error' | 'info';
type RndBadgeSize = 'sm' | 'md';
declare class RndBadge {
    variant: _angular_core.InputSignal<RndBadgeVariant>;
    size: _angular_core.InputSignal<RndBadgeSize>;
    dot: _angular_core.InputSignal<boolean>;
    removable: _angular_core.InputSignal<boolean>;
    remove: _angular_core.OutputEmitterRef<void>;
    protected classes: _angular_core.Signal<string>;
    protected dotClasses: _angular_core.Signal<string>;
    protected onRemove(event: MouseEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndBadge, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndBadge, "rnd-badge", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "dot": { "alias": "dot"; "required": false; "isSignal": true; }; "removable": { "alias": "removable"; "required": false; "isSignal": true; }; }, { "remove": "remove"; }, never, ["*"], true, never>;
}

interface RndBreadcrumbItem {
    label: string;
    href?: string;
}
declare class RndBreadcrumb {
    items: _angular_core.InputSignal<RndBreadcrumbItem[]>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndBreadcrumb, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndBreadcrumb, "rnd-breadcrumb", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type RndButtonVariant = 'primary' | 'outline' | 'ghost' | 'link';
type RndButtonSize = 'sm' | 'md' | 'lg';
declare class RndButton {
    variant: _angular_core.InputSignal<RndButtonVariant>;
    size: _angular_core.InputSignal<RndButtonSize>;
    iconOnly: _angular_core.InputSignal<boolean>;
    disabled: _angular_core.InputSignal<boolean>;
    type: _angular_core.InputSignal<"button" | "submit" | "reset">;
    ariaLabel: _angular_core.InputSignal<string | undefined>;
    protected classes: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndButton, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndButton, "rnd-button", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "iconOnly": { "alias": "iconOnly"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, {}, never, ["[rndIconLeading]", "*", "[rndIconTrailing]"], true, never>;
}

interface CalendarDay {
    date: Date;
    inCurrentMonth: boolean;
    isToday: boolean;
}
declare class RndCalendar {
    selected: _angular_core.ModelSignal<Date | null>;
    protected weekdayLabels: string[];
    private viewDate;
    protected monthLabel: _angular_core.Signal<string>;
    protected days: _angular_core.Signal<CalendarDay[]>;
    protected isSelected(day: CalendarDay): boolean;
    protected dayClasses(day: CalendarDay): string;
    protected selectDay(day: CalendarDay): void;
    protected previousMonth(): void;
    protected nextMonth(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndCalendar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndCalendar, "rnd-calendar", never, { "selected": { "alias": "selected"; "required": false; "isSignal": true; }; }, { "selected": "selectedChange"; }, never, never, true, never>;
}

type RndCardVariant = 'standard' | 'glass';
declare class RndCard {
    variant: _angular_core.InputSignal<RndCardVariant>;
    hoverable: _angular_core.InputSignal<boolean>;
    protected classes: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndCard, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndCard, "rnd-card", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "hoverable": { "alias": "hoverable"; "required": false; "isSignal": true; }; }, {}, never, ["[rndCardHeader]", "[rndCardContent]", "[rndCardFooter]", "*"], true, never>;
}

declare class RndCarouselSlide {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndCarouselSlide, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndCarouselSlide, "rnd-carousel-slide", never, {}, {}, never, ["*"], true, never>;
}

declare class RndCarousel {
    activeIndex: _angular_core.ModelSignal<number>;
    loop: _angular_core.InputSignal<boolean>;
    interval: _angular_core.InputSignal<number>;
    protected slides: _angular_core.Signal<readonly RndCarouselSlide[]>;
    protected isPaused: _angular_core.WritableSignal<boolean>;
    private destroyRef;
    private timerId;
    protected canGoPrevious: _angular_core.Signal<boolean>;
    protected canGoNext: _angular_core.Signal<boolean>;
    protected trackTransform: _angular_core.Signal<string>;
    constructor();
    protected onKeydown(event: KeyboardEvent): void;
    protected goTo(index: number): void;
    protected previous(): void;
    protected next(): void;
    private advanceAutoplay;
    private clearAutoplay;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndCarousel, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndCarousel, "rnd-carousel", never, { "activeIndex": { "alias": "activeIndex"; "required": false; "isSignal": true; }; "loop": { "alias": "loop"; "required": false; "isSignal": true; }; "interval": { "alias": "interval"; "required": false; "isSignal": true; }; }, { "activeIndex": "activeIndexChange"; }, ["slides"], ["*"], true, never>;
}

declare class RndCheckbox {
    checked: _angular_core.ModelSignal<boolean>;
    indeterminate: _angular_core.InputSignal<boolean>;
    disabled: _angular_core.InputSignal<boolean>;
    label: _angular_core.InputSignal<string | undefined>;
    protected boxClasses: _angular_core.Signal<string>;
    protected onChange(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndCheckbox, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndCheckbox, "rnd-checkbox", never, { "checked": { "alias": "checked"; "required": false; "isSignal": true; }; "indeterminate": { "alias": "indeterminate"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, { "checked": "checkedChange"; }, never, never, true, never>;
}

declare class RndCollapsible {
    label: _angular_core.InputSignal<string>;
    open: _angular_core.ModelSignal<boolean>;
    protected toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndCollapsible, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndCollapsible, "rnd-collapsible", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "open": { "alias": "open"; "required": false; "isSignal": true; }; }, { "open": "openChange"; }, never, ["*"], true, never>;
}

interface RndComboboxOption {
    label: string;
    value: string;
}
declare class RndCombobox {
    options: _angular_core.InputSignal<RndComboboxOption[]>;
    placeholder: _angular_core.InputSignal<string>;
    value: _angular_core.ModelSignal<string>;
    protected panelId: string;
    protected query: _angular_core.WritableSignal<string>;
    protected highlightedIndex: _angular_core.WritableSignal<number>;
    protected isOpen: _angular_core.WritableSignal<boolean>;
    private trigger;
    private panel;
    protected selectedLabel: _angular_core.Signal<string>;
    protected filteredOptions: _angular_core.Signal<RndComboboxOption[]>;
    protected optionId(index: number): string;
    protected onActivate(): void;
    protected onBlur(event: FocusEvent): void;
    protected onDocumentClick(event: MouseEvent): void;
    protected onReposition(): void;
    protected onInput(event: Event): void;
    protected onKeydown(event: KeyboardEvent): void;
    protected chooseOption(option: RndComboboxOption): void;
    private openPanel;
    private closePanel;
    private reposition;
    private scrollHighlightedIntoView;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndCombobox, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndCombobox, "rnd-combobox", never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

interface RndCommandItem {
    id: string;
    label: string;
    description?: string;
}
declare class RndCommandPalette {
    items: _angular_core.InputSignal<RndCommandItem[]>;
    open: _angular_core.ModelSignal<boolean>;
    select: _angular_core.OutputEmitterRef<string>;
    protected query: _angular_core.WritableSignal<string>;
    protected highlightedIndex: _angular_core.WritableSignal<number>;
    protected filteredItems: _angular_core.Signal<RndCommandItem[]>;
    private dialog;
    constructor();
    protected onGlobalKeydown(event: KeyboardEvent): void;
    protected onDialogClose(): void;
    protected onQueryInput(event: Event): void;
    protected onListKeydown(event: KeyboardEvent): void;
    protected chooseItem(id: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndCommandPalette, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndCommandPalette, "rnd-command-palette", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "open": { "alias": "open"; "required": false; "isSignal": true; }; }, { "open": "openChange"; "select": "select"; }, never, never, true, never>;
}

interface RndConfirmOptions {
    title: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'default' | 'destructive';
}
interface RndConfirmRequest extends RndConfirmOptions {
    resolve: (confirmed: boolean) => void;
}
declare class RndConfirmService {
    private readonly request;
    readonly current: _angular_core.Signal<RndConfirmRequest | null>;
    confirm(options: RndConfirmOptions): Promise<boolean>;
    respond(confirmed: boolean): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndConfirmService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<any>;
}

declare class RndConfirmOutlet {
    protected confirmService: RndConfirmService;
    private dialog;
    constructor();
    protected respond(confirmed: boolean): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndConfirmOutlet, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndConfirmOutlet, "rnd-confirm-outlet", never, {}, {}, never, never, true, never>;
}

declare class RndContextMenu {
    private panel;
    protected onContextMenu(event: MouseEvent): void;
    protected onDismiss(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndContextMenu, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndContextMenu, "rnd-context-menu", never, {}, {}, never, ["[rndContextMenuTrigger]", "*"], true, never>;
}

declare class RndCopyField {
    value: _angular_core.InputSignal<string>;
    truncate: _angular_core.InputSignal<boolean>;
    protected copied: _angular_core.WritableSignal<boolean>;
    protected displayValue: _angular_core.Signal<string>;
    protected onCopy(): Promise<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndCopyField, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndCopyField, "rnd-copy-field", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; "truncate": { "alias": "truncate"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class RndDatePicker {
    selected: _angular_core.ModelSignal<Date | null>;
    placeholder: _angular_core.InputSignal<string>;
    private trigger;
    private panel;
    protected formattedDate: _angular_core.Signal<string>;
    protected onTriggerClick(): void;
    protected onReposition(): void;
    protected onSelect(date: Date | null): void;
    private reposition;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndDatePicker, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndDatePicker, "rnd-date-picker", never, { "selected": { "alias": "selected"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; }, { "selected": "selectedChange"; }, never, never, true, never>;
}

type RndDividerOrientation = 'horizontal' | 'vertical';
declare class RndDivider {
    orientation: _angular_core.InputSignal<RndDividerOrientation>;
    label: _angular_core.InputSignal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndDivider, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndDivider, "rnd-divider", never, { "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class RndDropdownItem {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndDropdownItem, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndDropdownItem, "rnd-dropdown-item", never, {}, {}, never, ["*"], true, never>;
}

declare class RndDropdownMenu {
    label: _angular_core.InputSignal<string>;
    protected menuId: string;
    private trigger;
    private panel;
    protected onToggle(event: Event): void;
    protected onReposition(): void;
    private reposition;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndDropdownMenu, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndDropdownMenu, "rnd-dropdown-menu", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class RndEmptyState {
    title: _angular_core.InputSignal<string>;
    description: _angular_core.InputSignal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndEmptyState, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndEmptyState, "rnd-empty-state", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; }, {}, never, ["[rndEmptyStateIcon]", "[rndEmptyStateAction]"], true, never>;
}

declare class RndFormField {
    label: _angular_core.InputSignal<string | undefined>;
    hint: _angular_core.InputSignal<string | undefined>;
    error: _angular_core.InputSignal<string | undefined>;
    required: _angular_core.InputSignal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndFormField, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndFormField, "rnd-form-field", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "hint": { "alias": "hint"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class RndHoverCard {
    protected open: _angular_core.WritableSignal<boolean>;
    private openTimeout?;
    private closeTimeout?;
    protected scheduleOpen(): void;
    protected scheduleClose(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndHoverCard, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndHoverCard, "rnd-hover-card", never, {}, {}, never, ["[rndHoverCardTrigger]", "*"], true, never>;
}

type RndIconWeight = 'outline' | 'solid' | 'duotone';
type RndIconVariant = 'inherit' | 'primary' | 'secondary' | 'accent' | 'foreground' | 'muted' | 'success' | 'warning' | 'error' | 'info';
declare class RndIcon {
    private sanitizer;
    name: _angular_core.InputSignal<"info" | "chevron-up" | "chevron-down" | "chevron-left" | "chevron-right" | "arrow-up" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up-right" | "external-link" | "log-out" | "close" | "check" | "plus" | "minus" | "plus-circle" | "minus-circle" | "trash" | "edit" | "copy" | "save" | "refresh" | "undo" | "redo" | "search" | "filter" | "sort" | "share" | "download" | "upload" | "print" | "eye" | "eye-off" | "star" | "heart" | "bookmark" | "pin" | "lock" | "unlock" | "bell" | "mail" | "alert-triangle" | "alert-circle" | "check-circle" | "x-circle" | "help-circle" | "calendar" | "clock" | "folder" | "file" | "image" | "link" | "tag" | "flag" | "home" | "settings" | "user" | "users" | "globe" | "menu" | "more-horizontal" | "more-vertical" | "grid" | "list" | "cart" | "bag" | "receipt" | "credit-card" | "dollar-sign" | "percent" | "gift" | "trending-up" | "trending-down" | "bar-chart" | "pie-chart" | "activity" | "map" | "map-pin" | "navigation" | "compass" | "message-circle" | "message-square" | "send" | "phone" | "at-sign" | "camera" | "mic" | "mic-off" | "volume" | "volume-x" | "video" | "wifi" | "paperclip" | "inbox" | "archive" | "cloud" | "database" | "server" | "code" | "layers" | "sliders" | "maximize" | "minimize" | "move" | "grip-vertical" | "shield" | "shield-check" | "key" | "circle" | "thumbs-up" | "thumbs-down" | "hash" | "zoom-in" | "zoom-out">;
    weight: _angular_core.InputSignal<RndIconWeight>;
    variant: _angular_core.InputSignal<RndIconVariant>;
    size: _angular_core.InputSignal<number>;
    protected classes: _angular_core.Signal<string>;
    protected markup: _angular_core.Signal<SafeHtml>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndIcon, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndIcon, "rnd-icon", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "weight": { "alias": "weight"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

interface RndIconMarkupSet {
    outline: string;
    solid: string;
    duotone: string;
}
declare const RND_ICON_PATHS: {
    readonly 'chevron-up': RndIconMarkupSet;
    readonly 'chevron-down': RndIconMarkupSet;
    readonly 'chevron-left': RndIconMarkupSet;
    readonly 'chevron-right': RndIconMarkupSet;
    readonly 'arrow-up': RndIconMarkupSet;
    readonly 'arrow-down': RndIconMarkupSet;
    readonly 'arrow-left': RndIconMarkupSet;
    readonly 'arrow-right': RndIconMarkupSet;
    readonly 'arrow-up-right': RndIconMarkupSet;
    readonly 'external-link': RndIconMarkupSet;
    readonly 'log-out': RndIconMarkupSet;
    readonly close: RndIconMarkupSet;
    readonly check: RndIconMarkupSet;
    readonly plus: RndIconMarkupSet;
    readonly minus: RndIconMarkupSet;
    readonly 'plus-circle': {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"M12 8v8M8 12h8\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M12 8v8M8 12h8\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M12 8v8M8 12h8\" stroke-linecap=\"round\" />";
    };
    readonly 'minus-circle': {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"M8 12h8\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M8 12h8\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M8 12h8\" stroke-linecap=\"round\" />";
    };
    readonly trash: RndIconMarkupSet;
    readonly edit: RndIconMarkupSet;
    readonly copy: {
        readonly outline: "<rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" /><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\" />";
        readonly solid: "<rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly save: RndIconMarkupSet;
    readonly refresh: RndIconMarkupSet;
    readonly undo: RndIconMarkupSet;
    readonly redo: RndIconMarkupSet;
    readonly search: {
        readonly outline: "<circle cx=\"11\" cy=\"11\" r=\"8\" /><path d=\"m21 21-4.35-4.35\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"11\" cy=\"11\" r=\"8\" fill=\"currentColor\" stroke=\"none\" /><path d=\"m21 21-4.35-4.35\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"11\" cy=\"11\" r=\"8\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"m21 21-4.35-4.35\" stroke-linecap=\"round\" /><circle cx=\"11\" cy=\"11\" r=\"8\" fill=\"none\" />";
    };
    readonly filter: RndIconMarkupSet;
    readonly sort: RndIconMarkupSet;
    readonly share: RndIconMarkupSet;
    readonly download: RndIconMarkupSet;
    readonly upload: RndIconMarkupSet;
    readonly print: RndIconMarkupSet;
    readonly eye: {
        readonly outline: "<path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z\" /><circle cx=\"12\" cy=\"12\" r=\"3\" />";
        readonly solid: "<path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"3\" style=\"fill: var(--color-background)\" stroke=\"none\" />";
        readonly duotone: "<path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly 'eye-off': {
        readonly outline: "<path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z\" /><circle cx=\"12\" cy=\"12\" r=\"3\" /><path d=\"M3 3l18 18\" stroke-linecap=\"round\" />";
        readonly solid: "<path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"3\" style=\"fill: var(--color-background)\" stroke=\"none\" /><path d=\"M3 3l18 18\" style=\"stroke: var(--color-background)\" stroke-width=\"2.5\" stroke-linecap=\"round\" />";
        readonly duotone: "<path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M3 3l18 18\" stroke=\"currentColor\" stroke-linecap=\"round\" />";
    };
    readonly star: RndIconMarkupSet;
    readonly heart: RndIconMarkupSet;
    readonly bookmark: RndIconMarkupSet;
    readonly pin: RndIconMarkupSet;
    readonly lock: {
        readonly outline: "<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />";
        readonly solid: "<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />";
        readonly duotone: "<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />";
    };
    readonly unlock: {
        readonly outline: "<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" /><path d=\"M7 11V7a5 5 0 0 1 9.9-1\" stroke-linecap=\"round\" />";
        readonly solid: "<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M7 11V7a5 5 0 0 1 9.9-1\" stroke-linecap=\"round\" />";
        readonly duotone: "<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M7 11V7a5 5 0 0 1 9.9-1\" stroke-linecap=\"round\" />";
    };
    readonly bell: RndIconMarkupSet;
    readonly mail: {
        readonly outline: "<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" /><path d=\"m22 6-10 7L2 6\" />";
        readonly solid: "<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" fill=\"currentColor\" stroke=\"none\" /><path d=\"m22 6-10 7L2 6\" style=\"stroke: var(--color-background)\" />";
        readonly duotone: "<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"m22 6-10 7L2 6\" />";
    };
    readonly info: {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"M12 16v-4M12 8h.01\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M12 16v-4M12 8h.01\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M12 16v-4M12 8h.01\" stroke-linecap=\"round\" />";
    };
    readonly 'alert-triangle': RndIconMarkupSet;
    readonly 'alert-circle': {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"M12 8v4M12 16h.01\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M12 8v4M12 16h.01\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M12 8v4M12 16h.01\" stroke-linecap=\"round\" />";
    };
    readonly 'check-circle': {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"m9 12 2 2 4-4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"m9 12 2 2 4-4\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"m9 12 2 2 4-4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
    };
    readonly 'x-circle': {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"m15 9-6 6M9 9l6 6\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"m15 9-6 6M9 9l6 6\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"m15 9-6 6M9 9l6 6\" stroke-linecap=\"round\" />";
    };
    readonly 'help-circle': {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4M12 17h.01\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4M12 17h.01\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4M12 17h.01\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
    };
    readonly calendar: {
        readonly outline: "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" /><path d=\"M16 2v4M8 2v4M3 10h18\" stroke-linecap=\"round\" />";
        readonly solid: "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M16 2v4M8 2v4\" stroke-linecap=\"round\" /><path d=\"M3 10h18\" style=\"stroke: var(--color-background)\" />";
        readonly duotone: "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M16 2v4M8 2v4M3 10h18\" stroke-linecap=\"round\" />";
    };
    readonly clock: {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"M12 7v5l3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M12 7v5l3 3\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M12 7v5l3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
    };
    readonly folder: RndIconMarkupSet;
    readonly file: RndIconMarkupSet;
    readonly image: {
        readonly outline: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" /><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\" /><path d=\"m21 15-5-5L5 21\" />";
        readonly solid: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\" style=\"fill: var(--color-background)\" stroke=\"none\" /><path d=\"m21 15-5-5L5 21\" style=\"fill: var(--color-background)\" stroke=\"none\" />";
        readonly duotone: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><path d=\"m21 15-5-5L5 21\" />";
    };
    readonly link: RndIconMarkupSet;
    readonly tag: RndIconMarkupSet;
    readonly flag: RndIconMarkupSet;
    readonly home: RndIconMarkupSet;
    readonly settings: {
        readonly outline: "<path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z\" /><circle cx=\"12\" cy=\"12\" r=\"3\" />";
        readonly solid: "<path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"3\" style=\"fill: var(--color-background)\" stroke=\"none\" />";
        readonly duotone: "<path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly user: {
        readonly outline: "<circle cx=\"12\" cy=\"8\" r=\"4\" /><path d=\"M20 21a8 8 0 1 0-16 0\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"8\" r=\"4\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M20 21a8 8 0 1 0-16 0\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<path d=\"M20 21a8 8 0 1 0-16 0\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"8\" r=\"4\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly users: {
        readonly outline: "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /><circle cx=\"9\" cy=\"7\" r=\"4\" /><path d=\"M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75\" stroke-linecap=\"round\" />";
        readonly solid: "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"9\" cy=\"7\" r=\"4\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75\" stroke-linecap=\"round\" />";
        readonly duotone: "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"9\" cy=\"7\" r=\"4\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75\" stroke-linecap=\"round\" />";
    };
    readonly globe: {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"M2 12h20M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M2 12h20M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z\" style=\"stroke: var(--color-background)\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M2 12h20M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z\" />";
    };
    readonly menu: RndIconMarkupSet;
    readonly 'more-horizontal': {
        readonly outline: "<circle cx=\"5\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"19\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" />";
        readonly solid: "<circle cx=\"5\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"19\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<circle cx=\"5\" cy=\"12\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"19\" cy=\"12\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"5\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"19\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly 'more-vertical': {
        readonly outline: "<circle cx=\"12\" cy=\"5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"19\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" />";
        readonly solid: "<circle cx=\"12\" cy=\"5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"19\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"5\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"19\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"19\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly grid: {
        readonly outline: "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\" /><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\" /><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\" /><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\" />";
        readonly solid: "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\" fill=\"currentColor\" stroke=\"none\" /><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\" fill=\"currentColor\" stroke=\"none\" /><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\" fill=\"currentColor\" stroke=\"none\" /><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\" fill=\"currentColor\" stroke=\"none\" /><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly list: RndIconMarkupSet;
    readonly cart: {
        readonly outline: "<circle cx=\"9\" cy=\"21\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"20\" cy=\"21\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly solid: "<circle cx=\"9\" cy=\"21\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"20\" cy=\"21\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\" stroke-width=\"2.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly duotone: "<path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\" stroke-width=\"5\" stroke-opacity=\"0.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><circle cx=\"9\" cy=\"21\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"20\" cy=\"21\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly bag: {
        readonly outline: "<path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\" /><path d=\"M3 6h18\" stroke-linecap=\"round\" /><path d=\"M16 10a4 4 0 0 1-8 0\" stroke-linecap=\"round\" />";
        readonly solid: "<path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M3 6h18\" style=\"stroke: var(--color-background)\" /><path d=\"M16 10a4 4 0 0 1-8 0\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" />";
        readonly duotone: "<path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M3 6h18\" stroke-linecap=\"round\" /><path d=\"M16 10a4 4 0 0 1-8 0\" stroke-linecap=\"round\" />";
    };
    readonly receipt: RndIconMarkupSet;
    readonly 'credit-card': {
        readonly outline: "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\" /><path d=\"M2 10h20\" stroke-linecap=\"round\" /><path d=\"M6 15h4\" stroke-linecap=\"round\" />";
        readonly solid: "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M2 10h20\" style=\"stroke: var(--color-background)\" /><path d=\"M6 15h4\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" />";
        readonly duotone: "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M2 10h20\" stroke-linecap=\"round\" /><path d=\"M6 15h4\" stroke-linecap=\"round\" />";
    };
    readonly 'dollar-sign': RndIconMarkupSet;
    readonly percent: {
        readonly outline: "<path d=\"M19 5 5 19\" stroke-linecap=\"round\" /><circle cx=\"6.5\" cy=\"6.5\" r=\"2.5\" /><circle cx=\"17.5\" cy=\"17.5\" r=\"2.5\" />";
        readonly solid: "<path d=\"M19 5 5 19\" stroke-linecap=\"round\" /><circle cx=\"6.5\" cy=\"6.5\" r=\"2.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"17.5\" cy=\"17.5\" r=\"2.5\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<path d=\"M19 5 5 19\" stroke-linecap=\"round\" /><circle cx=\"6.5\" cy=\"6.5\" r=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"17.5\" cy=\"17.5\" r=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" />";
    };
    readonly gift: RndIconMarkupSet;
    readonly 'trending-up': RndIconMarkupSet;
    readonly 'trending-down': RndIconMarkupSet;
    readonly 'bar-chart': RndIconMarkupSet;
    readonly 'pie-chart': RndIconMarkupSet;
    readonly activity: RndIconMarkupSet;
    readonly map: RndIconMarkupSet;
    readonly 'map-pin': {
        readonly outline: "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z\" /><circle cx=\"12\" cy=\"10\" r=\"3\" />";
        readonly solid: "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"10\" r=\"3\" style=\"fill: var(--color-background)\" stroke=\"none\" />";
        readonly duotone: "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"10\" r=\"3\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly navigation: RndIconMarkupSet;
    readonly compass: {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" /><path d=\"m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" /><path d=\"m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z\" style=\"fill: var(--color-background)\" stroke=\"none\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly 'message-circle': {
        readonly outline: "<path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly solid: "<path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
    };
    readonly 'message-square': RndIconMarkupSet;
    readonly send: RndIconMarkupSet;
    readonly phone: RndIconMarkupSet;
    readonly 'at-sign': {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"4\" /><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"4\" stroke-width=\"2.75\" /><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\" stroke-width=\"2.75\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"4\" stroke-width=\"5\" stroke-opacity=\"0.3\" /><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\" stroke-width=\"5\" stroke-opacity=\"0.3\" stroke-linecap=\"round\" /><circle cx=\"12\" cy=\"12\" r=\"4\" /><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\" stroke-linecap=\"round\" />";
    };
    readonly camera: {
        readonly outline: "<path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z\" /><circle cx=\"12\" cy=\"13\" r=\"4\" />";
        readonly solid: "<path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"13\" r=\"4\" style=\"fill: var(--color-background)\" stroke=\"none\" />";
        readonly duotone: "<path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"13\" r=\"4\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly mic: {
        readonly outline: "<rect x=\"9\" y=\"2\" width=\"6\" height=\"12\" rx=\"3\" /><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\" stroke-linecap=\"round\" /><path d=\"M12 19v3M8 22h8\" stroke-linecap=\"round\" />";
        readonly solid: "<rect x=\"9\" y=\"2\" width=\"6\" height=\"12\" rx=\"3\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\" stroke-linecap=\"round\" /><path d=\"M12 19v3M8 22h8\" stroke-linecap=\"round\" />";
        readonly duotone: "<rect x=\"9\" y=\"2\" width=\"6\" height=\"12\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\" stroke-linecap=\"round\" /><path d=\"M12 19v3M8 22h8\" stroke-linecap=\"round\" />";
    };
    readonly 'mic-off': RndIconMarkupSet;
    readonly volume: RndIconMarkupSet;
    readonly 'volume-x': RndIconMarkupSet;
    readonly video: RndIconMarkupSet;
    readonly wifi: RndIconMarkupSet;
    readonly paperclip: RndIconMarkupSet;
    readonly inbox: RndIconMarkupSet;
    readonly archive: RndIconMarkupSet;
    readonly cloud: RndIconMarkupSet;
    readonly database: {
        readonly outline: "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" /><path d=\"M3 5v14a9 3 0 0 0 18 0V5\" /><path d=\"M3 12a9 3 0 0 0 18 0\" />";
        readonly solid: "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M3 5v14a9 3 0 0 0 18 0V5\" stroke-width=\"2.75\" /><path d=\"M3 12a9 3 0 0 0 18 0\" stroke-width=\"2.75\" />";
        readonly duotone: "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M3 5v14a9 3 0 0 0 18 0V5\" /><path d=\"M3 12a9 3 0 0 0 18 0\" />";
    };
    readonly server: RndIconMarkupSet;
    readonly code: RndIconMarkupSet;
    readonly layers: RndIconMarkupSet;
    readonly sliders: RndIconMarkupSet;
    readonly maximize: RndIconMarkupSet;
    readonly minimize: RndIconMarkupSet;
    readonly move: RndIconMarkupSet;
    readonly 'grip-vertical': {
        readonly outline: "<circle cx=\"9\" cy=\"5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"9\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"9\" cy=\"19\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"15\" cy=\"5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"15\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"15\" cy=\"19\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" />";
        readonly solid: "<circle cx=\"9\" cy=\"5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"9\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"9\" cy=\"19\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"15\" cy=\"5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"15\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"15\" cy=\"19\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<circle cx=\"9\" cy=\"5\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"9\" cy=\"12\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"9\" cy=\"19\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"15\" cy=\"5\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"15\" cy=\"12\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"15\" cy=\"19\" r=\"2.2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"9\" cy=\"5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"9\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"9\" cy=\"19\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"15\" cy=\"5\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"15\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"15\" cy=\"19\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\" />";
    };
    readonly shield: {
        readonly outline: "<path d=\"M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z\" />";
        readonly solid: "<path d=\"M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<path d=\"M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z\" />";
    };
    readonly 'shield-check': {
        readonly outline: "<path d=\"M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z\" /><path d=\"m9 12 2 2 4-4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly solid: "<path d=\"M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z\" fill=\"currentColor\" stroke=\"none\" /><path d=\"m9 12 2 2 4-4\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
        readonly duotone: "<path d=\"M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"m9 12 2 2 4-4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
    };
    readonly key: {
        readonly outline: "<circle cx=\"8\" cy=\"16\" r=\"5\" /><path d=\"M11.5 12.5 21 3\" stroke-linecap=\"round\" /><path d=\"M15 8l3 3M18 5l3 3\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"8\" cy=\"16\" r=\"5\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M11.5 12.5 21 3\" stroke-linecap=\"round\" /><path d=\"M15 8l3 3M18 5l3 3\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"8\" cy=\"16\" r=\"5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"M11.5 12.5 21 3\" stroke-linecap=\"round\" /><path d=\"M15 8l3 3M18 5l3 3\" stroke-linecap=\"round\" />";
    };
    readonly circle: {
        readonly outline: "<circle cx=\"12\" cy=\"12\" r=\"9\" />";
        readonly solid: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" stroke=\"none\" />";
        readonly duotone: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\" />";
    };
    readonly 'thumbs-up': RndIconMarkupSet;
    readonly 'thumbs-down': RndIconMarkupSet;
    readonly hash: RndIconMarkupSet;
    readonly 'zoom-in': {
        readonly outline: "<circle cx=\"11\" cy=\"11\" r=\"8\" /><path d=\"m21 21-4.35-4.35\" stroke-linecap=\"round\" /><path d=\"M11 8v6M8 11h6\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"11\" cy=\"11\" r=\"8\" fill=\"currentColor\" stroke=\"none\" /><path d=\"m21 21-4.35-4.35\" stroke-linecap=\"round\" /><path d=\"M11 8v6M8 11h6\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"11\" cy=\"11\" r=\"8\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"m21 21-4.35-4.35\" stroke-linecap=\"round\" /><path d=\"M11 8v6M8 11h6\" stroke-linecap=\"round\" />";
    };
    readonly 'zoom-out': {
        readonly outline: "<circle cx=\"11\" cy=\"11\" r=\"8\" /><path d=\"m21 21-4.35-4.35\" stroke-linecap=\"round\" /><path d=\"M8 11h6\" stroke-linecap=\"round\" />";
        readonly solid: "<circle cx=\"11\" cy=\"11\" r=\"8\" fill=\"currentColor\" stroke=\"none\" /><path d=\"m21 21-4.35-4.35\" stroke-linecap=\"round\" /><path d=\"M8 11h6\" style=\"stroke: var(--color-background)\" stroke-linecap=\"round\" />";
        readonly duotone: "<circle cx=\"11\" cy=\"11\" r=\"8\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\" /><path d=\"m21 21-4.35-4.35\" stroke-linecap=\"round\" /><path d=\"M8 11h6\" stroke-linecap=\"round\" />";
    };
};
type RndIconName = keyof typeof RND_ICON_PATHS;

type RndInputType = 'text' | 'email' | 'password' | 'number';
declare class RndInput {
    value: _angular_core.ModelSignal<string>;
    type: _angular_core.InputSignal<RndInputType>;
    placeholder: _angular_core.InputSignal<string>;
    disabled: _angular_core.InputSignal<boolean>;
    invalid: _angular_core.InputSignal<boolean>;
    protected containerClasses: _angular_core.Signal<string>;
    protected onInput(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndInput, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndInput, "rnd-input", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "invalid": { "alias": "invalid"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, ["[rndInputPrefix]", "[rndInputSuffix]"], true, never>;
}

declare class RndInputOtp {
    length: _angular_core.InputSignal<number>;
    value: _angular_core.ModelSignal<string>;
    protected cells: _angular_core.Signal<number[]>;
    protected digits: _angular_core.Signal<string[]>;
    private inputs;
    protected onInput(event: Event, index: number): void;
    protected onKeydown(event: KeyboardEvent, index: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndInputOtp, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndInputOtp, "rnd-input-otp", never, { "length": { "alias": "length"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

declare class RndKbd {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndKbd, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndKbd, "rnd-kbd", never, {}, {}, never, ["*"], true, never>;
}

declare class RndModal {
    open: _angular_core.ModelSignal<boolean>;
    closeOnBackdropClick: _angular_core.InputSignal<boolean>;
    private dialog;
    constructor();
    protected onDialogClose(): void;
    protected onDialogClick(event: MouseEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndModal, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndModal, "rnd-modal", never, { "open": { "alias": "open"; "required": false; "isSignal": true; }; "closeOnBackdropClick": { "alias": "closeOnBackdropClick"; "required": false; "isSignal": true; }; }, { "open": "openChange"; }, never, ["[rndModalHeader]", "*", "[rndModalFooter]"], true, never>;
}

declare class RndNavbar {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndNavbar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndNavbar, "rnd-navbar", never, {}, {}, never, ["[rndNavbarBrand]", "[rndNavbarActions]"], true, never>;
}

declare class RndNumberStepper {
    value: _angular_core.ModelSignal<number>;
    min: _angular_core.InputSignal<number>;
    max: _angular_core.InputSignal<number>;
    step: _angular_core.InputSignal<number>;
    disabled: _angular_core.InputSignal<boolean>;
    protected canDecrement: _angular_core.Signal<boolean>;
    protected canIncrement: _angular_core.Signal<boolean>;
    protected decrement(): void;
    protected increment(): void;
    protected onInput(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndNumberStepper, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndNumberStepper, "rnd-number-stepper", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "step": { "alias": "step"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

declare class RndPagination {
    page: _angular_core.ModelSignal<number>;
    totalPages: _angular_core.InputSignal<number>;
    maxSize: _angular_core.InputSignal<number>;
    rotate: _angular_core.InputSignal<boolean>;
    protected navButtonClasses: string;
    protected pages: _angular_core.Signal<number[]>;
    protected pageButtonClasses(p: number): string;
    protected goTo(page: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndPagination, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndPagination, "rnd-pagination", never, { "page": { "alias": "page"; "required": false; "isSignal": true; }; "totalPages": { "alias": "totalPages"; "required": false; "isSignal": true; }; "maxSize": { "alias": "maxSize"; "required": false; "isSignal": true; }; "rotate": { "alias": "rotate"; "required": false; "isSignal": true; }; }, { "page": "pageChange"; }, never, never, true, never>;
}

declare class RndPasswordInput {
    value: _angular_core.ModelSignal<string>;
    placeholder: _angular_core.InputSignal<string>;
    disabled: _angular_core.InputSignal<boolean>;
    invalid: _angular_core.InputSignal<boolean>;
    protected visible: _angular_core.WritableSignal<boolean>;
    protected containerClasses: _angular_core.Signal<string>;
    protected onInput(event: Event): void;
    protected toggleVisibility(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndPasswordInput, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndPasswordInput, "rnd-password-input", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "invalid": { "alias": "invalid"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

declare class RndPopover {
    private trigger;
    private panel;
    protected onTriggerClick(): void;
    protected onReposition(): void;
    private reposition;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndPopover, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndPopover, "rnd-popover", never, {}, {}, never, ["[rndPopoverTrigger]", "*"], true, never>;
}

type RndProgressBarSize = 'sm' | 'md' | 'lg';
declare class RndProgressBar {
    value: _angular_core.InputSignal<number>;
    size: _angular_core.InputSignal<RndProgressBarSize>;
    indeterminate: _angular_core.InputSignal<boolean>;
    striped: _angular_core.InputSignal<boolean>;
    animated: _angular_core.InputSignal<boolean>;
    protected trackClasses: _angular_core.Signal<string>;
    protected fillClasses: _angular_core.Signal<string>;
    protected widthPercent: _angular_core.Signal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndProgressBar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndProgressBar, "rnd-progress-bar", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "indeterminate": { "alias": "indeterminate"; "required": false; "isSignal": true; }; "striped": { "alias": "striped"; "required": false; "isSignal": true; }; "animated": { "alias": "animated"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class RndQrCode {
    value: _angular_core.InputSignal<string>;
    size: _angular_core.InputSignal<number>;
    private isBrowser;
    private canvas;
    constructor();
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndQrCode, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndQrCode, "rnd-qr-code", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class RndRadialProgress {
    value: _angular_core.InputSignal<number>;
    size: _angular_core.InputSignal<number>;
    strokeWidth: _angular_core.InputSignal<number>;
    protected clampedValue: _angular_core.Signal<number>;
    protected radius: _angular_core.Signal<number>;
    protected center: _angular_core.Signal<number>;
    protected circumference: _angular_core.Signal<number>;
    protected offset: _angular_core.Signal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndRadialProgress, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndRadialProgress, "rnd-radial-progress", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "strokeWidth": { "alias": "strokeWidth"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class RndRadioGroup {
    name: _angular_core.InputSignal<string>;
    value: _angular_core.ModelSignal<string>;
    disabled: _angular_core.InputSignal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndRadioGroup, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndRadioGroup, "rnd-radio-group", never, { "name": { "alias": "name"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, ["*"], true, never>;
}

declare class RndRadioOption {
    value: _angular_core.InputSignal<string>;
    label: _angular_core.InputSignal<string | undefined>;
    protected group: RndRadioGroup;
    protected checked: _angular_core.Signal<boolean>;
    protected boxClasses: _angular_core.Signal<string>;
    protected onChange(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndRadioOption, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndRadioOption, "rnd-radio-option", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class RndRouteProgress {
    private router;
    protected loading: _angular_core.WritableSignal<boolean>;
    constructor();
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndRouteProgress, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndRouteProgress, "rnd-route-progress", never, {}, {}, never, never, true, never>;
}

declare class RndSearchInput {
    value: _angular_core.ModelSignal<string>;
    placeholder: _angular_core.InputSignal<string>;
    disabled: _angular_core.InputSignal<boolean>;
    protected onInput(event: Event): void;
    protected clear(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSearchInput, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSearchInput, "rnd-search-input", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

declare class RndSegmentedControl {
    activeValue: _angular_core.ModelSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSegmentedControl, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSegmentedControl, "rnd-segmented-control", never, { "activeValue": { "alias": "activeValue"; "required": false; "isSignal": true; }; }, { "activeValue": "activeValueChange"; }, never, ["*"], true, never>;
}

declare class RndSegmentedOption {
    value: _angular_core.InputSignal<string>;
    protected control: RndSegmentedControl;
    protected active: _angular_core.Signal<boolean>;
    protected classes: _angular_core.Signal<"rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-gradient-to-r from-secondary to-primary text-white" | "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-muted hover:text-foreground">;
    protected onClick(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSegmentedOption, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSegmentedOption, "rnd-segmented-option", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

interface RndSelectOption {
    label: string;
    value: string;
}
declare class RndSelect {
    options: _angular_core.InputSignal<RndSelectOption[]>;
    value: _angular_core.ModelSignal<string>;
    placeholder: _angular_core.InputSignal<string>;
    disabled: _angular_core.InputSignal<boolean>;
    invalid: _angular_core.InputSignal<boolean>;
    protected panelId: string;
    private trigger;
    private panel;
    protected selectedLabel: _angular_core.Signal<string>;
    protected containerClasses: _angular_core.Signal<string>;
    protected onToggle(event: Event): void;
    protected onReposition(): void;
    protected chooseOption(option: RndSelectOption): void;
    private reposition;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSelect, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSelect, "rnd-select", never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "invalid": { "alias": "invalid"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

type RndSheetSide = 'left' | 'right';
declare class RndSheet {
    open: _angular_core.ModelSignal<boolean>;
    side: _angular_core.InputSignal<RndSheetSide>;
    closeOnBackdropClick: _angular_core.InputSignal<boolean>;
    private dialog;
    protected dialogClasses: _angular_core.Signal<string>;
    constructor();
    protected onDialogClose(): void;
    protected onDialogClick(event: MouseEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSheet, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSheet, "rnd-sheet", never, { "open": { "alias": "open"; "required": false; "isSignal": true; }; "side": { "alias": "side"; "required": false; "isSignal": true; }; "closeOnBackdropClick": { "alias": "closeOnBackdropClick"; "required": false; "isSignal": true; }; }, { "open": "openChange"; }, never, ["[rndSheetHeader]", "*", "[rndSheetFooter]"], true, never>;
}

declare class RndSidebar {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSidebar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSidebar, "rnd-sidebar", never, {}, {}, never, ["*"], true, never>;
}

type RndSkeletonShape = 'text' | 'circle' | 'rect';
declare class RndSkeleton {
    shape: _angular_core.InputSignal<RndSkeletonShape>;
    width: _angular_core.InputSignal<string>;
    height: _angular_core.InputSignal<string>;
    protected classes: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSkeleton, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSkeleton, "rnd-skeleton", never, { "shape": { "alias": "shape"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class RndSlider {
    value: _angular_core.ModelSignal<number>;
    min: _angular_core.InputSignal<number>;
    max: _angular_core.InputSignal<number>;
    step: _angular_core.InputSignal<number>;
    protected fillPercent: _angular_core.Signal<number>;
    protected trackStyle: _angular_core.Signal<string>;
    protected onInput(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSlider, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSlider, "rnd-slider", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "step": { "alias": "step"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

type RndSparklineTrend = 'up' | 'down' | 'neutral';
declare class RndSparkline {
    data: _angular_core.InputSignal<number[]>;
    width: _angular_core.InputSignal<number>;
    height: _angular_core.InputSignal<number>;
    trend: _angular_core.InputSignal<RndSparklineTrend>;
    protected strokeClasses: _angular_core.Signal<string>;
    protected points: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSparkline, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSparkline, "rnd-sparkline", never, { "data": { "alias": "data"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; "trend": { "alias": "trend"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type RndSpinnerSize = 'sm' | 'md' | 'lg';
type RndSpinnerVariant = 'primary' | 'foreground' | 'muted';
declare class RndSpinner {
    size: _angular_core.InputSignal<RndSpinnerSize>;
    variant: _angular_core.InputSignal<RndSpinnerVariant>;
    protected classes: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSpinner, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSpinner, "rnd-spinner", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class RndSplitButton {
    label: _angular_core.InputSignal<string>;
    disabled: _angular_core.InputSignal<boolean>;
    action: _angular_core.OutputEmitterRef<void>;
    private trigger;
    private panel;
    protected onToggleClick(): void;
    protected onReposition(): void;
    private reposition;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSplitButton, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSplitButton, "rnd-split-button", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "action": "action"; }, never, ["*"], true, never>;
}

type RndStatCardTrend = 'up' | 'down' | 'neutral';
declare class RndStatCard {
    label: _angular_core.InputSignal<string>;
    value: _angular_core.InputSignal<string>;
    delta: _angular_core.InputSignal<number | undefined>;
    trend: _angular_core.InputSignal<RndStatCardTrend | undefined>;
    protected resolvedTrend: _angular_core.Signal<RndStatCardTrend>;
    protected deltaClasses: _angular_core.Signal<"text-muted" | "text-success" | "text-error">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndStatCard, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndStatCard, "rnd-stat-card", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "value": { "alias": "value"; "required": true; "isSignal": true; }; "delta": { "alias": "delta"; "required": false; "isSignal": true; }; "trend": { "alias": "trend"; "required": false; "isSignal": true; }; }, {}, never, ["[rndStatCardIcon]"], true, never>;
}

declare class RndSwitch {
    checked: _angular_core.ModelSignal<boolean>;
    disabled: _angular_core.InputSignal<boolean>;
    ariaLabel: _angular_core.InputSignal<string | undefined>;
    protected trackClasses: _angular_core.Signal<string>;
    protected thumbClasses: _angular_core.Signal<"translate-x-5 bg-white" | "translate-x-0.5 bg-white">;
    protected toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndSwitch, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndSwitch, "rnd-switch", never, { "checked": { "alias": "checked"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, { "checked": "checkedChange"; }, never, never, true, never>;
}

declare class RndTable {
    striped: _angular_core.InputSignal<boolean>;
    hoverable: _angular_core.InputSignal<boolean>;
    protected tableClasses: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTable, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTable, "rnd-table", never, { "striped": { "alias": "striped"; "required": false; "isSignal": true; }; "hoverable": { "alias": "hoverable"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

type RndTabsVariant = 'underline' | 'pills';
declare class RndTabs {
    activeValue: _angular_core.ModelSignal<string>;
    variant: _angular_core.InputSignal<RndTabsVariant>;
    protected containerClasses: _angular_core.Signal<"flex items-center gap-2" | "flex gap-6 border-b border-border">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTabs, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTabs, "rnd-tabs", never, { "activeValue": { "alias": "activeValue"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, { "activeValue": "activeValueChange"; }, never, ["*"], true, never>;
}

declare class RndTab {
    value: _angular_core.InputSignal<string>;
    protected tabs: RndTabs;
    protected active: _angular_core.Signal<boolean>;
    protected classes: _angular_core.Signal<"flex items-center gap-2 rounded-full px-4 py-1.5 font-body text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-gradient-to-r from-secondary to-primary text-white" | "flex items-center gap-2 rounded-full px-4 py-1.5 font-body text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-muted hover:text-foreground" | "relative flex items-center gap-2 px-1 pb-3 font-body text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground" | "relative flex items-center gap-2 px-1 pb-3 font-body text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-muted">;
    protected onClick(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTab, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTab, "rnd-tab", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class RndTagInput {
    tags: _angular_core.ModelSignal<string[]>;
    placeholder: _angular_core.InputSignal<string>;
    protected draft: _angular_core.WritableSignal<string>;
    protected onInput(event: Event): void;
    protected onKeydown(event: KeyboardEvent): void;
    protected removeTag(index: number): void;
    private addTag;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTagInput, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTagInput, "rnd-tag-input", never, { "tags": { "alias": "tags"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; }, { "tags": "tagsChange"; }, never, never, true, never>;
}

declare class RndTextarea {
    value: _angular_core.ModelSignal<string>;
    placeholder: _angular_core.InputSignal<string>;
    disabled: _angular_core.InputSignal<boolean>;
    invalid: _angular_core.InputSignal<boolean>;
    rows: _angular_core.InputSignal<number>;
    protected containerClasses: _angular_core.Signal<string>;
    protected onInput(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTextarea, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTextarea, "rnd-textarea", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "invalid": { "alias": "invalid"; "required": false; "isSignal": true; }; "rows": { "alias": "rows"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

interface RndTimeValue {
    hour: number;
    minute: number;
    period: 'AM' | 'PM';
}
declare class RndTimePicker {
    selected: _angular_core.ModelSignal<RndTimeValue | null>;
    protected draftHour: _angular_core.Signal<number>;
    protected draftMinute: _angular_core.Signal<number>;
    protected draftPeriod: _angular_core.Signal<"AM" | "PM">;
    protected onHourChange(hour: number): void;
    protected onMinuteChange(minute: number): void;
    protected onPeriodChange(period: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTimePicker, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTimePicker, "rnd-time-picker", never, { "selected": { "alias": "selected"; "required": false; "isSignal": true; }; }, { "selected": "selectedChange"; }, never, never, true, never>;
}

declare class RndTimeline {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTimeline, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTimeline, "rnd-timeline", never, {}, {}, never, ["*"], true, never>;
}

declare class RndTimelineItem {
    step: _angular_core.InputSignal<number>;
    title: _angular_core.InputSignal<string>;
    description: _angular_core.InputSignal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTimelineItem, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTimelineItem, "rnd-timeline-item", never, { "step": { "alias": "step"; "required": true; "isSignal": true; }; "title": { "alias": "title"; "required": true; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type RndToastVariant = 'info' | 'success' | 'warning' | 'error';
declare class RndToast {
    message: _angular_core.InputSignal<string>;
    variant: _angular_core.InputSignal<RndToastVariant>;
    dismiss: _angular_core.OutputEmitterRef<void>;
    protected classes: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndToast, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndToast, "rnd-toast", never, { "message": { "alias": "message"; "required": true; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, { "dismiss": "dismiss"; }, never, never, true, never>;
}

interface RndToastEntry {
    id: number;
    message: string;
    variant: RndToastVariant;
}
declare class RndToastService {
    private readonly toasts;
    readonly entries: _angular_core.Signal<RndToastEntry[]>;
    show(message: string, variant?: RndToastVariant, duration?: number): number;
    dismiss(id: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndToastService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<any>;
}

declare class RndToastOutlet {
    protected toastService: RndToastService;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndToastOutlet, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndToastOutlet, "rnd-toast-outlet", never, {}, {}, never, never, true, never>;
}

declare class RndToggle {
    pressed: _angular_core.ModelSignal<boolean>;
    disabled: _angular_core.InputSignal<boolean>;
    ariaLabel: _angular_core.InputSignal<string | undefined>;
    protected classes: _angular_core.Signal<"inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 border-primary bg-primary/15 text-primary" | "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 border-white/20 bg-transparent text-muted hover:bg-white/5 hover:text-foreground">;
    protected toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndToggle, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndToggle, "rnd-toggle", never, { "pressed": { "alias": "pressed"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, { "pressed": "pressedChange"; }, never, ["*"], true, never>;
}

type RndTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
declare class RndTooltip {
    text: _angular_core.InputSignal<string>;
    placement: _angular_core.InputSignal<RndTooltipPlacement>;
    protected tooltipClasses: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTooltip, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTooltip, "rnd-tooltip", never, { "text": { "alias": "text"; "required": true; "isSignal": true; }; "placement": { "alias": "placement"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

type RndTransactionDirection = 'in' | 'out';
type RndTransactionStatus = 'confirmed' | 'pending' | 'failed';
declare class RndTransactionItem {
    direction: _angular_core.InputSignal<RndTransactionDirection>;
    title: _angular_core.InputSignal<string>;
    amount: _angular_core.InputSignal<string>;
    status: _angular_core.InputSignal<RndTransactionStatus>;
    timestamp: _angular_core.InputSignal<string | undefined>;
    protected statusClasses: _angular_core.Signal<string>;
    protected iconWrapperClasses: _angular_core.Signal<"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/15 text-success" | "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-muted">;
    protected amountClasses: _angular_core.Signal<"text-foreground" | "text-success">;
    protected amountPrefix: _angular_core.Signal<"+" | "-">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RndTransactionItem, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RndTransactionItem, "rnd-transaction-item", never, { "direction": { "alias": "direction"; "required": true; "isSignal": true; }; "title": { "alias": "title"; "required": true; "isSignal": true; }; "amount": { "alias": "amount"; "required": true; "isSignal": true; }; "status": { "alias": "status"; "required": false; "isSignal": true; }; "timestamp": { "alias": "timestamp"; "required": false; "isSignal": true; }; }, {}, never, ["[rndTransactionItemIcon]"], true, never>;
}

export { RND_ICON_PATHS, RndAccordion, RndAccordionItem, RndAlert, RndAssetRow, RndAvatar, RndAvatarGroup, RndBadge, RndBreadcrumb, RndButton, RndCalendar, RndCard, RndCarousel, RndCarouselSlide, RndCheckbox, RndCollapsible, RndCombobox, RndCommandPalette, RndConfirmOutlet, RndConfirmService, RndContextMenu, RndCopyField, RndDatePicker, RndDivider, RndDropdownItem, RndDropdownMenu, RndEmptyState, RndFormField, RndHoverCard, RndIcon, RndInput, RndInputOtp, RndKbd, RndModal, RndNavbar, RndNumberStepper, RndPagination, RndPasswordInput, RndPopover, RndProgressBar, RndQrCode, RndRadialProgress, RndRadioGroup, RndRadioOption, RndRouteProgress, RndSearchInput, RndSegmentedControl, RndSegmentedOption, RndSelect, RndSheet, RndSidebar, RndSkeleton, RndSlider, RndSparkline, RndSpinner, RndSplitButton, RndStatCard, RndSwitch, RndTab, RndTable, RndTabs, RndTagInput, RndTextarea, RndTimePicker, RndTimeline, RndTimelineItem, RndToast, RndToastOutlet, RndToastService, RndToggle, RndTooltip, RndTransactionItem };
export type { RndAlertVariant, RndAssetRowTrend, RndAvatarSize, RndAvatarStatus, RndBadgeSize, RndBadgeVariant, RndBreadcrumbItem, RndButtonSize, RndButtonVariant, RndCardVariant, RndComboboxOption, RndCommandItem, RndConfirmOptions, RndConfirmRequest, RndDividerOrientation, RndIconMarkupSet, RndIconName, RndIconVariant, RndIconWeight, RndInputType, RndProgressBarSize, RndSelectOption, RndSheetSide, RndSkeletonShape, RndSparklineTrend, RndSpinnerSize, RndSpinnerVariant, RndStatCardTrend, RndTabsVariant, RndTimeValue, RndToastEntry, RndToastVariant, RndTooltipPlacement, RndTransactionDirection, RndTransactionStatus };
