import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles/buttonSet';

export const ButtonSet = function ButtonSet({
  align,
  isVertical,
  isPadded,
  children,
  ...props
}) {
  return (
    <styled.ButtonSet
      align={align}
      isVertical={isVertical}
      isPadded={isPadded}
      {...props}
    >
      {children}
    </styled.ButtonSet>
  );
};

ButtonSet.propTypes = {
  align: PropTypes.oneOf([
    'flex-start',
    'center',
    'stretch',
    'flex-end',
    'space-between',
  ]),
  isVertical: PropTypes.bool,
  isPadded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ButtonSet.defaultProps = {
  align: 'flex-start',
  isVertical: false,
  isPadded: false,
};
