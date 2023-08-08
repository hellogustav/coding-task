import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './styles';

export const Layout = ({ icon, title, children }) => (
  <styled.Container>
    <styled.Box>
      {icon}

      {title && <styled.Title>{title}</styled.Title>}

      {children && <styled.Body>{children}</styled.Body>}
    </styled.Box>
  </styled.Container>
);

Layout.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.node,
  children: PropTypes.node,
};
