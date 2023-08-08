import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isObject } from 'lodash';

import { ICON_SIZES } from 'components/elements/constants/icons';
import * as styled from './styles';

export const InfoBox = (props) => {
  const {
    className,
    icon,
    iconSize,
    color,
    size,
    header,
    content,
    backgroundColor,
    borderColor,
    noPadding,
  } = props;

  return (
    <styled.Wrapper
      className={className}
      size={size}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      noPadding={noPadding}
    >
      <styled.IconWrapper>
        <styled.Icon icon={icon} color={color} size={iconSize} />
      </styled.IconWrapper>
      <styled.Content>
        {header && (
          <styled.Header color={color}>
            {isObject(header) ? <FormattedMessage {...header} /> : header}
          </styled.Header>
        )}
        {isObject(content) && !React.isValidElement(content) ? (
          <FormattedMessage {...content} />
        ) : (
          content
        )}
      </styled.Content>
    </styled.Wrapper>
  );
};

InfoBox.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOf(Object.keys(ICON_SIZES)),
  color: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'compact']),
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  noPadding: PropTypes.bool,
};

InfoBox.defaultProps = {
  icon: 'WarningCircle',
  iconSize: 'larger',
  color: 'tealDark',
  size: 'normal',
  header: '',
  content: '',
  noPadding: false,
};
