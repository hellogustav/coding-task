import { get } from 'lodash';

// Use https://emojipedia.org to search for new emoji codes
export const EMOJI_DATA = [
  { name: 'star-struck', code: '1F929' },
  { name: 'clapping-hands', code: '1F44F' },
  { name: 'handshake', code: '1F91D' },
  { name: 'banzai', code: '1F64C' },
  { name: 'exploding-head', code: '1F92F' },
  { name: 'man-detective', code: '1F575' },
  { name: 'rocket', code: '1F680' },
  { name: 'light-bulb', code: '1F4A1' },
  { name: 'pencil', code: '270F' },
  { name: 'fire', code: '1F525' },
  { name: 'bust-in-silhouette', code: '1F464' },
  { name: 'globe-with-meridians', code: '1F310' },
  { name: 'waving-hand', code: '1F44B' },
  { name: 'incoming-envelope', code: '1F4E8' },
  { name: 'party-popper', code: '1F389' },
  { name: 'high-voltage', code: '26A1' },
  { name: 'sun-with-face', code: '1F31E' },
  { name: 'desktop-computer', code: '1F5A5' },
  { name: 'eyes', code: '1F440' },
];

export const EMOJI_NAMES = EMOJI_DATA.map((emoji) => get(emoji, 'name'));
