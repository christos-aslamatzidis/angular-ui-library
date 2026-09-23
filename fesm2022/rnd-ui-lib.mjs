import * as i0 from '@angular/core';
import { model, input, computed, Component, inject, output, signal, contentChildren, DestroyRef, effect, viewChild, Injectable, ElementRef, viewChildren, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import QRCode from 'qrcode';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

class RndAccordion {
    expandedValues = model([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "expandedValues" }] : /* istanbul ignore next */ []));
    multiple = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "multiple" }] : /* istanbul ignore next */ []));
    flush = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "flush" }] : /* istanbul ignore next */ []));
    containerClasses = computed(() => this.flush()
        ? 'flex flex-col divide-y divide-border'
        : 'flex flex-col divide-y divide-border rounded-xl border border-border', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "containerClasses" }] : /* istanbul ignore next */ []));
    toggle(value) {
        const current = this.expandedValues();
        if (current.includes(value)) {
            this.expandedValues.set(current.filter((v) => v !== value));
            return;
        }
        this.expandedValues.set(this.multiple() ? [...current, value] : [value]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAccordion, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndAccordion, isStandalone: true, selector: "rnd-accordion", inputs: { expandedValues: { classPropertyName: "expandedValues", publicName: "expandedValues", isSignal: true, isRequired: false, transformFunction: null }, multiple: { classPropertyName: "multiple", publicName: "multiple", isSignal: true, isRequired: false, transformFunction: null }, flush: { classPropertyName: "flush", publicName: "flush", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { expandedValues: "expandedValuesChange" }, ngImport: i0, template: "<div [class]=\"containerClasses()\">\n  <ng-content />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAccordion, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-accordion', template: "<div [class]=\"containerClasses()\">\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { expandedValues: [{ type: i0.Input, args: [{ isSignal: true, alias: "expandedValues", required: false }] }, { type: i0.Output, args: ["expandedValuesChange"] }], multiple: [{ type: i0.Input, args: [{ isSignal: true, alias: "multiple", required: false }] }], flush: [{ type: i0.Input, args: [{ isSignal: true, alias: "flush", required: false }] }] } });

/**
 * Most icons here are pure line glyphs (chevrons, arrows, plus/minus, ...). For those, "solid"
 * means the same path rendered with a bolder stroke (not a filled silhouette — accurately
 * converting a stroked path into a filled region needs a vector tool, not hand-authored `d`
 * data), and "duotone" is the same stroke drawn twice: a soft wide low-opacity pass behind a
 * crisp normal pass, using currentColor at two opacities. Icons with a natural closed silhouette
 * (circles, badges, envelopes, ...) get genuinely distinct filled solid/duotone markup instead —
 * those are authored directly per icon rather than through this helper.
 */
function lineIcon(paths) {
    const outline = paths
        .map((d) => `<path d="${d}" stroke-linecap="round" stroke-linejoin="round" />`)
        .join('');
    const solid = paths
        .map((d) => `<path d="${d}" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" />`)
        .join('');
    const duotone = paths
        .map((d) => `<path d="${d}" stroke-width="5" stroke-opacity="0.3" stroke-linecap="round" stroke-linejoin="round" />` +
        `<path d="${d}" stroke-linecap="round" stroke-linejoin="round" />`)
        .join('');
    return { outline, solid, duotone };
}
const RND_ICON_PATHS = {
    // Nav / direction
    'chevron-up': lineIcon(['m18 15-6-6-6 6']),
    'chevron-down': lineIcon(['m6 9 6 6 6-6']),
    'chevron-left': lineIcon(['m15 18-6-6 6-6']),
    'chevron-right': lineIcon(['m9 18 6-6-6-6']),
    'arrow-up': lineIcon(['M12 19V5', 'm5 12 7-7 7 7']),
    'arrow-down': lineIcon(['M12 5v14', 'm19 12-7 7-7-7']),
    'arrow-left': lineIcon(['M19 12H5', 'm12 19-7-7 7-7']),
    'arrow-right': lineIcon(['M5 12h14', 'm12 5 7 7-7 7']),
    'arrow-up-right': lineIcon(['M7 17 17 7', 'M7 7h10v10']),
    'external-link': lineIcon([
        'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
        'M15 3h6v6',
        'M10 14 21 3',
    ]),
    'log-out': lineIcon(['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'm16 17 5-5-5-5', 'M21 12H9']),
    // Actions
    close: lineIcon(['M18 6 6 18M6 6l12 12']),
    check: lineIcon(['M20 6 9 17l-5-5']),
    plus: lineIcon(['M12 5v14M5 12h14']),
    minus: lineIcon(['M5 12h14']),
    'plus-circle': {
        outline: '<circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" stroke-linecap="round" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M12 8v8M8 12h8" style="stroke: var(--color-background)" stroke-linecap="round" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 8v8M8 12h8" stroke-linecap="round" />',
    },
    'minus-circle': {
        outline: '<circle cx="12" cy="12" r="9" /><path d="M8 12h8" stroke-linecap="round" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M8 12h8" style="stroke: var(--color-background)" stroke-linecap="round" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M8 12h8" stroke-linecap="round" />',
    },
    trash: lineIcon([
        'M3 6h18',
        'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
        'm19 6-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',
    ]),
    edit: lineIcon(['M12 20h9', 'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z']),
    copy: {
        outline: '<rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />',
        solid: '<rect x="9" y="9" width="13" height="13" rx="2" fill="currentColor" stroke="none" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="currentColor" stroke="none" />',
        duotone: '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="currentColor" fill-opacity="0.3" stroke="none" /><rect x="9" y="9" width="13" height="13" rx="2" fill="currentColor" stroke="none" />',
    },
    save: lineIcon([
        'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z',
        'M17 21v-8H7v8',
        'M7 3v5h8',
    ]),
    refresh: lineIcon([
        'M23 4v6h-6',
        'M1 20v-6h6',
        'M3.51 9a9 9 0 0 1 14.85-3.36L23 10',
        'M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    ]),
    undo: lineIcon(['M1 4v6h6', 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10']),
    redo: lineIcon(['M23 4v6h-6', 'M20.49 15a9 9 0 1 1-2.12-9.36L23 10']),
    search: {
        outline: '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" stroke-linecap="round" />',
        solid: '<circle cx="11" cy="11" r="8" fill="currentColor" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" />',
        duotone: '<circle cx="11" cy="11" r="8" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><circle cx="11" cy="11" r="8" fill="none" />',
    },
    filter: lineIcon(['M22 3H2l8 9.46V19l4 2v-8.54L22 3Z']),
    sort: lineIcon(['M3 6h18', 'M6 12h12', 'M10 18h4']),
    share: lineIcon(['M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7', 'm16 6-4-4-4 4', 'M12 2v13']),
    download: lineIcon(['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3']),
    upload: lineIcon(['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm17 8-5-5-5 5', 'M12 3v12']),
    print: lineIcon([
        'M6 9V2h12v7',
        'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2',
        'M6 14h12v8H6z',
    ]),
    // Toggles / visibility
    eye: {
        outline: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />',
        solid: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="3" style="fill: var(--color-background)" stroke="none" />',
        duotone: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />',
    },
    'eye-off': {
        outline: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /><path d="M3 3l18 18" stroke-linecap="round" />',
        solid: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="3" style="fill: var(--color-background)" stroke="none" /><path d="M3 3l18 18" style="stroke: var(--color-background)" stroke-width="2.5" stroke-linecap="round" />',
        duotone: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /><path d="M3 3l18 18" stroke="currentColor" stroke-linecap="round" />',
    },
    star: lineIcon([
        'm12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z',
    ]),
    heart: lineIcon([
        'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z',
    ]),
    bookmark: lineIcon(['M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z']),
    pin: lineIcon(['M12 17v5', 'M9 3h6l-1 7 4 3H8l4-3-1-7Z']),
    lock: {
        outline: '<rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />',
        solid: '<rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" stroke="none" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />',
        duotone: '<rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />',
    },
    unlock: {
        outline: '<rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" stroke-linecap="round" />',
        solid: '<rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" stroke="none" /><path d="M7 11V7a5 5 0 0 1 9.9-1" stroke-linecap="round" />',
        duotone: '<rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M7 11V7a5 5 0 0 1 9.9-1" stroke-linecap="round" />',
    },
    // Status / communication
    bell: lineIcon(['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M13.73 21a2 2 0 0 1-3.46 0']),
    mail: {
        outline: '<rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />',
        solid: '<rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" stroke="none" /><path d="m22 6-10 7L2 6" style="stroke: var(--color-background)" />',
        duotone: '<rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m22 6-10 7L2 6" />',
    },
    info: {
        outline: '<circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" stroke-linecap="round" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M12 16v-4M12 8h.01" style="stroke: var(--color-background)" stroke-linecap="round" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 16v-4M12 8h.01" stroke-linecap="round" />',
    },
    'alert-triangle': lineIcon([
        'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z',
        'M12 9v4',
        'M12 17h.01',
    ]),
    'alert-circle': {
        outline: '<circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" stroke-linecap="round" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M12 8v4M12 16h.01" style="stroke: var(--color-background)" stroke-linecap="round" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 8v4M12 16h.01" stroke-linecap="round" />',
    },
    'check-circle': {
        outline: '<circle cx="12" cy="12" r="9" /><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="m9 12 2 2 4-4" style="stroke: var(--color-background)" stroke-linecap="round" stroke-linejoin="round" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />',
    },
    'x-circle': {
        outline: '<circle cx="12" cy="12" r="9" /><path d="m15 9-6 6M9 9l6 6" stroke-linecap="round" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="m15 9-6 6M9 9l6 6" style="stroke: var(--color-background)" stroke-linecap="round" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m15 9-6 6M9 9l6 6" stroke-linecap="round" />',
    },
    'help-circle': {
        outline: '<circle cx="12" cy="12" r="9" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4M12 17h.01" stroke-linecap="round" stroke-linejoin="round" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4M12 17h.01" style="stroke: var(--color-background)" stroke-linecap="round" stroke-linejoin="round" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4M12 17h.01" stroke-linecap="round" stroke-linejoin="round" />',
    },
    // Objects
    calendar: {
        outline: '<rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round" />',
        solid: '<rect x="3" y="4" width="18" height="18" rx="2" fill="currentColor" stroke="none" /><path d="M16 2v4M8 2v4" stroke-linecap="round" /><path d="M3 10h18" style="stroke: var(--color-background)" />',
        duotone: '<rect x="3" y="4" width="18" height="18" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round" />',
    },
    clock: {
        outline: '<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" stroke-linecap="round" stroke-linejoin="round" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M12 7v5l3 3" style="stroke: var(--color-background)" stroke-linecap="round" stroke-linejoin="round" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 7v5l3 3" stroke-linecap="round" stroke-linejoin="round" />',
    },
    folder: lineIcon(['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z']),
    file: lineIcon(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z', 'M14 2v6h6']),
    image: {
        outline: '<rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />',
        solid: '<rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" stroke="none" /><circle cx="8.5" cy="8.5" r="1.5" style="fill: var(--color-background)" stroke="none" /><path d="m21 15-5-5L5 21" style="fill: var(--color-background)" stroke="none" />',
        duotone: '<rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" /><path d="m21 15-5-5L5 21" />',
    },
    link: lineIcon([
        'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
        'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
    ]),
    tag: lineIcon([
        'M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2.59 12.6a1 1 0 0 1-.29-.7V4a2 2 0 0 1 2-2h7.9a1 1 0 0 1 .7.29l7.7 7.7a2 2 0 0 1 0 2.83Z',
        'M7 7h.01',
    ]),
    flag: lineIcon(['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z', 'M4 22V3']),
    home: lineIcon(['m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z', 'M9 22V12h6v10']),
    settings: {
        outline: '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /><circle cx="12" cy="12" r="3" />',
        solid: '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="3" style="fill: var(--color-background)" stroke="none" />',
        duotone: '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />',
    },
    user: {
        outline: '<circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" stroke-linecap="round" />',
        solid: '<circle cx="12" cy="8" r="4" fill="currentColor" stroke="none" /><path d="M20 21a8 8 0 1 0-16 0" fill="currentColor" stroke="none" />',
        duotone: '<path d="M20 21a8 8 0 1 0-16 0" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="8" r="4" fill="currentColor" stroke="none" />',
    },
    users: {
        outline: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-linecap="round" />',
        solid: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="currentColor" stroke="none" /><circle cx="9" cy="7" r="4" fill="currentColor" stroke="none" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-linecap="round" />',
        duotone: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="9" cy="7" r="4" fill="currentColor" stroke="none" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-linecap="round" />',
    },
    globe: {
        outline: '<circle cx="12" cy="12" r="9" /><path d="M2 12h20M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M2 12h20M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" style="stroke: var(--color-background)" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M2 12h20M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" />',
    },
    menu: lineIcon(['M4 6h16M4 12h16M4 18h16']),
    'more-horizontal': {
        outline: '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />',
        solid: '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />',
        duotone: '<circle cx="5" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="19" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />',
    },
    'more-vertical': {
        outline: '<circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />',
        solid: '<circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />',
        duotone: '<circle cx="12" cy="5" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="19" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />',
    },
    grid: {
        outline: '<rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />',
        solid: '<rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" stroke="none" /><rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" stroke="none" />',
        duotone: '<rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" fill-opacity="0.3" stroke="none" /><rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" fill-opacity="0.3" stroke="none" /><rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" stroke="none" /><rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" stroke="none" />',
    },
    list: lineIcon(['M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01']),
    // Commerce
    cart: {
        outline: '<circle cx="9" cy="21" r="1.3" fill="currentColor" stroke="none" /><circle cx="20" cy="21" r="1.3" fill="currentColor" stroke="none" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-linecap="round" stroke-linejoin="round" />',
        solid: '<circle cx="9" cy="21" r="1.3" fill="currentColor" stroke="none" /><circle cx="20" cy="21" r="1.3" fill="currentColor" stroke="none" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" />',
        duotone: '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-width="5" stroke-opacity="0.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-linecap="round" stroke-linejoin="round" /><circle cx="9" cy="21" r="1.3" fill="currentColor" stroke="none" /><circle cx="20" cy="21" r="1.3" fill="currentColor" stroke="none" />',
    },
    bag: {
        outline: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" stroke-linecap="round" /><path d="M16 10a4 4 0 0 1-8 0" stroke-linecap="round" />',
        solid: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" fill="currentColor" stroke="none" /><path d="M3 6h18" style="stroke: var(--color-background)" /><path d="M16 10a4 4 0 0 1-8 0" style="stroke: var(--color-background)" stroke-linecap="round" />',
        duotone: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M3 6h18" stroke-linecap="round" /><path d="M16 10a4 4 0 0 1-8 0" stroke-linecap="round" />',
    },
    receipt: lineIcon([
        'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z',
        'M8 7h8',
        'M8 11h8',
        'M8 15h5',
    ]),
    'credit-card': {
        outline: '<rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" stroke-linecap="round" /><path d="M6 15h4" stroke-linecap="round" />',
        solid: '<rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" stroke="none" /><path d="M2 10h20" style="stroke: var(--color-background)" /><path d="M6 15h4" style="stroke: var(--color-background)" stroke-linecap="round" />',
        duotone: '<rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M2 10h20" stroke-linecap="round" /><path d="M6 15h4" stroke-linecap="round" />',
    },
    'dollar-sign': lineIcon(['M12 1v22', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6']),
    percent: {
        outline: '<path d="M19 5 5 19" stroke-linecap="round" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />',
        solid: '<path d="M19 5 5 19" stroke-linecap="round" /><circle cx="6.5" cy="6.5" r="2.5" fill="currentColor" stroke="none" /><circle cx="17.5" cy="17.5" r="2.5" fill="currentColor" stroke="none" />',
        duotone: '<path d="M19 5 5 19" stroke-linecap="round" /><circle cx="6.5" cy="6.5" r="2.5" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="17.5" cy="17.5" r="2.5" fill="currentColor" fill-opacity="0.3" stroke="none" />',
    },
    gift: lineIcon([
        'M20 12v10H4V12',
        'M2 7h20v5H2z',
        'M12 22V7',
        'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Z',
        'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z',
    ]),
    // Charts / stats
    'trending-up': lineIcon(['M23 6 13.5 15.5 8.5 10.5 1 18', 'M17 6h6v6']),
    'trending-down': lineIcon(['M23 18 13.5 8.5 8.5 13.5 1 6', 'M17 18h6v-6']),
    'bar-chart': lineIcon(['M12 20V10', 'M18 20V4', 'M6 20v-4']),
    'pie-chart': lineIcon(['M21.21 15.89A10 10 0 1 1 8 2.83', 'M22 12A10 10 0 0 0 12 2v10z']),
    activity: lineIcon(['M22 12h-4l-3 9L9 3l-3 9H2']),
    // Location
    map: lineIcon(['M1 6v16l7-4 8 4 7-4V2l-7 4-8-4Z', 'M8 2v16', 'M16 6v16']),
    'map-pin': {
        outline: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" />',
        solid: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" fill="currentColor" stroke="none" /><circle cx="12" cy="10" r="3" style="fill: var(--color-background)" stroke="none" />',
        duotone: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="10" r="3" fill="currentColor" stroke="none" />',
    },
    navigation: lineIcon(['M3 11 22 2l-9 19-2-8-8-2Z']),
    compass: {
        outline: '<circle cx="12" cy="12" r="9" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" style="fill: var(--color-background)" stroke="none" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" fill="currentColor" stroke="none" />',
    },
    // Communication
    'message-circle': {
        outline: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke-linecap="round" stroke-linejoin="round" />',
        solid: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" fill="currentColor" stroke="none" />',
        duotone: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke-linecap="round" stroke-linejoin="round" />',
    },
    'message-square': lineIcon(['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z']),
    send: lineIcon(['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13']),
    phone: lineIcon([
        'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z',
    ]),
    'at-sign': {
        outline: '<circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" stroke-linecap="round" />',
        solid: '<circle cx="12" cy="12" r="4" stroke-width="2.75" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" stroke-width="2.75" stroke-linecap="round" />',
        duotone: '<circle cx="12" cy="12" r="4" stroke-width="5" stroke-opacity="0.3" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" stroke-width="5" stroke-opacity="0.3" stroke-linecap="round" /><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" stroke-linecap="round" />',
    },
    // Media / device
    camera: {
        outline: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" /><circle cx="12" cy="13" r="4" />',
        solid: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" fill="currentColor" stroke="none" /><circle cx="12" cy="13" r="4" style="fill: var(--color-background)" stroke="none" />',
        duotone: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="13" r="4" fill="currentColor" stroke="none" />',
    },
    mic: {
        outline: '<rect x="9" y="2" width="6" height="12" rx="3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke-linecap="round" /><path d="M12 19v3M8 22h8" stroke-linecap="round" />',
        solid: '<rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" stroke="none" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke-linecap="round" /><path d="M12 19v3M8 22h8" stroke-linecap="round" />',
        duotone: '<rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke-linecap="round" /><path d="M12 19v3M8 22h8" stroke-linecap="round" />',
    },
    'mic-off': lineIcon([
        'M9 9v3a3 3 0 0 0 5.12 2.12',
        'M15 9.34V4a3 3 0 0 0-5.94-.6',
        'M17 16.95A7 7 0 0 1 5 12v-2',
        'M19 12v-2',
        'M12 19v3M8 22h8',
        'M2 2l20 20',
    ]),
    volume: lineIcon([
        'M11 5 6 9H2v6h4l5 4Z',
        'M15.54 8.46a5 5 0 0 1 0 7.07',
        'M19.07 4.93a10 10 0 0 1 0 14.14',
    ]),
    'volume-x': lineIcon(['M11 5 6 9H2v6h4l5 4Z', 'M23 9l-6 6', 'M17 9l6 6']),
    video: lineIcon([
        'm23 7-7 5 7 5V7Z',
        'M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z',
    ]),
    wifi: lineIcon([
        'M5 13a10 10 0 0 1 14 0',
        'M8.5 16.5a5 5 0 0 1 7 0',
        'M2 8.82a15 15 0 0 1 20 0',
        'M12 20h.01',
    ]),
    // Files / data
    paperclip: lineIcon([
        'M21.44 11.05 12.25 20.24a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95L9.64 16.9a1.5 1.5 0 0 1-2.12-2.12l8.49-8.49',
    ]),
    inbox: lineIcon([
        'M22 12h-6l-2 3h-4l-2-3H2',
        'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z',
    ]),
    archive: lineIcon(['M21 8H3', 'M21 8v13H3V8', 'M1 3h22v5H1z', 'M10 12h4']),
    cloud: lineIcon(['M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z']),
    database: {
        outline: '<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />',
        solid: '<ellipse cx="12" cy="5" rx="9" ry="3" fill="currentColor" stroke="none" /><path d="M3 5v14a9 3 0 0 0 18 0V5" stroke-width="2.75" /><path d="M3 12a9 3 0 0 0 18 0" stroke-width="2.75" />',
        duotone: '<ellipse cx="12" cy="5" rx="9" ry="3" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />',
    },
    server: lineIcon(['M2 3h20v6H2z', 'M2 15h20v6H2z', 'M6 6h.01', 'M6 18h.01']),
    code: lineIcon(['m16 18 6-6-6-6', 'm8 6-6 6 6 6']),
    // Layout / interaction
    layers: lineIcon(['M12 2 2 7l10 5 10-5Z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5']),
    sliders: lineIcon([
        'M4 21v-7',
        'M4 10V3',
        'M12 21v-9',
        'M12 8V3',
        'M20 21v-5',
        'M20 12V3',
        'M1 14h6',
        'M9 8h6',
        'M17 16h6',
    ]),
    maximize: lineIcon([
        'M8 3H5a2 2 0 0 0-2 2v3',
        'M21 8V5a2 2 0 0 0-2-2h-3',
        'M3 16v3a2 2 0 0 0 2 2h3',
        'M16 21h3a2 2 0 0 0 2-2v-3',
    ]),
    minimize: lineIcon([
        'M8 3v3a2 2 0 0 1-2 2H3',
        'M21 8h-3a2 2 0 0 1-2-2V3',
        'M3 16h3a2 2 0 0 1 2 2v3',
        'M16 21v-3a2 2 0 0 1 2-2h3',
    ]),
    move: lineIcon([
        'M5 9 2 12l3 3',
        'M9 5l3-3 3 3',
        'M15 19l-3 3-3-3',
        'M19 9l3 3-3 3',
        'M2 12h20',
        'M12 2v20',
    ]),
    'grip-vertical': {
        outline: '<circle cx="9" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="19" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="19" r="1.5" fill="currentColor" stroke="none" />',
        solid: '<circle cx="9" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="19" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="19" r="1.5" fill="currentColor" stroke="none" />',
        duotone: '<circle cx="9" cy="5" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="9" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="9" cy="19" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="15" cy="5" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="15" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="15" cy="19" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="9" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="19" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="19" r="1.5" fill="currentColor" stroke="none" />',
    },
    // Status / security
    shield: {
        outline: '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" />',
        solid: '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" fill="currentColor" stroke="none" />',
        duotone: '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" />',
    },
    'shield-check': {
        outline: '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" /><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />',
        solid: '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" fill="currentColor" stroke="none" /><path d="m9 12 2 2 4-4" style="stroke: var(--color-background)" stroke-linecap="round" stroke-linejoin="round" />',
        duotone: '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />',
    },
    key: {
        outline: '<circle cx="8" cy="16" r="5" /><path d="M11.5 12.5 21 3" stroke-linecap="round" /><path d="M15 8l3 3M18 5l3 3" stroke-linecap="round" />',
        solid: '<circle cx="8" cy="16" r="5" fill="currentColor" stroke="none" /><path d="M11.5 12.5 21 3" stroke-linecap="round" /><path d="M15 8l3 3M18 5l3 3" stroke-linecap="round" />',
        duotone: '<circle cx="8" cy="16" r="5" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M11.5 12.5 21 3" stroke-linecap="round" /><path d="M15 8l3 3M18 5l3 3" stroke-linecap="round" />',
    },
    circle: {
        outline: '<circle cx="12" cy="12" r="9" />',
        solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />',
        duotone: '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="9" fill="none" />',
    },
    'thumbs-up': lineIcon([
        'M7 10v12',
        'M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z',
    ]),
    'thumbs-down': lineIcon([
        'M17 14V2',
        'M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z',
    ]),
    // Misc
    hash: lineIcon(['M4 9h16', 'M4 15h16', 'M10 3 8 21', 'M16 3 14 21']),
    'zoom-in': {
        outline: '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M11 8v6M8 11h6" stroke-linecap="round" />',
        solid: '<circle cx="11" cy="11" r="8" fill="currentColor" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M11 8v6M8 11h6" style="stroke: var(--color-background)" stroke-linecap="round" />',
        duotone: '<circle cx="11" cy="11" r="8" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M11 8v6M8 11h6" stroke-linecap="round" />',
    },
    'zoom-out': {
        outline: '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M8 11h6" stroke-linecap="round" />',
        solid: '<circle cx="11" cy="11" r="8" fill="currentColor" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M8 11h6" style="stroke: var(--color-background)" stroke-linecap="round" />',
        duotone: '<circle cx="11" cy="11" r="8" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M8 11h6" stroke-linecap="round" />',
    },
};

const VARIANT_CLASSES$6 = {
    inherit: '',
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    foreground: 'text-foreground',
    muted: 'text-muted',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
};
class RndIcon {
    sanitizer = inject(DomSanitizer);
    name = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    weight = input('outline', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "weight" }] : /* istanbul ignore next */ []));
    variant = input('inherit', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    size = input(20, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    classes = computed(() => ['inline-block shrink-0', VARIANT_CLASSES$6[this.variant()]].join(' ').trim(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    markup = computed(() => {
        const entry = RND_ICON_PATHS[this.name()];
        const size = this.size();
        const svg = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${entry[this.weight()]}</svg>`;
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "markup" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndIcon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndIcon, isStandalone: true, selector: "rnd-icon", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, weight: { classPropertyName: "weight", publicName: "weight", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<span [class]=\"classes()\" [innerHTML]=\"markup()\"></span>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndIcon, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-icon', template: "<span [class]=\"classes()\" [innerHTML]=\"markup()\"></span>\n" }]
        }], propDecorators: { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }], weight: [{ type: i0.Input, args: [{ isSignal: true, alias: "weight", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

class RndAccordionItem {
    value = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    accordion = inject(RndAccordion);
    expanded = computed(() => this.accordion.expandedValues().includes(this.value()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "expanded" }] : /* istanbul ignore next */ []));
    onToggle() {
        this.accordion.toggle(this.value());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAccordionItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndAccordionItem, isStandalone: true, selector: "rnd-accordion-item", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div>\n  <button\n    type=\"button\"\n    class=\"flex w-full items-center justify-between px-4 py-3 text-left font-body text-sm font-medium text-foreground transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    [attr.aria-expanded]=\"expanded()\"\n    (click)=\"onToggle()\"\n  >\n    {{ label() }}\n    <rnd-icon\n      name=\"chevron-down\"\n      [size]=\"16\"\n      class=\"shrink-0 text-muted transition-transform duration-300\"\n      [class.rotate-180]=\"expanded()\"\n    />\n  </button>\n  @if (expanded()) {\n    <div class=\"px-4 pb-4 text-sm text-muted\">\n      <ng-content />\n    </div>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAccordionItem, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-accordion-item', template: "<div>\n  <button\n    type=\"button\"\n    class=\"flex w-full items-center justify-between px-4 py-3 text-left font-body text-sm font-medium text-foreground transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    [attr.aria-expanded]=\"expanded()\"\n    (click)=\"onToggle()\"\n  >\n    {{ label() }}\n    <rnd-icon\n      name=\"chevron-down\"\n      [size]=\"16\"\n      class=\"shrink-0 text-muted transition-transform duration-300\"\n      [class.rotate-180]=\"expanded()\"\n    />\n  </button>\n  @if (expanded()) {\n    <div class=\"px-4 pb-4 text-sm text-muted\">\n      <ng-content />\n    </div>\n  }\n</div>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }] } });

const BASE_CLASSES$e = 'flex gap-3 rounded-xl border-l-4 p-4';
const VARIANT_CLASSES$5 = {
    info: 'border-info bg-info/10 text-info',
    success: 'border-success bg-success/10 text-success',
    warning: 'border-warning bg-warning/10 text-warning',
    error: 'border-error bg-error/10 text-error',
};
class RndAlert {
    variant = input('info', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    dismissible = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dismissible" }] : /* istanbul ignore next */ []));
    dismiss = output();
    classes = computed(() => [BASE_CLASSES$e, VARIANT_CLASSES$5[this.variant()]].join(' '), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAlert, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndAlert, isStandalone: true, selector: "rnd-alert", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, dismissible: { classPropertyName: "dismissible", publicName: "dismissible", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { dismiss: "dismiss" }, ngImport: i0, template: "<div [class]=\"classes()\" role=\"alert\">\n  <ng-content select=\"[rndAlertIcon]\" />\n  <div class=\"flex-1 font-body text-sm text-foreground\">\n    <ng-content />\n  </div>\n  @if (dismissible()) {\n    <button\n      type=\"button\"\n      class=\"shrink-0 rounded-full p-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n      aria-label=\"Dismiss\"\n      (click)=\"dismiss.emit()\"\n    >\n      <rnd-icon name=\"close\" [size]=\"14\" />\n    </button>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAlert, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-alert', template: "<div [class]=\"classes()\" role=\"alert\">\n  <ng-content select=\"[rndAlertIcon]\" />\n  <div class=\"flex-1 font-body text-sm text-foreground\">\n    <ng-content />\n  </div>\n  @if (dismissible()) {\n    <button\n      type=\"button\"\n      class=\"shrink-0 rounded-full p-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n      aria-label=\"Dismiss\"\n      (click)=\"dismiss.emit()\"\n    >\n      <rnd-icon name=\"close\" [size]=\"14\" />\n    </button>\n  }\n</div>\n" }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], dismissible: [{ type: i0.Input, args: [{ isSignal: true, alias: "dismissible", required: false }] }], dismiss: [{ type: i0.Output, args: ["dismiss"] }] } });

class RndAssetRow {
    name = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    symbol = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "symbol" }] : /* istanbul ignore next */ []));
    balance = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "balance" }] : /* istanbul ignore next */ []));
    value = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "value" }] : /* istanbul ignore next */ []));
    delta = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "delta" }] : /* istanbul ignore next */ []));
    trend = computed(() => {
        const delta = this.delta();
        if (delta === undefined || delta === 0) {
            return 'neutral';
        }
        return delta > 0 ? 'up' : 'down';
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trend" }] : /* istanbul ignore next */ []));
    deltaClasses = computed(() => {
        const trend = this.trend();
        if (trend === 'up') {
            return 'text-success';
        }
        if (trend === 'down') {
            return 'text-error';
        }
        return 'text-muted';
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "deltaClasses" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAssetRow, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndAssetRow, isStandalone: true, selector: "rnd-asset-row", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, symbol: { classPropertyName: "symbol", publicName: "symbol", isSignal: true, isRequired: true, transformFunction: null }, balance: { classPropertyName: "balance", publicName: "balance", isSignal: true, isRequired: true, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, delta: { classPropertyName: "delta", publicName: "delta", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5\">\n  <ng-content select=\"[rndAssetRowIcon]\" />\n  <div class=\"flex flex-1 flex-col\">\n    <span class=\"font-body text-sm font-medium text-foreground\">{{ name() }}</span>\n    <span class=\"font-mono text-xs text-muted uppercase\">{{ symbol() }}</span>\n  </div>\n  <div class=\"flex flex-col items-end\">\n    <span class=\"font-body text-sm font-medium text-foreground\">{{ balance() }}</span>\n    <div class=\"flex items-center gap-1.5 text-xs\">\n      @if (value()) {\n        <span class=\"text-muted\">{{ value() }}</span>\n      }\n      @if (delta() !== undefined) {\n        <span [class]=\"deltaClasses()\">{{ delta() }}%</span>\n      }\n    </div>\n  </div>\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAssetRow, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-asset-row', template: "<div class=\"flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5\">\n  <ng-content select=\"[rndAssetRowIcon]\" />\n  <div class=\"flex flex-1 flex-col\">\n    <span class=\"font-body text-sm font-medium text-foreground\">{{ name() }}</span>\n    <span class=\"font-mono text-xs text-muted uppercase\">{{ symbol() }}</span>\n  </div>\n  <div class=\"flex flex-col items-end\">\n    <span class=\"font-body text-sm font-medium text-foreground\">{{ balance() }}</span>\n    <div class=\"flex items-center gap-1.5 text-xs\">\n      @if (value()) {\n        <span class=\"text-muted\">{{ value() }}</span>\n      }\n      @if (delta() !== undefined) {\n        <span [class]=\"deltaClasses()\">{{ delta() }}%</span>\n      }\n    </div>\n  </div>\n</div>\n" }]
        }], propDecorators: { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }], symbol: [{ type: i0.Input, args: [{ isSignal: true, alias: "symbol", required: true }] }], balance: [{ type: i0.Input, args: [{ isSignal: true, alias: "balance", required: true }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], delta: [{ type: i0.Input, args: [{ isSignal: true, alias: "delta", required: false }] }] } });

const BASE_CLASSES$d = 'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface font-heading font-medium text-foreground';
const SIZE_CLASSES$3 = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-20 w-20 text-2xl',
};
const STATUS_DOT_SIZE_CLASSES = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5',
};
const STATUS_COLOR_CLASSES = {
    online: 'bg-success',
    offline: 'bg-muted',
    away: 'bg-warning',
};
class RndAvatar {
    src = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "src" }] : /* istanbul ignore next */ []));
    initials = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "initials" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    status = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "status" }] : /* istanbul ignore next */ []));
    imageFailed = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "imageFailed" }] : /* istanbul ignore next */ []));
    classes = computed(() => [BASE_CLASSES$d, SIZE_CLASSES$3[this.size()]].join(' '), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    statusClasses = computed(() => {
        const status = this.status();
        if (!status) {
            return '';
        }
        return [
            'absolute right-0 bottom-0 rounded-full border-2 border-background',
            STATUS_DOT_SIZE_CLASSES[this.size()],
            STATUS_COLOR_CLASSES[status],
        ].join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "statusClasses" }] : /* istanbul ignore next */ []));
    onImageError() {
        this.imageFailed.set(true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAvatar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndAvatar, isStandalone: true, selector: "rnd-avatar", inputs: { src: { classPropertyName: "src", publicName: "src", isSignal: true, isRequired: false, transformFunction: null }, initials: { classPropertyName: "initials", publicName: "initials", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, status: { classPropertyName: "status", publicName: "status", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<span [class]=\"classes()\">\n  @if (src() && !imageFailed()) {\n    <img [src]=\"src()\" alt=\"\" class=\"h-full w-full object-cover\" (error)=\"onImageError()\" />\n  } @else {\n    <span>{{ initials() }}</span>\n  }\n  @if (status()) {\n    <span [class]=\"statusClasses()\"></span>\n  }\n</span>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAvatar, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-avatar', template: "<span [class]=\"classes()\">\n  @if (src() && !imageFailed()) {\n    <img [src]=\"src()\" alt=\"\" class=\"h-full w-full object-cover\" (error)=\"onImageError()\" />\n  } @else {\n    <span>{{ initials() }}</span>\n  }\n  @if (status()) {\n    <span [class]=\"statusClasses()\"></span>\n  }\n</span>\n" }]
        }], propDecorators: { src: [{ type: i0.Input, args: [{ isSignal: true, alias: "src", required: false }] }], initials: [{ type: i0.Input, args: [{ isSignal: true, alias: "initials", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: false }] }] } });

class RndAvatarGroup {
    overflowCount = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "overflowCount" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAvatarGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndAvatarGroup, isStandalone: true, selector: "rnd-avatar-group", inputs: { overflowCount: { classPropertyName: "overflowCount", publicName: "overflowCount", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"flex -space-x-3\">\n  <ng-content />\n  @if (overflowCount() > 0) {\n    <span\n      class=\"relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-surface font-heading text-xs font-medium text-muted\"\n    >\n      +{{ overflowCount() }}\n    </span>\n  }\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndAvatarGroup, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-avatar-group', template: "<div class=\"flex -space-x-3\">\n  <ng-content />\n  @if (overflowCount() > 0) {\n    <span\n      class=\"relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-surface font-heading text-xs font-medium text-muted\"\n    >\n      +{{ overflowCount() }}\n    </span>\n  }\n</div>\n" }]
        }], propDecorators: { overflowCount: [{ type: i0.Input, args: [{ isSignal: true, alias: "overflowCount", required: false }] }] } });

const BASE_CLASSES$c = 'inline-flex items-center gap-1.5 rounded-full font-mono font-medium uppercase tracking-wide transition-all duration-300 whitespace-nowrap';
const VARIANT_CLASSES$4 = {
    primary: 'bg-primary/15 text-primary border border-primary/30',
    secondary: 'bg-secondary/15 text-secondary border border-secondary/30',
    accent: 'bg-accent/15 text-accent border border-accent/30',
    outline: 'bg-transparent text-foreground border border-white/20',
    muted: 'bg-white/5 text-muted border border-white/10',
    success: 'bg-success/15 text-success border border-success/30',
    warning: 'bg-warning/15 text-warning border border-warning/30',
    error: 'bg-error/15 text-error border border-error/30',
    info: 'bg-info/15 text-info border border-info/30',
};
const SIZE_CLASSES$2 = {
    sm: 'h-5 px-2 text-[10px]',
    md: 'h-6 px-2.5 text-xs',
};
const DOT_COLOR_CLASSES = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    outline: 'bg-white',
    muted: 'bg-muted',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
};
class RndBadge {
    variant = input('primary', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    dot = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dot" }] : /* istanbul ignore next */ []));
    removable = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "removable" }] : /* istanbul ignore next */ []));
    remove = output();
    classes = computed(() => [BASE_CLASSES$c, VARIANT_CLASSES$4[this.variant()], SIZE_CLASSES$2[this.size()]].join(' '), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    dotClasses = computed(() => DOT_COLOR_CLASSES[this.variant()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dotClasses" }] : /* istanbul ignore next */ []));
    onRemove(event) {
        event.stopPropagation();
        this.remove.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndBadge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndBadge, isStandalone: true, selector: "rnd-badge", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, dot: { classPropertyName: "dot", publicName: "dot", isSignal: true, isRequired: false, transformFunction: null }, removable: { classPropertyName: "removable", publicName: "removable", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { remove: "remove" }, ngImport: i0, template: "<span [class]=\"classes()\">\n  @if (dot()) {\n    <span class=\"relative flex h-1.5 w-1.5\">\n      <span\n        class=\"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75\"\n        [class]=\"dotClasses()\"\n      ></span>\n      <span class=\"relative inline-flex h-1.5 w-1.5 rounded-full\" [class]=\"dotClasses()\"></span>\n    </span>\n  }\n  <ng-content />\n  @if (removable()) {\n    <button\n      type=\"button\"\n      class=\"-mr-1 inline-flex items-center justify-center rounded-full p-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n      aria-label=\"Remove\"\n      (click)=\"onRemove($event)\"\n    >\n      <rnd-icon name=\"close\" [size]=\"10\" />\n    </button>\n  }\n</span>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndBadge, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-badge', template: "<span [class]=\"classes()\">\n  @if (dot()) {\n    <span class=\"relative flex h-1.5 w-1.5\">\n      <span\n        class=\"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75\"\n        [class]=\"dotClasses()\"\n      ></span>\n      <span class=\"relative inline-flex h-1.5 w-1.5 rounded-full\" [class]=\"dotClasses()\"></span>\n    </span>\n  }\n  <ng-content />\n  @if (removable()) {\n    <button\n      type=\"button\"\n      class=\"-mr-1 inline-flex items-center justify-center rounded-full p-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n      aria-label=\"Remove\"\n      (click)=\"onRemove($event)\"\n    >\n      <rnd-icon name=\"close\" [size]=\"10\" />\n    </button>\n  }\n</span>\n" }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], dot: [{ type: i0.Input, args: [{ isSignal: true, alias: "dot", required: false }] }], removable: [{ type: i0.Input, args: [{ isSignal: true, alias: "removable", required: false }] }], remove: [{ type: i0.Output, args: ["remove"] }] } });

class RndBreadcrumb {
    items = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndBreadcrumb, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndBreadcrumb, isStandalone: true, selector: "rnd-breadcrumb", inputs: { items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<nav aria-label=\"Breadcrumb\" class=\"flex items-center gap-2 font-mono text-xs\">\n  @for (item of items(); track item.label; let last = $last) {\n    @if (item.href && !last) {\n      <a [href]=\"item.href\" class=\"text-muted transition-colors hover:text-primary\">{{\n        item.label\n      }}</a>\n    } @else {\n      <span [class.text-foreground]=\"last\" [class.text-muted]=\"!last\">{{ item.label }}</span>\n    }\n    @if (!last) {\n      <span class=\"text-muted/50\">/</span>\n    }\n  }\n</nav>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndBreadcrumb, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-breadcrumb', template: "<nav aria-label=\"Breadcrumb\" class=\"flex items-center gap-2 font-mono text-xs\">\n  @for (item of items(); track item.label; let last = $last) {\n    @if (item.href && !last) {\n      <a [href]=\"item.href\" class=\"text-muted transition-colors hover:text-primary\">{{\n        item.label\n      }}</a>\n    } @else {\n      <span [class.text-foreground]=\"last\" [class.text-muted]=\"!last\">{{ item.label }}</span>\n    }\n    @if (!last) {\n      <span class=\"text-muted/50\">/</span>\n    }\n  }\n</nav>\n" }]
        }], propDecorators: { items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: false }] }] } });

const BASE_CLASSES$b = 'inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';
const VARIANT_CLASSES$3 = {
    primary: 'text-white bg-gradient-to-r from-secondary to-primary shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)]',
    outline: 'bg-transparent border-2 border-white/20 text-white hover:border-white hover:bg-white/10',
    ghost: 'bg-transparent text-white hover:bg-white/10 hover:text-primary',
    link: 'bg-transparent text-primary hover:underline',
};
const SIZE_CLASSES$1 = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
};
const ICON_ONLY_SIZE_CLASSES = {
    sm: 'h-9 w-9 px-0',
    md: 'h-11 w-11 px-0',
    lg: 'h-14 w-14 px-0',
};
class RndButton {
    variant = input('primary', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    iconOnly = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "iconOnly" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    type = input('button', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    ariaLabel = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    classes = computed(() => {
        const variant = this.variant();
        if (variant === 'link') {
            return [BASE_CLASSES$b, VARIANT_CLASSES$3.link].join(' ');
        }
        const sizeClasses = this.iconOnly()
            ? ICON_ONLY_SIZE_CLASSES[this.size()]
            : SIZE_CLASSES$1[this.size()];
        return [BASE_CLASSES$b, VARIANT_CLASSES$3[variant], sizeClasses].join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndButton, isStandalone: true, selector: "rnd-button", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, iconOnly: { classPropertyName: "iconOnly", publicName: "iconOnly", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<button [attr.aria-label]=\"ariaLabel()\" [class]=\"classes()\" [disabled]=\"disabled()\" [type]=\"type()\">\n  <ng-content select=\"[rndIconLeading]\" />\n  <ng-content />\n  <ng-content select=\"[rndIconTrailing]\" />\n</button>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndButton, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-button', template: "<button [attr.aria-label]=\"ariaLabel()\" [class]=\"classes()\" [disabled]=\"disabled()\" [type]=\"type()\">\n  <ng-content select=\"[rndIconLeading]\" />\n  <ng-content />\n  <ng-content select=\"[rndIconTrailing]\" />\n</button>\n" }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], iconOnly: [{ type: i0.Input, args: [{ isSignal: true, alias: "iconOnly", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }] } });

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const BASE_DAY_CLASSES = 'flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors';
class RndCalendar {
    selected = model(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selected" }] : /* istanbul ignore next */ []));
    weekdayLabels = WEEKDAY_LABELS;
    viewDate = signal(new Date(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "viewDate" }] : /* istanbul ignore next */ []));
    monthLabel = computed(() => this.viewDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "monthLabel" }] : /* istanbul ignore next */ []));
    days = computed(() => {
        const view = this.viewDate();
        const year = view.getFullYear();
        const month = view.getMonth();
        const firstOfMonth = new Date(year, month, 1);
        const startOffset = firstOfMonth.getDay();
        const gridStart = new Date(year, month, 1 - startOffset);
        const today = new Date();
        return Array.from({ length: 42 }, (_, i) => {
            const date = new Date(gridStart);
            date.setDate(gridStart.getDate() + i);
            return {
                date,
                inCurrentMonth: date.getMonth() === month,
                isToday: date.toDateString() === today.toDateString(),
            };
        });
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "days" }] : /* istanbul ignore next */ []));
    isSelected(day) {
        const selected = this.selected();
        return !!selected && selected.toDateString() === day.date.toDateString();
    }
    dayClasses(day) {
        if (this.isSelected(day)) {
            return `${BASE_DAY_CLASSES} bg-gradient-to-r from-secondary to-primary font-semibold text-white`;
        }
        if (!day.inCurrentMonth) {
            return `${BASE_DAY_CLASSES} text-white/20 hover:bg-white/5`;
        }
        if (day.isToday) {
            return `${BASE_DAY_CLASSES} border border-primary text-primary hover:bg-white/5`;
        }
        return `${BASE_DAY_CLASSES} text-foreground hover:bg-white/5`;
    }
    selectDay(day) {
        this.selected.set(day.date);
    }
    previousMonth() {
        const view = this.viewDate();
        this.viewDate.set(new Date(view.getFullYear(), view.getMonth() - 1, 1));
    }
    nextMonth() {
        const view = this.viewDate();
        this.viewDate.set(new Date(view.getFullYear(), view.getMonth() + 1, 1));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCalendar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndCalendar, isStandalone: true, selector: "rnd-calendar", inputs: { selected: { classPropertyName: "selected", publicName: "selected", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selectedChange" }, ngImport: i0, template: "<div\n  class=\"w-72 rounded-2xl border border-border bg-[#0f1115]/95 p-4 text-foreground backdrop-blur-lg\"\n>\n  <div class=\"mb-4 flex items-center justify-between\">\n    <button\n      type=\"button\"\n      class=\"rounded-full p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-foreground\"\n      aria-label=\"Previous month\"\n      (click)=\"previousMonth()\"\n    >\n      <rnd-icon name=\"chevron-left\" [size]=\"16\" />\n    </button>\n    <span class=\"font-heading text-sm font-semibold\">{{ monthLabel() }}</span>\n    <button\n      type=\"button\"\n      class=\"rounded-full p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-foreground\"\n      aria-label=\"Next month\"\n      (click)=\"nextMonth()\"\n    >\n      <rnd-icon name=\"chevron-right\" [size]=\"16\" />\n    </button>\n  </div>\n  <div class=\"grid grid-cols-7 gap-1 text-center\">\n    @for (label of weekdayLabels; track label) {\n      <span class=\"font-mono text-[10px] text-muted uppercase\">{{ label }}</span>\n    }\n    @for (day of days(); track day.date.getTime()) {\n      <button type=\"button\" [class]=\"dayClasses(day)\" (click)=\"selectDay(day)\">\n        {{ day.date.getDate() }}\n      </button>\n    }\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCalendar, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-calendar', template: "<div\n  class=\"w-72 rounded-2xl border border-border bg-[#0f1115]/95 p-4 text-foreground backdrop-blur-lg\"\n>\n  <div class=\"mb-4 flex items-center justify-between\">\n    <button\n      type=\"button\"\n      class=\"rounded-full p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-foreground\"\n      aria-label=\"Previous month\"\n      (click)=\"previousMonth()\"\n    >\n      <rnd-icon name=\"chevron-left\" [size]=\"16\" />\n    </button>\n    <span class=\"font-heading text-sm font-semibold\">{{ monthLabel() }}</span>\n    <button\n      type=\"button\"\n      class=\"rounded-full p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-foreground\"\n      aria-label=\"Next month\"\n      (click)=\"nextMonth()\"\n    >\n      <rnd-icon name=\"chevron-right\" [size]=\"16\" />\n    </button>\n  </div>\n  <div class=\"grid grid-cols-7 gap-1 text-center\">\n    @for (label of weekdayLabels; track label) {\n      <span class=\"font-mono text-[10px] text-muted uppercase\">{{ label }}</span>\n    }\n    @for (day of days(); track day.date.getTime()) {\n      <button type=\"button\" [class]=\"dayClasses(day)\" (click)=\"selectDay(day)\">\n        {{ day.date.getDate() }}\n      </button>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { selected: [{ type: i0.Input, args: [{ isSignal: true, alias: "selected", required: false }] }, { type: i0.Output, args: ["selectedChange"] }] } });

const BASE_CLASSES$a = 'rounded-2xl border border-border transition-all duration-300';
const VARIANT_CLASSES$2 = {
    standard: 'bg-surface',
    glass: 'bg-white/5 backdrop-blur-lg',
};
const HOVERABLE_CLASSES = 'hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)]';
class RndCard {
    variant = input('standard', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    hoverable = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hoverable" }] : /* istanbul ignore next */ []));
    classes = computed(() => {
        const classes = [BASE_CLASSES$a, VARIANT_CLASSES$2[this.variant()]];
        if (this.hoverable()) {
            classes.push(HOVERABLE_CLASSES);
        }
        return classes.join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndCard, isStandalone: true, selector: "rnd-card", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, hoverable: { classPropertyName: "hoverable", publicName: "hoverable", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div [class]=\"classes()\">\n  <ng-content select=\"[rndCardHeader]\" />\n  <ng-content select=\"[rndCardContent]\" />\n  <ng-content select=\"[rndCardFooter]\" />\n  <ng-content />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCard, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-card', template: "<div [class]=\"classes()\">\n  <ng-content select=\"[rndCardHeader]\" />\n  <ng-content select=\"[rndCardContent]\" />\n  <ng-content select=\"[rndCardFooter]\" />\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], hoverable: [{ type: i0.Input, args: [{ isSignal: true, alias: "hoverable", required: false }] }] } });

class RndCarouselSlide {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCarouselSlide, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.7", type: RndCarouselSlide, isStandalone: true, selector: "rnd-carousel-slide", host: { classAttribute: "block w-full shrink-0" }, ngImport: i0, template: "<ng-content />\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCarouselSlide, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-carousel-slide', host: {
                        class: 'block w-full shrink-0',
                    }, template: "<ng-content />\n" }]
        }] });

class RndCarousel {
    activeIndex = model(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "activeIndex" }] : /* istanbul ignore next */ []));
    loop = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loop" }] : /* istanbul ignore next */ []));
    interval = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "interval" }] : /* istanbul ignore next */ []));
    slides = contentChildren(RndCarouselSlide, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "slides" }] : /* istanbul ignore next */ []));
    isPaused = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isPaused" }] : /* istanbul ignore next */ []));
    destroyRef = inject(DestroyRef);
    timerId = null;
    canGoPrevious = computed(() => this.loop() || this.activeIndex() > 0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "canGoPrevious" }] : /* istanbul ignore next */ []));
    canGoNext = computed(() => this.loop() || this.activeIndex() < this.slides().length - 1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "canGoNext" }] : /* istanbul ignore next */ []));
    trackTransform = computed(() => `translateX(-${this.activeIndex() * 100}%)`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trackTransform" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            const ms = this.interval();
            const paused = this.isPaused();
            this.clearAutoplay();
            if (ms > 0 && !paused) {
                this.timerId = setInterval(() => this.advanceAutoplay(), ms);
            }
        });
        this.destroyRef.onDestroy(() => this.clearAutoplay());
    }
    onKeydown(event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.previous();
        }
        else if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.next();
        }
    }
    goTo(index) {
        const count = this.slides().length;
        if (count === 0) {
            return;
        }
        this.activeIndex.set(((index % count) + count) % count);
    }
    previous() {
        if (this.activeIndex() > 0) {
            this.activeIndex.update((index) => index - 1);
        }
        else if (this.loop()) {
            this.goTo(this.slides().length - 1);
        }
    }
    next() {
        if (this.activeIndex() < this.slides().length - 1) {
            this.activeIndex.update((index) => index + 1);
        }
        else if (this.loop()) {
            this.goTo(0);
        }
    }
    advanceAutoplay() {
        const count = this.slides().length;
        if (count === 0) {
            return;
        }
        this.goTo(this.activeIndex() + 1);
    }
    clearAutoplay() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCarousel, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndCarousel, isStandalone: true, selector: "rnd-carousel", inputs: { activeIndex: { classPropertyName: "activeIndex", publicName: "activeIndex", isSignal: true, isRequired: false, transformFunction: null }, loop: { classPropertyName: "loop", publicName: "loop", isSignal: true, isRequired: false, transformFunction: null }, interval: { classPropertyName: "interval", publicName: "interval", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { activeIndex: "activeIndexChange" }, queries: [{ propertyName: "slides", predicate: RndCarouselSlide, isSignal: true }], ngImport: i0, template: "<div\n  class=\"relative overflow-hidden rounded-2xl border border-border\"\n  tabindex=\"0\"\n  role=\"region\"\n  aria-roledescription=\"carousel\"\n  (mouseenter)=\"isPaused.set(true)\"\n  (mouseleave)=\"isPaused.set(false)\"\n  (focusin)=\"isPaused.set(true)\"\n  (focusout)=\"isPaused.set(false)\"\n  (keydown)=\"onKeydown($event)\"\n>\n  <div class=\"flex transition-transform duration-300 ease-out\" [style.transform]=\"trackTransform()\">\n    <ng-content />\n  </div>\n\n  <button\n    type=\"button\"\n    class=\"absolute top-1/2 left-3 -translate-y-1/2 inline-flex items-center justify-center leading-[0] rounded-full bg-primary/90 p-2 text-white shadow-[0_0_16px_-4px_rgba(247,147,26,0.7)] transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-30\"\n    aria-label=\"Previous slide\"\n    [disabled]=\"!canGoPrevious()\"\n    (click)=\"previous()\"\n  >\n    <rnd-icon name=\"chevron-left\" [size]=\"18\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"absolute top-1/2 right-3 -translate-y-1/2 inline-flex items-center justify-center leading-[0] rounded-full bg-primary/90 p-2 text-white shadow-[0_0_16px_-4px_rgba(247,147,26,0.7)] transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-30\"\n    aria-label=\"Next slide\"\n    [disabled]=\"!canGoNext()\"\n    (click)=\"next()\"\n  >\n    <rnd-icon name=\"chevron-right\" [size]=\"18\" />\n  </button>\n\n  <div class=\"absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5\">\n    @for (slide of slides(); track slide; let i = $index) {\n      <button\n        type=\"button\"\n        class=\"h-1.5 w-1.5 rounded-full transition-colors\"\n        [class]=\"i === activeIndex() ? 'bg-primary' : 'bg-white/30'\"\n        [attr.aria-label]=\"'Go to slide ' + (i + 1)\"\n        (click)=\"goTo(i)\"\n      ></button>\n    }\n  </div>\n\n  <span class=\"sr-only\" aria-live=\"polite\">Slide {{ activeIndex() + 1 }} of {{ slides().length }}</span>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCarousel, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-carousel', template: "<div\n  class=\"relative overflow-hidden rounded-2xl border border-border\"\n  tabindex=\"0\"\n  role=\"region\"\n  aria-roledescription=\"carousel\"\n  (mouseenter)=\"isPaused.set(true)\"\n  (mouseleave)=\"isPaused.set(false)\"\n  (focusin)=\"isPaused.set(true)\"\n  (focusout)=\"isPaused.set(false)\"\n  (keydown)=\"onKeydown($event)\"\n>\n  <div class=\"flex transition-transform duration-300 ease-out\" [style.transform]=\"trackTransform()\">\n    <ng-content />\n  </div>\n\n  <button\n    type=\"button\"\n    class=\"absolute top-1/2 left-3 -translate-y-1/2 inline-flex items-center justify-center leading-[0] rounded-full bg-primary/90 p-2 text-white shadow-[0_0_16px_-4px_rgba(247,147,26,0.7)] transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-30\"\n    aria-label=\"Previous slide\"\n    [disabled]=\"!canGoPrevious()\"\n    (click)=\"previous()\"\n  >\n    <rnd-icon name=\"chevron-left\" [size]=\"18\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"absolute top-1/2 right-3 -translate-y-1/2 inline-flex items-center justify-center leading-[0] rounded-full bg-primary/90 p-2 text-white shadow-[0_0_16px_-4px_rgba(247,147,26,0.7)] transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-30\"\n    aria-label=\"Next slide\"\n    [disabled]=\"!canGoNext()\"\n    (click)=\"next()\"\n  >\n    <rnd-icon name=\"chevron-right\" [size]=\"18\" />\n  </button>\n\n  <div class=\"absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5\">\n    @for (slide of slides(); track slide; let i = $index) {\n      <button\n        type=\"button\"\n        class=\"h-1.5 w-1.5 rounded-full transition-colors\"\n        [class]=\"i === activeIndex() ? 'bg-primary' : 'bg-white/30'\"\n        [attr.aria-label]=\"'Go to slide ' + (i + 1)\"\n        (click)=\"goTo(i)\"\n      ></button>\n    }\n  </div>\n\n  <span class=\"sr-only\" aria-live=\"polite\">Slide {{ activeIndex() + 1 }} of {{ slides().length }}</span>\n</div>\n" }]
        }], ctorParameters: () => [], propDecorators: { activeIndex: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeIndex", required: false }] }, { type: i0.Output, args: ["activeIndexChange"] }], loop: [{ type: i0.Input, args: [{ isSignal: true, alias: "loop", required: false }] }], interval: [{ type: i0.Input, args: [{ isSignal: true, alias: "interval", required: false }] }], slides: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => RndCarouselSlide), { isSignal: true }] }] } });

const BASE_CLASSES$9 = 'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background';
class RndCheckbox {
    checked = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
    indeterminate = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "indeterminate" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    label = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "label" }] : /* istanbul ignore next */ []));
    boxClasses = computed(() => {
        const classes = [BASE_CLASSES$9];
        classes.push(this.checked() || this.indeterminate()
            ? 'border-primary bg-primary'
            : 'border-white/20 bg-black/50');
        if (this.disabled()) {
            classes.push('cursor-not-allowed opacity-50');
        }
        return classes.join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "boxClasses" }] : /* istanbul ignore next */ []));
    onChange(event) {
        this.checked.set(event.target.checked);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCheckbox, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndCheckbox, isStandalone: true, selector: "rnd-checkbox", inputs: { checked: { classPropertyName: "checked", publicName: "checked", isSignal: true, isRequired: false, transformFunction: null }, indeterminate: { classPropertyName: "indeterminate", publicName: "indeterminate", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { checked: "checkedChange" }, ngImport: i0, template: "<label\n  class=\"inline-flex items-center gap-2\"\n  [class.cursor-not-allowed]=\"disabled()\"\n  [class.cursor-pointer]=\"!disabled()\"\n>\n  <span class=\"relative inline-flex\">\n    <input\n      type=\"checkbox\"\n      class=\"peer absolute h-5 w-5 cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled()\"\n      (change)=\"onChange($event)\"\n    />\n    <span [class]=\"boxClasses()\">\n      @if (indeterminate()) {\n        <span class=\"h-0.5 w-2.5 rounded-full bg-primary-foreground\"></span>\n      } @else if (checked()) {\n        <rnd-icon name=\"check\" [size]=\"12\" class=\"text-primary-foreground\" />\n      }\n    </span>\n  </span>\n  @if (label()) {\n    <span class=\"text-sm text-foreground\">{{ label() }}</span>\n  }\n</label>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCheckbox, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-checkbox', template: "<label\n  class=\"inline-flex items-center gap-2\"\n  [class.cursor-not-allowed]=\"disabled()\"\n  [class.cursor-pointer]=\"!disabled()\"\n>\n  <span class=\"relative inline-flex\">\n    <input\n      type=\"checkbox\"\n      class=\"peer absolute h-5 w-5 cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled()\"\n      (change)=\"onChange($event)\"\n    />\n    <span [class]=\"boxClasses()\">\n      @if (indeterminate()) {\n        <span class=\"h-0.5 w-2.5 rounded-full bg-primary-foreground\"></span>\n      } @else if (checked()) {\n        <rnd-icon name=\"check\" [size]=\"12\" class=\"text-primary-foreground\" />\n      }\n    </span>\n  </span>\n  @if (label()) {\n    <span class=\"text-sm text-foreground\">{{ label() }}</span>\n  }\n</label>\n" }]
        }], propDecorators: { checked: [{ type: i0.Input, args: [{ isSignal: true, alias: "checked", required: false }] }, { type: i0.Output, args: ["checkedChange"] }], indeterminate: [{ type: i0.Input, args: [{ isSignal: true, alias: "indeterminate", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }] } });

class RndCollapsible {
    label = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    open = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    toggle() {
        this.open.set(!this.open());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCollapsible, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndCollapsible, isStandalone: true, selector: "rnd-collapsible", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange" }, ngImport: i0, template: "<div class=\"flex flex-col gap-2\">\n  <button\n    type=\"button\"\n    class=\"flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    [attr.aria-expanded]=\"open()\"\n    (click)=\"toggle()\"\n  >\n    <rnd-icon\n      name=\"chevron-right\"\n      [size]=\"14\"\n      class=\"shrink-0 transition-transform duration-300\"\n      [class.rotate-90]=\"open()\"\n    />\n    {{ label() }}\n  </button>\n  @if (open()) {\n    <div class=\"pl-5 text-sm text-muted\">\n      <ng-content />\n    </div>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCollapsible, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-collapsible', template: "<div class=\"flex flex-col gap-2\">\n  <button\n    type=\"button\"\n    class=\"flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    [attr.aria-expanded]=\"open()\"\n    (click)=\"toggle()\"\n  >\n    <rnd-icon\n      name=\"chevron-right\"\n      [size]=\"14\"\n      class=\"shrink-0 transition-transform duration-300\"\n      [class.rotate-90]=\"open()\"\n    />\n    {{ label() }}\n  </button>\n  @if (open()) {\n    <div class=\"pl-5 text-sm text-muted\">\n      <ng-content />\n    </div>\n  }\n</div>\n" }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], open: [{ type: i0.Input, args: [{ isSignal: true, alias: "open", required: false }] }, { type: i0.Output, args: ["openChange"] }] } });

function positionPopoverPanel(panelEl, anchorRect, { offset = 4, matchWidth = false } = {}) {
    panelEl.style.left = `${anchorRect.left}px`;
    panelEl.style.top = `${anchorRect.bottom + offset}px`;
    if (matchWidth) {
        panelEl.style.width = `${anchorRect.width}px`;
    }
}

let nextComboboxId = 0;
class RndCombobox {
    options = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    placeholder = input('Search...', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    panelId = `rnd-combobox-${++nextComboboxId}`;
    query = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []));
    highlightedIndex = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "highlightedIndex" }] : /* istanbul ignore next */ []));
    isOpen = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
    trigger = viewChild.required('trigger', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trigger" }] : /* istanbul ignore next */ []));
    panel = viewChild.required('panel', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panel" }] : /* istanbul ignore next */ []));
    selectedLabel = computed(() => this.options().find((option) => option.value === this.value())?.label ?? '', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedLabel" }] : /* istanbul ignore next */ []));
    filteredOptions = computed(() => {
        const query = this.query().trim().toLowerCase();
        if (!query) {
            return this.options();
        }
        return this.options().filter((option) => option.label.toLowerCase().includes(query));
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filteredOptions" }] : /* istanbul ignore next */ []));
    optionId(index) {
        return `${this.panelId}-option-${index}`;
    }
    onActivate() {
        if (this.isOpen()) {
            return;
        }
        this.query.set('');
        this.highlightedIndex.set(0);
        this.openPanel();
    }
    onBlur(event) {
        const nextTarget = event.relatedTarget;
        if (nextTarget && this.panel().nativeElement.contains(nextTarget)) {
            return;
        }
        this.closePanel();
        this.query.set('');
    }
    onDocumentClick(event) {
        if (!this.isOpen()) {
            return;
        }
        const target = event.target;
        if (this.trigger().nativeElement.contains(target) || this.panel().nativeElement.contains(target)) {
            return;
        }
        this.closePanel();
        this.query.set('');
    }
    onReposition() {
        if (this.isOpen()) {
            this.reposition();
        }
    }
    onInput(event) {
        this.query.set(event.target.value);
        this.highlightedIndex.set(0);
    }
    onKeydown(event) {
        const options = this.filteredOptions();
        if (event.key === 'Escape') {
            event.preventDefault();
            this.closePanel();
            return;
        }
        if (options.length === 0) {
            return;
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.highlightedIndex.set((this.highlightedIndex() + 1) % options.length);
            this.scrollHighlightedIntoView();
        }
        else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.highlightedIndex.set((this.highlightedIndex() - 1 + options.length) % options.length);
            this.scrollHighlightedIntoView();
        }
        else if (event.key === 'Enter') {
            event.preventDefault();
            this.chooseOption(options[this.highlightedIndex()]);
        }
    }
    chooseOption(option) {
        this.value.set(option.value);
        this.query.set('');
        this.closePanel();
    }
    openPanel() {
        this.reposition();
        this.panel().nativeElement.showPopover();
        this.isOpen.set(true);
    }
    closePanel() {
        if (!this.isOpen()) {
            return;
        }
        this.panel().nativeElement.hidePopover();
        this.isOpen.set(false);
    }
    reposition() {
        positionPopoverPanel(this.panel().nativeElement, this.trigger().nativeElement.getBoundingClientRect(), { matchWidth: true });
    }
    scrollHighlightedIntoView() {
        const buttons = this.panel().nativeElement.querySelectorAll('button');
        buttons[this.highlightedIndex()]?.scrollIntoView({ block: 'nearest' });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCombobox, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndCombobox, isStandalone: true, selector: "rnd-combobox", inputs: { options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, host: { listeners: { "document:click": "onDocumentClick($event)", "window:scroll": "onReposition()", "window:resize": "onReposition()" } }, viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true, isSignal: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"relative\">\n  <input\n    #trigger\n    type=\"text\"\n    role=\"combobox\"\n    aria-autocomplete=\"list\"\n    [attr.aria-expanded]=\"isOpen()\"\n    [attr.aria-controls]=\"panelId\"\n    [attr.aria-activedescendant]=\"isOpen() ? optionId(highlightedIndex()) : null\"\n    class=\"h-12 w-full border-b-2 border-white/20 bg-black/50 px-4 text-sm text-white transition-all duration-200 focus:border-primary focus:outline-none\"\n    [placeholder]=\"placeholder()\"\n    [value]=\"isOpen() ? query() : selectedLabel()\"\n    (focus)=\"onActivate()\"\n    (click)=\"onActivate()\"\n    (blur)=\"onBlur($event)\"\n    (input)=\"onInput($event)\"\n    (keydown)=\"onKeydown($event)\"\n  />\n  <div\n    #panel\n    [id]=\"panelId\"\n    popover=\"manual\"\n    role=\"listbox\"\n    class=\"m-0 max-h-64 overflow-y-auto rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n  >\n    @for (option of filteredOptions(); track option.value; let i = $index) {\n      <button\n        type=\"button\"\n        role=\"option\"\n        [id]=\"optionId(i)\"\n        [attr.aria-selected]=\"i === highlightedIndex()\"\n        class=\"flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors\"\n        [class.bg-white/10]=\"i === highlightedIndex()\"\n        (mousedown)=\"$event.preventDefault()\"\n        (mouseenter)=\"highlightedIndex.set(i)\"\n        (click)=\"chooseOption(option)\"\n      >\n        {{ option.label }}\n      </button>\n    } @empty {\n      <p class=\"px-3 py-4 text-center text-sm text-muted\">No matches.</p>\n    }\n  </div>\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCombobox, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-combobox', host: {
                        '(document:click)': 'onDocumentClick($event)',
                        '(window:scroll)': 'onReposition()',
                        '(window:resize)': 'onReposition()',
                    }, template: "<div class=\"relative\">\n  <input\n    #trigger\n    type=\"text\"\n    role=\"combobox\"\n    aria-autocomplete=\"list\"\n    [attr.aria-expanded]=\"isOpen()\"\n    [attr.aria-controls]=\"panelId\"\n    [attr.aria-activedescendant]=\"isOpen() ? optionId(highlightedIndex()) : null\"\n    class=\"h-12 w-full border-b-2 border-white/20 bg-black/50 px-4 text-sm text-white transition-all duration-200 focus:border-primary focus:outline-none\"\n    [placeholder]=\"placeholder()\"\n    [value]=\"isOpen() ? query() : selectedLabel()\"\n    (focus)=\"onActivate()\"\n    (click)=\"onActivate()\"\n    (blur)=\"onBlur($event)\"\n    (input)=\"onInput($event)\"\n    (keydown)=\"onKeydown($event)\"\n  />\n  <div\n    #panel\n    [id]=\"panelId\"\n    popover=\"manual\"\n    role=\"listbox\"\n    class=\"m-0 max-h-64 overflow-y-auto rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n  >\n    @for (option of filteredOptions(); track option.value; let i = $index) {\n      <button\n        type=\"button\"\n        role=\"option\"\n        [id]=\"optionId(i)\"\n        [attr.aria-selected]=\"i === highlightedIndex()\"\n        class=\"flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors\"\n        [class.bg-white/10]=\"i === highlightedIndex()\"\n        (mousedown)=\"$event.preventDefault()\"\n        (mouseenter)=\"highlightedIndex.set(i)\"\n        (click)=\"chooseOption(option)\"\n      >\n        {{ option.label }}\n      </button>\n    } @empty {\n      <p class=\"px-3 py-4 text-center text-sm text-muted\">No matches.</p>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], trigger: [{ type: i0.ViewChild, args: ['trigger', { isSignal: true }] }], panel: [{ type: i0.ViewChild, args: ['panel', { isSignal: true }] }] } });

class RndKbd {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndKbd, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.7", type: RndKbd, isStandalone: true, selector: "rnd-kbd", ngImport: i0, template: "<kbd\n  class=\"inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-muted\"\n>\n  <ng-content />\n</kbd>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndKbd, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-kbd', template: "<kbd\n  class=\"inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-muted\"\n>\n  <ng-content />\n</kbd>\n" }]
        }] });

class RndCommandPalette {
    items = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
    open = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    select = output();
    query = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []));
    highlightedIndex = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "highlightedIndex" }] : /* istanbul ignore next */ []));
    filteredItems = computed(() => {
        const query = this.query().trim().toLowerCase();
        if (!query) {
            return this.items();
        }
        return this.items().filter((item) => item.label.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query));
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filteredItems" }] : /* istanbul ignore next */ []));
    dialog = viewChild.required('dialog', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialog" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            const dialogEl = this.dialog().nativeElement;
            if (this.open()) {
                if (!dialogEl.open) {
                    dialogEl.showModal();
                }
            }
            else if (dialogEl.open) {
                dialogEl.close();
            }
        });
    }
    onGlobalKeydown(event) {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            this.query.set('');
            this.highlightedIndex.set(0);
            this.open.set(true);
        }
    }
    onDialogClose() {
        this.open.set(false);
    }
    onQueryInput(event) {
        this.query.set(event.target.value);
        this.highlightedIndex.set(0);
    }
    onListKeydown(event) {
        const items = this.filteredItems();
        if (items.length === 0) {
            return;
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.highlightedIndex.set((this.highlightedIndex() + 1) % items.length);
        }
        else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.highlightedIndex.set((this.highlightedIndex() - 1 + items.length) % items.length);
        }
        else if (event.key === 'Enter') {
            event.preventDefault();
            const item = items[this.highlightedIndex()];
            if (item) {
                this.chooseItem(item.id);
            }
        }
    }
    chooseItem(id) {
        this.select.emit(id);
        this.open.set(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCommandPalette, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndCommandPalette, isStandalone: true, selector: "rnd-command-palette", inputs: { items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", select: "select" }, host: { listeners: { "document:keydown": "onGlobalKeydown($event)" } }, viewQueries: [{ propertyName: "dialog", first: true, predicate: ["dialog"], descendants: true, isSignal: true }], ngImport: i0, template: "<dialog\n  #dialog\n  class=\"m-auto mt-24 w-full max-w-lg rounded-2xl border border-border bg-[#0f1115]/95 p-0 text-foreground backdrop-blur-lg backdrop:bg-black/60\"\n  (close)=\"onDialogClose()\"\n>\n  <div class=\"flex items-center gap-2 border-b border-border px-4 py-3\">\n    <rnd-icon name=\"search\" [size]=\"16\" class=\"shrink-0 text-muted\" />\n    <input\n      type=\"text\"\n      placeholder=\"Type a command or search...\"\n      class=\"w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-white/30\"\n      [value]=\"query()\"\n      (input)=\"onQueryInput($event)\"\n      (keydown)=\"onListKeydown($event)\"\n    />\n    <rnd-kbd>ESC</rnd-kbd>\n  </div>\n  <div class=\"max-h-80 overflow-y-auto p-2\">\n    @for (item of filteredItems(); track item.id; let i = $index) {\n      <button\n        type=\"button\"\n        class=\"flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left transition-colors\"\n        [class.bg-white/10]=\"i === highlightedIndex()\"\n        (mouseenter)=\"highlightedIndex.set(i)\"\n        (click)=\"chooseItem(item.id)\"\n      >\n        <span class=\"text-sm text-foreground\">{{ item.label }}</span>\n        @if (item.description) {\n          <span class=\"text-xs text-muted\">{{ item.description }}</span>\n        }\n      </button>\n    } @empty {\n      <p class=\"px-3 py-6 text-center text-sm text-muted\">No results found.</p>\n    }\n  </div>\n</dialog>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }, { kind: "component", type: RndKbd, selector: "rnd-kbd" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCommandPalette, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon, RndKbd], selector: 'rnd-command-palette', host: {
                        '(document:keydown)': 'onGlobalKeydown($event)',
                    }, template: "<dialog\n  #dialog\n  class=\"m-auto mt-24 w-full max-w-lg rounded-2xl border border-border bg-[#0f1115]/95 p-0 text-foreground backdrop-blur-lg backdrop:bg-black/60\"\n  (close)=\"onDialogClose()\"\n>\n  <div class=\"flex items-center gap-2 border-b border-border px-4 py-3\">\n    <rnd-icon name=\"search\" [size]=\"16\" class=\"shrink-0 text-muted\" />\n    <input\n      type=\"text\"\n      placeholder=\"Type a command or search...\"\n      class=\"w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-white/30\"\n      [value]=\"query()\"\n      (input)=\"onQueryInput($event)\"\n      (keydown)=\"onListKeydown($event)\"\n    />\n    <rnd-kbd>ESC</rnd-kbd>\n  </div>\n  <div class=\"max-h-80 overflow-y-auto p-2\">\n    @for (item of filteredItems(); track item.id; let i = $index) {\n      <button\n        type=\"button\"\n        class=\"flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left transition-colors\"\n        [class.bg-white/10]=\"i === highlightedIndex()\"\n        (mouseenter)=\"highlightedIndex.set(i)\"\n        (click)=\"chooseItem(item.id)\"\n      >\n        <span class=\"text-sm text-foreground\">{{ item.label }}</span>\n        @if (item.description) {\n          <span class=\"text-xs text-muted\">{{ item.description }}</span>\n        }\n      </button>\n    } @empty {\n      <p class=\"px-3 py-6 text-center text-sm text-muted\">No results found.</p>\n    }\n  </div>\n</dialog>\n" }]
        }], ctorParameters: () => [], propDecorators: { items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: false }] }], open: [{ type: i0.Input, args: [{ isSignal: true, alias: "open", required: false }] }, { type: i0.Output, args: ["openChange"] }], select: [{ type: i0.Output, args: ["select"] }], dialog: [{ type: i0.ViewChild, args: ['dialog', { isSignal: true }] }] } });

class RndConfirmService {
    request = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "request" }] : /* istanbul ignore next */ []));
    current = this.request.asReadonly();
    confirm(options) {
        return new Promise((resolve) => {
            this.request.set({ ...options, resolve });
        });
    }
    respond(confirmed) {
        this.request()?.resolve(confirmed);
        this.request.set(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndConfirmService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndConfirmService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndConfirmService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class RndConfirmOutlet {
    confirmService = inject(RndConfirmService);
    dialog = viewChild.required('dialog', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialog" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            const request = this.confirmService.current();
            const dialogEl = this.dialog().nativeElement;
            if (request) {
                if (!dialogEl.open) {
                    dialogEl.showModal();
                }
            }
            else if (dialogEl.open) {
                dialogEl.close();
            }
        });
    }
    respond(confirmed) {
        this.confirmService.respond(confirmed);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndConfirmOutlet, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndConfirmOutlet, isStandalone: true, selector: "rnd-confirm-outlet", viewQueries: [{ propertyName: "dialog", first: true, predicate: ["dialog"], descendants: true, isSignal: true }], ngImport: i0, template: "<dialog\n  #dialog\n  class=\"m-auto w-full max-w-sm rounded-2xl border border-border bg-[#0f1115]/95 p-0 text-foreground backdrop-blur-lg backdrop:bg-black/60\"\n  (close)=\"respond(false)\"\n>\n  @if (confirmService.current(); as request) {\n    <div class=\"p-6 pb-4 font-heading text-xl font-semibold\">{{ request.title }}</div>\n    @if (request.message) {\n      <div class=\"px-6 pb-6 text-sm text-muted\">{{ request.message }}</div>\n    }\n    <div class=\"flex justify-end gap-2 border-t border-border p-6\">\n      <rnd-button variant=\"ghost\" (click)=\"respond(false)\">{{\n        request.cancelLabel ?? 'Cancel'\n      }}</rnd-button>\n      <rnd-button (click)=\"respond(true)\">{{ request.confirmLabel ?? 'Confirm' }}</rnd-button>\n    </div>\n  }\n</dialog>\n", styles: [""], dependencies: [{ kind: "component", type: RndButton, selector: "rnd-button", inputs: ["variant", "size", "iconOnly", "disabled", "type", "ariaLabel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndConfirmOutlet, decorators: [{
            type: Component,
            args: [{ imports: [RndButton], selector: 'rnd-confirm-outlet', template: "<dialog\n  #dialog\n  class=\"m-auto w-full max-w-sm rounded-2xl border border-border bg-[#0f1115]/95 p-0 text-foreground backdrop-blur-lg backdrop:bg-black/60\"\n  (close)=\"respond(false)\"\n>\n  @if (confirmService.current(); as request) {\n    <div class=\"p-6 pb-4 font-heading text-xl font-semibold\">{{ request.title }}</div>\n    @if (request.message) {\n      <div class=\"px-6 pb-6 text-sm text-muted\">{{ request.message }}</div>\n    }\n    <div class=\"flex justify-end gap-2 border-t border-border p-6\">\n      <rnd-button variant=\"ghost\" (click)=\"respond(false)\">{{\n        request.cancelLabel ?? 'Cancel'\n      }}</rnd-button>\n      <rnd-button (click)=\"respond(true)\">{{ request.confirmLabel ?? 'Confirm' }}</rnd-button>\n    </div>\n  }\n</dialog>\n" }]
        }], ctorParameters: () => [], propDecorators: { dialog: [{ type: i0.ViewChild, args: ['dialog', { isSignal: true }] }] } });

class RndContextMenu {
    panel = viewChild.required('panel', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panel" }] : /* istanbul ignore next */ []));
    onContextMenu(event) {
        event.preventDefault();
        const panelEl = this.panel().nativeElement;
        panelEl.style.left = `${event.clientX}px`;
        panelEl.style.top = `${event.clientY}px`;
        panelEl.showPopover();
    }
    onDismiss() {
        const panelEl = this.panel().nativeElement;
        if (panelEl.matches(':popover-open')) {
            panelEl.hidePopover();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndContextMenu, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.7", type: RndContextMenu, isStandalone: true, selector: "rnd-context-menu", host: { listeners: { "window:scroll": "onDismiss()", "window:resize": "onDismiss()" } }, viewQueries: [{ propertyName: "panel", first: true, predicate: ["panel"], descendants: true, isSignal: true }], ngImport: i0, template: "<div (contextmenu)=\"onContextMenu($event)\">\n  <ng-content select=\"[rndContextMenuTrigger]\" />\n</div>\n<div\n  #panel\n  popover\n  class=\"m-0 min-w-48 rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n>\n  <ng-content />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndContextMenu, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-context-menu', host: {
                        '(window:scroll)': 'onDismiss()',
                        '(window:resize)': 'onDismiss()',
                    }, template: "<div (contextmenu)=\"onContextMenu($event)\">\n  <ng-content select=\"[rndContextMenuTrigger]\" />\n</div>\n<div\n  #panel\n  popover\n  class=\"m-0 min-w-48 rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n>\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { panel: [{ type: i0.ViewChild, args: ['panel', { isSignal: true }] }] } });

class RndCopyField {
    value = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    truncate = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "truncate" }] : /* istanbul ignore next */ []));
    copied = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "copied" }] : /* istanbul ignore next */ []));
    displayValue = computed(() => {
        const value = this.value();
        if (!this.truncate() || value.length <= 14) {
            return value;
        }
        return `${value.slice(0, 8)}...${value.slice(-4)}`;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "displayValue" }] : /* istanbul ignore next */ []));
    async onCopy() {
        await navigator.clipboard.writeText(this.value());
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCopyField, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndCopyField, isStandalone: true, selector: "rnd-copy-field", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, truncate: { classPropertyName: "truncate", publicName: "truncate", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-3 py-2\">\n  <span class=\"flex-1 truncate font-mono text-sm text-foreground\">{{ displayValue() }}</span>\n  <button\n    type=\"button\"\n    class=\"shrink-0 rounded-md p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    [attr.aria-label]=\"copied() ? 'Copied' : 'Copy'\"\n    (click)=\"onCopy()\"\n  >\n    @if (copied()) {\n      <rnd-icon name=\"check\" [size]=\"14\" class=\"text-success\" />\n    } @else {\n      <rnd-icon name=\"copy\" [size]=\"14\" />\n    }\n  </button>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndCopyField, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-copy-field', template: "<div class=\"flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-3 py-2\">\n  <span class=\"flex-1 truncate font-mono text-sm text-foreground\">{{ displayValue() }}</span>\n  <button\n    type=\"button\"\n    class=\"shrink-0 rounded-md p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    [attr.aria-label]=\"copied() ? 'Copied' : 'Copy'\"\n    (click)=\"onCopy()\"\n  >\n    @if (copied()) {\n      <rnd-icon name=\"check\" [size]=\"14\" class=\"text-success\" />\n    } @else {\n      <rnd-icon name=\"copy\" [size]=\"14\" />\n    }\n  </button>\n</div>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], truncate: [{ type: i0.Input, args: [{ isSignal: true, alias: "truncate", required: false }] }] } });

class RndDatePicker {
    selected = model(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selected" }] : /* istanbul ignore next */ []));
    placeholder = input('Select date', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    trigger = viewChild.required('trigger', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trigger" }] : /* istanbul ignore next */ []));
    panel = viewChild.required('panel', { ...(ngDevMode ? { debugName: "panel" } : /* istanbul ignore next */ {}), read: (ElementRef) });
    formattedDate = computed(() => this.selected()?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }) ?? '', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "formattedDate" }] : /* istanbul ignore next */ []));
    onTriggerClick() {
        const panelEl = this.panel().nativeElement;
        if (panelEl.matches(':popover-open')) {
            panelEl.hidePopover();
            return;
        }
        this.reposition();
        panelEl.showPopover();
    }
    onReposition() {
        if (this.panel().nativeElement.matches(':popover-open')) {
            this.reposition();
        }
    }
    onSelect(date) {
        this.selected.set(date);
        this.panel().nativeElement.hidePopover();
    }
    reposition() {
        positionPopoverPanel(this.panel().nativeElement, this.trigger().nativeElement.getBoundingClientRect());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndDatePicker, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.7", type: RndDatePicker, isStandalone: true, selector: "rnd-date-picker", inputs: { selected: { classPropertyName: "selected", publicName: "selected", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selectedChange" }, host: { listeners: { "window:scroll": "onReposition()", "window:resize": "onReposition()" } }, viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true, isSignal: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true, read: ElementRef, isSignal: true }], ngImport: i0, template: "<button\n  #trigger\n  type=\"button\"\n  class=\"flex h-12 w-full items-center justify-between border-b-2 border-white/20 bg-black/50 px-4 text-left text-sm text-white transition-all duration-200 focus:border-primary focus:outline-none\"\n  (click)=\"onTriggerClick()\"\n>\n  <span [class.text-white/30]=\"!selected()\">{{ formattedDate() || placeholder() }}</span>\n  <rnd-icon name=\"calendar\" [size]=\"16\" class=\"text-muted\" />\n</button>\n<rnd-calendar #panel popover [selected]=\"selected()\" (selectedChange)=\"onSelect($event)\" />\n", styles: [""], dependencies: [{ kind: "component", type: RndCalendar, selector: "rnd-calendar", inputs: ["selected"], outputs: ["selectedChange"] }, { kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndDatePicker, decorators: [{
            type: Component,
            args: [{ imports: [RndCalendar, RndIcon], selector: 'rnd-date-picker', host: {
                        '(window:scroll)': 'onReposition()',
                        '(window:resize)': 'onReposition()',
                    }, template: "<button\n  #trigger\n  type=\"button\"\n  class=\"flex h-12 w-full items-center justify-between border-b-2 border-white/20 bg-black/50 px-4 text-left text-sm text-white transition-all duration-200 focus:border-primary focus:outline-none\"\n  (click)=\"onTriggerClick()\"\n>\n  <span [class.text-white/30]=\"!selected()\">{{ formattedDate() || placeholder() }}</span>\n  <rnd-icon name=\"calendar\" [size]=\"16\" class=\"text-muted\" />\n</button>\n<rnd-calendar #panel popover [selected]=\"selected()\" (selectedChange)=\"onSelect($event)\" />\n" }]
        }], propDecorators: { selected: [{ type: i0.Input, args: [{ isSignal: true, alias: "selected", required: false }] }, { type: i0.Output, args: ["selectedChange"] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], trigger: [{ type: i0.ViewChild, args: ['trigger', { isSignal: true }] }], panel: [{ type: i0.ViewChild, args: ['panel', { ...{ read: (ElementRef) }, isSignal: true }] }] } });

class RndDivider {
    orientation = input('horizontal', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "orientation" }] : /* istanbul ignore next */ []));
    label = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "label" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndDivider, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndDivider, isStandalone: true, selector: "rnd-divider", inputs: { orientation: { classPropertyName: "orientation", publicName: "orientation", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if (orientation() === 'vertical') {\n  <span class=\"inline-block h-4 w-px self-stretch bg-border\"></span>\n} @else if (label()) {\n  <div class=\"flex items-center gap-4\">\n    <span class=\"h-px flex-1 bg-border\"></span>\n    <span class=\"font-mono text-xs tracking-wider text-muted uppercase\">{{ label() }}</span>\n    <span class=\"h-px flex-1 bg-border\"></span>\n  </div>\n} @else {\n  <span class=\"block h-px w-full bg-border\"></span>\n}\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndDivider, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-divider', template: "@if (orientation() === 'vertical') {\n  <span class=\"inline-block h-4 w-px self-stretch bg-border\"></span>\n} @else if (label()) {\n  <div class=\"flex items-center gap-4\">\n    <span class=\"h-px flex-1 bg-border\"></span>\n    <span class=\"font-mono text-xs tracking-wider text-muted uppercase\">{{ label() }}</span>\n    <span class=\"h-px flex-1 bg-border\"></span>\n  </div>\n} @else {\n  <span class=\"block h-px w-full bg-border\"></span>\n}\n" }]
        }], propDecorators: { orientation: [{ type: i0.Input, args: [{ isSignal: true, alias: "orientation", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }] } });

class RndDropdownItem {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndDropdownItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.7", type: RndDropdownItem, isStandalone: true, selector: "rnd-dropdown-item", ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-white/10 hover:text-primary\"\n>\n  <ng-content />\n</button>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndDropdownItem, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-dropdown-item', template: "<button\n  type=\"button\"\n  class=\"flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-white/10 hover:text-primary\"\n>\n  <ng-content />\n</button>\n" }]
        }] });

let nextMenuId = 0;
class RndDropdownMenu {
    label = input('Menu', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    menuId = `rnd-dropdown-menu-${++nextMenuId}`;
    trigger = viewChild.required('trigger', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trigger" }] : /* istanbul ignore next */ []));
    panel = viewChild.required('panel', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panel" }] : /* istanbul ignore next */ []));
    onToggle(event) {
        const newState = event.newState;
        if (newState !== 'open') {
            return;
        }
        this.reposition();
    }
    onReposition() {
        if (this.panel().nativeElement.matches(':popover-open')) {
            this.reposition();
        }
    }
    reposition() {
        positionPopoverPanel(this.panel().nativeElement, this.trigger().nativeElement.getBoundingClientRect());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndDropdownMenu, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.7", type: RndDropdownMenu, isStandalone: true, selector: "rnd-dropdown-menu", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "window:scroll": "onReposition()", "window:resize": "onReposition()" } }, viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true, isSignal: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true, isSignal: true }], ngImport: i0, template: "<button\n  #trigger\n  type=\"button\"\n  [attr.popovertarget]=\"menuId\"\n  class=\"inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10\"\n>\n  {{ label() }}\n  <rnd-icon name=\"chevron-down\" [size]=\"14\" />\n</button>\n<div\n  #panel\n  [id]=\"menuId\"\n  popover\n  (toggle)=\"onToggle($event)\"\n  class=\"m-0 min-w-40 rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n>\n  <ng-content />\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndDropdownMenu, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-dropdown-menu', host: {
                        '(window:scroll)': 'onReposition()',
                        '(window:resize)': 'onReposition()',
                    }, template: "<button\n  #trigger\n  type=\"button\"\n  [attr.popovertarget]=\"menuId\"\n  class=\"inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10\"\n>\n  {{ label() }}\n  <rnd-icon name=\"chevron-down\" [size]=\"14\" />\n</button>\n<div\n  #panel\n  [id]=\"menuId\"\n  popover\n  (toggle)=\"onToggle($event)\"\n  class=\"m-0 min-w-40 rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n>\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], trigger: [{ type: i0.ViewChild, args: ['trigger', { isSignal: true }] }], panel: [{ type: i0.ViewChild, args: ['panel', { isSignal: true }] }] } });

class RndEmptyState {
    title = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    description = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "description" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndEmptyState, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndEmptyState, isStandalone: true, selector: "rnd-empty-state", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"flex flex-col items-center gap-3 py-16 text-center\">\n  <ng-content select=\"[rndEmptyStateIcon]\" />\n  <h3 class=\"font-heading text-lg font-semibold text-foreground\">{{ title() }}</h3>\n  @if (description()) {\n    <p class=\"max-w-sm text-sm text-muted\">{{ description() }}</p>\n  }\n  <ng-content select=\"[rndEmptyStateAction]\" />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndEmptyState, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-empty-state', template: "<div class=\"flex flex-col items-center gap-3 py-16 text-center\">\n  <ng-content select=\"[rndEmptyStateIcon]\" />\n  <h3 class=\"font-heading text-lg font-semibold text-foreground\">{{ title() }}</h3>\n  @if (description()) {\n    <p class=\"max-w-sm text-sm text-muted\">{{ description() }}</p>\n  }\n  <ng-content select=\"[rndEmptyStateAction]\" />\n</div>\n" }]
        }], propDecorators: { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }] } });

class RndFormField {
    label = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "label" }] : /* istanbul ignore next */ []));
    hint = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "hint" }] : /* istanbul ignore next */ []));
    error = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "error" }] : /* istanbul ignore next */ []));
    required = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "required" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndFormField, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndFormField, isStandalone: true, selector: "rnd-form-field", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, hint: { classPropertyName: "hint", publicName: "hint", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null }, required: { classPropertyName: "required", publicName: "required", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"flex flex-col gap-1.5\">\n  @if (label()) {\n    <label class=\"font-body text-sm font-medium text-foreground\">\n      {{ label() }}\n      @if (required()) {\n        <span class=\"text-error\">*</span>\n      }\n    </label>\n  }\n  <ng-content />\n  @if (error()) {\n    <p class=\"text-xs text-error\">{{ error() }}</p>\n  } @else if (hint()) {\n    <p class=\"text-xs text-muted\">{{ hint() }}</p>\n  }\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndFormField, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-form-field', template: "<div class=\"flex flex-col gap-1.5\">\n  @if (label()) {\n    <label class=\"font-body text-sm font-medium text-foreground\">\n      {{ label() }}\n      @if (required()) {\n        <span class=\"text-error\">*</span>\n      }\n    </label>\n  }\n  <ng-content />\n  @if (error()) {\n    <p class=\"text-xs text-error\">{{ error() }}</p>\n  } @else if (hint()) {\n    <p class=\"text-xs text-muted\">{{ hint() }}</p>\n  }\n</div>\n" }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], hint: [{ type: i0.Input, args: [{ isSignal: true, alias: "hint", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], required: [{ type: i0.Input, args: [{ isSignal: true, alias: "required", required: false }] }] } });

class RndHoverCard {
    open = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    openTimeout;
    closeTimeout;
    scheduleOpen() {
        clearTimeout(this.closeTimeout);
        this.openTimeout = setTimeout(() => this.open.set(true), 200);
    }
    scheduleClose() {
        clearTimeout(this.openTimeout);
        this.closeTimeout = setTimeout(() => this.open.set(false), 150);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndHoverCard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndHoverCard, isStandalone: true, selector: "rnd-hover-card", ngImport: i0, template: "<span class=\"relative inline-flex\" (mouseenter)=\"scheduleOpen()\" (mouseleave)=\"scheduleClose()\">\n  <ng-content select=\"[rndHoverCardTrigger]\" />\n  @if (open()) {\n    <div\n      class=\"absolute top-full left-0 z-50 mt-2 w-72 rounded-xl border border-border bg-[#0f1115]/95 p-4 text-foreground shadow-[0_0_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-lg\"\n      (mouseenter)=\"scheduleOpen()\"\n      (mouseleave)=\"scheduleClose()\"\n    >\n      <ng-content />\n    </div>\n  }\n</span>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndHoverCard, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-hover-card', template: "<span class=\"relative inline-flex\" (mouseenter)=\"scheduleOpen()\" (mouseleave)=\"scheduleClose()\">\n  <ng-content select=\"[rndHoverCardTrigger]\" />\n  @if (open()) {\n    <div\n      class=\"absolute top-full left-0 z-50 mt-2 w-72 rounded-xl border border-border bg-[#0f1115]/95 p-4 text-foreground shadow-[0_0_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-lg\"\n      (mouseenter)=\"scheduleOpen()\"\n      (mouseleave)=\"scheduleClose()\"\n    >\n      <ng-content />\n    </div>\n  }\n</span>\n" }]
        }] });

const BASE_CLASSES$8 = 'flex h-12 items-center gap-2 border-b-2 bg-black/50 px-4 transition-all duration-200 focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]';
class RndInput {
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    type = input('text', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    placeholder = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    invalid = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "invalid" }] : /* istanbul ignore next */ []));
    containerClasses = computed(() => {
        const classes = [BASE_CLASSES$8];
        classes.push(this.invalid()
            ? 'border-error focus-within:border-error'
            : 'border-white/20 focus-within:border-primary');
        if (this.disabled()) {
            classes.push('cursor-not-allowed opacity-50');
        }
        return classes.join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "containerClasses" }] : /* istanbul ignore next */ []));
    onInput(event) {
        this.value.set(event.target.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndInput, isStandalone: true, selector: "rnd-input", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, invalid: { classPropertyName: "invalid", publicName: "invalid", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div [class]=\"containerClasses()\">\n  <ng-content select=\"[rndInputPrefix]\" />\n  <input\n    [type]=\"type()\"\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    (input)=\"onInput($event)\"\n    class=\"w-full bg-transparent text-sm text-white focus:outline-none disabled:cursor-not-allowed placeholder:text-white/30\"\n  />\n  <ng-content select=\"[rndInputSuffix]\" />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndInput, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-input', template: "<div [class]=\"containerClasses()\">\n  <ng-content select=\"[rndInputPrefix]\" />\n  <input\n    [type]=\"type()\"\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    (input)=\"onInput($event)\"\n    class=\"w-full bg-transparent text-sm text-white focus:outline-none disabled:cursor-not-allowed placeholder:text-white/30\"\n  />\n  <ng-content select=\"[rndInputSuffix]\" />\n</div>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], invalid: [{ type: i0.Input, args: [{ isSignal: true, alias: "invalid", required: false }] }] } });

class RndInputOtp {
    length = input(6, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "length" }] : /* istanbul ignore next */ []));
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    cells = computed(() => Array.from({ length: this.length() }, (_, i) => i), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "cells" }] : /* istanbul ignore next */ []));
    digits = computed(() => {
        const value = this.value();
        return this.cells().map((i) => value[i] ?? '');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "digits" }] : /* istanbul ignore next */ []));
    inputs = viewChildren('cellInput', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "inputs" }] : /* istanbul ignore next */ []));
    onInput(event, index) {
        const inputEl = event.target;
        const digit = inputEl.value.slice(-1).replace(/[^0-9]/g, '');
        const chars = this.digits().slice();
        chars[index] = digit;
        this.value.set(chars.join(''));
        if (digit && index < this.length() - 1) {
            this.inputs()[index + 1]?.nativeElement.focus();
        }
    }
    onKeydown(event, index) {
        if (event.key === 'Backspace' && !this.digits()[index] && index > 0) {
            this.inputs()[index - 1]?.nativeElement.focus();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndInputOtp, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndInputOtp, isStandalone: true, selector: "rnd-input-otp", inputs: { length: { classPropertyName: "length", publicName: "length", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, viewQueries: [{ propertyName: "inputs", predicate: ["cellInput"], descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"flex gap-2\">\n  @for (i of cells(); track i) {\n    <input\n      #cellInput\n      type=\"text\"\n      inputmode=\"numeric\"\n      maxlength=\"1\"\n      class=\"h-12 w-10 rounded-lg border-b-2 border-white/20 bg-black/50 text-center font-mono text-lg text-white transition-all duration-200 focus:border-primary focus:outline-none\"\n      [value]=\"digits()[i]\"\n      (input)=\"onInput($event, i)\"\n      (keydown)=\"onKeydown($event, i)\"\n    />\n  }\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndInputOtp, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-input-otp', template: "<div class=\"flex gap-2\">\n  @for (i of cells(); track i) {\n    <input\n      #cellInput\n      type=\"text\"\n      inputmode=\"numeric\"\n      maxlength=\"1\"\n      class=\"h-12 w-10 rounded-lg border-b-2 border-white/20 bg-black/50 text-center font-mono text-lg text-white transition-all duration-200 focus:border-primary focus:outline-none\"\n      [value]=\"digits()[i]\"\n      (input)=\"onInput($event, i)\"\n      (keydown)=\"onKeydown($event, i)\"\n    />\n  }\n</div>\n" }]
        }], propDecorators: { length: [{ type: i0.Input, args: [{ isSignal: true, alias: "length", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], inputs: [{ type: i0.ViewChildren, args: ['cellInput', { isSignal: true }] }] } });

class RndModal {
    open = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    closeOnBackdropClick = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "closeOnBackdropClick" }] : /* istanbul ignore next */ []));
    dialog = viewChild.required('dialog', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialog" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            const dialogEl = this.dialog().nativeElement;
            if (this.open()) {
                if (!dialogEl.open) {
                    dialogEl.showModal();
                }
            }
            else if (dialogEl.open) {
                dialogEl.close();
            }
        });
    }
    onDialogClose() {
        this.open.set(false);
    }
    onDialogClick(event) {
        if (this.closeOnBackdropClick() && event.target === this.dialog().nativeElement) {
            this.open.set(false);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.7", type: RndModal, isStandalone: true, selector: "rnd-modal", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, closeOnBackdropClick: { classPropertyName: "closeOnBackdropClick", publicName: "closeOnBackdropClick", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange" }, viewQueries: [{ propertyName: "dialog", first: true, predicate: ["dialog"], descendants: true, isSignal: true }], ngImport: i0, template: "<dialog\n  #dialog\n  class=\"m-auto w-full max-w-md rounded-2xl border border-border bg-[#0f1115]/95 p-0 text-foreground backdrop-blur-lg backdrop:bg-black/60\"\n  (close)=\"onDialogClose()\"\n  (click)=\"onDialogClick($event)\"\n>\n  <div class=\"p-6 pb-4 font-heading text-xl font-semibold\">\n    <ng-content select=\"[rndModalHeader]\" />\n  </div>\n  <div class=\"px-6 pb-6 text-sm text-muted\">\n    <ng-content />\n  </div>\n  <div class=\"flex justify-end gap-2 border-t border-border p-6\">\n    <ng-content select=\"[rndModalFooter]\" />\n  </div>\n</dialog>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndModal, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-modal', template: "<dialog\n  #dialog\n  class=\"m-auto w-full max-w-md rounded-2xl border border-border bg-[#0f1115]/95 p-0 text-foreground backdrop-blur-lg backdrop:bg-black/60\"\n  (close)=\"onDialogClose()\"\n  (click)=\"onDialogClick($event)\"\n>\n  <div class=\"p-6 pb-4 font-heading text-xl font-semibold\">\n    <ng-content select=\"[rndModalHeader]\" />\n  </div>\n  <div class=\"px-6 pb-6 text-sm text-muted\">\n    <ng-content />\n  </div>\n  <div class=\"flex justify-end gap-2 border-t border-border p-6\">\n    <ng-content select=\"[rndModalFooter]\" />\n  </div>\n</dialog>\n" }]
        }], ctorParameters: () => [], propDecorators: { open: [{ type: i0.Input, args: [{ isSignal: true, alias: "open", required: false }] }, { type: i0.Output, args: ["openChange"] }], closeOnBackdropClick: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeOnBackdropClick", required: false }] }], dialog: [{ type: i0.ViewChild, args: ['dialog', { isSignal: true }] }] } });

class RndNavbar {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndNavbar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.7", type: RndNavbar, isStandalone: true, selector: "rnd-navbar", ngImport: i0, template: "<header\n  class=\"sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-lg\"\n>\n  <div class=\"flex items-center gap-2\">\n    <ng-content select=\"[rndNavbarBrand]\" />\n  </div>\n  <div class=\"flex items-center gap-2\">\n    <ng-content select=\"[rndNavbarActions]\" />\n  </div>\n</header>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndNavbar, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-navbar', template: "<header\n  class=\"sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-lg\"\n>\n  <div class=\"flex items-center gap-2\">\n    <ng-content select=\"[rndNavbarBrand]\" />\n  </div>\n  <div class=\"flex items-center gap-2\">\n    <ng-content select=\"[rndNavbarActions]\" />\n  </div>\n</header>\n" }]
        }] });

class RndNumberStepper {
    value = model(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    min = input(-Infinity, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "min" }] : /* istanbul ignore next */ []));
    max = input(Infinity, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "max" }] : /* istanbul ignore next */ []));
    step = input(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "step" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    canDecrement = computed(() => !this.disabled() && this.value() - this.step() >= this.min(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "canDecrement" }] : /* istanbul ignore next */ []));
    canIncrement = computed(() => !this.disabled() && this.value() + this.step() <= this.max(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "canIncrement" }] : /* istanbul ignore next */ []));
    decrement() {
        if (this.canDecrement()) {
            this.value.set(this.value() - this.step());
        }
    }
    increment() {
        if (this.canIncrement()) {
            this.value.set(this.value() + this.step());
        }
    }
    onInput(event) {
        const raw = Number(event.target.value);
        if (!Number.isNaN(raw)) {
            this.value.set(Math.min(this.max(), Math.max(this.min(), raw)));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndNumberStepper, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndNumberStepper, isStandalone: true, selector: "rnd-number-stepper", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, step: { classPropertyName: "step", publicName: "step", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div\n  class=\"inline-flex h-12 items-stretch overflow-hidden rounded-lg border-b-2 border-white/20 bg-black/50\"\n>\n  <button\n    type=\"button\"\n    class=\"flex w-10 items-center justify-center text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40\"\n    [disabled]=\"!canDecrement()\"\n    (click)=\"decrement()\"\n  >\n    <rnd-icon name=\"minus\" [size]=\"14\" />\n  </button>\n  <input\n    type=\"text\"\n    inputmode=\"decimal\"\n    class=\"w-16 bg-transparent text-center text-sm text-white focus:outline-none\"\n    [value]=\"value()\"\n    [disabled]=\"disabled()\"\n    (change)=\"onInput($event)\"\n  />\n  <button\n    type=\"button\"\n    class=\"flex w-10 items-center justify-center text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40\"\n    [disabled]=\"!canIncrement()\"\n    (click)=\"increment()\"\n  >\n    <rnd-icon name=\"plus\" [size]=\"14\" />\n  </button>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndNumberStepper, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-number-stepper', template: "<div\n  class=\"inline-flex h-12 items-stretch overflow-hidden rounded-lg border-b-2 border-white/20 bg-black/50\"\n>\n  <button\n    type=\"button\"\n    class=\"flex w-10 items-center justify-center text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40\"\n    [disabled]=\"!canDecrement()\"\n    (click)=\"decrement()\"\n  >\n    <rnd-icon name=\"minus\" [size]=\"14\" />\n  </button>\n  <input\n    type=\"text\"\n    inputmode=\"decimal\"\n    class=\"w-16 bg-transparent text-center text-sm text-white focus:outline-none\"\n    [value]=\"value()\"\n    [disabled]=\"disabled()\"\n    (change)=\"onInput($event)\"\n  />\n  <button\n    type=\"button\"\n    class=\"flex w-10 items-center justify-center text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40\"\n    [disabled]=\"!canIncrement()\"\n    (click)=\"increment()\"\n  >\n    <rnd-icon name=\"plus\" [size]=\"14\" />\n  </button>\n</div>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], min: [{ type: i0.Input, args: [{ isSignal: true, alias: "min", required: false }] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }], step: [{ type: i0.Input, args: [{ isSignal: true, alias: "step", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

const PAGE_BUTTON_BASE_CLASSES = 'flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all';
const NAV_BUTTON_CLASSES = 'flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent';
class RndPagination {
    page = model(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    totalPages = input(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "totalPages" }] : /* istanbul ignore next */ []));
    maxSize = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "maxSize" }] : /* istanbul ignore next */ []));
    rotate = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rotate" }] : /* istanbul ignore next */ []));
    navButtonClasses = NAV_BUTTON_CLASSES;
    pages = computed(() => {
        const total = this.totalPages();
        const size = this.maxSize();
        if (size <= 0 || size >= total) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        const current = this.page();
        let start;
        if (this.rotate()) {
            start = Math.max(1, current - Math.floor(size / 2));
            if (start + size - 1 > total) {
                start = total - size + 1;
            }
        }
        else {
            start = Math.floor((current - 1) / size) * size + 1;
        }
        return Array.from({ length: size }, (_, i) => start + i);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pages" }] : /* istanbul ignore next */ []));
    pageButtonClasses(p) {
        if (p === this.page()) {
            return [
                PAGE_BUTTON_BASE_CLASSES,
                'bg-gradient-to-r from-secondary to-primary text-white',
            ].join(' ');
        }
        return [PAGE_BUTTON_BASE_CLASSES, 'text-muted hover:bg-white/5 hover:text-foreground'].join(' ');
    }
    goTo(page) {
        if (page < 1 || page > this.totalPages()) {
            return;
        }
        this.page.set(page);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndPagination, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndPagination, isStandalone: true, selector: "rnd-pagination", inputs: { page: { classPropertyName: "page", publicName: "page", isSignal: true, isRequired: false, transformFunction: null }, totalPages: { classPropertyName: "totalPages", publicName: "totalPages", isSignal: true, isRequired: false, transformFunction: null }, maxSize: { classPropertyName: "maxSize", publicName: "maxSize", isSignal: true, isRequired: false, transformFunction: null }, rotate: { classPropertyName: "rotate", publicName: "rotate", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { page: "pageChange" }, ngImport: i0, template: "<nav class=\"flex items-center gap-1\" aria-label=\"Pagination\">\n  <button\n    type=\"button\"\n    [class]=\"navButtonClasses\"\n    [disabled]=\"page() === 1\"\n    (click)=\"goTo(page() - 1)\"\n    aria-label=\"Previous page\"\n  >\n    <rnd-icon name=\"chevron-left\" [size]=\"16\" />\n  </button>\n\n  @for (p of pages(); track p) {\n    <button type=\"button\" [class]=\"pageButtonClasses(p)\" (click)=\"goTo(p)\">\n      {{ p }}\n    </button>\n  }\n\n  <button\n    type=\"button\"\n    [class]=\"navButtonClasses\"\n    [disabled]=\"page() === totalPages()\"\n    (click)=\"goTo(page() + 1)\"\n    aria-label=\"Next page\"\n  >\n    <rnd-icon name=\"chevron-right\" [size]=\"16\" />\n  </button>\n</nav>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndPagination, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-pagination', template: "<nav class=\"flex items-center gap-1\" aria-label=\"Pagination\">\n  <button\n    type=\"button\"\n    [class]=\"navButtonClasses\"\n    [disabled]=\"page() === 1\"\n    (click)=\"goTo(page() - 1)\"\n    aria-label=\"Previous page\"\n  >\n    <rnd-icon name=\"chevron-left\" [size]=\"16\" />\n  </button>\n\n  @for (p of pages(); track p) {\n    <button type=\"button\" [class]=\"pageButtonClasses(p)\" (click)=\"goTo(p)\">\n      {{ p }}\n    </button>\n  }\n\n  <button\n    type=\"button\"\n    [class]=\"navButtonClasses\"\n    [disabled]=\"page() === totalPages()\"\n    (click)=\"goTo(page() + 1)\"\n    aria-label=\"Next page\"\n  >\n    <rnd-icon name=\"chevron-right\" [size]=\"16\" />\n  </button>\n</nav>\n" }]
        }], propDecorators: { page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: false }] }, { type: i0.Output, args: ["pageChange"] }], totalPages: [{ type: i0.Input, args: [{ isSignal: true, alias: "totalPages", required: false }] }], maxSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxSize", required: false }] }], rotate: [{ type: i0.Input, args: [{ isSignal: true, alias: "rotate", required: false }] }] } });

const BASE_CLASSES$7 = 'flex h-12 items-center gap-2 border-b-2 bg-black/50 px-4 transition-all duration-200 focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]';
class RndPasswordInput {
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    placeholder = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    invalid = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "invalid" }] : /* istanbul ignore next */ []));
    visible = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "visible" }] : /* istanbul ignore next */ []));
    containerClasses = computed(() => {
        const classes = [BASE_CLASSES$7];
        classes.push(this.invalid()
            ? 'border-error focus-within:border-error'
            : 'border-white/20 focus-within:border-primary');
        if (this.disabled()) {
            classes.push('cursor-not-allowed opacity-50');
        }
        return classes.join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "containerClasses" }] : /* istanbul ignore next */ []));
    onInput(event) {
        this.value.set(event.target.value);
    }
    toggleVisibility() {
        this.visible.set(!this.visible());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndPasswordInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndPasswordInput, isStandalone: true, selector: "rnd-password-input", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, invalid: { classPropertyName: "invalid", publicName: "invalid", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div [class]=\"containerClasses()\">\n  <input\n    [type]=\"visible() ? 'text' : 'password'\"\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    (input)=\"onInput($event)\"\n    class=\"w-full bg-transparent text-sm text-white focus:outline-none disabled:cursor-not-allowed placeholder:text-white/30\"\n  />\n  <button\n    type=\"button\"\n    class=\"shrink-0 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    [attr.aria-label]=\"visible() ? 'Hide password' : 'Show password'\"\n    (click)=\"toggleVisibility()\"\n  >\n    @if (visible()) {\n      <rnd-icon name=\"eye-off\" [size]=\"16\" />\n    } @else {\n      <rnd-icon name=\"eye\" [size]=\"16\" />\n    }\n  </button>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndPasswordInput, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-password-input', template: "<div [class]=\"containerClasses()\">\n  <input\n    [type]=\"visible() ? 'text' : 'password'\"\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    (input)=\"onInput($event)\"\n    class=\"w-full bg-transparent text-sm text-white focus:outline-none disabled:cursor-not-allowed placeholder:text-white/30\"\n  />\n  <button\n    type=\"button\"\n    class=\"shrink-0 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    [attr.aria-label]=\"visible() ? 'Hide password' : 'Show password'\"\n    (click)=\"toggleVisibility()\"\n  >\n    @if (visible()) {\n      <rnd-icon name=\"eye-off\" [size]=\"16\" />\n    } @else {\n      <rnd-icon name=\"eye\" [size]=\"16\" />\n    }\n  </button>\n</div>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], invalid: [{ type: i0.Input, args: [{ isSignal: true, alias: "invalid", required: false }] }] } });

class RndPopover {
    trigger = viewChild.required('trigger', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trigger" }] : /* istanbul ignore next */ []));
    panel = viewChild.required('panel', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panel" }] : /* istanbul ignore next */ []));
    onTriggerClick() {
        const panelEl = this.panel().nativeElement;
        if (panelEl.matches(':popover-open')) {
            panelEl.hidePopover();
            return;
        }
        this.reposition();
        panelEl.showPopover();
    }
    onReposition() {
        if (this.panel().nativeElement.matches(':popover-open')) {
            this.reposition();
        }
    }
    reposition() {
        positionPopoverPanel(this.panel().nativeElement, this.trigger().nativeElement.getBoundingClientRect());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndPopover, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.7", type: RndPopover, isStandalone: true, selector: "rnd-popover", host: { listeners: { "window:scroll": "onReposition()", "window:resize": "onReposition()" } }, viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true, isSignal: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true, isSignal: true }], ngImport: i0, template: "<span #trigger class=\"inline-flex\" (click)=\"onTriggerClick()\">\n  <ng-content select=\"[rndPopoverTrigger]\" />\n</span>\n<div\n  #panel\n  popover\n  class=\"m-0 min-w-56 rounded-xl border border-border bg-[#0f1115]/95 p-4 text-foreground backdrop-blur-lg\"\n>\n  <ng-content />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndPopover, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-popover', host: {
                        '(window:scroll)': 'onReposition()',
                        '(window:resize)': 'onReposition()',
                    }, template: "<span #trigger class=\"inline-flex\" (click)=\"onTriggerClick()\">\n  <ng-content select=\"[rndPopoverTrigger]\" />\n</span>\n<div\n  #panel\n  popover\n  class=\"m-0 min-w-56 rounded-xl border border-border bg-[#0f1115]/95 p-4 text-foreground backdrop-blur-lg\"\n>\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { trigger: [{ type: i0.ViewChild, args: ['trigger', { isSignal: true }] }], panel: [{ type: i0.ViewChild, args: ['panel', { isSignal: true }] }] } });

const TRACK_SIZE_CLASSES = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
};
class RndProgressBar {
    value = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    indeterminate = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "indeterminate" }] : /* istanbul ignore next */ []));
    striped = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "striped" }] : /* istanbul ignore next */ []));
    animated = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "animated" }] : /* istanbul ignore next */ []));
    trackClasses = computed(() => ['w-full overflow-hidden rounded-full bg-surface', TRACK_SIZE_CLASSES[this.size()]].join(' '), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trackClasses" }] : /* istanbul ignore next */ []));
    fillClasses = computed(() => {
        const classes = ['h-full rounded-full bg-gradient-to-r from-secondary to-primary'];
        if (this.striped()) {
            classes.push('bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]');
        }
        if (this.animated()) {
            classes.push('rnd-progress-bar-animated');
        }
        classes.push(this.indeterminate()
            ? 'w-1/3 animate-[rnd-progress-indeterminate_1.2s_ease-in-out_infinite]'
            : '');
        return classes.join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "fillClasses" }] : /* istanbul ignore next */ []));
    widthPercent = computed(() => Math.min(100, Math.max(0, this.value())), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "widthPercent" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndProgressBar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndProgressBar, isStandalone: true, selector: "rnd-progress-bar", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, indeterminate: { classPropertyName: "indeterminate", publicName: "indeterminate", isSignal: true, isRequired: false, transformFunction: null }, striped: { classPropertyName: "striped", publicName: "striped", isSignal: true, isRequired: false, transformFunction: null }, animated: { classPropertyName: "animated", publicName: "animated", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div\n  [class]=\"trackClasses()\"\n  role=\"progressbar\"\n  [attr.aria-valuenow]=\"indeterminate() ? null : widthPercent()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div [class]=\"fillClasses()\" [style.width.%]=\"indeterminate() ? null : widthPercent()\"></div>\n</div>\n", styles: ["@keyframes rnd-progress-indeterminate{0%{transform:translate(-100%)}to{transform:translate(300%)}}@keyframes rnd-progress-stripes{0%{background-position:1rem 0}to{background-position:0 0}}.rnd-progress-bar-animated{animation:rnd-progress-stripes 1s linear infinite}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndProgressBar, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-progress-bar', template: "<div\n  [class]=\"trackClasses()\"\n  role=\"progressbar\"\n  [attr.aria-valuenow]=\"indeterminate() ? null : widthPercent()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div [class]=\"fillClasses()\" [style.width.%]=\"indeterminate() ? null : widthPercent()\"></div>\n</div>\n", styles: ["@keyframes rnd-progress-indeterminate{0%{transform:translate(-100%)}to{transform:translate(300%)}}@keyframes rnd-progress-stripes{0%{background-position:1rem 0}to{background-position:0 0}}.rnd-progress-bar-animated{animation:rnd-progress-stripes 1s linear infinite}\n"] }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], indeterminate: [{ type: i0.Input, args: [{ isSignal: true, alias: "indeterminate", required: false }] }], striped: [{ type: i0.Input, args: [{ isSignal: true, alias: "striped", required: false }] }], animated: [{ type: i0.Input, args: [{ isSignal: true, alias: "animated", required: false }] }] } });

class RndQrCode {
    value = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    size = input(200, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    canvas = viewChild.required('canvas', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "canvas" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            // The `canvas` 2D context isn't implemented in Angular's server-side rendering DOM —
            // skip entirely during SSR/prerender and let the client-side hydration pass draw it.
            if (!this.isBrowser) {
                return;
            }
            const canvasEl = this.canvas().nativeElement;
            const value = this.value();
            const size = this.size();
            QRCode.toCanvas(canvasEl, value, {
                width: size,
                margin: 1,
                color: {
                    dark: '#030304',
                    light: '#ffffff',
                },
            }).catch(() => {
                // Invalid input (e.g. empty string) — leave the canvas blank rather than throwing.
            });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndQrCode, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.7", type: RndQrCode, isStandalone: true, selector: "rnd-qr-code", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "canvas", first: true, predicate: ["canvas"], descendants: true, isSignal: true }], ngImport: i0, template: "<canvas #canvas class=\"rounded-xl\"></canvas>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndQrCode, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-qr-code', template: "<canvas #canvas class=\"rounded-xl\"></canvas>\n" }]
        }], ctorParameters: () => [], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], canvas: [{ type: i0.ViewChild, args: ['canvas', { isSignal: true }] }] } });

class RndRadialProgress {
    value = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    size = input(80, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    strokeWidth = input(8, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "strokeWidth" }] : /* istanbul ignore next */ []));
    clampedValue = computed(() => Math.min(100, Math.max(0, this.value())), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "clampedValue" }] : /* istanbul ignore next */ []));
    radius = computed(() => (this.size() - this.strokeWidth()) / 2, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "radius" }] : /* istanbul ignore next */ []));
    center = computed(() => this.size() / 2, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "center" }] : /* istanbul ignore next */ []));
    circumference = computed(() => 2 * Math.PI * this.radius(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "circumference" }] : /* istanbul ignore next */ []));
    offset = computed(() => this.circumference() * (1 - this.clampedValue() / 100), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "offset" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndRadialProgress, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndRadialProgress, isStandalone: true, selector: "rnd-radial-progress", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, strokeWidth: { classPropertyName: "strokeWidth", publicName: "strokeWidth", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div\n  class=\"relative inline-flex items-center justify-center\"\n  [style.width.px]=\"size()\"\n  [style.height.px]=\"size()\"\n>\n  <svg\n    [attr.width]=\"size()\"\n    [attr.height]=\"size()\"\n    [attr.viewBox]=\"'0 0 ' + size() + ' ' + size()\"\n    class=\"-rotate-90\"\n  >\n    <circle\n      [attr.cx]=\"center()\"\n      [attr.cy]=\"center()\"\n      [attr.r]=\"radius()\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      class=\"text-surface\"\n      [attr.stroke-width]=\"strokeWidth()\"\n    />\n    <circle\n      [attr.cx]=\"center()\"\n      [attr.cy]=\"center()\"\n      [attr.r]=\"radius()\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      class=\"text-primary transition-all duration-300\"\n      [attr.stroke-width]=\"strokeWidth()\"\n      stroke-linecap=\"round\"\n      [attr.stroke-dasharray]=\"circumference()\"\n      [attr.stroke-dashoffset]=\"offset()\"\n    />\n  </svg>\n  <span class=\"absolute font-heading text-sm font-semibold text-foreground\"\n    >{{ clampedValue() }}%</span\n  >\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndRadialProgress, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-radial-progress', template: "<div\n  class=\"relative inline-flex items-center justify-center\"\n  [style.width.px]=\"size()\"\n  [style.height.px]=\"size()\"\n>\n  <svg\n    [attr.width]=\"size()\"\n    [attr.height]=\"size()\"\n    [attr.viewBox]=\"'0 0 ' + size() + ' ' + size()\"\n    class=\"-rotate-90\"\n  >\n    <circle\n      [attr.cx]=\"center()\"\n      [attr.cy]=\"center()\"\n      [attr.r]=\"radius()\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      class=\"text-surface\"\n      [attr.stroke-width]=\"strokeWidth()\"\n    />\n    <circle\n      [attr.cx]=\"center()\"\n      [attr.cy]=\"center()\"\n      [attr.r]=\"radius()\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      class=\"text-primary transition-all duration-300\"\n      [attr.stroke-width]=\"strokeWidth()\"\n      stroke-linecap=\"round\"\n      [attr.stroke-dasharray]=\"circumference()\"\n      [attr.stroke-dashoffset]=\"offset()\"\n    />\n  </svg>\n  <span class=\"absolute font-heading text-sm font-semibold text-foreground\"\n    >{{ clampedValue() }}%</span\n  >\n</div>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], strokeWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "strokeWidth", required: false }] }] } });

let nextGroupId = 0;
class RndRadioGroup {
    name = input(`rnd-radio-group-${++nextGroupId}`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndRadioGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndRadioGroup, isStandalone: true, selector: "rnd-radio-group", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div role=\"radiogroup\" class=\"flex flex-col gap-2\">\n  <ng-content />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndRadioGroup, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-radio-group', template: "<div role=\"radiogroup\" class=\"flex flex-col gap-2\">\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

const BASE_CLASSES$6 = 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background';
class RndRadioOption {
    value = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    label = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "label" }] : /* istanbul ignore next */ []));
    group = inject(RndRadioGroup);
    checked = computed(() => this.group.value() === this.value(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
    boxClasses = computed(() => [BASE_CLASSES$6, this.checked() ? 'border-primary' : 'border-white/20 bg-black/50'].join(' '), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "boxClasses" }] : /* istanbul ignore next */ []));
    onChange() {
        this.group.value.set(this.value());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndRadioOption, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndRadioOption, isStandalone: true, selector: "rnd-radio-option", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<label\n  class=\"inline-flex items-center gap-2\"\n  [class.cursor-not-allowed]=\"group.disabled()\"\n  [class.cursor-pointer]=\"!group.disabled()\"\n>\n  <span class=\"relative inline-flex\">\n    <input\n      type=\"radio\"\n      class=\"peer absolute h-5 w-5 cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [name]=\"group.name()\"\n      [value]=\"value()\"\n      [checked]=\"checked()\"\n      [disabled]=\"group.disabled()\"\n      (change)=\"onChange()\"\n    />\n    <span [class]=\"boxClasses()\">\n      @if (checked()) {\n        <span class=\"h-2 w-2 rounded-full bg-primary\"></span>\n      }\n    </span>\n  </span>\n  @if (label()) {\n    <span class=\"text-sm text-foreground\">{{ label() }}</span>\n  }\n</label>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndRadioOption, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-radio-option', template: "<label\n  class=\"inline-flex items-center gap-2\"\n  [class.cursor-not-allowed]=\"group.disabled()\"\n  [class.cursor-pointer]=\"!group.disabled()\"\n>\n  <span class=\"relative inline-flex\">\n    <input\n      type=\"radio\"\n      class=\"peer absolute h-5 w-5 cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [name]=\"group.name()\"\n      [value]=\"value()\"\n      [checked]=\"checked()\"\n      [disabled]=\"group.disabled()\"\n      (change)=\"onChange()\"\n    />\n    <span [class]=\"boxClasses()\">\n      @if (checked()) {\n        <span class=\"h-2 w-2 rounded-full bg-primary\"></span>\n      }\n    </span>\n  </span>\n  @if (label()) {\n    <span class=\"text-sm text-foreground\">{{ label() }}</span>\n  }\n</label>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }] } });

class RndRouteProgress {
    router = inject(Router);
    loading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    constructor() {
        this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.loading.set(true);
            }
            else if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError) {
                this.loading.set(false);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndRouteProgress, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndRouteProgress, isStandalone: true, selector: "rnd-route-progress", ngImport: i0, template: "@if (loading()) {\n  <div class=\"fixed top-0 right-0 left-0 z-[100] h-0.5 overflow-hidden bg-transparent\">\n    <div\n      class=\"h-full w-1/3 animate-[rnd-route-progress_1s_ease-in-out_infinite] bg-gradient-to-r from-secondary to-primary\"\n    ></div>\n  </div>\n}\n", styles: ["@keyframes rnd-route-progress{0%{transform:translate(-100%)}to{transform:translate(400%)}}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndRouteProgress, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-route-progress', template: "@if (loading()) {\n  <div class=\"fixed top-0 right-0 left-0 z-[100] h-0.5 overflow-hidden bg-transparent\">\n    <div\n      class=\"h-full w-1/3 animate-[rnd-route-progress_1s_ease-in-out_infinite] bg-gradient-to-r from-secondary to-primary\"\n    ></div>\n  </div>\n}\n", styles: ["@keyframes rnd-route-progress{0%{transform:translate(-100%)}to{transform:translate(400%)}}\n"] }]
        }], ctorParameters: () => [] });

class RndSearchInput {
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    placeholder = input('Search...', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    onInput(event) {
        this.value.set(event.target.value);
    }
    clear() {
        this.value.set('');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSearchInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndSearchInput, isStandalone: true, selector: "rnd-search-input", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div\n  class=\"flex h-12 items-center gap-2 border-b-2 border-white/20 bg-black/50 px-4 transition-all duration-200 focus-within:border-primary focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]\"\n>\n  <rnd-icon name=\"search\" [size]=\"16\" class=\"shrink-0 text-muted\" />\n  <input\n    type=\"text\"\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    (input)=\"onInput($event)\"\n    class=\"w-full bg-transparent text-sm text-white focus:outline-none disabled:cursor-not-allowed placeholder:text-white/30\"\n  />\n  @if (value()) {\n    <button\n      type=\"button\"\n      class=\"shrink-0 rounded-full p-0.5 text-muted transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n      aria-label=\"Clear search\"\n      (click)=\"clear()\"\n    >\n      <rnd-icon name=\"close\" [size]=\"12\" />\n    </button>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSearchInput, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-search-input', template: "<div\n  class=\"flex h-12 items-center gap-2 border-b-2 border-white/20 bg-black/50 px-4 transition-all duration-200 focus-within:border-primary focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]\"\n>\n  <rnd-icon name=\"search\" [size]=\"16\" class=\"shrink-0 text-muted\" />\n  <input\n    type=\"text\"\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    (input)=\"onInput($event)\"\n    class=\"w-full bg-transparent text-sm text-white focus:outline-none disabled:cursor-not-allowed placeholder:text-white/30\"\n  />\n  @if (value()) {\n    <button\n      type=\"button\"\n      class=\"shrink-0 rounded-full p-0.5 text-muted transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n      aria-label=\"Clear search\"\n      (click)=\"clear()\"\n    >\n      <rnd-icon name=\"close\" [size]=\"12\" />\n    </button>\n  }\n</div>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

class RndSegmentedControl {
    activeValue = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "activeValue" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSegmentedControl, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndSegmentedControl, isStandalone: true, selector: "rnd-segmented-control", inputs: { activeValue: { classPropertyName: "activeValue", publicName: "activeValue", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { activeValue: "activeValueChange" }, ngImport: i0, template: "<div\n  role=\"tablist\"\n  class=\"inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1\"\n>\n  <ng-content />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSegmentedControl, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-segmented-control', template: "<div\n  role=\"tablist\"\n  class=\"inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1\"\n>\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { activeValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeValue", required: false }] }, { type: i0.Output, args: ["activeValueChange"] }] } });

const BASE_CLASSES$5 = 'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
class RndSegmentedOption {
    value = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    control = inject(RndSegmentedControl);
    active = computed(() => this.control.activeValue() === this.value(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "active" }] : /* istanbul ignore next */ []));
    classes = computed(() => this.active()
        ? `${BASE_CLASSES$5} bg-gradient-to-r from-secondary to-primary text-white`
        : `${BASE_CLASSES$5} text-muted hover:text-foreground`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    onClick() {
        this.control.activeValue.set(this.value());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSegmentedOption, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndSegmentedOption, isStandalone: true, selector: "rnd-segmented-option", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<button\n  type=\"button\"\n  role=\"tab\"\n  [attr.aria-selected]=\"active()\"\n  [class]=\"classes()\"\n  (click)=\"onClick()\"\n>\n  <ng-content />\n</button>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSegmentedOption, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-segmented-option', template: "<button\n  type=\"button\"\n  role=\"tab\"\n  [attr.aria-selected]=\"active()\"\n  [class]=\"classes()\"\n  (click)=\"onClick()\"\n>\n  <ng-content />\n</button>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }] } });

let nextSelectId = 0;
const BASE_CLASSES$4 = 'flex h-12 w-full items-center justify-between border-b-2 bg-black/50 px-4 text-left text-sm text-white transition-all duration-200 focus:outline-none focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]';
class RndSelect {
    options = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    placeholder = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    invalid = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "invalid" }] : /* istanbul ignore next */ []));
    panelId = `rnd-select-${++nextSelectId}`;
    trigger = viewChild.required('trigger', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trigger" }] : /* istanbul ignore next */ []));
    panel = viewChild.required('panel', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panel" }] : /* istanbul ignore next */ []));
    selectedLabel = computed(() => this.options().find((option) => option.value === this.value())?.label ?? '', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedLabel" }] : /* istanbul ignore next */ []));
    containerClasses = computed(() => {
        const classes = [BASE_CLASSES$4];
        classes.push(this.invalid()
            ? 'border-error focus-within:border-error'
            : 'border-white/20 focus-within:border-primary');
        if (this.disabled()) {
            classes.push('cursor-not-allowed opacity-50');
        }
        return classes.join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "containerClasses" }] : /* istanbul ignore next */ []));
    onToggle(event) {
        const newState = event.newState;
        if (newState !== 'open') {
            return;
        }
        this.reposition();
    }
    onReposition() {
        if (this.panel().nativeElement.matches(':popover-open')) {
            this.reposition();
        }
    }
    chooseOption(option) {
        this.value.set(option.value);
        this.panel().nativeElement.hidePopover();
    }
    reposition() {
        positionPopoverPanel(this.panel().nativeElement, this.trigger().nativeElement.getBoundingClientRect(), { matchWidth: true });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSelect, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndSelect, isStandalone: true, selector: "rnd-select", inputs: { options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, invalid: { classPropertyName: "invalid", publicName: "invalid", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, host: { listeners: { "window:scroll": "onReposition()", "window:resize": "onReposition()" } }, viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true, isSignal: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"relative\">\n  <button\n    #trigger\n    type=\"button\"\n    [attr.popovertarget]=\"panelId\"\n    [disabled]=\"disabled()\"\n    [class]=\"containerClasses()\"\n  >\n    <span [class.text-white/30]=\"!selectedLabel()\">{{ selectedLabel() || placeholder() }}</span>\n    <rnd-icon name=\"chevron-down\" [size]=\"16\" class=\"pointer-events-none text-white/50\" />\n  </button>\n  <div\n    #panel\n    [id]=\"panelId\"\n    popover\n    (toggle)=\"onToggle($event)\"\n    class=\"m-0 max-h-64 overflow-y-auto rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n  >\n    @for (option of options(); track option.value) {\n      <button\n        type=\"button\"\n        class=\"flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-white/10\"\n        [class.bg-white/10]=\"option.value === value()\"\n        (click)=\"chooseOption(option)\"\n      >\n        {{ option.label }}\n      </button>\n    }\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSelect, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-select', host: {
                        '(window:scroll)': 'onReposition()',
                        '(window:resize)': 'onReposition()',
                    }, template: "<div class=\"relative\">\n  <button\n    #trigger\n    type=\"button\"\n    [attr.popovertarget]=\"panelId\"\n    [disabled]=\"disabled()\"\n    [class]=\"containerClasses()\"\n  >\n    <span [class.text-white/30]=\"!selectedLabel()\">{{ selectedLabel() || placeholder() }}</span>\n    <rnd-icon name=\"chevron-down\" [size]=\"16\" class=\"pointer-events-none text-white/50\" />\n  </button>\n  <div\n    #panel\n    [id]=\"panelId\"\n    popover\n    (toggle)=\"onToggle($event)\"\n    class=\"m-0 max-h-64 overflow-y-auto rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n  >\n    @for (option of options(); track option.value) {\n      <button\n        type=\"button\"\n        class=\"flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-white/10\"\n        [class.bg-white/10]=\"option.value === value()\"\n        (click)=\"chooseOption(option)\"\n      >\n        {{ option.label }}\n      </button>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], invalid: [{ type: i0.Input, args: [{ isSignal: true, alias: "invalid", required: false }] }], trigger: [{ type: i0.ViewChild, args: ['trigger', { isSignal: true }] }], panel: [{ type: i0.ViewChild, args: ['panel', { isSignal: true }] }] } });

const SIDE_CLASSES = {
    left: 'inset-y-0 left-0 mr-auto border-r border-border',
    right: 'inset-y-0 right-0 ml-auto border-l border-border',
};
class RndSheet {
    open = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    side = input('right', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "side" }] : /* istanbul ignore next */ []));
    closeOnBackdropClick = input(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "closeOnBackdropClick" }] : /* istanbul ignore next */ []));
    dialog = viewChild.required('dialog', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialog" }] : /* istanbul ignore next */ []));
    dialogClasses = computed(() => `fixed m-0 h-full max-h-none w-full max-w-sm bg-[#0f1115]/95 p-0 text-foreground backdrop-blur-lg backdrop:bg-black/60 ${SIDE_CLASSES[this.side()]}`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialogClasses" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            const dialogEl = this.dialog().nativeElement;
            if (this.open()) {
                if (!dialogEl.open) {
                    dialogEl.showModal();
                }
            }
            else if (dialogEl.open) {
                dialogEl.close();
            }
        });
    }
    onDialogClose() {
        this.open.set(false);
    }
    onDialogClick(event) {
        if (this.closeOnBackdropClick() && event.target === this.dialog().nativeElement) {
            this.open.set(false);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSheet, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.7", type: RndSheet, isStandalone: true, selector: "rnd-sheet", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null }, closeOnBackdropClick: { classPropertyName: "closeOnBackdropClick", publicName: "closeOnBackdropClick", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange" }, viewQueries: [{ propertyName: "dialog", first: true, predicate: ["dialog"], descendants: true, isSignal: true }], ngImport: i0, template: "<dialog #dialog [class]=\"dialogClasses()\" (close)=\"onDialogClose()\" (click)=\"onDialogClick($event)\">\n  <div class=\"flex h-full flex-col\">\n    <div class=\"p-6 pb-4 font-heading text-xl font-semibold\">\n      <ng-content select=\"[rndSheetHeader]\" />\n    </div>\n    <div class=\"flex-1 overflow-y-auto px-6 pb-6 text-sm text-muted\">\n      <ng-content />\n    </div>\n    <div class=\"flex justify-end gap-2 border-t border-border p-6\">\n      <ng-content select=\"[rndSheetFooter]\" />\n    </div>\n  </div>\n</dialog>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSheet, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-sheet', template: "<dialog #dialog [class]=\"dialogClasses()\" (close)=\"onDialogClose()\" (click)=\"onDialogClick($event)\">\n  <div class=\"flex h-full flex-col\">\n    <div class=\"p-6 pb-4 font-heading text-xl font-semibold\">\n      <ng-content select=\"[rndSheetHeader]\" />\n    </div>\n    <div class=\"flex-1 overflow-y-auto px-6 pb-6 text-sm text-muted\">\n      <ng-content />\n    </div>\n    <div class=\"flex justify-end gap-2 border-t border-border p-6\">\n      <ng-content select=\"[rndSheetFooter]\" />\n    </div>\n  </div>\n</dialog>\n" }]
        }], ctorParameters: () => [], propDecorators: { open: [{ type: i0.Input, args: [{ isSignal: true, alias: "open", required: false }] }, { type: i0.Output, args: ["openChange"] }], side: [{ type: i0.Input, args: [{ isSignal: true, alias: "side", required: false }] }], closeOnBackdropClick: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeOnBackdropClick", required: false }] }], dialog: [{ type: i0.ViewChild, args: ['dialog', { isSignal: true }] }] } });

class RndSidebar {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSidebar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.7", type: RndSidebar, isStandalone: true, selector: "rnd-sidebar", ngImport: i0, template: "<aside class=\"w-64 shrink-0 border-r border-border bg-surface p-6\">\n  <ng-content />\n</aside>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSidebar, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-sidebar', template: "<aside class=\"w-64 shrink-0 border-r border-border bg-surface p-6\">\n  <ng-content />\n</aside>\n" }]
        }] });

const SHAPE_CLASSES = {
    text: 'rounded-md',
    circle: 'rounded-full',
    rect: 'rounded-lg',
};
class RndSkeleton {
    shape = input('text', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "shape" }] : /* istanbul ignore next */ []));
    width = input('100%', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []));
    height = input('1rem', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []));
    classes = computed(() => ['animate-pulse bg-surface', SHAPE_CLASSES[this.shape()]].join(' '), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSkeleton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndSkeleton, isStandalone: true, selector: "rnd-skeleton", inputs: { shape: { classPropertyName: "shape", publicName: "shape", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<span\n  [class]=\"classes()\"\n  [style.width]=\"width()\"\n  [style.height]=\"height()\"\n  style=\"display: block\"\n></span>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSkeleton, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-skeleton', template: "<span\n  [class]=\"classes()\"\n  [style.width]=\"width()\"\n  [style.height]=\"height()\"\n  style=\"display: block\"\n></span>\n" }]
        }], propDecorators: { shape: [{ type: i0.Input, args: [{ isSignal: true, alias: "shape", required: false }] }], width: [{ type: i0.Input, args: [{ isSignal: true, alias: "width", required: false }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: false }] }] } });

class RndSlider {
    value = model(50, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    min = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "min" }] : /* istanbul ignore next */ []));
    max = input(100, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "max" }] : /* istanbul ignore next */ []));
    step = input(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "step" }] : /* istanbul ignore next */ []));
    fillPercent = computed(() => {
        const min = this.min();
        const max = this.max();
        if (max === min) {
            return 0;
        }
        return ((this.value() - min) / (max - min)) * 100;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "fillPercent" }] : /* istanbul ignore next */ []));
    trackStyle = computed(() => `background: linear-gradient(to right, var(--color-secondary) 0%, var(--color-primary) ${this.fillPercent()}%, rgba(255,255,255,0.1) ${this.fillPercent()}%)`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trackStyle" }] : /* istanbul ignore next */ []));
    onInput(event) {
        this.value.set(Number(event.target.value));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSlider, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndSlider, isStandalone: true, selector: "rnd-slider", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, step: { classPropertyName: "step", publicName: "step", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<input\n  type=\"range\"\n  class=\"rnd-slider-input h-2 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n  [min]=\"min()\"\n  [max]=\"max()\"\n  [step]=\"step()\"\n  [value]=\"value()\"\n  [style]=\"trackStyle()\"\n  (input)=\"onInput($event)\"\n/>\n", styles: [".rnd-slider-input::-webkit-slider-runnable-track{height:8px;border-radius:9999px}.rnd-slider-input::-moz-range-track{height:8px;border-radius:9999px}.rnd-slider-input::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:16px;height:16px;margin-top:-4px;border-radius:9999px;background:#fff;border:2px solid var(--color-primary);cursor:pointer;box-shadow:0 0 10px -2px #f7931a99}.rnd-slider-input::-moz-range-thumb{width:16px;height:16px;border-radius:9999px;background:#fff;border:2px solid var(--color-primary);cursor:pointer;box-shadow:0 0 10px -2px #f7931a99}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSlider, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-slider', template: "<input\n  type=\"range\"\n  class=\"rnd-slider-input h-2 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n  [min]=\"min()\"\n  [max]=\"max()\"\n  [step]=\"step()\"\n  [value]=\"value()\"\n  [style]=\"trackStyle()\"\n  (input)=\"onInput($event)\"\n/>\n", styles: [".rnd-slider-input::-webkit-slider-runnable-track{height:8px;border-radius:9999px}.rnd-slider-input::-moz-range-track{height:8px;border-radius:9999px}.rnd-slider-input::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:16px;height:16px;margin-top:-4px;border-radius:9999px;background:#fff;border:2px solid var(--color-primary);cursor:pointer;box-shadow:0 0 10px -2px #f7931a99}.rnd-slider-input::-moz-range-thumb{width:16px;height:16px;border-radius:9999px;background:#fff;border:2px solid var(--color-primary);cursor:pointer;box-shadow:0 0 10px -2px #f7931a99}\n"] }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], min: [{ type: i0.Input, args: [{ isSignal: true, alias: "min", required: false }] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }], step: [{ type: i0.Input, args: [{ isSignal: true, alias: "step", required: false }] }] } });

const STROKE_CLASSES = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-primary',
};
class RndSparkline {
    data = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "data" }] : /* istanbul ignore next */ []));
    width = input(100, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []));
    height = input(32, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []));
    trend = input('neutral', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trend" }] : /* istanbul ignore next */ []));
    strokeClasses = computed(() => STROKE_CLASSES[this.trend()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "strokeClasses" }] : /* istanbul ignore next */ []));
    points = computed(() => {
        const data = this.data();
        if (data.length < 2) {
            return '';
        }
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;
        const width = this.width();
        const height = this.height();
        const stepX = width / (data.length - 1);
        return data
            .map((value, i) => {
            const x = i * stepX;
            const y = height - ((value - min) / range) * height;
            return `${x},${y}`;
        })
            .join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "points" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSparkline, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndSparkline, isStandalone: true, selector: "rnd-sparkline", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null }, trend: { classPropertyName: "trend", publicName: "trend", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<svg\n  [attr.viewBox]=\"'0 0 ' + width() + ' ' + height()\"\n  [attr.width]=\"width()\"\n  [attr.height]=\"height()\"\n  fill=\"none\"\n  preserveAspectRatio=\"none\"\n>\n  <polyline\n    [attr.points]=\"points()\"\n    fill=\"none\"\n    stroke=\"currentColor\"\n    [class]=\"strokeClasses()\"\n    stroke-width=\"2\"\n    stroke-linecap=\"round\"\n    stroke-linejoin=\"round\"\n  />\n</svg>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSparkline, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-sparkline', template: "<svg\n  [attr.viewBox]=\"'0 0 ' + width() + ' ' + height()\"\n  [attr.width]=\"width()\"\n  [attr.height]=\"height()\"\n  fill=\"none\"\n  preserveAspectRatio=\"none\"\n>\n  <polyline\n    [attr.points]=\"points()\"\n    fill=\"none\"\n    stroke=\"currentColor\"\n    [class]=\"strokeClasses()\"\n    stroke-width=\"2\"\n    stroke-linecap=\"round\"\n    stroke-linejoin=\"round\"\n  />\n</svg>\n" }]
        }], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }], width: [{ type: i0.Input, args: [{ isSignal: true, alias: "width", required: false }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: false }] }], trend: [{ type: i0.Input, args: [{ isSignal: true, alias: "trend", required: false }] }] } });

const SIZE_CLASSES = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
};
const VARIANT_CLASSES$1 = {
    primary: 'text-primary',
    foreground: 'text-foreground',
    muted: 'text-muted',
};
class RndSpinner {
    size = input('md', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    variant = input('primary', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    classes = computed(() => ['animate-spin', SIZE_CLASSES[this.size()], VARIANT_CLASSES$1[this.variant()]].join(' '), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSpinner, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndSpinner, isStandalone: true, selector: "rnd-spinner", inputs: { size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<svg [class]=\"classes()\" viewBox=\"0 0 24 24\" fill=\"none\" role=\"status\" aria-label=\"Loading\">\n  <circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"3\" opacity=\"0.25\" />\n  <path d=\"M12 2a10 10 0 0 1 10 10\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" />\n</svg>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSpinner, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-spinner', template: "<svg [class]=\"classes()\" viewBox=\"0 0 24 24\" fill=\"none\" role=\"status\" aria-label=\"Loading\">\n  <circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"3\" opacity=\"0.25\" />\n  <path d=\"M12 2a10 10 0 0 1 10 10\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" />\n</svg>\n" }]
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }] } });

class RndSplitButton {
    label = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    action = output();
    trigger = viewChild.required('trigger', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trigger" }] : /* istanbul ignore next */ []));
    panel = viewChild.required('panel', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panel" }] : /* istanbul ignore next */ []));
    onToggleClick() {
        const panelEl = this.panel().nativeElement;
        if (panelEl.matches(':popover-open')) {
            panelEl.hidePopover();
            return;
        }
        this.reposition();
        panelEl.showPopover();
    }
    onReposition() {
        if (this.panel().nativeElement.matches(':popover-open')) {
            this.reposition();
        }
    }
    reposition() {
        positionPopoverPanel(this.panel().nativeElement, this.trigger().nativeElement.getBoundingClientRect());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSplitButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.7", type: RndSplitButton, isStandalone: true, selector: "rnd-split-button", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { action: "action" }, host: { listeners: { "window:scroll": "onReposition()", "window:resize": "onReposition()" } }, viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true, isSignal: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"inline-flex rounded-full shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)]\">\n  <button\n    type=\"button\"\n    class=\"rounded-l-full bg-gradient-to-r from-secondary to-primary px-6 py-2.5 text-sm font-semibold tracking-wider text-white uppercase transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50\"\n    [disabled]=\"disabled()\"\n    (click)=\"action.emit()\"\n  >\n    {{ label() }}\n  </button>\n  <button\n    #trigger\n    type=\"button\"\n    class=\"rounded-r-full border-l border-white/20 bg-gradient-to-r from-secondary to-primary px-3 text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50\"\n    [disabled]=\"disabled()\"\n    aria-label=\"More actions\"\n    (click)=\"onToggleClick()\"\n  >\n    <rnd-icon name=\"chevron-down\" [size]=\"14\" />\n  </button>\n</div>\n<div\n  #panel\n  popover\n  class=\"m-0 min-w-40 rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n>\n  <ng-content />\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSplitButton, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-split-button', host: {
                        '(window:scroll)': 'onReposition()',
                        '(window:resize)': 'onReposition()',
                    }, template: "<div class=\"inline-flex rounded-full shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)]\">\n  <button\n    type=\"button\"\n    class=\"rounded-l-full bg-gradient-to-r from-secondary to-primary px-6 py-2.5 text-sm font-semibold tracking-wider text-white uppercase transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50\"\n    [disabled]=\"disabled()\"\n    (click)=\"action.emit()\"\n  >\n    {{ label() }}\n  </button>\n  <button\n    #trigger\n    type=\"button\"\n    class=\"rounded-r-full border-l border-white/20 bg-gradient-to-r from-secondary to-primary px-3 text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50\"\n    [disabled]=\"disabled()\"\n    aria-label=\"More actions\"\n    (click)=\"onToggleClick()\"\n  >\n    <rnd-icon name=\"chevron-down\" [size]=\"14\" />\n  </button>\n</div>\n<div\n  #panel\n  popover\n  class=\"m-0 min-w-40 rounded-xl border border-border bg-[#0f1115]/95 p-1.5 text-foreground backdrop-blur-lg\"\n>\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], action: [{ type: i0.Output, args: ["action"] }], trigger: [{ type: i0.ViewChild, args: ['trigger', { isSignal: true }] }], panel: [{ type: i0.ViewChild, args: ['panel', { isSignal: true }] }] } });

class RndStatCard {
    label = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    value = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    delta = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "delta" }] : /* istanbul ignore next */ []));
    trend = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "trend" }] : /* istanbul ignore next */ []));
    resolvedTrend = computed(() => {
        const trend = this.trend();
        if (trend) {
            return trend;
        }
        const delta = this.delta();
        if (delta === undefined || delta === 0) {
            return 'neutral';
        }
        return delta > 0 ? 'up' : 'down';
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "resolvedTrend" }] : /* istanbul ignore next */ []));
    deltaClasses = computed(() => {
        const trend = this.resolvedTrend();
        if (trend === 'up') {
            return 'text-success';
        }
        if (trend === 'down') {
            return 'text-error';
        }
        return 'text-muted';
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "deltaClasses" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndStatCard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndStatCard, isStandalone: true, selector: "rnd-stat-card", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, delta: { classPropertyName: "delta", publicName: "delta", isSignal: true, isRequired: false, transformFunction: null }, trend: { classPropertyName: "trend", publicName: "trend", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6\">\n  <div class=\"flex items-center gap-3\">\n    <ng-content select=\"[rndStatCardIcon]\" />\n    <span class=\"font-mono text-xs tracking-wider text-muted uppercase\">{{ label() }}</span>\n  </div>\n  <div class=\"flex items-baseline gap-2\">\n    <span class=\"font-heading text-2xl font-semibold text-foreground\">{{ value() }}</span>\n    @if (delta() !== undefined) {\n      <span class=\"flex items-center gap-0.5 text-xs font-medium\" [class]=\"deltaClasses()\">\n        @if (resolvedTrend() === 'up') {\n          <rnd-icon name=\"chevron-up\" [size]=\"12\" />\n        } @else if (resolvedTrend() === 'down') {\n          <rnd-icon name=\"chevron-down\" [size]=\"12\" />\n        }\n        {{ delta() }}%\n      </span>\n    }\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndStatCard, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-stat-card', template: "<div class=\"flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6\">\n  <div class=\"flex items-center gap-3\">\n    <ng-content select=\"[rndStatCardIcon]\" />\n    <span class=\"font-mono text-xs tracking-wider text-muted uppercase\">{{ label() }}</span>\n  </div>\n  <div class=\"flex items-baseline gap-2\">\n    <span class=\"font-heading text-2xl font-semibold text-foreground\">{{ value() }}</span>\n    @if (delta() !== undefined) {\n      <span class=\"flex items-center gap-0.5 text-xs font-medium\" [class]=\"deltaClasses()\">\n        @if (resolvedTrend() === 'up') {\n          <rnd-icon name=\"chevron-up\" [size]=\"12\" />\n        } @else if (resolvedTrend() === 'down') {\n          <rnd-icon name=\"chevron-down\" [size]=\"12\" />\n        }\n        {{ delta() }}%\n      </span>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], delta: [{ type: i0.Input, args: [{ isSignal: true, alias: "delta", required: false }] }], trend: [{ type: i0.Input, args: [{ isSignal: true, alias: "trend", required: false }] }] } });

const BASE_CLASSES$3 = 'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
class RndSwitch {
    checked = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    ariaLabel = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    trackClasses = computed(() => {
        const classes = [
            BASE_CLASSES$3,
            this.checked() ? 'bg-gradient-to-r from-secondary to-primary' : 'bg-white/20',
        ];
        if (this.disabled()) {
            classes.push('cursor-not-allowed opacity-50');
        }
        return classes.join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trackClasses" }] : /* istanbul ignore next */ []));
    thumbClasses = computed(() => this.checked() ? 'translate-x-5 bg-white' : 'translate-x-0.5 bg-white', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "thumbClasses" }] : /* istanbul ignore next */ []));
    toggle() {
        if (this.disabled()) {
            return;
        }
        this.checked.set(!this.checked());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSwitch, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndSwitch, isStandalone: true, selector: "rnd-switch", inputs: { checked: { classPropertyName: "checked", publicName: "checked", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { checked: "checkedChange" }, ngImport: i0, template: "<button\n  type=\"button\"\n  role=\"switch\"\n  [attr.aria-checked]=\"checked()\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [disabled]=\"disabled()\"\n  [class]=\"trackClasses()\"\n  (click)=\"toggle()\"\n>\n  <span\n    class=\"inline-block h-5 w-5 transform rounded-full shadow transition-transform duration-300\"\n    [class]=\"thumbClasses()\"\n  ></span>\n</button>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndSwitch, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-switch', template: "<button\n  type=\"button\"\n  role=\"switch\"\n  [attr.aria-checked]=\"checked()\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [disabled]=\"disabled()\"\n  [class]=\"trackClasses()\"\n  (click)=\"toggle()\"\n>\n  <span\n    class=\"inline-block h-5 w-5 transform rounded-full shadow transition-transform duration-300\"\n    [class]=\"thumbClasses()\"\n  ></span>\n</button>\n" }]
        }], propDecorators: { checked: [{ type: i0.Input, args: [{ isSignal: true, alias: "checked", required: false }] }, { type: i0.Output, args: ["checkedChange"] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }] } });

class RndTable {
    striped = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "striped" }] : /* istanbul ignore next */ []));
    hoverable = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hoverable" }] : /* istanbul ignore next */ []));
    tableClasses = computed(() => {
        const classes = ['w-full text-left text-sm'];
        if (this.striped()) {
            classes.push('[&>tbody>tr:nth-child(odd)]:bg-white/5');
        }
        if (this.hoverable()) {
            classes.push('[&>tbody>tr]:transition-colors [&>tbody>tr:hover]:bg-white/10');
        }
        return classes.join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tableClasses" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTable, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndTable, isStandalone: true, selector: "rnd-table", inputs: { striped: { classPropertyName: "striped", publicName: "striped", isSignal: true, isRequired: false, transformFunction: null }, hoverable: { classPropertyName: "hoverable", publicName: "hoverable", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"overflow-x-auto rounded-xl border border-border\">\n  <table [class]=\"tableClasses()\">\n    <ng-content />\n  </table>\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTable, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-table', template: "<div class=\"overflow-x-auto rounded-xl border border-border\">\n  <table [class]=\"tableClasses()\">\n    <ng-content />\n  </table>\n</div>\n" }]
        }], propDecorators: { striped: [{ type: i0.Input, args: [{ isSignal: true, alias: "striped", required: false }] }], hoverable: [{ type: i0.Input, args: [{ isSignal: true, alias: "hoverable", required: false }] }] } });

class RndTabs {
    activeValue = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "activeValue" }] : /* istanbul ignore next */ []));
    variant = input('underline', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    containerClasses = computed(() => this.variant() === 'pills' ? 'flex items-center gap-2' : 'flex gap-6 border-b border-border', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "containerClasses" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTabs, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndTabs, isStandalone: true, selector: "rnd-tabs", inputs: { activeValue: { classPropertyName: "activeValue", publicName: "activeValue", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { activeValue: "activeValueChange" }, ngImport: i0, template: "<div role=\"tablist\" [class]=\"containerClasses()\">\n  <ng-content />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTabs, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-tabs', template: "<div role=\"tablist\" [class]=\"containerClasses()\">\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { activeValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeValue", required: false }] }, { type: i0.Output, args: ["activeValueChange"] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }] } });

const UNDERLINE_BASE_CLASSES = 'relative flex items-center gap-2 px-1 pb-3 font-body text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
const PILLS_BASE_CLASSES = 'flex items-center gap-2 rounded-full px-4 py-1.5 font-body text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
class RndTab {
    value = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    tabs = inject(RndTabs);
    active = computed(() => this.tabs.activeValue() === this.value(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "active" }] : /* istanbul ignore next */ []));
    classes = computed(() => {
        if (this.tabs.variant() === 'pills') {
            return this.active()
                ? `${PILLS_BASE_CLASSES} bg-gradient-to-r from-secondary to-primary text-white`
                : `${PILLS_BASE_CLASSES} text-muted hover:text-foreground`;
        }
        return this.active()
            ? `${UNDERLINE_BASE_CLASSES} text-foreground`
            : `${UNDERLINE_BASE_CLASSES} text-muted`;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    onClick() {
        this.tabs.activeValue.set(this.value());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTab, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndTab, isStandalone: true, selector: "rnd-tab", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<button\n  type=\"button\"\n  role=\"tab\"\n  [attr.aria-selected]=\"active()\"\n  [class]=\"classes()\"\n  (click)=\"onClick()\"\n>\n  <ng-content />\n  @if (active() && tabs.variant() === 'underline') {\n    <span\n      class=\"absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-secondary to-primary\"\n    ></span>\n  }\n</button>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTab, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-tab', template: "<button\n  type=\"button\"\n  role=\"tab\"\n  [attr.aria-selected]=\"active()\"\n  [class]=\"classes()\"\n  (click)=\"onClick()\"\n>\n  <ng-content />\n  @if (active() && tabs.variant() === 'underline') {\n    <span\n      class=\"absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-secondary to-primary\"\n    ></span>\n  }\n</button>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }] } });

class RndTagInput {
    tags = model([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tags" }] : /* istanbul ignore next */ []));
    placeholder = input('Add a tag...', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    draft = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "draft" }] : /* istanbul ignore next */ []));
    onInput(event) {
        this.draft.set(event.target.value);
    }
    onKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.addTag();
        }
        else if (event.key === 'Backspace' && !this.draft() && this.tags().length > 0) {
            this.removeTag(this.tags().length - 1);
        }
    }
    removeTag(index) {
        this.tags.set(this.tags().filter((_, i) => i !== index));
    }
    addTag() {
        const value = this.draft().trim();
        if (value && !this.tags().includes(value)) {
            this.tags.set([...this.tags(), value]);
        }
        this.draft.set('');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTagInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndTagInput, isStandalone: true, selector: "rnd-tag-input", inputs: { tags: { classPropertyName: "tags", publicName: "tags", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { tags: "tagsChange" }, ngImport: i0, template: "<div\n  class=\"flex flex-wrap items-center gap-2 border-b-2 border-white/20 bg-black/50 px-4 py-2 transition-all duration-200 focus-within:border-primary\"\n>\n  @for (tag of tags(); track tag; let i = $index) {\n    <span\n      class=\"inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs text-foreground\"\n    >\n      {{ tag }}\n      <button\n        type=\"button\"\n        class=\"text-muted transition-colors hover:text-error\"\n        aria-label=\"Remove tag\"\n        (click)=\"removeTag(i)\"\n      >\n        <rnd-icon name=\"close\" [size]=\"10\" />\n      </button>\n    </span>\n  }\n  <input\n    type=\"text\"\n    class=\"min-w-24 flex-1 bg-transparent py-1 text-sm text-white focus:outline-none placeholder:text-white/30\"\n    [placeholder]=\"placeholder()\"\n    [value]=\"draft()\"\n    (input)=\"onInput($event)\"\n    (keydown)=\"onKeydown($event)\"\n  />\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTagInput, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-tag-input', template: "<div\n  class=\"flex flex-wrap items-center gap-2 border-b-2 border-white/20 bg-black/50 px-4 py-2 transition-all duration-200 focus-within:border-primary\"\n>\n  @for (tag of tags(); track tag; let i = $index) {\n    <span\n      class=\"inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs text-foreground\"\n    >\n      {{ tag }}\n      <button\n        type=\"button\"\n        class=\"text-muted transition-colors hover:text-error\"\n        aria-label=\"Remove tag\"\n        (click)=\"removeTag(i)\"\n      >\n        <rnd-icon name=\"close\" [size]=\"10\" />\n      </button>\n    </span>\n  }\n  <input\n    type=\"text\"\n    class=\"min-w-24 flex-1 bg-transparent py-1 text-sm text-white focus:outline-none placeholder:text-white/30\"\n    [placeholder]=\"placeholder()\"\n    [value]=\"draft()\"\n    (input)=\"onInput($event)\"\n    (keydown)=\"onKeydown($event)\"\n  />\n</div>\n" }]
        }], propDecorators: { tags: [{ type: i0.Input, args: [{ isSignal: true, alias: "tags", required: false }] }, { type: i0.Output, args: ["tagsChange"] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }] } });

const BASE_CLASSES$2 = 'flex items-start gap-2 border-b-2 bg-black/50 px-4 py-3 transition-all duration-200 focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]';
class RndTextarea {
    value = model('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    placeholder = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    invalid = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "invalid" }] : /* istanbul ignore next */ []));
    rows = input(3, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []));
    containerClasses = computed(() => {
        const classes = [BASE_CLASSES$2];
        classes.push(this.invalid()
            ? 'border-error focus-within:border-error'
            : 'border-white/20 focus-within:border-primary');
        if (this.disabled()) {
            classes.push('cursor-not-allowed opacity-50');
        }
        return classes.join(' ');
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "containerClasses" }] : /* istanbul ignore next */ []));
    onInput(event) {
        this.value.set(event.target.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTextarea, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndTextarea, isStandalone: true, selector: "rnd-textarea", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, invalid: { classPropertyName: "invalid", publicName: "invalid", isSignal: true, isRequired: false, transformFunction: null }, rows: { classPropertyName: "rows", publicName: "rows", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, ngImport: i0, template: "<div [class]=\"containerClasses()\">\n  <textarea\n    [rows]=\"rows()\"\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    (input)=\"onInput($event)\"\n    class=\"w-full resize-none bg-transparent text-sm text-white focus:outline-none disabled:cursor-not-allowed placeholder:text-white/30\"\n  ></textarea>\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTextarea, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-textarea', template: "<div [class]=\"containerClasses()\">\n  <textarea\n    [rows]=\"rows()\"\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"disabled()\"\n    (input)=\"onInput($event)\"\n    class=\"w-full resize-none bg-transparent text-sm text-white focus:outline-none disabled:cursor-not-allowed placeholder:text-white/30\"\n  ></textarea>\n</div>\n" }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], invalid: [{ type: i0.Input, args: [{ isSignal: true, alias: "invalid", required: false }] }], rows: [{ type: i0.Input, args: [{ isSignal: true, alias: "rows", required: false }] }] } });

const DEFAULT_TIME = { hour: 12, minute: 0, period: 'AM' };
class RndTimePicker {
    selected = model(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selected" }] : /* istanbul ignore next */ []));
    draftHour = computed(() => (this.selected() ?? DEFAULT_TIME).hour, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "draftHour" }] : /* istanbul ignore next */ []));
    draftMinute = computed(() => (this.selected() ?? DEFAULT_TIME).minute, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "draftMinute" }] : /* istanbul ignore next */ []));
    draftPeriod = computed(() => (this.selected() ?? DEFAULT_TIME).period, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "draftPeriod" }] : /* istanbul ignore next */ []));
    onHourChange(hour) {
        this.selected.set({ ...(this.selected() ?? DEFAULT_TIME), hour });
    }
    onMinuteChange(minute) {
        this.selected.set({ ...(this.selected() ?? DEFAULT_TIME), minute });
    }
    onPeriodChange(period) {
        this.selected.set({ ...(this.selected() ?? DEFAULT_TIME), period: period });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTimePicker, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndTimePicker, isStandalone: true, selector: "rnd-time-picker", inputs: { selected: { classPropertyName: "selected", publicName: "selected", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selectedChange" }, ngImport: i0, template: "<div class=\"flex items-center gap-3 rounded-lg border-b-2 border-white/20 bg-black/50 px-4 py-3\">\n  <rnd-number-stepper\n    [value]=\"draftHour()\"\n    [min]=\"1\"\n    [max]=\"12\"\n    (valueChange)=\"onHourChange($event)\"\n  />\n  <span class=\"font-heading text-lg font-semibold text-white\">:</span>\n  <rnd-number-stepper\n    [value]=\"draftMinute()\"\n    [min]=\"0\"\n    [max]=\"59\"\n    (valueChange)=\"onMinuteChange($event)\"\n  />\n  <rnd-segmented-control [activeValue]=\"draftPeriod()\" (activeValueChange)=\"onPeriodChange($event)\">\n    <rnd-segmented-option value=\"AM\">AM</rnd-segmented-option>\n    <rnd-segmented-option value=\"PM\">PM</rnd-segmented-option>\n  </rnd-segmented-control>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndNumberStepper, selector: "rnd-number-stepper", inputs: ["value", "min", "max", "step", "disabled"], outputs: ["valueChange"] }, { kind: "component", type: RndSegmentedControl, selector: "rnd-segmented-control", inputs: ["activeValue"], outputs: ["activeValueChange"] }, { kind: "component", type: RndSegmentedOption, selector: "rnd-segmented-option", inputs: ["value"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTimePicker, decorators: [{
            type: Component,
            args: [{ imports: [RndNumberStepper, RndSegmentedControl, RndSegmentedOption], selector: 'rnd-time-picker', template: "<div class=\"flex items-center gap-3 rounded-lg border-b-2 border-white/20 bg-black/50 px-4 py-3\">\n  <rnd-number-stepper\n    [value]=\"draftHour()\"\n    [min]=\"1\"\n    [max]=\"12\"\n    (valueChange)=\"onHourChange($event)\"\n  />\n  <span class=\"font-heading text-lg font-semibold text-white\">:</span>\n  <rnd-number-stepper\n    [value]=\"draftMinute()\"\n    [min]=\"0\"\n    [max]=\"59\"\n    (valueChange)=\"onMinuteChange($event)\"\n  />\n  <rnd-segmented-control [activeValue]=\"draftPeriod()\" (activeValueChange)=\"onPeriodChange($event)\">\n    <rnd-segmented-option value=\"AM\">AM</rnd-segmented-option>\n    <rnd-segmented-option value=\"PM\">PM</rnd-segmented-option>\n  </rnd-segmented-control>\n</div>\n" }]
        }], propDecorators: { selected: [{ type: i0.Input, args: [{ isSignal: true, alias: "selected", required: false }] }, { type: i0.Output, args: ["selectedChange"] }] } });

class RndTimeline {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTimeline, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.7", type: RndTimeline, isStandalone: true, selector: "rnd-timeline", ngImport: i0, template: "<div class=\"relative flex flex-col gap-8\">\n  <div\n    class=\"absolute top-2 bottom-2 left-6 w-px bg-gradient-to-b from-primary to-transparent\"\n  ></div>\n  <ng-content />\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTimeline, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-timeline', template: "<div class=\"relative flex flex-col gap-8\">\n  <div\n    class=\"absolute top-2 bottom-2 left-6 w-px bg-gradient-to-b from-primary to-transparent\"\n  ></div>\n  <ng-content />\n</div>\n" }]
        }] });

class RndTimelineItem {
    step = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "step" }] : /* istanbul ignore next */ []));
    title = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    description = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "description" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTimelineItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndTimelineItem, isStandalone: true, selector: "rnd-timeline-item", inputs: { step: { classPropertyName: "step", publicName: "step", isSignal: true, isRequired: true, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"relative flex gap-4\">\n  <span\n    class=\"relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary bg-background font-heading text-sm font-semibold text-primary\"\n  >\n    {{ step() }}\n  </span>\n  <div class=\"flex flex-col gap-1 pt-2\">\n    <h4 class=\"font-heading text-base font-semibold text-foreground\">{{ title() }}</h4>\n    @if (description()) {\n      <p class=\"text-sm text-muted\">{{ description() }}</p>\n    }\n  </div>\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTimelineItem, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-timeline-item', template: "<div class=\"relative flex gap-4\">\n  <span\n    class=\"relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary bg-background font-heading text-sm font-semibold text-primary\"\n  >\n    {{ step() }}\n  </span>\n  <div class=\"flex flex-col gap-1 pt-2\">\n    <h4 class=\"font-heading text-base font-semibold text-foreground\">{{ title() }}</h4>\n    @if (description()) {\n      <p class=\"text-sm text-muted\">{{ description() }}</p>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { step: [{ type: i0.Input, args: [{ isSignal: true, alias: "step", required: true }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }] } });

const VARIANT_CLASSES = {
    info: 'border-info/40 text-info',
    success: 'border-success/40 text-success',
    warning: 'border-warning/40 text-warning',
    error: 'border-error/40 text-error',
};
class RndToast {
    message = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
    variant = input('info', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    dismiss = output();
    classes = computed(() => [
        'flex items-center gap-3 rounded-xl border bg-[#0f1115]/95 px-4 py-3 text-sm text-foreground shadow-[0_0_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-lg',
        VARIANT_CLASSES[this.variant()],
    ].join(' '), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndToast, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndToast, isStandalone: true, selector: "rnd-toast", inputs: { message: { classPropertyName: "message", publicName: "message", isSignal: true, isRequired: true, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { dismiss: "dismiss" }, ngImport: i0, template: "<div [class]=\"classes()\" role=\"status\">\n  <span class=\"flex-1\">{{ message() }}</span>\n  <button\n    type=\"button\"\n    class=\"shrink-0 rounded-full p-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    aria-label=\"Dismiss\"\n    (click)=\"dismiss.emit()\"\n  >\n    <rnd-icon name=\"close\" [size]=\"12\" />\n  </button>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndIcon, selector: "rnd-icon", inputs: ["name", "weight", "variant", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndToast, decorators: [{
            type: Component,
            args: [{ imports: [RndIcon], selector: 'rnd-toast', template: "<div [class]=\"classes()\" role=\"status\">\n  <span class=\"flex-1\">{{ message() }}</span>\n  <button\n    type=\"button\"\n    class=\"shrink-0 rounded-full p-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary\"\n    aria-label=\"Dismiss\"\n    (click)=\"dismiss.emit()\"\n  >\n    <rnd-icon name=\"close\" [size]=\"12\" />\n  </button>\n</div>\n" }]
        }], propDecorators: { message: [{ type: i0.Input, args: [{ isSignal: true, alias: "message", required: true }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], dismiss: [{ type: i0.Output, args: ["dismiss"] }] } });

let nextToastId = 0;
class RndToastService {
    toasts = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toasts" }] : /* istanbul ignore next */ []));
    entries = this.toasts.asReadonly();
    show(message, variant = 'info', duration = 4000) {
        const id = ++nextToastId;
        this.toasts.update((current) => [...current, { id, message, variant }]);
        setTimeout(() => this.dismiss(id), duration);
        return id;
    }
    dismiss(id) {
        this.toasts.update((current) => current.filter((toast) => toast.id !== id));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndToastService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndToastService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class RndToastOutlet {
    toastService = inject(RndToastService);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndToastOutlet, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndToastOutlet, isStandalone: true, selector: "rnd-toast-outlet", ngImport: i0, template: "<div class=\"pointer-events-none fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2\">\n  @for (toast of toastService.entries(); track toast.id) {\n    <div class=\"pointer-events-auto\">\n      <rnd-toast\n        [message]=\"toast.message\"\n        [variant]=\"toast.variant\"\n        (dismiss)=\"toastService.dismiss(toast.id)\"\n      />\n    </div>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: RndToast, selector: "rnd-toast", inputs: ["message", "variant"], outputs: ["dismiss"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndToastOutlet, decorators: [{
            type: Component,
            args: [{ imports: [RndToast], selector: 'rnd-toast-outlet', template: "<div class=\"pointer-events-none fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2\">\n  @for (toast of toastService.entries(); track toast.id) {\n    <div class=\"pointer-events-auto\">\n      <rnd-toast\n        [message]=\"toast.message\"\n        [variant]=\"toast.variant\"\n        (dismiss)=\"toastService.dismiss(toast.id)\"\n      />\n    </div>\n  }\n</div>\n" }]
        }] });

const BASE_CLASSES$1 = 'inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50';
class RndToggle {
    pressed = model(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pressed" }] : /* istanbul ignore next */ []));
    disabled = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    ariaLabel = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    classes = computed(() => this.pressed()
        ? `${BASE_CLASSES$1} border-primary bg-primary/15 text-primary`
        : `${BASE_CLASSES$1} border-white/20 bg-transparent text-muted hover:bg-white/5 hover:text-foreground`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
    toggle() {
        if (!this.disabled()) {
            this.pressed.set(!this.pressed());
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndToggle, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndToggle, isStandalone: true, selector: "rnd-toggle", inputs: { pressed: { classPropertyName: "pressed", publicName: "pressed", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { pressed: "pressedChange" }, ngImport: i0, template: "<button\n  type=\"button\"\n  [attr.aria-pressed]=\"pressed()\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [disabled]=\"disabled()\"\n  [class]=\"classes()\"\n  (click)=\"toggle()\"\n>\n  <ng-content />\n</button>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndToggle, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-toggle', template: "<button\n  type=\"button\"\n  [attr.aria-pressed]=\"pressed()\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [disabled]=\"disabled()\"\n  [class]=\"classes()\"\n  (click)=\"toggle()\"\n>\n  <ng-content />\n</button>\n" }]
        }], propDecorators: { pressed: [{ type: i0.Input, args: [{ isSignal: true, alias: "pressed", required: false }] }, { type: i0.Output, args: ["pressedChange"] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }] } });

const PLACEMENT_CLASSES = {
    top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
    bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
    left: 'right-full top-1/2 mr-2 -translate-y-1/2',
    right: 'left-full top-1/2 ml-2 -translate-y-1/2',
};
const BASE_CLASSES = 'pointer-events-none absolute z-50 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs whitespace-nowrap text-foreground opacity-0 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100';
class RndTooltip {
    text = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "text" }] : /* istanbul ignore next */ []));
    placement = input('top', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placement" }] : /* istanbul ignore next */ []));
    tooltipClasses = computed(() => [BASE_CLASSES, PLACEMENT_CLASSES[this.placement()]].join(' '), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tooltipClasses" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTooltip, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "22.1.7", type: RndTooltip, isStandalone: true, selector: "rnd-tooltip", inputs: { text: { classPropertyName: "text", publicName: "text", isSignal: true, isRequired: true, transformFunction: null }, placement: { classPropertyName: "placement", publicName: "placement", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<span class=\"group relative inline-flex\">\n  <ng-content />\n  <span [class]=\"tooltipClasses()\" role=\"tooltip\">{{ text() }}</span>\n</span>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTooltip, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-tooltip', template: "<span class=\"group relative inline-flex\">\n  <ng-content />\n  <span [class]=\"tooltipClasses()\" role=\"tooltip\">{{ text() }}</span>\n</span>\n" }]
        }], propDecorators: { text: [{ type: i0.Input, args: [{ isSignal: true, alias: "text", required: true }] }], placement: [{ type: i0.Input, args: [{ isSignal: true, alias: "placement", required: false }] }] } });

const STATUS_CLASSES = {
    confirmed: 'text-success',
    pending: 'text-warning',
    failed: 'text-error',
};
class RndTransactionItem {
    direction = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "direction" }] : /* istanbul ignore next */ []));
    title = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    amount = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "amount" }] : /* istanbul ignore next */ []));
    status = input('confirmed', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
    timestamp = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "timestamp" }] : /* istanbul ignore next */ []));
    statusClasses = computed(() => STATUS_CLASSES[this.status()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "statusClasses" }] : /* istanbul ignore next */ []));
    iconWrapperClasses = computed(() => this.direction() === 'in'
        ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/15 text-success'
        : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-muted', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "iconWrapperClasses" }] : /* istanbul ignore next */ []));
    amountClasses = computed(() => this.direction() === 'in' ? 'text-success' : 'text-foreground', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "amountClasses" }] : /* istanbul ignore next */ []));
    amountPrefix = computed(() => (this.direction() === 'in' ? '+' : '-'), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "amountPrefix" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTransactionItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.7", type: RndTransactionItem, isStandalone: true, selector: "rnd-transaction-item", inputs: { direction: { classPropertyName: "direction", publicName: "direction", isSignal: true, isRequired: true, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, amount: { classPropertyName: "amount", publicName: "amount", isSignal: true, isRequired: true, transformFunction: null }, status: { classPropertyName: "status", publicName: "status", isSignal: true, isRequired: false, transformFunction: null }, timestamp: { classPropertyName: "timestamp", publicName: "timestamp", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5\">\n  <span [class]=\"iconWrapperClasses()\">\n    <ng-content select=\"[rndTransactionItemIcon]\" />\n  </span>\n  <div class=\"flex flex-1 flex-col\">\n    <span class=\"font-body text-sm font-medium text-foreground\">{{ title() }}</span>\n    @if (timestamp()) {\n      <span class=\"text-xs text-muted\">{{ timestamp() }}</span>\n    }\n  </div>\n  <div class=\"flex flex-col items-end\">\n    <span class=\"font-mono text-sm font-medium\" [class]=\"amountClasses()\"\n      >{{ amountPrefix() }}{{ amount() }}</span\n    >\n    <span class=\"text-xs font-medium capitalize\" [class]=\"statusClasses()\">{{ status() }}</span>\n  </div>\n</div>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.7", ngImport: i0, type: RndTransactionItem, decorators: [{
            type: Component,
            args: [{ imports: [], selector: 'rnd-transaction-item', template: "<div class=\"flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5\">\n  <span [class]=\"iconWrapperClasses()\">\n    <ng-content select=\"[rndTransactionItemIcon]\" />\n  </span>\n  <div class=\"flex flex-1 flex-col\">\n    <span class=\"font-body text-sm font-medium text-foreground\">{{ title() }}</span>\n    @if (timestamp()) {\n      <span class=\"text-xs text-muted\">{{ timestamp() }}</span>\n    }\n  </div>\n  <div class=\"flex flex-col items-end\">\n    <span class=\"font-mono text-sm font-medium\" [class]=\"amountClasses()\"\n      >{{ amountPrefix() }}{{ amount() }}</span\n    >\n    <span class=\"text-xs font-medium capitalize\" [class]=\"statusClasses()\">{{ status() }}</span>\n  </div>\n</div>\n" }]
        }], propDecorators: { direction: [{ type: i0.Input, args: [{ isSignal: true, alias: "direction", required: true }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], amount: [{ type: i0.Input, args: [{ isSignal: true, alias: "amount", required: true }] }], status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: false }] }], timestamp: [{ type: i0.Input, args: [{ isSignal: true, alias: "timestamp", required: false }] }] } });

/*
 * Public API Surface of rnd-ui-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { RND_ICON_PATHS, RndAccordion, RndAccordionItem, RndAlert, RndAssetRow, RndAvatar, RndAvatarGroup, RndBadge, RndBreadcrumb, RndButton, RndCalendar, RndCard, RndCarousel, RndCarouselSlide, RndCheckbox, RndCollapsible, RndCombobox, RndCommandPalette, RndConfirmOutlet, RndConfirmService, RndContextMenu, RndCopyField, RndDatePicker, RndDivider, RndDropdownItem, RndDropdownMenu, RndEmptyState, RndFormField, RndHoverCard, RndIcon, RndInput, RndInputOtp, RndKbd, RndModal, RndNavbar, RndNumberStepper, RndPagination, RndPasswordInput, RndPopover, RndProgressBar, RndQrCode, RndRadialProgress, RndRadioGroup, RndRadioOption, RndRouteProgress, RndSearchInput, RndSegmentedControl, RndSegmentedOption, RndSelect, RndSheet, RndSidebar, RndSkeleton, RndSlider, RndSparkline, RndSpinner, RndSplitButton, RndStatCard, RndSwitch, RndTab, RndTable, RndTabs, RndTagInput, RndTextarea, RndTimePicker, RndTimeline, RndTimelineItem, RndToast, RndToastOutlet, RndToastService, RndToggle, RndTooltip, RndTransactionItem };
//# sourceMappingURL=rnd-ui-lib.mjs.map
