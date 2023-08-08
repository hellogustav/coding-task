import React, { forwardRef, isValidElement, useRef } from 'react';
import PropTypes from 'prop-types';

import { first, last, compact } from 'lodash';

import theme from 'themes';
import { Colors } from 'components/utils/styles/ui';

import * as styled from './styles/button';
import { Icon } from './icon';
import {
  BUTTON_COLORS,
  BUTTON_SIZES as SIZES,
  BUTTON_HEIGHTS as HEIGHTS,
} from './constants/buttons';

export const Button = forwardRef((props, ref) => {
  if (!ref) {
    // eslint-disable-next-line no-param-reassign
    ref = useRef();
  }
  const rippleRef = useRef();
  const {
    htmlType,
    type,
    className,
    loading,
    disabled,
    rounded,
    fullWidth,
    children,
    to,
    onClick,
    dataManual,
    dataTest,
    ...rest
  } = props;
  const hasMultipleChildren = compact(children).length > 1;
  const hasIconLeft =
    isValidElement(first(children)) &&
    first(children).type === Icon &&
    hasMultipleChildren;
  const hasIconRight =
    isValidElement(last(children)) &&
    last(children).type === Icon &&
    hasMultipleChildren;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    const ripple = rippleRef.current;
    const button = ref.current;
    if (ripple && button) {
      ripple.classList.remove('animate');
      ripple.style.height = `${Math.max(
        button.offsetWidth,
        button.offsetHeight
      )}px`;
      ripple.style.width = ripple.style.height;

      const offsetX = e.clientX - button.getBoundingClientRect().left;
      const offsetY = e.clientY - button.getBoundingClientRect().top;
      ripple.style.left = `${offsetX - ripple.offsetWidth / 2}px`;
      ripple.style.top = `${offsetY - ripple.offsetHeight / 2}px`;
      ripple.classList.add('animate');
    }
  };

  const ButtonComponent = to ? styled.ButtonLink : styled.Button;

  return (
    <ButtonComponent
      type={htmlType}
      styleType={type}
      className={className}
      isLoading={loading}
      disabled={disabled}
      rounded={rounded}
      fullWidth={fullWidth}
      hasIconLeft={hasIconLeft}
      hasIconRight={hasIconRight}
      theme={theme}
      data-manual={dataManual}
      data-test={dataTest}
      onClick={handleClick}
      {...(to && { to })}
      {...rest}
      ref={ref}
    >
      {children}
      <styled.ButtonSpacingWrapper>
        <styled.ButtonRipple ref={rippleRef} />
      </styled.ButtonSpacingWrapper>
    </ButtonComponent>
  );
});

Button.propTypes = {
  htmlType: PropTypes.oneOf(['button', 'reset', 'submit']),
  color: PropTypes.oneOf(
    Object.keys(BUTTON_COLORS).concat(Object.keys(Colors))
  ),
  size: PropTypes.oneOf(Object.values(SIZES)),
  type: PropTypes.oneOf([
    'outline',
    'inverted',
    'blank',
    'blank-underlined',
    'mono',
  ]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
  to: PropTypes.string,
  dataManual: PropTypes.string,
  dataTest: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  htmlType: 'button',
  color: 'primary',
  size: SIZES.normal,
  loading: false,
  disabled: false,
  rounded: false,
  fullWidth: false,
  children: '',
};

export const BUTTON_SIZES = SIZES;
export const BUTTON_HEIGHTS = HEIGHTS;
export const { buttonSizeMixin } = styled;
