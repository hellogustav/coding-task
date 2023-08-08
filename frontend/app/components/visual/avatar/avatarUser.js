import React from 'react';
import PropTypes from 'prop-types';

import { Avatar } from './avatar';

export const AvatarUser = function AvatarUser({
  className,
  size,
  shape,
  activity,
  user,
  marker,
}) {
  const hasName = user.first_name && user.last_name;
  const context = {
    picture: user.avatar,
    initials: hasName
      ? `${user.first_name[0]}${user.last_name[0]}`
      : user.email[0],
    marker,
  };

  return (
    <Avatar
      className={className}
      size={size}
      shape={shape}
      color={user.color}
      activity={activity === undefined ? user.last_activity_at : activity}
      context={context}
    />
  );
};

AvatarUser.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  shape: PropTypes.string,
  activity: PropTypes.bool,
  marker: PropTypes.bool,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    color: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    last_activity_at: PropTypes.string,
  }),
};

AvatarUser.defaultProps = {
  size: 'small',
  shape: 'rounded',
};
