import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as styled from './styles';

export const SecondaryRoute = ({ i18nText, i18nLink, to, onClick }) => (
  <styled.SecondaryRoute>
    <styled.LightSmallText>
      <FormattedMessage
        {...i18nText}
        values={{
          link: (
            <styled.Link to={to} onClick={onClick}>
              <FormattedMessage {...i18nLink} />
            </styled.Link>
          ),
        }}
      />
    </styled.LightSmallText>
  </styled.SecondaryRoute>
);

SecondaryRoute.propTypes = {
  i18nText: PropTypes.object.isRequired,
  i18nLink: PropTypes.object.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
};
