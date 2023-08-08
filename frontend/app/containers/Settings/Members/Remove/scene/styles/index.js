import styled from 'styled-components';

import { Colors } from 'components/utils/styles/ui';
import { Select } from 'components/form/select/select';
import { Avatar } from 'components/visual/avatar/avatar';
import { iconElementsSelector } from 'components/elements/styles/icon';

export const Wrapper = styled.div`
  width: 55rem;
  padding: 2rem 3rem;
  border-radius: 0.3rem;
  background-color: ${Colors.white};
`;

export const Title = styled.h3`
  margin: 0 0 2rem 0;
  font-size: 2rem;
  color: ${Colors.tealDark};
`;

export const Section = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${Colors.outline};
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  margin-bottom: 1.2rem;
  ${({ theme }) => theme.typography.text.medium};
  font-weight: 500;
`;

export const SubTitle = styled.div`
  line-height: 2.1rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-right: 1.2rem;
  border-radius: 50%;
  background-color: ${Colors.tealDark};

  & > ${iconElementsSelector} {
    stroke: ${Colors.white};
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${Colors.outline};
`;

export const MembersSelect = styled(Select)`
  margin-top: 1rem;
`;

export const DropdownItem = styled.div`
  height: 2rem;
  position: relative;
  top: 0.3rem;
`;

export const DropdownItemUser = styled(DropdownItem)`
  top: 0.8rem;
`;

export const DropdownUserName = styled.span`
  position: relative;
  left: 1rem;
  bottom: 1.3rem;
`;

export const DropdownAvatar = styled(Avatar)`
  position: relative;
  top: -0.8rem;
`;
