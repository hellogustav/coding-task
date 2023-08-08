import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from '../../elements/icon';

import * as styled from './styles/buttons';

import { Colors } from '../../utils/styles/ui';

export const GoToButton = function GoToButton({ className, prev, next, fn }) {
  if (prev) {
    return (
      <styled.Arrow className={className} onClick={fn}>
        <Icon icon="CaretLeft" color={Colors.white} size={4} />
      </styled.Arrow>
    );
  }

  if (next) {
    return (
      <styled.Arrow className={className} onClick={fn}>
        <Icon icon="CaretRight" color={Colors.white} size={4} />
      </styled.Arrow>
    );
  }
};

GoToButton.propTypes = {
  className: PropTypes.string,
  prev: PropTypes.bool,
  next: PropTypes.bool,
  fn: PropTypes.func,
};
