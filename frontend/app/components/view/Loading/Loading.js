import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Spinner } from 'components/visual/Spinner';

import i18n from './utils/i18n';
import { Layout } from './Layout';
import { Fallback } from './Fallback';

export const Loading = (props) => {
  const { error, timedOut, pastDelay } = props;

  if (error) {
    // When the loader has errored
    return <Fallback />;
  }
  if (timedOut) {
    // When the loader has taken longer than the timeout
    return (
      <Layout
        icon={<Spinner />}
        title={<FormattedMessage {...i18n.timedOut} />}
      />
    );
  }
  if (pastDelay) {
    // When the loader has taken longer than the delay
    return <Layout icon={<Spinner />} />;
  }

  // When the loader has just started
  return null;
};

Loading.propTypes = {
  error: PropTypes.instanceOf(Error),
  pastDelay: PropTypes.bool,
  timedOut: PropTypes.bool,
};
