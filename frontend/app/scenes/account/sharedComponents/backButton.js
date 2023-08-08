import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/elements/icon';
import { Colors } from 'components/utils/styles/ui';

import * as styled from './styles';

export const BackButton = ({ onClick, className }) => (
  <styled.BackButton className={className} onClick={onClick}>
    <Icon icon="ArrowLeft" size="xlarge" color={Colors.text} />
  </styled.BackButton>
);

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
