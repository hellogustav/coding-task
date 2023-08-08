import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as styled from '../styles';
import i18n from './i18n';

function memberLinkName(member) {
  const avatarContext = {
    picture: member.avatar,
    initials: `${member.first_name[0]}${member.last_name[0]}`,
    color: member.color,
  };

  return (
    <styled.DropdownItemUser>
      <styled.DropdownAvatar
        size="xsmall"
        shape="rounded"
        context={avatarContext}
      />
      <styled.DropdownUserName>
        {member.first_name} {member.last_name}
      </styled.DropdownUserName>
    </styled.DropdownItemUser>
  );
}

export function FormDefinition(id, members) {
  const membersToDisplay = members.map((member) => ({
    linkName: memberLinkName(member),
    textValue: `${member.first_name} ${member.last_name}`,
    slug: member.id,
  }));

  membersToDisplay.unshift({
    linkName: (
      <styled.DropdownItem>
        <FormattedMessage {...i18n.placeholder} />
      </styled.DropdownItem>
    ),
    slug: null,
  });

  return {
    id,
    inputType: 'option',
    required: true,
    options: membersToDisplay,
  };
}
