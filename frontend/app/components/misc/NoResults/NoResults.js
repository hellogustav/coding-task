// TODO:
// * Rename component to be more generic: e.g. BlankScreen
// * Rename TYPES to something more meaningful
// * Animate illustrations

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import noResultsImageSrc from 'images/svg/no-results.svg';
import isFetchingImageSrc from 'images/svg/is-fetching.svg';

import * as styled from './styles';
import i18n from './utils/i18n';

import { TYPES } from './utils/constants';

const NoResultsComponent = function NoResults({
  intl,
  type,
  title,
  subtitle,
  noPadding,
}) {
  switch (type) {
    case 'NO_RESULTS':
      return (
        <styled.Container noPadding={noPadding}>
          <styled.Illustration src={noResultsImageSrc} />
          <styled.Title>
            {title || intl.formatMessage(i18n.noResultsTitle)}
          </styled.Title>
          <styled.Subtitle>
            {subtitle || intl.formatMessage(i18n.noResultsSubtitle)}
          </styled.Subtitle>
        </styled.Container>
      );
    case 'IS_FETCHING':
    default:
      return (
        <styled.Container noPadding={noPadding}>
          <styled.Illustration src={isFetchingImageSrc} />
          <styled.Title>
            {title || intl.formatMessage(i18n.isFetchingTitle)}
          </styled.Title>
        </styled.Container>
      );
  }
};

NoResultsComponent.propTypes = {
  intl: intlShape,
  type: PropTypes.oneOf(Object.keys(TYPES)),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  noPadding: PropTypes.bool,
};

NoResultsComponent.defaultProps = {
  type: TYPES.NO_RESULTS,
  title: null,
  subtitle: null,
  noPadding: false,
};

export const NoResults = injectIntl(NoResultsComponent);
