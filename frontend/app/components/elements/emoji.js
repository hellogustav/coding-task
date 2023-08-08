import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import * as styled from './styles/emoji';
import { EMOJI_NAMES, EMOJI_DATA } from './constants/emoji';

export const Emoji = function Emoji({ name, ...props }) {
  const { code } = find(EMOJI_DATA, { name });

  return <styled.Emoji code={code} {...props} />;
};

Emoji.propTypes = {
  name: PropTypes.oneOf(EMOJI_NAMES).isRequired,
};
