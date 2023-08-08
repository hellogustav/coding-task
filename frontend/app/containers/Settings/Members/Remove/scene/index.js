import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

import { Overlay } from 'components/structure/overlay/overlay';
import { Icon } from 'components/elements/icon';
import { Button } from 'components/elements/button';

import { FormDefinition } from './utils/formDefinition';
import * as styled from './styles';
import i18n from './utils/i18n';

export class RemoveMemberScene extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit = () => {
    const { member, onRemoveMember, onCloseModal } = this.props;

    onRemoveMember(member.id, this.state);
    onCloseModal();
  };

  render() {
    const { member, members, company, onCloseModal } = this.props;

    return (
      <Overlay closeOverlay={onCloseModal}>
        <styled.Wrapper>
          <styled.Title>
            <FormattedMessage
              {...i18n.titleNoOwhership}
              values={{
                firstName: member.first_name,
                lastName: member.last_name,
              }}
            />
          </styled.Title>
          <styled.SubTitle>
            <FormattedMessage {...i18n.subtitleNoOwhership} values={member} />
          </styled.SubTitle>

          <styled.Actions>
            <Button type="outline" color="mono" onClick={onCloseModal}>
              <FormattedMessage {...i18n.buttonCancel} />
            </Button>
            <Button color="primaryDark" onClick={this.handleSubmit}>
              <FormattedMessage {...i18n.buttonRemove} />
            </Button>
          </styled.Actions>
        </styled.Wrapper>
      </Overlay>
    );
  }
}

RemoveMemberScene.propTypes = {
  member: PropTypes.object,
  members: PropTypes.array,
  company: PropTypes.object,
  counters: PropTypes.object,
  onRemoveMember: PropTypes.func,
  onCloseModal: PropTypes.func,
};
