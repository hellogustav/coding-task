/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { localeSelector } from './selectors';

/* eslint react/prefer-stateless-function:0 */
export class LanguageProviderComponent extends React.PureComponent {
  render() {
    const { locale, messages, children } = this.props;
    moment.locale(locale);

    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={messages[locale]}
        textComponent={Fragment}
      >
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

LanguageProviderComponent.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: localeSelector,
});

export const LanguageProvider = connect(
  mapStateToProps,
  null
)(LanguageProviderComponent);
