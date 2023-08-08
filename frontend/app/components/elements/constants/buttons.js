import { Colors, statusColors } from 'components/utils/styles/ui';
import theme from 'themes';

export const BUTTON_COLORS = {
  primary: Colors.teal,
  primaryDark: Colors.tealDark,
  secondary: Colors.green,
  danger: Colors.red,
  warning: Colors.yellow,
  mono: Colors.textLighter,
  monoLight: Colors.inputOutline,
  monoLighter: Colors.greyLighter,
  monoDarker: Colors.text,
  greyLight: Colors.greyLight,
  white: Colors.white,
  ...statusColors,
};

export const BUTTON_SIZES = {
  small: 'small',
  medium: 'medium',
  normal: 'normal',
  large: 'large',
};

export const BUTTON_HEIGHTS = {
  [BUTTON_SIZES.small]: '2.6rem',
  [BUTTON_SIZES.medium]: '3rem',
  [BUTTON_SIZES.normal]: '3.6rem',
  [BUTTON_SIZES.large]: '4rem',
};

export const BUTTON_FONT_SIZES = {
  [BUTTON_SIZES.small]: theme.typography.button.medium,
  [BUTTON_SIZES.medium]: theme.typography.button.medium,
  [BUTTON_SIZES.normal]: theme.typography.button.normal,
  [BUTTON_SIZES.large]: theme.typography.button.normal,
};
