import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles/table';

export const Th = function Th({ children, ...props }) {
  return <styled.Th {...props}>{children}</styled.Th>;
};

Th.propTypes = {
  children: PropTypes.node,
};

Th.defaultProps = {
  children: null,
};
