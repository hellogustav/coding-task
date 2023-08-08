import styled from 'styled-components';
import { Link as RouterLinkBase } from 'react-router-dom';

import { LINK_FONT_SIZES } from '../constants';

export const Link = styled.a`
  cursor: ${({ notClickable }) => (notClickable ? 'default' : 'pointer')};

  ${({ size }) => LINK_FONT_SIZES[size]};
`;

export const RouterLink = styled(RouterLinkBase)`
  ${({ size }) => LINK_FONT_SIZES[size]};
`;
