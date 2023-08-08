import styled from 'styled-components';

import { Colors } from 'components/utils/styles/ui';
import { Icon } from 'components/elements/icon';
import { SmartLink } from 'components/navigation/SmartLink';

export const BackToWebsiteContainer = styled(SmartLink)`
  &,
  &:link,
  a:visited,
  a:hover,
  a:active {
    color: ${Colors.text};
  }
`;

export const BackToWebsiteText = styled.span`
  font-size: 2rem;
  margin-left: 0.6rem;
`;

export const BackToWebsiteIcon = styled(Icon)`
  margin-top: -1rem;
`;

export const LoginButton = styled(SmartLink)`
  padding: 0.8rem 2rem 0.7rem;
  margin-right: 7rem;
  border-radius: 0.3rem;
  border-width: 0.05rem;
  border-style: solid;
  border-color: ${Colors.textLighter};

  &:link,
  &:visited,
  &:active {
    color: ${Colors.tealDarker};
  }

  overflow: hidden;
  position: relative;
  transition: color 0.31s ease-in-out;
  z-index: 1;

  &:after {
    content: ' ';
    display: block;
    position: absolute;
    background-color: ${Colors.textLighter};
    top: 100%;
    color: ${Colors.white};
    transition: all 0.31s ease-in-out;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  &:hover {
    color: ${Colors.white};

    &:after {
      top: 0;
    }
  }
`;
