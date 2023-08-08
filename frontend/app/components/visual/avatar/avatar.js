import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import { colorForText } from 'components/utils/conversions';
import { timeUnitsAgo } from 'components/utils/date';

import * as styled from './styles/avatar';
import { BOX_SIZES } from './constants/avatar';

export const Avatar = function ProfilePicture(props) {
  const {
    context,
    size,
    shape,
    className,
    noInitials,
    activity,
    activityShape,
    color: propColor,
  } = props;
  const retriesUsed = useRef(0);

  const { picture = '', initials, marker, initialsLength = 2 } = context;
  const text = (initials || '').substring(0, initialsLength).toUpperCase();
  const color = (context.color || propColor || colorForText(text)).substring(1);
  const imgSize = BOX_SIZES[size] * 10 * 2;
  const showIndicator = activity !== false;
  const showMarker = !showIndicator && marker;

  const initialsSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    text
  )}&color=ffffff&bold=true&background=${color}&size=${imgSize}&length=${initialsLength}`;

  const handleAvatarError = (event) => {
    if (!text) return;
    const element = event.target;
    if (retriesUsed.current <= 5) {
      setTimeout(() => {
        element.src = initialsSrc;
        retriesUsed.current += 1;
      }, retriesUsed.current ** 2 * 500);
    }
  };

  return (
    <styled.Wrapper className={className} size={size}>
      {(!picture || picture === '') && !noInitials ? (
        <styled.Initials
          shape={shape}
          src={initialsSrc}
          onError={handleAvatarError}
        />
      ) : (
        <styled.Avatar
          noInitials={noInitials}
          shape={shape}
          src={picture}
          onError={handleAvatarError}
        />
      )}
      {showIndicator && (
        <styled.ActivityIndicator
          size={size}
          shape={activityShape}
          active={activity === true || timeUnitsAgo(activity, 'minutes') < 15}
        />
      )}
      {showMarker && <styled.Marker {...marker} size="xsmall" />}
    </styled.Wrapper>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  context: PropTypes.shape({
    picture: PropTypes.string,
    initials: PropTypes.string,
    color: PropTypes.string,
    marker: PropTypes.object,
    initialsLength: PropTypes.number,
  }),
  noInitials: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(BOX_SIZES)),
  shape: PropTypes.oneOf(['square-rounded', 'rounded']),
  color: PropTypes.string,
  activity: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  activityShape: PropTypes.oneOf(['square-rounded', 'rounded']),
};

Avatar.defaultProps = {
  size: 'medium',
  shape: 'rounded',
  noInitials: false,
  activity: false,
};
