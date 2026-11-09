export const printGroups = [
  {
    id: 'uv',
    name: 'UV DTF stickers',
    banner: 'uv-banner',
    intro: 'Transfers for glass, ceramics and other smooth, rigid surfaces.',
    items: [
      ['uv-builder', 'UV DTF sheet builder'],
      ['uv-size', 'Custom stickers by size'],
      ['uv-upload', 'Print-ready UV DTF sheets'],
      ['wrap', 'Cup wraps'],
    ],
  },
  {
    id: 'dtf',
    name: 'DTF heat transfers',
    banner: 'dtf-banner',
    intro:
      'Explore heat-applied graphics for clothing, bags and fabric accessories.',
    items: [
      ['dtf-builder', 'DTF sheet builder'],
      ['dtf-size', 'Custom transfers by size'],
      ['dtf-upload', 'Print-ready DTF sheets'],
      ['premade', 'Pre-designed transfer sheets'],
    ],
  },
  {
    id: 'labels',
    name: 'Premium labels',
    banner: 'label-banner',
    intro: 'Explore tactile finishes and metallic accents for packaging.',
    items: [
      ['gloss', 'Raised gloss labels'],
      ['foil', 'Metallic foil labels'],
    ],
  },
  {
    id: 'stickers',
    name: 'Everyday stickers',
    banner: 'sticker-banner',
    intro: 'Compare finishes for bottles, mailers and everyday packaging.',
    items: [
      ['paper', 'Paper stickers'],
      ['waterproof', 'Waterproof stickers'],
      ['clear', 'Clear stickers'],
      ['kraft', 'Kraft paper stickers'],
      ['silver', 'Silver vinyl stickers'],
    ],
  },
  {
    id: 'merch',
    name: 'Custom merch',
    intro: 'Explore personalised gifts and accessories.',
    items: [
      ['cup', 'Personalised glass cups'],
      ['tote', 'Custom tote bags'],
    ],
  },
];
export function printPath(id) {
  return '/print/' + id;
}
export function photo(id) {
  return '/print-media/' + id + '.webp';
}
