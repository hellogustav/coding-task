import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { InfoContainer } from './infoContainer';
import { BackButton } from './backButton';
import * as styled from './styles';

export const SignSceneLayoutComponent = (props) => {
  const { info, children, onGoBack, history } = props;

  return (
    <styled.FlexContainer>
      <styled.LeftColumn>
        <InfoContainer info={info} />
      </styled.LeftColumn>
      <styled.RightColumn>
        <styled.FormContainer>
          <BackButton onClick={onGoBack || history.goBack} />
          {children}
        </styled.FormContainer>
      </styled.RightColumn>
    </styled.FlexContainer>
  );
};

SignSceneLayoutComponent.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired,
  onGoBack: PropTypes.func,
  info: PropTypes.object.isRequired,
};

export const SignSceneLayout = withRouter(SignSceneLayoutComponent);
