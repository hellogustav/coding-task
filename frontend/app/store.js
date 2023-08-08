import { createBrowserHistory } from 'history';
import { stringify, parse } from 'qs';
import qhistory from 'qhistory';

import { configureStore } from 'configureStore';

// Create redux store with history
const initialState = {};
export const history = qhistory(createBrowserHistory(), stringify, parse);
export const store = configureStore(initialState, history);
