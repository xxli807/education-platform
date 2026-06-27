// Central colour palette for the app.
// Every colour used across the UI (MUI `sx`, <canvas>, gradients) lives here so
// it can be managed in one place. Values are grouped by hue family and ordered
// light -> dark via a numeric scale (lower = lighter), Tailwind-style.
//
// Usage:
//   import { palette, withAlpha } from '../theme/palette';
//   sx={{ color: palette.red500, bgcolor: withAlpha(palette.white, 0.08) }}
//   ctx.fillStyle = palette.navy500; // works in canvas too (plain strings)

export const palette = {
  // Neutrals
  white: '#ffffff',
  black: '#000000',
  // Reds / danger
  red25: '#ffcdd2',
  red125: '#ef9a9a',
  red225: '#ff8a80',
  red325: '#ff5252',
  red425: '#ef5350',
  red550: '#c62828',
  red650: '#b71c1c',
  red750: '#8b1a1a',
  red850: '#4a1010',
  red950: '#1a0000',
  // Oranges / coral
  orange25: '#fff1e6',
  orange75: '#ffe8cc',
  orange150: '#ffcc80',
  orange200: '#ffb74d',
  orange275: '#ffa726',
  orange325: '#ff9671',
  orange400: '#ff8a65',
  orange450: '#ff9800',
  orange525: '#ff8066',
  orange575: '#ff8f00',
  orange650: '#f57c00',
  orange700: '#f76707',
  orange775: '#ef6c00',
  orange825: '#c34a36',
  orange900: '#d4380d',
  orange950: '#b02d07',
  // Ambers / yellow accent
  amber25: '#fff8e1',
  amber100: '#fff9db',
  amber200: '#fff9c4',
  amber275: '#fff3bf',
  amber350: '#ffe082',
  amber450: '#ffd54f',
  amber525: '#ffd43b',
  amber625: '#ffc75f',
  amber700: '#f0c040',
  amber775: '#ffc107',
  amber875: '#ffb300',
  amber950: '#f59f00',
  // Muted golds
  gold25: '#d9c97a',
  gold325: '#c4b45e',
  gold650: '#c8a030',
  gold950: '#8a6500',
  // Browns / wood tones
  brown25: '#bcaaa4',
  brown100: '#8d7b5f',
  brown175: '#866043',
  brown250: '#6d6050',
  brown325: '#7a5c2e',
  brown400: '#6b4c32',
  brown475: '#5c4420',
  brown575: '#5a3c00',
  brown650: '#281e0a',
  brown725: '#2a1c00',
  brown800: '#1e1408',
  brown875: '#1a1206',
  brown950: '#141008',
  // Greens / success
  green25: '#e0ffe0',
  green50: '#e8f5e9',
  green100: '#c8e6c9',
  green125: '#a5d6a7',
  green175: '#69f0ae',
  green200: '#a0c8a0',
  green250: '#81c784',
  green275: '#7bc74d',
  green325: '#6dc454',
  green350: '#66bb6a',
  green400: '#5aac44',
  green425: '#4caf50',
  green475: '#5d9e3f',
  green500: '#00c853',
  green550: '#4da03d',
  green575: '#388e3c',
  green625: '#3d8c2d',
  green650: '#00a040',
  green700: '#3a7d2c',
  green725: '#4a6a4a',
  green775: '#2d6e20',
  green800: '#2a5e1e',
  green850: '#1b5e20',
  green875: '#0d4a3a',
  green925: '#1a4a10',
  green950: '#002000',
  // Teals
  teal25: '#e8fff4',
  teal100: '#b2dfdb',
  teal175: '#80cbc4',
  teal250: '#64b5b0',
  teal300: '#4db6ac',
  teal375: '#00c9a7',
  teal450: '#26a69a',
  teal525: '#4d8076',
  teal600: '#009688',
  teal675: '#008f7a',
  teal725: '#00897b',
  teal800: '#00796b',
  teal875: '#00695c',
  teal950: '#001a20',
  // Cyans
  cyan25: '#4ffbdf',
  cyan200: '#4dd9e8',
  cyan400: '#4dd0e1',
  cyan575: '#5ba4cf',
  cyan775: '#38a8b8',
  cyan950: '#0089ba',
  // Blues
  blue25: '#e3f2ff',
  blue100: '#bbdefb',
  blue150: '#90caf9',
  blue225: '#87ceeb',
  blue300: '#64c8ff',
  blue350: '#64b5f6',
  blue425: '#42a5f5',
  blue475: '#2196f3',
  blue550: '#3b8bc9',
  blue625: '#1e88e5',
  blue675: '#2c73d2',
  blue750: '#2e6fa3',
  blue825: '#1565c0',
  blue875: '#0d47a1',
  blue950: '#1a4a6e',
  // Indigo / periwinkle
  indigo25: '#82b1ff',
  indigo475: '#2a1a6e',
  indigo950: '#1a0e4a',
  // Purples
  purple25: '#f3e9ff',
  purple100: '#f3e5f5',
  purple150: '#e1bee7',
  purple225: '#ce93d8',
  purple300: '#b39ddb',
  purple350: '#ba68c8',
  purple425: '#845ec2',
  purple475: '#8e44ad',
  purple550: '#9c27b0',
  purple625: '#7b1fa2',
  purple675: '#6a1b9a',
  purple750: '#4a148c',
  purple825: '#4a1070',
  purple875: '#28143c',
  purple950: '#1a0030',
  // Magentas
  magenta25: '#d65db1',
  magenta175: '#e040fb',
  magenta325: '#d63384',
  magenta475: '#d6336c',
  magenta650: '#e91e8c',
  magenta800: '#b0306c',
  magenta950: '#c2185b',
  // Pinks
  pink25: '#ffe0f0',
  pink325: '#f48fb1',
  pink650: '#ff6f91',
  pink950: '#e91e63',
  // Slate (blue-grey neutrals)
  slate25: '#cfd8dc',
  slate200: '#b0bec5',
  slate400: '#90a4ae',
  slate575: '#78909c',
  slate775: '#546e7a',
  slate950: '#37474f',
  // Navy (dark UI surfaces)
  navy25: '#19375f',
  navy100: '#0d3b66',
  navy175: '#2d2a4a',
  navy250: '#0f3460',
  navy325: '#1a2a3a',
  navy400: '#16213e',
  navy475: '#1a1f3a',
  navy575: '#1a1f35',
  navy650: '#1a1a2e',
  navy725: '#10142d',
  navy800: '#0f1623',
  navy875: '#001030',
  navy950: '#0a0e1a',
  // True neutral greys
  gray25: '#f5f5f5',
  gray200: '#e8e8e8',
  gray400: '#e0e0e0',
  gray575: '#d0d0d0',
  gray775: '#8c8c8c',
  gray950: '#6b6b6b',
};

export type PaletteColor = keyof typeof palette;

/**
 * Apply an alpha channel to a palette hex colour, returning an `rgba()` string.
 * Works anywhere a colour string is expected, including <canvas> contexts.
 */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
