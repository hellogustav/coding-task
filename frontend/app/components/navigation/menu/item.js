import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

import * as styled from './styles/menu';

import { MenuLink } from './link';

export const Item = forwardRef(
  ({ className, type, context, ...props }, ref) => {
    const isVertical = type.startsWith('vertical');
    const ItemTag = isVertical
      ? styled[`Item${capitalize(type)}`]
      : styled.Item;

    const { fn, linkPadding, border, disabled } = context.menuItem;
    const selectedClass = context.isSelected ? 'selected' : '';

    return (
      <ItemTag
        className={`${className} ${selectedClass}`}
        linkPadding={linkPadding}
        border={border}
        ref={ref}
        onClick={(event) => (fn && !disabled ? fn(event) : null)}
        {...props}
      >
        <styled.ItemContent isVertical={isVertical}>
          <MenuLink type={type} context={context} />
          {context.isActive && isVertical && (
            <styled.Icon icon="Check" color="tealDark" weight="bold" />
          )}
        </styled.ItemContent>
      </ItemTag>
    );
  }
);

Item.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  context: PropTypes.object,
};
