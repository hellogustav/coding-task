import styled, { css } from 'styled-components';

import { SmartLink as BaseSmartLink } from 'components/navigation/SmartLink';
import {
  Fieldset as FieldsetBase,
  Submit as SubmitBase,
} from 'components/structure/form/styles/form';
import { Colors } from 'components/utils/styles/ui';
import { Icon as IconBase } from 'components/elements/icon';
import { Button } from 'components/elements/button';
import { Flexbox } from 'components/structure/page/styles/containers';

import ilustrationsDesktopSrc from 'images/svg/ilustrations-desktop.svg';
import ilustrationsTabletSrc from 'images/svg/ilustrations-tablet.svg';

const wideLayoutBreakPoint = '1026px';
const wideLayoutHeight = '615px';
const smallLayoutBreakPoint = '425px';

export const FormTitle = styled.h1`
  margin: 0;
  letter-spacing: 0;
  color: ${({ theme, inverted }) =>
    (inverted && Colors.white) || theme.colors.text};
`;

export const Submit = styled(SubmitBase)`
  margin-top: 6vh;
  width: 100%;
`;

export const Fieldset = styled(FieldsetBase)`
  margin-bottom: 1.6rem;
`;

export const FlexContainer = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
`;

export const LeftColumn = styled.div`
  align-items: center;
  background-color: ${Colors.tealDarker};
  display: none;
  flex: 1 0 42.8rem;
  height: 100%;
  justify-content: center;
  position: relative;

  @media (min-width: ${wideLayoutBreakPoint}) {
    display: flex;
    max-width: 68.3rem;
  }

  @media (min-width: ${smallLayoutBreakPoint}) and (max-width: ${wideLayoutBreakPoint}) {
    display: flex;
    max-width: 42.8rem;
  }
`;

export const BackButton = styled.div`
  display: none;
  align-items: center;
  background-color: ${Colors.headerBG};
  border-radius: 50%;
  height: 4rem;
  justify-content: center;
  width: 4rem;
  position: absolute;
  top: 3vh;
  cursor: pointer;

  @media (min-height: ${wideLayoutHeight}) {
    display: flex;
  }
`;

export const RoundIconDiv = styled.div`
  align-items: center;
  background-color: ${({ color }) => Colors[color] || Colors.headerBG};
  border-radius: 50%;
  display: flex;
  height: 6.4rem;
  justify-content: center;
  width: 6.4rem;
`;

export const BackgroundImg = styled.div`
  position: absolute;
  background-image: url(${ilustrationsDesktopSrc});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  height: 100%;
  left: 0;
  z-index: 100;
  width: 110%;
  min-width: 68.3rem;
  min-height: 80rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: ${wideLayoutBreakPoint}) {
    background-image: url(${ilustrationsTabletSrc});
    min-width: 42.8rem;
    min-height: 76.8rem;
  }
`;

export const Info = styled.div`
  width: 27.5rem;
  color: ${Colors.white};
`;

export const InfoItems = styled.div`
  margin-top: 1.8rem;
`;

export const InfoItem = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
`;

export const InfoContent = styled.div`
  margin-left: 1.6rem;
`;

const labelMixin = css`
  ${({ theme }) => theme.typography.text.medium};
`;

export const InfoItemTitle = styled.div`
  ${labelMixin};
`;

export const InfoItemText = styled.div`
  color: ${Colors.tealLight};
  margin-top: 0.6rem;
`;

export const InfoItemIcon = styled(IconBase)`
  margin-top: 0.2rem;
  flex: 0 0 auto;
`;

export const RightColumn = styled.div`
  align-items: center;
  background-color: ${Colors.white};
  display: flex;
  height: 100%;
  justify-content: center;
  min-width: 50%;
  padding: 0 10.8rem;
  position: relative;
  flex: 1;

  @media (max-width: ${wideLayoutBreakPoint}) {
    padding: 0 6.4rem;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  height: 100%;
  max-height: 80rem;
  max-width: 68.3rem;
  width: 100%;
  align-items: center;
`;

export const FormDiv = styled.form`
  width: 100%;
`;

export const FormHeader = styled.div`
  margin-top: 3vh;
  padding-bottom: 3vh;
`;

export const LightText = styled.div`
  color: ${Colors.textLight};
  ${({ theme }) => theme.typography.text.medium};
`;

export const SecondaryRoute = styled.div`
  margin-top: 2rem;
`;

export const LightSmallText = styled.span`
  color: ${Colors.textLight};
  display: inline-block;
`;

export const SmartLink = styled(BaseSmartLink)`
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const Link = styled(BaseSmartLink)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primaryDark};
  cursor: pointer;
  text-decoration: underline;
`;

export const FormFields = styled.div`
  margin-top: 3vh;
`;

const centeredMixin = ({ center }) =>
  center &&
  css`
    text-align: center;
  `;

const boldMixin = ({ bold }) =>
  bold &&
  css`
    color: ${Colors.text};
  `;

export const Text = styled.span`
  color: ${Colors.textLight};
  display: block;
  ${({ theme }) => theme.typography.text.medium};
  ${centeredMixin};
  ${boldMixin};
`;

export const HorizontalSeparator = styled(Flexbox)`
  margin-top: 3.75vh;
  height: 1rem;
  align-items: center;
  color: ${Colors.textLighter};
  width: 100%;
`;

export const HorizontalLine = styled.div`
  border-bottom: 1px solid ${Colors.labelBg};
  flex-grow: 100;

  &:first-child {
    margin-right: 1.4rem;
  }
  &:last-child {
    margin-left: 1.4rem;
  }
  &:only-child {
    margin: 0;
  }
`;

export const SSOContainer = styled.div`
  margin: 0 -4px;
`;

export const SSOButton = styled(Button)`
  margin: 0 0.4rem;
  margin-top: 2vh;
  width: 100%;
  ${({ border }) =>
    border
      ? css`
          border: 1px solid ${Colors[border]};
        `
      : null}

  & svg {
    width: 2.4rem !important;
    height: 2.4rem !important;
    margin-top: -1rem !important;
    position: relative;
    top: 0.6rem;
  }

  & img {
    height: 1.5rem;
    margin-right: 0.8rem;
  }
`;
