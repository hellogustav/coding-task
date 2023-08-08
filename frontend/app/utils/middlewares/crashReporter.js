import { trackException, isRejected } from 'utils/errorLogging';

// TODO:
// * Mention Event ID when showing a error flash notification
/* eslint no-console:0 */
export const crashReporter = (store) => (next) => (action) => {
  // Manually capture and report redux actions containing `_ERROR` suffix to TrackJS
  if (action.type && isRejected(action.type) && action.error) {
    trackException(action.error, { extra: { action } });
  }

  try {
    return next(action);
  } catch (error) {
    console.warn(store.getState());

    trackException(error, { extra: { action } });

    throw error;
  }
};
