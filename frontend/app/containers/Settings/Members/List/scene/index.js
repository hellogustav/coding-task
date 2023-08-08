import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import { get, compact } from 'lodash';

import { TableComponent } from 'components/structure/table';
import { Select } from 'components/form/select/select';
import { Button } from 'components/elements/button';
import { ButtonGroup } from 'components/elements/styles/button';
import { Pagination } from 'components/navigation/pagination/pagination';

import {
  RolesDefinition,
  availableRolesDefinition,
} from 'containers/Settings/Members/Invite/scene/utils/formDefinition';

import * as styled from './styles';
import i18n from './utils/i18n';

/* eslint react/prop-types:0 */
const MembersSceneComponent = function MembersScene(props) {
  const {
    intl,
    location,
    members,
    pagination,
    onUpdateMember,
    onReinviteMember,
    onPageChange,
    currentUserId,
    membershipRole,
  } = props;

  const editDisabled = (userId, userRole) =>
    currentUserId === userId ||
    (userRole === 'owner' && membershipRole !== 'owner');

  const columns = compact([
    {
      header: intl.formatMessage(i18n.name),
      accessor: ['first_name', 'last_name'],
      cell: ({ first_name: firstName, last_name: lastName }) =>
        `${firstName} ${lastName}`,
    },
    {
      header: intl.formatMessage(i18n.email),
      accessor: 'email',
    },
    {
      header: intl.formatMessage(i18n.permission),
      accessor: ['id', 'role'],
      cellProps: {
        noPadding: true,
      },
      cell: ({ id, role }) =>
        editDisabled(id, role) ? (
          role.charAt(0) + role.slice(1)
        ) : (
          <Select
            selected={role}
            onChange={(selected) => onUpdateMember(id, selected)}
            options={availableRolesDefinition(membershipRole, RolesDefinition)}
          />
        ),
    },
    {
      header: intl.formatMessage(i18n.invitation),
      accessor: ['id', 'invite_pending'],
      cellProps: {
        noPadding: true,
      },
      cell: ({ id, invite_pending: invitePending }) =>
        invitePending ? (
          <ButtonGroup>
            <Button type="outline" onClick={() => onReinviteMember(id)}>
              <FormattedMessage {...i18n.resendInvitation} />
            </Button>
          </ButtonGroup>
        ) : (
          <FormattedMessage {...i18n.noInvitationPending} />
        ),
    },
    {
      header: null,
      accessor: ['id', 'role'],
      cellProps: {
        noPadding: true,
        rightAligned: true,
      },
      cell: ({ id, role }) => (
        <ButtonGroup>
          <Button
            color="danger"
            disabled={editDisabled(id, role)}
            to={!editDisabled(id, role) && `/settings/members/${id}/remove`}
          >
            <FormattedMessage {...i18n.removeMember} />
          </Button>
        </ButtonGroup>
      ),
    },
  ]);

  return (
    <div>
      <styled.PaginationWrapper>
        <Pagination
          {...pagination}
          location={location}
          labelCount={intl.formatMessage(i18n.membersCount)}
          onPageChange={onPageChange}
        />
      </styled.PaginationWrapper>
      <styled.TableWrapper>
        <TableComponent data={members} columns={columns} isBordered />
      </styled.TableWrapper>
    </div>
  );
};

MembersSceneComponent.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ),
  pagination: PropTypes.object,
  onUpdateMember: PropTypes.func.isRequired,
  onReinviteMember: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentUserId: PropTypes.string,
  membershipRole: PropTypes.string,
};

export const MembersScene = withRouter(injectIntl(MembersSceneComponent));
