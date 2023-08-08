import styled, { css } from 'styled-components';

import { SmartLink } from 'components/navigation/SmartLink';
import { sidebarSubMenuWidth } from 'components/structure/page/utils/calculations';
import { Colors } from 'components/utils/styles/ui';
import { scale15x } from 'components/utils/styles/animations';
import { Icon, IconWrapped } from 'components/elements/icon';

export const SubMenu = styled.div`
  position: relative;
  width: ${sidebarSubMenuWidth}rem;
  transform: translate3d(
    ${({ expanded }) => (expanded ? 0 : `-${sidebarSubMenuWidth}rem`)},
    0,
    0
  );
  transition: transform 0.3s ease-in-out;
  pointer-events: ${({ expanded }) => (expanded ? 'auto' : 'none')};
  user-select: none;
  z-index: 499;
`;

export const SubMenuContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.greyLight};
  box-shadow: inset -40px -2px 32px -64px rgba(0, 0, 0, 0.58);
  padding: 1.2rem 1.1rem 2rem 2.1rem;
  height: 100%;
  width: 100%;
`;

export const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;

  & > svg {
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;

export const SpanText = styled.span`
  padding-top: 0.4rem;
`;

export const ItemsWrapper = styled.div`
  margin: 3rem 0;
`;

export const Item = styled.div`
  max-height: ${({ isExpanded }) => (isExpanded ? '30rem' : '4rem')};
  transition: 0.3s ease-out;
  overflow: hidden;
  padding: 1rem 0;

  & > svg {
    margin: 0 1rem;
  }
`;

export const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  ${({ hasItems }) => hasItems && 'cursor: pointer;'}
  position: relative;

  & > svg {
    margin-right: 0.5rem;
    margin-left: 1rem;
    transform: rotate(${({ isExpanded }) => (isExpanded ? '90deg' : 0)});
    transition: 0.3s ease-out;
    flex-shrink: 0;
  }
`;

export const ItemTitleIcon = styled(Icon)`
  margin-right: 0.5rem;
  margin-left: 1rem;
  transform: none !important;
`;

export const Link = styled(SmartLink)`
  color: ${({ isActive }) => (isActive ? Colors.tealDark : Colors.text)};

  &:last-child {
    ${Item} {
      padding-bottom: 0;
    }
  }
`;

export const Counter = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  font-weight: 400;
  color: ${({ isActive }) => (isActive ? Colors.tealDark : Colors.textLighter)};
`;

const animateCounterMixin = css`
  transition: all 2s ease-in-out;
  animation: ${scale15x} 1000ms linear 0ms 1;
`;

export const CounterBadge = styled.span`
  position: fixed;
  right: 0.6rem;
  display: flex;
  padding: 0 0.6rem;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 400;
  background-color: ${Colors.red};
  color: ${Colors.white};

  animation: none;
  ${({ animate }) => animate && animateCounterMixin}
`;

export const CounterIcon = styled(IconWrapped)`
  position: fixed;
  right: 0.6rem;

  & > svg {
    width: 1.2rem;
    height: 1.2rem;

    path {
      fill: ${Colors.white};
    }
  }
`;
