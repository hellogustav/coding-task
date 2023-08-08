import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { getInjectors } from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export const injectReducer = ({ key, reducer }) => (WrappedComponent) => {
  class ReducerInjector extends React.Component {
    // eslint-disable-next-line react/destructuring-assignment
    injectors = getInjectors(this.context.store);

    UNSAFE_componentWillMount() {
      this.injectors.injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ReducerInjector.WrappedComponent = WrappedComponent;

  ReducerInjector.contextTypes = {
    store: PropTypes.object.isRequired,
  };

  ReducerInjector.displayName = `withReducer(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
