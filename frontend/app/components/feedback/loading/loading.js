import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isAuthenticatedSelector } from 'containers/App/selectors';

import { Overlay } from 'components/structure/overlay/overlay';
import { Spinner } from 'components/visual/Spinner';

const LoadingComponent = (props) => {
  const { location, isAuthenticated } = props;
  const hasSidebar = isAuthenticated;

  return (
    <Overlay noClose isLight pullRight={hasSidebar ? '5.4rem' : null}>
      <Spinner animated />
    </Overlay>
  );
};

LoadingComponent.propTypes = {
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
});

const withConnect = connect(mapStateToProps, null);

export const Loading = compose(withRouter, withConnect)(LoadingComponent);
