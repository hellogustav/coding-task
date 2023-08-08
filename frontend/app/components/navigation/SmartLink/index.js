import React from 'react';
import PropTypes from 'prop-types';
import { isNull, isObject, startsWith, isFunction, some } from 'lodash';

import * as styled from './styles';
import { LINK_SIZES as SIZES } from './constants';

export const SmartLink = function SmartLink(props) {
  const { to, target, children, track, onClick, ...otherProps } = props;

  const isInternal =
    to && (isObject(to) || (!startsWith(to, '//') && startsWith(to, '/')));

  const handleOnClickLink = (event) => {
    if (isFunction(onClick)) onClick(event);
  };

  const rest = { ...otherProps, onClick: handleOnClickLink };

  if (isInternal && !isNull(to)) {
    return (
      <styled.RouterLink target={target} to={to} {...rest}>
        {children}
      </styled.RouterLink>
    );
  }

  const rel = target === '_blank' ? 'noopener noreferrer' : null;

  if (to && !isNull(to)) {
    const externalPrefixes = ['http://', 'https://', '//', 'mailto:'];
    const href = some(externalPrefixes, (prefix) => startsWith(to, prefix))
      ? to
      : `//${to}`;

    return (
      <styled.Link target={target} rel={rel} href={href} {...rest}>
        {children}
      </styled.Link>
    );
  }

  return (
    <styled.Link
      target={target}
      rel={rel}
      notClickable={!to && !onClick}
      {...rest}
    >
      {children}
    </styled.Link>
  );
};

SmartLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  target: PropTypes.string,
  children: PropTypes.node,
  track: PropTypes.object,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.values(SIZES)),
};

SmartLink.defaultProps = {
  size: SIZES.normal,
};

export const LINK_SIZES = SIZES;
