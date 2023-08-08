import styled, { css } from 'styled-components';

import { SmartLink, LINK_SIZES } from 'components/navigation/SmartLink';

export {
  FormContainer,
  FlexContainer,
  LeftColumn,
  RightColumn,
  FormHeader,
  FormTitle,
  FormDiv,
  Submit as SubmitWithTopMargin,
} from 'scenes/account/sharedComponents/styles';

export const Container = styled.div``;

export const Link = styled(SmartLink).attrs({
  size: LINK_SIZES.medium,
})`
  color: ${({ theme }) => theme.colors.primaryDark};
  cursor: pointer;
  display: inline-block;
  text-decoration: underline;
`;
