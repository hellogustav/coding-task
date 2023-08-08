import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Icon } from 'components/elements/icon';
import { Button } from 'components/elements/button';
import { ButtonSet } from 'components/misc/ButtonSet';

import i18n from './utils/i18n';

const handleReloadApp = () => window.location.reload(true);
const handleDashboard = () => {
  window.location.href = '/';
};
const handleContactSupport = () => {};
const handleLogout = () => {
  window.location.href = '/logout';
};
const handleCustomAction = (path) => {
  window.location.href = path;
};

export const FallbackActions = (props) => {
  const { showReload, showDashboard, showSupport, showLogout, custom } = props;

  return (
    <ButtonSet isVertical isPadded align="stretch">
      {custom && (
        <Button
          onClick={() => handleCustomAction(custom.action)}
          color="primary"
        >
          <Icon icon={custom.icon} />
          <FormattedMessage {...custom.text} />
        </Button>
      )}

      {showReload && (
        <Button onClick={handleReloadApp} color="primary">
          <Icon icon="ArrowsCounterClockwise" />
          <FormattedMessage {...i18n.buttonReloadApp} />
        </Button>
      )}

      {showDashboard && (
        <Button onClick={handleDashboard} color="primary">
          <Icon icon="ArrowLeft" />
          <FormattedMessage {...i18n.buttonDashboard} />
        </Button>
      )}

      {showSupport && (
        <Button onClick={handleContactSupport} color="primary" type="outline">
          <Icon icon="AnchorSimple" />
          <FormattedMessage {...i18n.buttonSupport} />
        </Button>
      )}

      {showLogout && (
        <Button onClick={handleLogout} color="danger" type="inverted">
          <Icon icon="SignOut" />
          <FormattedMessage {...i18n.buttonLogout} />
        </Button>
      )}
    </ButtonSet>
  );
};

FallbackActions.propTypes = {
  showReload: PropTypes.bool,
  showDashboard: PropTypes.bool,
  showSupport: PropTypes.bool,
  showLogout: PropTypes.bool,
  custom: PropTypes.shape({
    action: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.object,
  }),
};

FallbackActions.defaultProps = {
  showReload: true,
  showDashboard: true,
  showSupport: true,
  showLogout: true,
  custom: null,
};
