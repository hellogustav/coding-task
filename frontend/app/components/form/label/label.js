import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import theme from 'themes';
import { Tooltip } from 'components/overlay/Tooltip';
import { Icon } from 'components/elements/icon';

import { isString } from 'lodash';

import * as styled from './styles/label';
import i18n from './utils/i18n';

const requiredIndicator = function requiredIndicator(
  required,
  includeIndicator,
  intl
) {
  if (!includeIndicator) {
    return null;
  }

  return required ? (
    <styled.RequiredIndicator>*</styled.RequiredIndicator>
  ) : (
    <styled.OptionalIndicator>
      {intl.formatMessage(i18n.optional)}
    </styled.OptionalIndicator>
  );
};

const tooltip = function tooltip(tooltipContent) {
  if (tooltipContent === null) {
    return null;
  }

  return (
    <Tooltip content={tooltipContent}>
      <styled.TooltipIcon>
        <Icon icon="Info" color={theme.colors.primary} size="large" />
      </styled.TooltipIcon>
    </Tooltip>
  );
};

const labelValue = (value, literals, intl) => {
  if (React.isValidElement(value)) return value;

  let label = isString(value) ? value : intl.formatMessage(value, literals);

  if (label.includes('`')) {
    label = (
      <span
        dangerouslySetInnerHTML={{
          __html: label.replace(/`(.*?)`/g, '<mark>$1</mark>'),
        }}
      />
    );
  }

  return label;
};

/* eslint react/no-danger: 0 */
const FormLabelComponent = function FormLabel({
  intl,
  className,
  value,
  literals,
  highlight,
  labelBreakline,
  elementToRefer,
  required = false,
  LabelUI = styled.Label,
  includeIndicator = true,
  tooltipContent = null,
}) {
  const highlightTag = highlight ? (
    <styled.Highlight>
      {isString(highlight) ? highlight : intl.formatMessage(highlight)}
    </styled.Highlight>
  ) : null;

  const breakline = labelBreakline ? <br /> : null;

  return (
    <LabelUI className={className} htmlFor={elementToRefer}>
      {labelValue(value, literals, intl)}
      {breakline}
      {highlightTag}
      {requiredIndicator(required, includeIndicator, intl)}
      {tooltip(tooltipContent)}
    </LabelUI>
  );
};

FormLabelComponent.propTypes = {
  intl: intlShape,
  LabelUI: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  className: PropTypes.string,
  includeIndicator: PropTypes.bool,
  required: PropTypes.bool,
  tooltipContent: PropTypes.string,
  highlight: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  labelBreakline: PropTypes.bool,
  elementToRefer: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.node,
  ]),
  literals: PropTypes.object,
};

export const FormLabel = injectIntl(FormLabelComponent);
