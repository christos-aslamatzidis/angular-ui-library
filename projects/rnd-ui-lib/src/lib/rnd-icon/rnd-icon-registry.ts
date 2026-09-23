export interface RndIconMarkupSet {
  outline: string;
  solid: string;
  duotone: string;
}

/**
 * Most icons here are pure line glyphs (chevrons, arrows, plus/minus, ...). For those, "solid"
 * means the same path rendered with a bolder stroke (not a filled silhouette — accurately
 * converting a stroked path into a filled region needs a vector tool, not hand-authored `d`
 * data), and "duotone" is the same stroke drawn twice: a soft wide low-opacity pass behind a
 * crisp normal pass, using currentColor at two opacities. Icons with a natural closed silhouette
 * (circles, badges, envelopes, ...) get genuinely distinct filled solid/duotone markup instead —
 * those are authored directly per icon rather than through this helper.
 */
function lineIcon(paths: string[]): RndIconMarkupSet {
  const outline = paths
    .map((d) => `<path d="${d}" stroke-linecap="round" stroke-linejoin="round" />`)
    .join('');

  const solid = paths
    .map(
      (d) => `<path d="${d}" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" />`,
    )
    .join('');

  const duotone = paths
    .map(
      (d) =>
        `<path d="${d}" stroke-width="5" stroke-opacity="0.3" stroke-linecap="round" stroke-linejoin="round" />` +
        `<path d="${d}" stroke-linecap="round" stroke-linejoin="round" />`,
    )
    .join('');

  return { outline, solid, duotone };
}

export const RND_ICON_PATHS = {
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
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M12 8v8M8 12h8" style="stroke: var(--color-background)" stroke-linecap="round" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 8v8M8 12h8" stroke-linecap="round" />',
  },
  'minus-circle': {
    outline: '<circle cx="12" cy="12" r="9" /><path d="M8 12h8" stroke-linecap="round" />',
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M8 12h8" style="stroke: var(--color-background)" stroke-linecap="round" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M8 12h8" stroke-linecap="round" />',
  },
  trash: lineIcon([
    'M3 6h18',
    'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    'm19 6-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',
  ]),
  edit: lineIcon(['M12 20h9', 'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z']),
  copy: {
    outline:
      '<rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />',
    solid:
      '<rect x="9" y="9" width="13" height="13" rx="2" fill="currentColor" stroke="none" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="currentColor" stroke="none" />',
    duotone:
      '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="currentColor" fill-opacity="0.3" stroke="none" /><rect x="9" y="9" width="13" height="13" rx="2" fill="currentColor" stroke="none" />',
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
    solid:
      '<circle cx="11" cy="11" r="8" fill="currentColor" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" />',
    duotone:
      '<circle cx="11" cy="11" r="8" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><circle cx="11" cy="11" r="8" fill="none" />',
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
    outline:
      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />',
    solid:
      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="3" style="fill: var(--color-background)" stroke="none" />',
    duotone:
      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />',
  },
  'eye-off': {
    outline:
      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /><path d="M3 3l18 18" stroke-linecap="round" />',
    solid:
      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="3" style="fill: var(--color-background)" stroke="none" /><path d="M3 3l18 18" style="stroke: var(--color-background)" stroke-width="2.5" stroke-linecap="round" />',
    duotone:
      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /><path d="M3 3l18 18" stroke="currentColor" stroke-linecap="round" />',
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
    outline:
      '<rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />',
    solid:
      '<rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" stroke="none" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />',
    duotone:
      '<rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />',
  },
  unlock: {
    outline:
      '<rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" stroke-linecap="round" />',
    solid:
      '<rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" stroke="none" /><path d="M7 11V7a5 5 0 0 1 9.9-1" stroke-linecap="round" />',
    duotone:
      '<rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M7 11V7a5 5 0 0 1 9.9-1" stroke-linecap="round" />',
  },

  // Status / communication
  bell: lineIcon(['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M13.73 21a2 2 0 0 1-3.46 0']),
  mail: {
    outline: '<rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />',
    solid:
      '<rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" stroke="none" /><path d="m22 6-10 7L2 6" style="stroke: var(--color-background)" />',
    duotone:
      '<rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m22 6-10 7L2 6" />',
  },
  info: {
    outline:
      '<circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" stroke-linecap="round" />',
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M12 16v-4M12 8h.01" style="stroke: var(--color-background)" stroke-linecap="round" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 16v-4M12 8h.01" stroke-linecap="round" />',
  },
  'alert-triangle': lineIcon([
    'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z',
    'M12 9v4',
    'M12 17h.01',
  ]),
  'alert-circle': {
    outline:
      '<circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" stroke-linecap="round" />',
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M12 8v4M12 16h.01" style="stroke: var(--color-background)" stroke-linecap="round" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 8v4M12 16h.01" stroke-linecap="round" />',
  },
  'check-circle': {
    outline:
      '<circle cx="12" cy="12" r="9" /><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />',
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="m9 12 2 2 4-4" style="stroke: var(--color-background)" stroke-linecap="round" stroke-linejoin="round" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />',
  },
  'x-circle': {
    outline:
      '<circle cx="12" cy="12" r="9" /><path d="m15 9-6 6M9 9l6 6" stroke-linecap="round" />',
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="m15 9-6 6M9 9l6 6" style="stroke: var(--color-background)" stroke-linecap="round" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m15 9-6 6M9 9l6 6" stroke-linecap="round" />',
  },
  'help-circle': {
    outline:
      '<circle cx="12" cy="12" r="9" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4M12 17h.01" stroke-linecap="round" stroke-linejoin="round" />',
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4M12 17h.01" style="stroke: var(--color-background)" stroke-linecap="round" stroke-linejoin="round" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4M12 17h.01" stroke-linecap="round" stroke-linejoin="round" />',
  },

  // Objects
  calendar: {
    outline:
      '<rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round" />',
    solid:
      '<rect x="3" y="4" width="18" height="18" rx="2" fill="currentColor" stroke="none" /><path d="M16 2v4M8 2v4" stroke-linecap="round" /><path d="M3 10h18" style="stroke: var(--color-background)" />',
    duotone:
      '<rect x="3" y="4" width="18" height="18" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round" />',
  },
  clock: {
    outline:
      '<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" stroke-linecap="round" stroke-linejoin="round" />',
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M12 7v5l3 3" style="stroke: var(--color-background)" stroke-linecap="round" stroke-linejoin="round" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 7v5l3 3" stroke-linecap="round" stroke-linejoin="round" />',
  },
  folder: lineIcon(['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z']),
  file: lineIcon(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z', 'M14 2v6h6']),
  image: {
    outline:
      '<rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />',
    solid:
      '<rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" stroke="none" /><circle cx="8.5" cy="8.5" r="1.5" style="fill: var(--color-background)" stroke="none" /><path d="m21 15-5-5L5 21" style="fill: var(--color-background)" stroke="none" />',
    duotone:
      '<rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" /><path d="m21 15-5-5L5 21" />',
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
    outline:
      '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /><circle cx="12" cy="12" r="3" />',
    solid:
      '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="3" style="fill: var(--color-background)" stroke="none" />',
    duotone:
      '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />',
  },
  user: {
    outline:
      '<circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" stroke-linecap="round" />',
    solid:
      '<circle cx="12" cy="8" r="4" fill="currentColor" stroke="none" /><path d="M20 21a8 8 0 1 0-16 0" fill="currentColor" stroke="none" />',
    duotone:
      '<path d="M20 21a8 8 0 1 0-16 0" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="8" r="4" fill="currentColor" stroke="none" />',
  },
  users: {
    outline:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-linecap="round" />',
    solid:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="currentColor" stroke="none" /><circle cx="9" cy="7" r="4" fill="currentColor" stroke="none" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-linecap="round" />',
    duotone:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="9" cy="7" r="4" fill="currentColor" stroke="none" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-linecap="round" />',
  },
  globe: {
    outline:
      '<circle cx="12" cy="12" r="9" /><path d="M2 12h20M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" />',
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="M2 12h20M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" style="stroke: var(--color-background)" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M2 12h20M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" />',
  },
  menu: lineIcon(['M4 6h16M4 12h16M4 18h16']),
  'more-horizontal': {
    outline:
      '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />',
    solid:
      '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />',
    duotone:
      '<circle cx="5" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="19" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />',
  },
  'more-vertical': {
    outline:
      '<circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />',
    solid:
      '<circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />',
    duotone:
      '<circle cx="12" cy="5" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="19" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />',
  },
  grid: {
    outline:
      '<rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />',
    solid:
      '<rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" stroke="none" /><rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" stroke="none" />',
    duotone:
      '<rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" fill-opacity="0.3" stroke="none" /><rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" fill-opacity="0.3" stroke="none" /><rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" stroke="none" /><rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" stroke="none" />',
  },
  list: lineIcon(['M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01']),

  // Commerce
  cart: {
    outline:
      '<circle cx="9" cy="21" r="1.3" fill="currentColor" stroke="none" /><circle cx="20" cy="21" r="1.3" fill="currentColor" stroke="none" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-linecap="round" stroke-linejoin="round" />',
    solid:
      '<circle cx="9" cy="21" r="1.3" fill="currentColor" stroke="none" /><circle cx="20" cy="21" r="1.3" fill="currentColor" stroke="none" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" />',
    duotone:
      '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-width="5" stroke-opacity="0.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-linecap="round" stroke-linejoin="round" /><circle cx="9" cy="21" r="1.3" fill="currentColor" stroke="none" /><circle cx="20" cy="21" r="1.3" fill="currentColor" stroke="none" />',
  },
  bag: {
    outline:
      '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" stroke-linecap="round" /><path d="M16 10a4 4 0 0 1-8 0" stroke-linecap="round" />',
    solid:
      '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" fill="currentColor" stroke="none" /><path d="M3 6h18" style="stroke: var(--color-background)" /><path d="M16 10a4 4 0 0 1-8 0" style="stroke: var(--color-background)" stroke-linecap="round" />',
    duotone:
      '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M3 6h18" stroke-linecap="round" /><path d="M16 10a4 4 0 0 1-8 0" stroke-linecap="round" />',
  },
  receipt: lineIcon([
    'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z',
    'M8 7h8',
    'M8 11h8',
    'M8 15h5',
  ]),
  'credit-card': {
    outline:
      '<rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" stroke-linecap="round" /><path d="M6 15h4" stroke-linecap="round" />',
    solid:
      '<rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" stroke="none" /><path d="M2 10h20" style="stroke: var(--color-background)" /><path d="M6 15h4" style="stroke: var(--color-background)" stroke-linecap="round" />',
    duotone:
      '<rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M2 10h20" stroke-linecap="round" /><path d="M6 15h4" stroke-linecap="round" />',
  },
  'dollar-sign': lineIcon(['M12 1v22', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6']),
  percent: {
    outline:
      '<path d="M19 5 5 19" stroke-linecap="round" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />',
    solid:
      '<path d="M19 5 5 19" stroke-linecap="round" /><circle cx="6.5" cy="6.5" r="2.5" fill="currentColor" stroke="none" /><circle cx="17.5" cy="17.5" r="2.5" fill="currentColor" stroke="none" />',
    duotone:
      '<path d="M19 5 5 19" stroke-linecap="round" /><circle cx="6.5" cy="6.5" r="2.5" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="17.5" cy="17.5" r="2.5" fill="currentColor" fill-opacity="0.3" stroke="none" />',
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
    outline:
      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" />',
    solid:
      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" fill="currentColor" stroke="none" /><circle cx="12" cy="10" r="3" style="fill: var(--color-background)" stroke="none" />',
    duotone:
      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="10" r="3" fill="currentColor" stroke="none" />',
  },
  navigation: lineIcon(['M3 11 22 2l-9 19-2-8-8-2Z']),
  compass: {
    outline:
      '<circle cx="12" cy="12" r="9" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" />',
    solid:
      '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" style="fill: var(--color-background)" stroke="none" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" fill="currentColor" stroke="none" />',
  },

  // Communication
  'message-circle': {
    outline:
      '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke-linecap="round" stroke-linejoin="round" />',
    solid:
      '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" fill="currentColor" stroke="none" />',
    duotone:
      '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke-linecap="round" stroke-linejoin="round" />',
  },
  'message-square': lineIcon(['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z']),
  send: lineIcon(['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13']),
  phone: lineIcon([
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z',
  ]),
  'at-sign': {
    outline:
      '<circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" stroke-linecap="round" />',
    solid:
      '<circle cx="12" cy="12" r="4" stroke-width="2.75" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" stroke-width="2.75" stroke-linecap="round" />',
    duotone:
      '<circle cx="12" cy="12" r="4" stroke-width="5" stroke-opacity="0.3" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" stroke-width="5" stroke-opacity="0.3" stroke-linecap="round" /><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" stroke-linecap="round" />',
  },

  // Media / device
  camera: {
    outline:
      '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" /><circle cx="12" cy="13" r="4" />',
    solid:
      '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" fill="currentColor" stroke="none" /><circle cx="12" cy="13" r="4" style="fill: var(--color-background)" stroke="none" />',
    duotone:
      '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="13" r="4" fill="currentColor" stroke="none" />',
  },
  mic: {
    outline:
      '<rect x="9" y="2" width="6" height="12" rx="3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke-linecap="round" /><path d="M12 19v3M8 22h8" stroke-linecap="round" />',
    solid:
      '<rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" stroke="none" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke-linecap="round" /><path d="M12 19v3M8 22h8" stroke-linecap="round" />',
    duotone:
      '<rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke-linecap="round" /><path d="M12 19v3M8 22h8" stroke-linecap="round" />',
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
    outline:
      '<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />',
    solid:
      '<ellipse cx="12" cy="5" rx="9" ry="3" fill="currentColor" stroke="none" /><path d="M3 5v14a9 3 0 0 0 18 0V5" stroke-width="2.75" /><path d="M3 12a9 3 0 0 0 18 0" stroke-width="2.75" />',
    duotone:
      '<ellipse cx="12" cy="5" rx="9" ry="3" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />',
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
    outline:
      '<circle cx="9" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="19" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="19" r="1.5" fill="currentColor" stroke="none" />',
    solid:
      '<circle cx="9" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="19" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="19" r="1.5" fill="currentColor" stroke="none" />',
    duotone:
      '<circle cx="9" cy="5" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="9" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="9" cy="19" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="15" cy="5" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="15" cy="12" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="15" cy="19" r="2.2" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="9" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="9" cy="19" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="5" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="19" r="1.5" fill="currentColor" stroke="none" />',
  },

  // Status / security
  shield: {
    outline: '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" />',
    solid:
      '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" fill="currentColor" stroke="none" />',
    duotone:
      '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" />',
  },
  'shield-check': {
    outline:
      '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" /><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />',
    solid:
      '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" fill="currentColor" stroke="none" /><path d="m9 12 2 2 4-4" style="stroke: var(--color-background)" stroke-linecap="round" stroke-linejoin="round" />',
    duotone:
      '<path d="M12 2 4 5v6c0 5.25 3.4 9.86 8 11 4.6-1.14 8-5.75 8-11V5Z" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />',
  },
  key: {
    outline:
      '<circle cx="8" cy="16" r="5" /><path d="M11.5 12.5 21 3" stroke-linecap="round" /><path d="M15 8l3 3M18 5l3 3" stroke-linecap="round" />',
    solid:
      '<circle cx="8" cy="16" r="5" fill="currentColor" stroke="none" /><path d="M11.5 12.5 21 3" stroke-linecap="round" /><path d="M15 8l3 3M18 5l3 3" stroke-linecap="round" />',
    duotone:
      '<circle cx="8" cy="16" r="5" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="M11.5 12.5 21 3" stroke-linecap="round" /><path d="M15 8l3 3M18 5l3 3" stroke-linecap="round" />',
  },
  circle: {
    outline: '<circle cx="12" cy="12" r="9" />',
    solid: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />',
    duotone:
      '<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.3" stroke="none" /><circle cx="12" cy="12" r="9" fill="none" />',
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
    outline:
      '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M11 8v6M8 11h6" stroke-linecap="round" />',
    solid:
      '<circle cx="11" cy="11" r="8" fill="currentColor" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M11 8v6M8 11h6" style="stroke: var(--color-background)" stroke-linecap="round" />',
    duotone:
      '<circle cx="11" cy="11" r="8" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M11 8v6M8 11h6" stroke-linecap="round" />',
  },
  'zoom-out': {
    outline:
      '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M8 11h6" stroke-linecap="round" />',
    solid:
      '<circle cx="11" cy="11" r="8" fill="currentColor" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M8 11h6" style="stroke: var(--color-background)" stroke-linecap="round" />',
    duotone:
      '<circle cx="11" cy="11" r="8" fill="currentColor" fill-opacity="0.3" stroke="none" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /><path d="M8 11h6" stroke-linecap="round" />',
  },
} as const;

export type RndIconName = keyof typeof RND_ICON_PATHS;
