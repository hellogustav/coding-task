import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { find, isEmpty } from 'lodash';

import { Config } from 'containers/App/config';
import { anyPropertyInvalid, getErrors } from 'components/utils/form-utils';
import { formHOC } from 'scenes/utils/form/hoc';

import * as styled from './styles';
import i18n from './utils/i18n';
import { formDefinition } from './utils/formDefinition';
import { inviteObject } from './utils/inviteObject';
import { inviteAsJSON } from './utils/inviteAsJson';

@formHOC()
export class InviteMemberScene extends Component {
  constructor(props) {
    super(props);

    const { membershipRole } = props;

    this.FormDefinition = formDefinition(membershipRole);

    this.state = {
      isSaving: false,
    };
  }

  handleSaveForm = (event) => {
    const { saveForm } = this.props;
    this.setState({ isSaving: true }, () =>
      saveForm(event).catch(() => this.setState({ isSaving: false }))
    );
  };

  getErrorKeys(formObject) {
    return getErrors(formObject, this.FormDefinition, this.customErrors());
  }

  parseObject() {
    return inviteObject();
  }

  customErrors() {
    const { currentUserEmail } = this.props;

    return (state) => {
      if (state.email === currentUserEmail) {
        return ['currentUserEmail'];
      }
      return [];
    };
  }

  customValidation() {
    const { currentUserEmail } = this.props;

    return (definition, state) => {
      if (definition === 'email' && state.email === currentUserEmail) {
        return true;
      }
      return false;
    };
  }

  shouldSubmit(formObject) {
    return !anyPropertyInvalid(
      formObject,
      this.FormDefinition,
      this.customValidation()
    );
  }

  objectToSave(objectForm) {
    return inviteAsJSON(objectForm);
  }

  inputChange(key, value) {
    const { inputChange } = this.props;

    inputChange(key, value);
  }

  render() {
    const { onCloseModal, formObject, shouldValidate } = this.props;
    const { isSaving } = this.state;

    return (
      <styled.Overlay title={i18n.inviteMember} closeOverlay={onCloseModal}>
        <styled.Content>
          <styled.FormTitle>
            <FormattedMessage {...i18n.inviteMemberTitle} />
          </styled.FormTitle>
          <styled.Fieldset
            fullWidth
            context={this.FormDefinition.email}
            inputValue={formObject.email}
            shouldValidate={shouldValidate}
            fn={(value) => this.inputChange('email', value)}
          />
          <styled.Multiple>
            <styled.Fieldset
              context={this.FormDefinition.firstName}
              inputValue={formObject.firstName}
              shouldValidate={shouldValidate}
              fn={(value) => this.inputChange('firstName', value)}
            />
            <styled.Fieldset
              atRight
              context={this.FormDefinition.lastName}
              inputValue={formObject.lastName}
              shouldValidate={shouldValidate}
              fn={(value) => this.inputChange('lastName', value)}
            />
          </styled.Multiple>
          <styled.Fieldset
            fullWidth
            context={this.FormDefinition.role}
            selected={formObject.role}
            shouldValidate={shouldValidate}
            fn={(value) => this.inputChange('role', value)}
          />
        </styled.Content>
        <styled.Footer>
          <styled.ButtonCancel
            type="inverted"
            color="mono"
            onClick={onCloseModal}
          >
            <FormattedMessage {...i18n.buttonCancel} />
          </styled.ButtonCancel>
          <styled.Submit
            color="tealDark"
            value={i18n.sendInvitation}
            onClick={this.handleSaveForm}
            loading={isSaving}
          />
        </styled.Footer>
      </styled.Overlay>
    );
  }
}

InviteMemberScene.propTypes = {
  errorMessage: PropTypes.array,
  successMessage: PropTypes.array,
  currentUserEmail: PropTypes.string,
  membershipRole: PropTypes.string,
  formObject: PropTypes.object,
  shouldValidate: PropTypes.bool,
  inputChange: PropTypes.func,
  saveForm: PropTypes.func,
  onCloseModal: PropTypes.func.isRequired,
};
