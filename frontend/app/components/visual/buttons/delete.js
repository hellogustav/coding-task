import PropTypes from 'prop-types';
import React from 'react';

import * as styled from './styles/buttons';

import { Icon } from '../../elements/icon';

import { Colors } from '../../utils/styles/ui';

export const DeleteButton = function DeleteButton({
  className,
  color = 'monoLight',
  fn,
  type,
}) {
  return (
    <styled.Delete
      className={className}
      type={type}
      color={color}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        fn();
      }}
    >
      <Icon icon="X" color={Colors.white} size={1.5} />
    </styled.Delete>
  );
};

DeleteButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  fn: PropTypes.func,
  type: PropTypes.string,
};
