import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, startsWith, isFunction, isNumber, isString } from 'lodash';

import { Icon } from 'components/elements/icon';
import { withPreservedParams } from 'components/utils/url';
import { TruncateWithTooltip } from 'components/text/TruncateWithTooltip';

import * as styled from './styles/subMenu';

const labelTooltipOptions = { fixed: true, position: 'SE' };

export class SubMenu extends Component {
  UNSAFE_componentWillMount() {
    this.toggleOnUpdate();
  }

  componentDidUpdate(prevProps) {
    if (get(this.props, 'context.slug') !== get(prevProps, 'context.slug')) {
      this.toggleOnUpdate();
    }
  }

  componentWillUnmount() {
    const { toggleSidebar } = this.props;
    toggleSidebar(false);
  }

  toggleOnUpdate = () => {
    const { context, toggleSidebar } = this.props;
    if (get(context, 'items.length', 0) > 0) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
  };

  isActive = ({ isActive, path }) => {
    const match = startsWith(window.location.pathname, path);
    return isFunction(isActive) ? isActive(match, window.location) : match;
  };

  renderCounter = (item, isActive, ifNone) => {
    const { counters } = this.props;
    const key = get(item, 'counter.key');
    const fallback = get(item, 'counter.fallback');
    const icon = get(item, 'counter.icon');
    let val = get(counters, key);
    const fallbackVal = get(counters, fallback);
    let highlight = get(item, 'counter.highlight');

    if (isString(highlight)) {
      const highlightVal = get(counters, highlight);
      if (isNumber(highlightVal) && highlightVal > 0) {
        val = highlightVal;
        highlight = true;
      } else {
        highlight = false;
      }
    }

    if (icon) {
      return <styled.CounterIcon {...icon} />;
    }

    if ((!isNumber(val) || val === 0) && isNumber(fallbackVal)) {
      return (
        <styled.Counter isActive={isActive}>
          {fallbackVal.toLocaleString()}
        </styled.Counter>
      );
    }

    if (!key || !isNumber(val) || (val === 0 && ifNone === 'hide')) {
      return null;
    }

    return (
      <styled.Counter isActive={isActive}>
        {val.toLocaleString()}
      </styled.Counter>
    );
  };

  renderItem = (item) => {
    const { slug, path } = item;

    const hasItems = get(item, 'items.length', 0) > 0;
    const isActive = this.isActive(item);
    const { isOpen } = item;
    const isExpanded = isActive || isOpen;

    return (
      <styled.Item key={slug} isExpanded={isExpanded}>
        <styled.Link
          to={path}
          isActive={isActive}
          className={`${isActive ? 'active' : ''}`}
        >
          <styled.ItemTitle
            hasItems={hasItems}
            isExpanded={isExpanded}
            data-manual={`sub_menu.${slug}`}
            data-test="sub_menu.item"
          >
            {item.icon && (
              <styled.ItemTitleIcon
                isActive={isActive}
                icon={item.icon}
                color={isExpanded ? 'tealDark' : 'text'}
              />
            )}
            <TruncateWithTooltip
              label={item.label}
              tooltip={labelTooltipOptions}
            />
            {hasItems && !isOpen && <Icon icon="CaretRight" />}
            {!isActive && this.renderCounter(item, false, 'hide')}
          </styled.ItemTitle>
        </styled.Link>

        {hasItems &&
          item.items.map((it) => this.renderSubItem(it, slug, isExpanded))}
      </styled.Item>
    );
  };

  renderSubItem = (it, slug, isExpanded) => {
    const { history } = this.props;
    const active = this.isActive(it);

    const buildPath = () =>
      withPreservedParams(
        it.path,
        `${window.location.pathname}${window.location.search}`,
        get(it, 'preservedQueryParameters', []),
        get(it, 'mappedQueryParameters', {})
      );

    return (
      <styled.Link
        key={it.slug}
        isActive={active}
        className={`${active ? 'active' : ''}`}
        onClick={() => history.push(buildPath())}
      >
        <styled.Item data-test="sub_menu.sub_item">
          <styled.ItemTitle data-manual={`sub_menu.${slug}.${it.slug}`}>
            <Icon icon={it.icon} color={active ? 'tealDark' : 'text'} />
            <TruncateWithTooltip
              label={it.label}
              tooltip={labelTooltipOptions}
            />
            {isExpanded && this.renderCounter(it, active, 'dim')}
          </styled.ItemTitle>
        </styled.Item>
      </styled.Link>
    );
  };

  render() {
    if (get(this.props, 'context.items.length', 0) === 0) {
      return null;
    }

    const {
      context: { title, badge, items },
      expanded,
      toggleSidebar,
    } = this.props;

    return (
      <styled.SubMenu expanded={expanded}>
        <styled.SubMenuContent>
          <styled.Title>
            <styled.SpanText>{title}</styled.SpanText>
            {badge}
            <Icon
              icon="CaretLeft"
              size="large"
              data-manual="sub_menu.close_arrow"
              onClick={() => toggleSidebar(false)}
            />
          </styled.Title>

          <styled.ItemsWrapper>
            {items.map(this.renderItem)}
          </styled.ItemsWrapper>
        </styled.SubMenuContent>
      </styled.SubMenu>
    );
  }
}

SubMenu.propTypes = {
  history: PropTypes.object,
  context: PropTypes.shape({
    title: PropTypes.object.isRequired,
    badge: PropTypes.object,
    slug: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        path: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
  }).isRequired,
  company: PropTypes.object,
  counters: PropTypes.object,
  expanded: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
