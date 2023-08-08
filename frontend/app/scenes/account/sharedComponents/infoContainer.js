import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as styled from './styles';

export const InfoContainer = ({ info }) => (
  <>
    <styled.BackgroundImg />
    <styled.Info>
      <styled.FormTitle inverted>
        <FormattedMessage {...info.title} />
      </styled.FormTitle>
      <styled.InfoItems>
        {info.list.map(({ title, text, icon, color }) => (
          <styled.InfoItem key={`${icon}-${title[0]}${color[1]}`}>
            <styled.InfoItemIcon icon={icon} color={color} size="large" />
            <styled.InfoContent>
              <styled.InfoItemTitle>
                <FormattedMessage {...title} />
              </styled.InfoItemTitle>
              {text && (
                <styled.InfoItemText>
                  <FormattedMessage {...text} />
                </styled.InfoItemText>
              )}
            </styled.InfoContent>
          </styled.InfoItem>
        ))}
      </styled.InfoItems>
    </styled.Info>
  </>
);

InfoContainer.propTypes = {
  info: PropTypes.object.isRequired,
};
