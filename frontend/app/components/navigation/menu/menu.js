import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEqual, some } from 'lodash';

import { Scrollbars } from 'components/misc/Scrollbars';

import * as styled from './styles/menu';

import { Item } from './item';

export class Menu extends Component {
  constructor() {
    super();
    this.items = [];
  }

  shouldComponentUpdate(nextProps) {
    const { context, className } = this.props;
    const nextContext = nextProps.context;

    const { selected, active, links } = nextContext;

    return (
      nextProps.className !== className ||
      selected !== context.selected ||
      active !== context.active ||
      links.length !== context.links.length ||
      some(links, (item, index) => item.slug !== context.links[index].slug) ||
      some(
        links,
        (item, index) => item.linkName !== context.links[index].linkName
      ) ||
      some(links, (item, index) => item.icon !== context.links[index].icon) ||
      some(
        links,
        (item, index) => !isEqual(item.values, context.links[index].values)
      )
    );
  }

  scrollTo(index) {
    const { context } = this.props;
    if (this.scrollbar && this.showScrollbars()) {
      const { links } = context;
      this.scrollbar.scrollTop =
        index * (this.scrollbar.scrollHeight / links.length);
    }
  }

  showScrollbars() {
    const { context } = this.props;
    const { maxItems = 6 } = this.props;
    return context.links.length > maxItems;
  }

  menuItems() {
    const {
      context: { links, active, selected, parent, menuFor, type },
    } = this.props;

    return links.map((menuItem, index) => {
      const isActive = menuItem.slug === active;
      const isSelected = selected === index;
      const menuProps = {
        menuItem,
        isActive,
        isSelected,
        parent,
        menuFor,
      };

      return (
        <Item
          key={`${parent}-${menuItem.slug}`}
          type={type}
          context={menuProps}
          ref={(item) => {
            this.items[index] = item;
          }}
          data-manual={`menu.${menuItem.slug}`}
        />
      );
    });
  }

  render() {
    const { className, context } = this.props;
    const { parent, type, postButtonsExtra } = context;

    const MenuTag = type.startsWith('vertical')
      ? styled.MenuVertical
      : styled.Menu;

    const scrollbars = this.showScrollbars() ? (
      <Scrollbars
        vertical
        height="25rem"
        ref={(scrollbar) => {
          this.scrollbar = scrollbar;
        }}
      >
        {this.menuItems()}
        {postButtonsExtra}
      </Scrollbars>
    ) : (
      <>
        {this.menuItems()}
        {postButtonsExtra}
      </>
    );

    return (
      <MenuTag key={`menu-${parent}`} className={className} type={type}>
        {scrollbars}
      </MenuTag>
    );
  }
}

Menu.propTypes = {
  context: PropTypes.shape({
    parent: PropTypes.string,
    active: PropTypes.string,
    selected: PropTypes.number,
    type: PropTypes.string,
    menuFor: PropTypes.string,
    links: PropTypes.array,
    postButtonsExtra: PropTypes.node,
  }),
  maxItems: PropTypes.number,
  className: PropTypes.string,
};
