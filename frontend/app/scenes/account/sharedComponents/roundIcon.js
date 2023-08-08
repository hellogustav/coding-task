import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/elements/icon';

import * as styled from './styles';

export const RoundIcon = ({ icon, color }) => (
  <styled.RoundIconDiv color={`${color}Lighter`}>
    <Icon icon={icon} size="xlarge" color={color} />
  </styled.RoundIconDiv>
);

RoundIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['green', 'blue']),
};
