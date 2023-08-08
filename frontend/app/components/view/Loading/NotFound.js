import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Spinner, SPINNER_TYPES } from 'components/visual/Spinner';

import i18n from './utils/i18n';
import { Layout } from './Layout';
import { FallbackActions } from './FallbackActions';

export const NotFound = () => (
  <Layout
    icon={<Spinner type={SPINNER_TYPES.error} />}
    title={<FormattedMessage {...i18n.notFound} />}
  >
    <FallbackActions showReload={false} showLogout={false} />
  </Layout>
);