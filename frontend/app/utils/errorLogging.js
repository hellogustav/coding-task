import { warn } from 'js-logger';

export const promiseTypeSuffixes = ['_REQUEST', '_SUCCESS', '_ERROR'];
const [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes;

const isPendingSuffix = new RegExp(`${PENDING}$`, 'g');
const isFulfilledSuffix = new RegExp(`${FULFILLED}$`, 'g');
const isRejectedSuffix = new RegExp(`${REJECTED}$`, 'g');

export const isPending = (actionType) => actionType.match(isPendingSuffix);
export const isFulfilled = (actionType) => actionType.match(isFulfilledSuffix);
export const isRejected = (actionType) => actionType.match(isRejectedSuffix);

// Associate errors with user data
export const setUserContextForErrorReporting = (user, company) => {};

// Assign tags to events, which can later be used as a breakdown or quick access to finding related events
// Always attach git commit reference
export const setTagsContextForErrorReporting = (tags = {}) => {
  const tagsContext = {
    ...tags,
  };
};

// Explicitly capture and report potentially problematic code
export const trackException = (error, { level, extra, tags }) => {
  const payload = { error, level: level || 'error', extra, tags };

  warn('[ErrorLogging:captureException]', error, payload);
};
