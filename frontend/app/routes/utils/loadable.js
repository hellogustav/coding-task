import React from 'react';
import Loadable from 'react-loadable';
import { ErrorBoundary } from 'react-error-boundary';

import { Loading, Fallback } from 'components/view/Loading';
import { trackException } from 'utils/errorLogging';

const handleError = (error, componentStack) =>
  trackException(error, { extra: { componentStack } });

export function LoadableRoute(opts) {
  return Loadable({
    loading: Loading,
    delay: 200,
    render(loaded, props) {
      const { default: Component } = loaded;
      return (
        <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
          <Component {...props} />
        </ErrorBoundary>
      );
    },
    ...opts,
  });
}
