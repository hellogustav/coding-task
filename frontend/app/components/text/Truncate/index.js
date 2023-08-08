import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TruncateMarkup from 'react-truncate-markup';
import { FormattedMessage } from 'react-intl';
import { Parser } from 'html-to-react';

import * as styled from './styles';
import i18n from './utils/i18n';

export const Truncate = (props) => {
  const { className, children, lines, isHtml } = props;
  const [expanded, toggleExpanded] = useState(false);
  const parser = new Parser();
  const handleClick = (event) => {
    event.stopPropagation();
    toggleExpanded(!expanded);
  };
  const renderNode = (node) => {
    if (isHtml) {
      return parser.parse(node);
    }
    return node;
  };

  if (expanded) {
    return (
      <styled.Content className={className} isHtml={isHtml}>
        {renderNode(children)}
        <styled.LinkMore onClick={handleClick}>
          <FormattedMessage {...i18n.linkLess} />
        </styled.LinkMore>
      </styled.Content>
    );
  }

  return (
    <TruncateMarkup
      lines={lines}
      ellipsis={
        <>
          ...
          <styled.LinkMore onClick={handleClick}>
            <FormattedMessage {...i18n.linkMore} />
          </styled.LinkMore>
        </>
      }
    >
      <styled.Content className={className} isHtml={isHtml} isTruncated>
        {renderNode(children)}
      </styled.Content>
    </TruncateMarkup>
  );
};

Truncate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  lines: PropTypes.number,
  isHtml: PropTypes.bool,
};
