import React from 'react';
import { Colors } from 'components/utils/styles/ui';

import noResult from 'images/svg/no-results.svg';

import { ReactComponent as LogoWhiteComponent } from './assets/images/logo_white.svg';

import * as typography from '../typography';

// Import favicon
/* eslint-disable import/no-unresolved, import/extensions, import/first */
import '!file-loader?name=[name].[ext]!./assets/images/candidately-favicon.png';
/* eslint-enable import/no-unresolved, import/extensions, import/first */

export const candidatelyTheme = {
  logoWhiteComponent: LogoWhiteComponent,
  domain: 'app.candidate.ly',
  additionalDomains: [],
  logoLink: 'https://www.candidate.ly/',
  platformName: 'Candidate.ly',
  platformNameComponent: (
    <span>
      Candidate<span style={{ color: Colors.teal }}>.</span>ly
    </span>
  ),
  typography,
  fonts: {
    headers: "'TT Interphases', sans-serif",
    text: "'TT Interphases', sans-serif",
  },
  colors: {
    primary: Colors.teal,
    primaryDark: Colors.tealDark,
    secondary: Colors.green,
    danger: Colors.red,
    warning: Colors.yellow,
    mono: Colors.textLighter,
    monoLight: Colors.inputOutline,
    monoLighter: Colors.greyLighter,
    monoDarker: Colors.text,
    columnLeftBackground: Colors.white,
  },
  images: {
    notFoundSrc: noResult,
  },
};
