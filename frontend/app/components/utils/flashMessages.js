import React from 'react';
import { toast } from 'react-toastify';
import { get, isString, range, forEach } from 'lodash';

import { Highlight, toFormattedText } from 'components/text/Highlight';
import { Emoji } from 'components/elements/emoji';

export const openFlashMessage = function openFlashMessage(
  messages,
  props = {}
) {
  return messages.context.map((message) => {
    const { detail, values = {} } = message;
    const formattedMsg = isString(detail) ? (
      toFormattedText(detail, props.highlight)
    ) : (
      <Highlight type={props.highlight} text={detail} values={values} />
    );
    const randomIndex = Math.floor(Math.random() * 51);

    switch (messages.status) {
      case 'success':
        return toast.success(
          <span>
            <Emoji name={messages.emoji || 'rocket'} /> {formattedMsg}
          </span>,
          { autoClose: get(props, 'autoClose', 5000), toastId: props.id }
        );
      case 'error': {
        return toast.error(
          <span>
            <Emoji
              name={props.validationError ? 'man-detective' : 'exploding-head'}
            />{' '}
            {formattedMsg}
          </span>,
          {
            autoClose: get(props, 'autoClose', 11000),
            toastId:
              props.id || props.validationError
                ? `validation${randomIndex}`
                : `error${randomIndex}`,
          }
        );
      }
      case 'info':
        return toast.info(
          <span>
            <Emoji name={messages.emoji || 'light-bulb'} /> {formattedMsg}
          </span>,
          { autoClose: get(props, 'autoClose', 5000), toastId: props.id }
        );
      default:
        return toast(formattedMsg, {
          autoClose: get(props, 'autoClose', 5000),
          toastId: props.id,
        });
    }
  });
};

export const closeFlashMessages = function closeFlashMessages() {
  toast.dismiss();
};

export const closeValidationFlashMessages = function closeValidationFlashMessages() {
  forEach(range(50), (n) => toast.dismiss(`validation${n}`));
};
