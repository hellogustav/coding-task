import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles/table';

export const Tfoot = function Tfoot({ children, ...props }) {
  return <styled.Tfoot {...props}>{children}</styled.Tfoot>;
};

Tfoot.propTypes = {
  children: PropTypes.node,
};

Tfoot.defaultProps = {
  children: [],
};
