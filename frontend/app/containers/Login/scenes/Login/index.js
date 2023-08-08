import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { get, trim, isEmpty } from 'lodash';
import qs from 'qs';

import { Config as AppConfig } from 'containers/App/config';
import { formHOC } from 'scenes/utils/form/hoc';

import { anyPropertyInvalid, getErrors } from 'components/utils/form-utils';
import { Highlight } from 'components/text/Highlight';
import { Icon } from 'components/elements/icon';
import { Emoji } from 'components/elements/emoji';
import { InfoBox } from 'components/text/InfoBox';

import theme, { THEME } from 'themes';
import { BackButton } from 'scenes/account/sharedComponents/backButton';
import { InfoContainer } from 'scenes/account/sharedComponents/infoContainer';
import { FormDefinition } from 'scenes/account/sharedComponents/utils/formDefinition';
import { SignFormFields } from 'scenes/account/sharedComponents/signFormFields';
import { SecondaryRoute } from 'scenes/account/sharedComponents/secondaryRoute';

import * as styled from './styles';
import i18n from './utils/i18n';
import { infoLoginFlow } from './utils/info';
import { loginObject } from './utils/loginObject';

@formHOC()
export class LoginComponent extends Component {
  getErrorKeys(formObject) {
    return getErrors(formObject, FormDefinition);
  }

  handleBackButtonClick = () => {
    const { history } = this.props;

    window.location.href = theme.logoLink;
  };

  renderForgotPasswordLink = () => {
    return (
      <styled.Link to="/forgotpassword">
        <FormattedMessage {...i18n.forgotPassword} />
      </styled.Link>
    );
  };

  objectToSave(object) {
    const { email, password, company } = object;

    return {
      email,
      password,
      company,
    };
  }

  parseObject() {
    const loginObjectWithContainer = {
      ...loginObject(),
      mainContainer: styled.Container,
    };

    return loginObjectWithContainer;
  }

  shouldSubmit(formObject) {
    return !anyPropertyInvalid(formObject, FormDefinition);
  }

  render() {
    const {
      modal,
      modalMessage,
      onCloseModal,
      shouldValidate,
      inputChange,
      saveForm,
      formObject,
    } = this.props;

    return (
      <>
        <styled.FlexContainer>
          <styled.LeftColumn>
            <InfoContainer info={infoLoginFlow} />
          </styled.LeftColumn>
          <styled.RightColumn>
            <styled.FormContainer>
              <BackButton onClick={this.handleBackButtonClick} />
              <styled.FormDiv>
                <styled.FormHeader>
                  <styled.FormTitle>
                    <>
                      <Emoji name="waving-hand" />
                      &nbsp;&nbsp;
                      <FormattedMessage
                        {...i18n.headline}
                        values={{ platform: theme.platformNameComponent }}
                      />
                    </>
                  </styled.FormTitle>
                </styled.FormHeader>
                <SignFormFields
                  context={FormDefinition}
                  email={formObject?.email}
                  password={formObject?.password}
                  shouldValidate={shouldValidate}
                  inputChange={inputChange}
                />
                {this.renderForgotPasswordLink()}
                <styled.SubmitWithTopMargin
                  value={i18n.button}
                  onClick={saveForm}
                  color="tealDark"
                />
                <SecondaryRoute
                  i18nText={i18n.buttonSubText}
                  i18nLink={i18n.linkSignUp}
                  to="/signup"
                />
              </styled.FormDiv>
            </styled.FormContainer>
          </styled.RightColumn>
        </styled.FlexContainer>
      </>
    );
  }
}

export const LoginScene = withRouter(LoginComponent);

LoginComponent.propTypes = {
  errorMessage: PropTypes.array,
  successMessage: PropTypes.array,
  formObject: PropTypes.object,
  shouldValidate: PropTypes.bool,
  inputChange: PropTypes.func,
  saveForm: PropTypes.func,
  onRedirect: PropTypes.func,
  onCloseModal: PropTypes.func,
  history: PropTypes.object.isRequired,
};
