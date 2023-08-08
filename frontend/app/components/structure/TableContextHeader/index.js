import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { isEmpty, isArray, compact, partition } from 'lodash';

import { Menu } from 'components/navigation/menu/menu';
import { SmartLink } from 'components/navigation/SmartLink';
import { Button } from 'components/elements/button';
import { Icon } from 'components/elements/icon';

import * as styled from './styles';

export const TableContextHeader = function TableContextHeader(props) {
  const {
    children,
    contextHeaderDefinition,
    menuTabs,
    activeMenuTab,
    menuContext,
    bordered,
    sticky,
    style,
    withShadow,
    renderRight,
    renderLeft,
    className,
  } = props;
  const {
    title,
    icon,
    iconRoute,
    helpLinks = [],
    helpMessage,
    preButtonsExtra,
    actionButtons = [],
  } = contextHeaderDefinition;
  const StickySection = sticky ? styled.StickySection : Fragment;

  const [inlineLinks, blockLinks] = partition(compact(helpLinks), 'inline');

  /* eslint-disable react/no-array-index-key */
  return (
    <>
      <styled.Header
        style={style && style.header}
        sticky={sticky}
        bordered={bordered && !(helpMessage || !isEmpty(blockLinks))}
        className={className}
      >
        <Helmet title={title} />
        <styled.Label hasOverflow={renderLeft}>
          {icon && (
            <styled.LabelIcon
              icon={icon}
              color="tealDark"
              size={2.4}
              onClick={iconRoute}
            />
          )}
          {renderLeft ? renderLeft() : <styled.Title>{title}</styled.Title>}
        </styled.Label>
        <styled.ActionButtons>
          {renderRight && renderRight()}
          {preButtonsExtra && (
            <styled.PreButtons>{preButtonsExtra}</styled.PreButtons>
          )}
          {actionButtons.map(
            ({
              dataManual,
              label,
              slug,
              color,
              icon: actionIcon,
              colorIcon,
              path: actionPath,
            }) => (
              <SmartLink
                data-manual={dataManual}
                to={actionPath}
                key={`${slug}-${actionPath}`}
              >
                <Button size="small" color={color}>
                  {actionIcon && <Icon icon={actionIcon} color={colorIcon} />}
                  {label}
                </Button>
              </SmartLink>
            )
          )}
        </styled.ActionButtons>
      </styled.Header>
      {(helpMessage || !isEmpty(compact(helpLinks))) && (
        <styled.HelpSection style={style && style.helpSection}>
          {React.isValidElement(helpMessage) ? (
            helpMessage
          ) : (
            <span dangerouslySetInnerHTML={{ __html: helpMessage }}></span>
          )}{' '}
          {!isEmpty(inlineLinks) &&
            helpMessage &&
            inlineLinks.map(({ path, label }) => (
              <styled.HelpLink to={path} target="_blank">
                {label}
              </styled.HelpLink>
            ))}
          {!isEmpty(blockLinks) && (
            <styled.HelpLinks>
              {blockLinks.map(({ label, path, target = '_blank', action }) => (
                <styled.HelpLink
                  key={label}
                  to={path}
                  target={target}
                  onClick={action}
                >
                  {label}
                </styled.HelpLink>
              ))}
            </styled.HelpLinks>
          )}
        </styled.HelpSection>
      )}

      <StickySection style={style && style.stickySection}>
        {menuContext && (
          <styled.Menu background={menuContext.style} bordered={bordered}>
            <Menu context={menuContext} />
            {isArray(menuContext.right) ? (
              <Menu context={{ ...menuContext, links: menuContext.right }} />
            ) : (
              menuContext.right
            )}
          </styled.Menu>
        )}

        <styled.ExtraSection>{children}</styled.ExtraSection>
        {sticky && withShadow && <styled.Shadow />}
      </StickySection>
    </>
  );
};

TableContextHeader.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape({
    header: PropTypes.object,
    helpSection: PropTypes.object,
    stickySection: PropTypes.object,
  }),
  contextHeaderDefinition: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
    iconRoute: PropTypes.func,
    helpLinks: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        label: PropTypes.string,
        inline: PropTypes.bool,
      })
    ),
    helpMessage: PropTypes.string,
    actionButtons: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
        icon: PropTypes.string,
        color: PropTypes.string,
        colorIcon: PropTypes.string,
        path: PropTypes.string,
      })
    ),
    preButtonsExtra: PropTypes.node,
  }),
  menuContext: PropTypes.object,
  menuTabs: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      path: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  activeMenuTab: PropTypes.string,
  bordered: PropTypes.bool,
  sticky: PropTypes.bool,
  withShadow: PropTypes.bool,
  renderRight: PropTypes.func,
  renderLeft: PropTypes.func,
  className: PropTypes.string,
};

TableContextHeader.defaultProps = {
  bordered: false,
  sticky: true,
  withShadow: true,
};
