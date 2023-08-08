import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Spinner, SPINNER_TYPES } from 'components/visual/Spinner';

import { Layout } from './Layout';
import { FallbackActions } from './FallbackActions';

export const CustomFallback = (props) => {
  const {
    showReload,
    showDashboard,
    showSupport,
    showLogout,
    title,
    custom,
  } = props;

  return (
    <Layout
      icon={<Spinner type={SPINNER_TYPES.error} />}
      title={<FormattedMessage {...title} />}
    >
      <FallbackActions
        showReload={showReload}
        showDashboard={showDashboard}
        showSupport={showSupport}
        showLogout={showLogout}
        custom={custom}
      />
    </Layout>
  );
};

CustomFallback.propTypes = {
  showReload: PropTypes.bool,
  showDashboard: PropTypes.bool,
  showSupport: PropTypes.bool,
  showLogout: PropTypes.bool,
  title: PropTypes.object,
  custom: PropTypes.shape({
    action: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.object,
  }),
};

CustomFallback.defaultProps = {
  showReload: false,
  showDashboard: false,
  showSupport: false,
  showLogout: false,
};
