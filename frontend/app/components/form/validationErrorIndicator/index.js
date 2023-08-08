import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/elements/icon';

import * as styled from './styles';

export const ValidationErrorIndicator = (props) => {
  const { className, inputType } = props;

  return (
    <styled.ValidationErrorIcon className={className} inputType={inputType}>
      <Icon icon="WarningCircleFill" color="red" />
    </styled.ValidationErrorIcon>
  );
};

ValidationErrorIndicator.propTypes = {
  className: PropTypes.string,
  inputType: PropTypes.string,
};
