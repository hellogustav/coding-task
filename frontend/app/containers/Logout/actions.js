import { httpDelete } from 'utils';
import { openPageLoading, closePageLoading } from 'containers/App/actions/ui';
import { clearExpirationTimer } from 'containers/App/utils/expirationTimer';
import { setUserContextForErrorReporting } from 'utils/errorLogging';

export function signOut(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(openPageLoading());

      const callback = () => {
        clearExpirationTimer();

        dispatch({ type: 'SIGN_OUT' });
        dispatch({ type: 'COMPANY_CHANNEL_LEFT' });
        dispatch({ type: 'USER_CHANNEL_LEFT' });

        localStorage.removeItem('phoenixAuthToken');
        localStorage.removeItem('phoenixExpToken');

        setUserContextForErrorReporting({}, {});
      };

      httpDelete('/sessions', params)
        .then((response) => {
          callback();
          dispatch(closePageLoading());

          resolve(response);
        })
        .catch((error) => {
          callback();
          dispatch(closePageLoading());

          reject(error);
        });
    });
}
