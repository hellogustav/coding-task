// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { some } from 'lodash';

import { ThemeProvider } from 'styled-components';
import Logger from 'js-logger';

// Import redux store and history
import { store, history } from 'store';

// Import themes
import theme from 'themes';

// Import routes
import { Routes } from 'routes';

// Import Language Provider
import { LanguageProvider } from 'containers/LanguageProvider';

// Load the manifest.json file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./manifest.json';
/* eslint-enable import/no-unresolved, import/extensions */

// Import i18n messages
import { translationMessages } from 'i18n';

// Import CSS reset and Global Styles
import GlobalStyles from './global-styles';

/* DOTENV load */
/* eslint global-require: 0 */
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config();
}
/* END DOTENV load */

// Setup Logger
// Available levels: debug, info, time, warn, error
// * Production: Enable info and above
// * Development: Enable debug and above
Logger.useDefaults();
Logger.setLevel(Logger.DEBUG);

const MOUNT_NODE = document.getElementById('app');

const NO_SCROLL_PATHS = [/\/settings\/members(\/.*)|/];
// Listen for router location change:
// * Refresh Intercom chat setting
// * Trigger analytics page view
history.listen((location) => {
  // Prevent scrolling to top on route change for certain pages:
  // * opening applicant modal from supplier candidates view
  // * opening notification settings modal from marketplace
  // * opening candidate modal from hotlist
  if (some(NO_SCROLL_PATHS, (path) => path.test(location.pathname))) {
    return;
  }

  window.scrollTo(0, 0);
});

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ThemeProvider theme={theme}>
          <>
            <ConnectedRouter history={history}>
              {renderRoutes(Routes)}
            </ConnectedRouter>
            <GlobalStyles />
          </>
        </ThemeProvider>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
  /* eslint no-console:0 */
  module.hot.accept((err) => console.log(err));
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en'),
        import('intl/locale-data/jsonp/de'),
      ])
    )
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}
