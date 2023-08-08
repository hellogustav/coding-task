import PropTypes from 'prop-types';
import React from 'react';

import * as styled from './styles/buttons';

import { Icon } from '../../elements/icon';

import { Colors } from '../../utils/styles/ui';

export const CloseButton = function CloseButton({ className, fn }) {
  return (
    <styled.Close className={className} color="primaryDark" onClick={fn}>
      <Icon icon="X" color={Colors.white} size={1.6} />
    </styled.Close>
  );
};

CloseButton.propTypes = {
  className: PropTypes.string,
  fn: PropTypes.func,
};
