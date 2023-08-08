import React from 'react';

import theme from 'themes';

import * as styled from './styles';

const config = {
  updateTime: 200,
  maxProgress: 85,
  processIncrease: 5,
};

export const LoadingBar = function LoadingBar(props) {
  return <styled.LoadingBar theme={theme} {...config} {...props} />;
};
