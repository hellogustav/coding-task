import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { escape, reduce } from 'lodash';

import * as styled from './styles';

export const toFormattedText = (text, type) => {
  switch (type) {
    case 'color':
      return text.replace(/\*\*(.*?)\*\*/g, '<span>$1</span>');
    case 'bold':
      return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    case 'underline':
      return text.replace(/__(.*?)__/g, '<u>$1</u>');
    case 'code':
      return text.replace(/`(.*?)`/g, '<mark>$1</mark>');
    case 'mixed':
      return reduce(
        ['color', 'bold', 'underline', 'code'],
        (acc, t) => toFormattedText(acc, t),
        text
      );
    default:
      return text;
  }
};

/* eslint react/no-danger: 0 */
const HighlightComponent = function Highlight(props) {
  const { intl, className, type, text, values } = props;
  let html = escape(intl.formatMessage(text, values));
  html = toFormattedText(html, type);

  return (
    <styled.Highlight
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

HighlightComponent.propTypes = {
  intl: intlShape,
  className: PropTypes.string,
  type: PropTypes.oneOf(['mixed', 'color', 'underline', 'bold', 'code']),
  text: PropTypes.object.isRequired,
  values: PropTypes.object,
};

HighlightComponent.defaultProps = {
  type: 'color',
  values: {},
};

export const Highlight = injectIntl(HighlightComponent);
