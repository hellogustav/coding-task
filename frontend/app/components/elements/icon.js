import React from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import { isNumber } from 'lodash';
import * as PhosphorIcons from 'phosphor-react';
import { Colors } from '../utils/styles/ui';

import * as styled from './styles/icon';
import { ICON_SIZES, ICON_WEIGHTS } from './constants/icons';

const computeSize = (size) => (isNumber(size) ? size : ICON_SIZES[size]) * 10;

/**
 * "#" in URLs starts a fragment identifier.
 * So, in order to url works, it is needed to escape "#" (%23) for colors
 */
export const toStaticMarkup = (props) =>
  renderToStaticMarkup(
    <Icon xmlns="http://www.w3.org/2000/svg" {...props} />
  ).replace(/#/g, '%23');

export const Icon = function Icon({ icon, color, size, weight, ...props }) {
  const computedSize = computeSize(size);
  const phosphorIconName = icon?.replace('Fill', '');

  let IconComponent = PhosphorIcons[phosphorIconName];

  if (!icon || !IconComponent) {
    // eslint-disable-next-line no-console
    console.error(
      '>>>>>>> Missing Icon: %s, path: %s',
      icon,
      window.location.pathname
    );
    IconComponent = PhosphorIcons.ImageSquare;
  }

  const autoWeight = icon?.includes('Fill') ? 'fill' : undefined;

  return (
    <IconComponent
      weight={autoWeight || weight}
      size={computedSize}
      color={Colors[color] || color}
      {...props}
    />
  );
};

Icon.propTypes = {
  icon: PropTypes.oneOf([
    ...Object.keys(PhosphorIcons).map((name) => `${name}Fill`),
    ...Object.keys(PhosphorIcons),
  ]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(ICON_SIZES)),
    PropTypes.number,
  ]),
  color: PropTypes.string,
  weight: PropTypes.oneOf(Object.keys(ICON_WEIGHTS)),
};

Icon.defaultProps = {
  icon: 'gustav',
  size: 'normal',
  color: Colors.text,
  weight: 'regular',
};

export const IconWrapped = function IconWrapped({
  className,
  color,
  size,
  shape,
  ...props
}) {
  const computedSize = computeSize(size) + 2;
  const ShapeWrapper = shape === 'circle' ? styled.Circle : styled.Square;

  return (
    <ShapeWrapper className={className} color={color} size={computedSize}>
      <Icon color="white" size={size} {...props} />
    </ShapeWrapper>
  );
};

IconWrapped.propTypes = {
  ...Icon.propTypes,
  shape: PropTypes.oneOf(['circle', 'square']),
};
IconWrapped.defaultProps = {
  ...Icon.defaultProps,
  shape: 'circle',
};

export const IconCircle = function IconCircle({
  className,
  color,
  shadow,
  ...props
}) {
  return (
    <styled.CircleWrapper className={className} color={color} shadow={shadow}>
      <Icon {...props} size="x2small" color={color} />
    </styled.CircleWrapper>
  );
};

IconCircle.propTypes = {
  ...Icon.propTypes,
  shadow: PropTypes.string,
};
IconCircle.defaultProps = Icon.defaultProps;

export const IconCounter = function IconCounter({
  className,
  color,
  counter,
  ...props
}) {
  return (
    <styled.CounterWrapper className={className}>
      <styled.IconCounter color={color} digits={counter.toString().length}>
        {counter}
      </styled.IconCounter>
      <Icon {...props} color={color} />
    </styled.CounterWrapper>
  );
};

IconCounter.propTypes = {
  ...Icon.propTypes,
  counter: PropTypes.number,
};
IconCounter.defaultProps = Icon.defaultProps;
