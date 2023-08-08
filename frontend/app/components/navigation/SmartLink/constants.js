import theme from 'themes';

export const LINK_SIZES = {
  small: 'small',
  medium: 'medium',
  normal: 'normal',
  large: 'large',
};

export const LINK_FONT_SIZES = {
  [LINK_SIZES.small]: theme.typography.link.small,
  [LINK_SIZES.medium]: theme.typography.link.medium,
  [LINK_SIZES.normal]: theme.typography.link.normal,
  [LINK_SIZES.large]: theme.typography.link.normal,
};
