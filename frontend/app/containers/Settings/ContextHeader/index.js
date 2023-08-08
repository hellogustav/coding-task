import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { companySelector } from 'containers/App/selectors';
import { TableContextHeader } from 'components/structure/TableContextHeader';

import { contextHeaderDefinition } from './utils/contextHeaderDefinition';

const ContextHeaderComponent = function ContextHeader(props) {
  const {
    intl,
    tab,
    context,
    company,
    className,
    sticky,
    children,
    withShadow = false,
  } = props;
  const { style, ...definition } = contextHeaderDefinition(tab, intl, company);
  const menuContext = get(definition, 'menuContext', () => null);

  return (
    <TableContextHeader
      className={className}
      contextHeaderDefinition={definition}
      menuContext={menuContext(tab, context, intl)}
      withShadow={withShadow}
      style={style}
      sticky={sticky}
    >
      {children}
    </TableContextHeader>
  );
};

ContextHeaderComponent.propTypes = {
  intl: intlShape,
  tab: PropTypes.string,
  context: PropTypes.object,
  company: PropTypes.object,
  className: PropTypes.string,
  sticky: PropTypes.bool,
  withShadow: PropTypes.bool,
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  company: companySelector,
});

const withConnect = connect(mapStateToProps);

export const ContextHeader = compose(
  injectIntl,
  withConnect
)(ContextHeaderComponent);
