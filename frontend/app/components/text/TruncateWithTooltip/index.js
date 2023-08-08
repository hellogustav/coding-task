import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import TruncateMarkup from 'react-truncate-markup';
import { FormattedMessage } from 'react-intl';
import { isEmpty, isObject } from 'lodash';

import { openFlashMessage } from 'components/utils/flashMessages';
import { Icon } from 'components/elements/icon';

import { FlashDefinition } from './utils/flashDefinition';
import * as styled from './styles';

const TruncateWithTooltipForText = (props) => {
  const {
    className,
    children,
    lines,
    minLength,
    tooltip,
    display,
    dataTest,
  } = props;
  const alwaysTooltip = minLength && children.length >= minLength;
  const [disabled, setDisabled] = useState(
    !tooltip.forceDisplay && !alwaysTooltip
  );
  const handleTruncate = useCallback((wasTruncated) => {
    if (tooltip.forceDisplay) return;
    setDisabled(!wasTruncated);
  }, []);

  const content = <>{children}</>;

  return (
    <styled.Tooltip
      className={className}
      content={content}
      disabled={disabled}
      display={display}
      {...tooltip}
    >
      {alwaysTooltip ? (
        <styled.Truncate data-test={dataTest}>{children}</styled.Truncate>
      ) : (
        <TruncateMarkup lines={lines} onTruncate={handleTruncate}>
          <styled.Content data-test={dataTest}>{children}</styled.Content>
        </TruncateMarkup>
      )}
    </styled.Tooltip>
  );
};

TruncateWithTooltipForText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  lines: PropTypes.number,
  minLength: PropTypes.number,
  display: PropTypes.string,
  tooltip: PropTypes.shape({
    fixed: PropTypes.bool,
    position: PropTypes.string,
    withCopyButton: PropTypes.bool,
    forceDisplay: PropTypes.bool,
  }),
};

TruncateWithTooltipForText.defaultProps = {
  lines: 1,
  tooltip: {},
};

export const TruncateWithTooltipForI18n = ({ i18n, values, ...props }) => (
  <FormattedMessage {...i18n} values={values}>
    {(value) => (
      <TruncateWithTooltipForText {...props}>
        {value}
      </TruncateWithTooltipForText>
    )}
  </FormattedMessage>
);

TruncateWithTooltipForI18n.propTypes = {
  ...TruncateWithTooltipForText.propTypes,
  i18n: PropTypes.object,
  values: PropTypes.object,
};

export const TruncateWithTooltip = ({ label, na, ...props }) => {
  if (isEmpty(label) && na) return <FormattedMessage {...na} />;

  if (isObject(label) && !React.isValidElement(label)) {
    return <TruncateWithTooltipForI18n i18n={label} {...props} />;
  }

  return (
    <TruncateWithTooltipForText {...props}>{label}</TruncateWithTooltipForText>
  );
};

TruncateWithTooltip.propTypes = {
  ...TruncateWithTooltipForText.propTypes,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  values: PropTypes.object,
};
