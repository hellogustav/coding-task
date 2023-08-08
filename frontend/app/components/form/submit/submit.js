import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { pickBy } from 'lodash';

import { Button } from '../../elements/button';

const SubmitComponent = function Submit(props) {
  const {
    intl,
    type,
    className,
    submitFor,
    value,
    onClick,
    color,
    disabled = false,
    ...rest
  } = props;
  const buttonProps = pickBy({ type, color });

  return (
    <Button
      htmlType="submit"
      className={className}
      name={submitFor}
      disabled={disabled}
      onClick={(event) => onClick(event)}
      {...rest}
      {...buttonProps}
    >
      {intl.formatMessage(value)}
    </Button>
  );
};

SubmitComponent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.object,
  intl: PropTypes.object,
  submitFor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  loading: PropTypes.bool,
};

export const Submit = injectIntl(SubmitComponent);
