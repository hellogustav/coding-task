import styled from 'styled-components';

import { Colors } from 'components/utils/styles/ui';
import { ContextHeader } from 'components/structure/page/styles/context-header';
import {
  contextHeaderHeight,
  tableMenuHeight,
} from 'components/structure/page/utils/calculations';
import { SmartLink as LinkBase } from 'components/navigation/SmartLink';

export const Header = styled(ContextHeader)``;

export const Label = styled.div`
  color: ${Colors.text};
  font-size: 2.2rem;
  line-height: 1;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Breadcrumb = styled.div`
  width: auto;
  max-width: 60%;
`;

export const Menu = styled.div`
  height: ${contextHeaderHeight}rem;
  justify-content: flex-end;
  display: flex;
  margin-left: auto;
`;

export const TableMenu = styled.div`
  width: 100%;
  height: ${tableMenuHeight}rem;
  justify-content: flex-start;
  display: flex;
  margin-right: auto;
  background-color: ${Colors.white};
  padding: 1.5rem 2rem;
`;

export const Badges = styled.div`
  align-items: center;
  display: inline-flex;

  & > * {
    margin-left: 2rem;
  }
`;

export const HelpSection = styled.div`
  background-color: ${Colors.headerBG};
  padding: 0 2.4rem 0.01rem;
`;

export const HelpLinks = styled.div`
  display: flex;
  margin: 2rem 0;

  &:empty {
    margin-bottom: 0;
  }

  & > * {
    margin-right: 2rem;
  }
`;

export const HelpLink = styled(LinkBase)`
  color: ${Colors.tealDark};

  &:hover {
    text-decoration: underline;
  }
`;

export const ExtraSection = styled.div`
  padding: 0 2rem;
  z-index: 5;
`;
