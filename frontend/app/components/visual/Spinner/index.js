import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { first, keys } from 'lodash';

import SadFaceComponent from 'images/svg/sad-face.svg';

import * as styled from './styles';

const SPINNER_TYPES = {
  loading: 'loading',
  error: 'error',
};

const Props = {
  type: PropTypes.oneOf(keys(SPINNER_TYPES)),
  scale: PropTypes.number,
  className: PropTypes.string,
  innerRef: PropTypes.object,
};

const DefaultProps = {
  type: first(keys(SPINNER_TYPES)),
  scale: 1,
};

const LoadingSpinnerComponent = ({ scale, location }) => {
  return (
    <styled.Spinner scale={scale}>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
    </styled.Spinner>
  );
};

LoadingSpinnerComponent.propTypes = {
  scale: PropTypes.number,
  location: PropTypes.object,
};

const LoadingSpinner = withRouter(LoadingSpinnerComponent);

export const Spinner = ({ className, type, scale, innerRef }) => (
  <styled.SpinnerWrapper className={className} scale={scale} ref={innerRef}>
    {type === SPINNER_TYPES.error ? (
      <img src={SadFaceComponent} alt="error sad face" />
    ) : (
      <LoadingSpinner scale={scale} />
    )}
  </styled.SpinnerWrapper>
);

Spinner.propTypes = Props;
Spinner.defaultProps = DefaultProps;

export const SpinnerSmall = (props) => {
  const { className } = props;

  return <styled.SpinnerSmall className={className} />;
};

SpinnerSmall.propTypes = {
  className: PropTypes.string,
};

export { Props, DefaultProps, SPINNER_TYPES };
