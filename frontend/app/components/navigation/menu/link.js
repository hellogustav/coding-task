import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { isString, isArray, isEmpty, capitalize } from 'lodash';

import { Colors } from 'components/utils/styles/ui';
import { toFormattedMessage } from 'components/utils/text';
import { Icon } from 'components/elements/icon';
import theme from 'themes';

import * as styled from './styles/link';

const IconEl = function IconEl(type, icon, iconSize, iconPosition, isActive) {
  const iconColor = isActive ? theme.colors.primary : Colors.text;
  const IconTag = styled[`${capitalize(type)}Icon`];

  return icon ? (
    <IconTag position={iconPosition}>
      {React.isValidElement(icon) ? (
        icon
      ) : (
        <Icon icon={icon} color={iconColor} size={iconSize} />
      )}
    </IconTag>
  ) : null;
};

const getTagComponent = function getTagComponent(type) {
  switch (type) {
    case 'inverted':
      return styled.TagInverted;
    case 'compact':
      return styled.TagCompact;
    default:
      return styled.Tag;
  }
};

export const TagEl = function TagEl(tag, isActive, intl) {
  if (isEmpty(tag)) {
    return null;
  }

  const { text, color, fontColor, type } = tag;
  const tagText = isString(text) ? text : intl.formatMessage(text);

  const TagComponent = getTagComponent(type);

  return (
    <TagComponent
      color={color}
      fontColor={fontColor}
      isActive={isActive}
      key={tagText}
    >
      {tagText}
    </TagComponent>
  );
};

const MenuLinkComponent = function MenuLink({
  intl,
  className,
  type,
  ...props
}) {
  const { parent, menuItem, isActive, isSelected } = props.context;
  const {
    linkName,
    linkUrl,
    slug,
    fn,
    icon,
    iconSize = 1.4,
    iconPosition = 'left',
    tags,
    disabled,
    values,
  } = menuItem;

  const linkItem = toFormattedMessage(linkName, intl, values);

  const uppercase = !(type.startsWith('vertical') || type === 'context');

  const key = `anchor-${parent}-${slug}`;
  const spanKey = `anchor-span-${parent}-${slug}`;

  const activeClass = isActive ? 'active' : '';
  const selectedClass = isSelected ? 'selected' : '';

  const LinkTag = styled[`${capitalize(type)}Link`];

  const iconItem = IconEl(type, icon, iconSize, iconPosition, isActive);

  return (
    <LinkTag
      key={key}
      className={`${className} ${selectedClass} ${activeClass}`}
      to={fn || disabled ? null : linkUrl}
      onClick={(event) => (fn && !disabled ? fn(event) : null)}
      disabled={disabled}
    >
      {iconPosition === 'left' && iconItem}

      <styled.LinkItem key={spanKey} uppercase={uppercase}>
        {linkItem}
      </styled.LinkItem>

      {iconPosition === 'right' && iconItem}

      {isArray(tags) && tags.map((tag) => TagEl(tag, isActive, intl))}
    </LinkTag>
  );
};

MenuLinkComponent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['inverted', 'compact', 'context', 'verticalbox']),
  context: PropTypes.object,
  intl: PropTypes.object,
};

export const MenuLink = injectIntl(MenuLinkComponent);
