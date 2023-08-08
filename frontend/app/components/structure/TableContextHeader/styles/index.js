import styled, { css } from 'styled-components';

import { ContextHeader } from 'components/structure/page/styles/context-header';
import {
  TableMenu as MenuBase,
  HelpSection as HelpSectionBase,
  HelpLinks as HelpLinksBase,
  HelpLink as HelpLinkBase,
  ExtraSection as ExtraSectionBase,
} from 'components/structure/context-header/styles/context-header';
import { Icon as IconBase } from 'components/elements/icon';
import {
  Button as ButtonBase,
  buttonSizeMixin,
} from 'components/elements/styles/button';
import { BUTTON_SIZES } from 'components/elements/button';
import { Colors } from 'components/utils/styles/ui';

const headerStickyMixin = css`
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Header = styled(ContextHeader)`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${Colors.headerBG};
  border-bottom: ${({ bordered }) =>
    bordered ? `1px solid ${Colors.outline}` : 'none'};
  ${({ sticky }) => sticky && headerStickyMixin}
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 2rem;
  font-weight: 600;

  ${({ hasOverflow }) => hasOverflow && 'overflow: visible;'}
`;

export const LabelIcon = styled(IconBase)`
  margin-right: 1rem;

  ${({ onClick }) => onClick && 'cursor: pointer;'}
`;

export const Title = styled.div`
  overflow-x: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 1rem;
  }

  & ${ButtonBase} {
    ${(props) => buttonSizeMixin({ ...props, size: BUTTON_SIZES.medium })};
  }
`;

export const PreButtons = styled.div`
  margin-right: 1.4rem;
`;

export const StickySection = styled.div`
  position: sticky;
  top: 5.4rem;
  z-index: 900;
`;

export const Menu = styled(MenuBase)`
  height: 4.6rem;
  padding: 0 1.3rem;
  border-bottom: ${({ bordered }) =>
    bordered ? `1px solid ${Colors.outline}` : 'none'};
  background-color: ${({ background }) =>
    background === 'dark' ? Colors.tealLighter : Colors.white};

  & > :nth-child(1) {
    justify-content: flex-start;
  }
  & > :nth-child(2) {
    justify-content: flex-end;
  }

  & ${ButtonBase} {
    ${(props) => buttonSizeMixin({ ...props, size: BUTTON_SIZES.medium })};
  }
`;

export const ExtraSection = styled(ExtraSectionBase)`
  padding: 0;
  background-color: ${Colors.white};
`;

export const Badges = styled.div`
  align-items: center;
  display: inline-flex;

  & > * {
    margin-left: 2rem;
  }
`;

export const HelpSection = styled(HelpSectionBase)`
  padding-bottom: 2rem;
`;

export const HelpLinks = styled(HelpLinksBase)`
  margin-bottom: 0;
`;

export const HelpLink = HelpLinkBase;

export const Shadow = styled.div`
  height: 1rem;
  margin-top: -1rem;
  box-shadow: 0px 8px 8px 0px rgba(150, 159, 171, 0.2);
`;
