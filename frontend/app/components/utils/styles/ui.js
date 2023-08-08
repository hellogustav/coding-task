// http://chir.ag/projects/name-that-color
// if you have troubles naming new color
export const Colors = {
  text: '#13293d',
  textLight: '#4e5f6e',
  textLighter: '#89949e',
  white: '#ffffff',
  tealDarker: '#0b3954',
  tealDark: '#0b748c',
  teal: '#0aafc4',
  tealLight: '#b1e1e7',
  tealLighter: '#e8f1f2',
  tealLightest: '#f8fbff',
  greyDarker: '#a6acb2',
  greyDark: '#c7c7cd',
  grey: '#dee1e5',
  greyLight: '#eceef1',
  greyLighter: '#fafbfc',
  redDark: '#c73724',
  red: '#eb634b',
  redLight: '#fbac9e',
  redLighter: '#f6e4e2',
  bhOrange: '#f36b21',
  labelBg: '#eef1f7',
  yellowDark: '#dda21f',
  yellow: '#fabc3c',
  yellowLight: '#fde1a2',
  yellowLighter: '#fffbf0',
  greenDark: '#008d5f',
  green: '#00a878',
  greenLight: '#a1d7b4',
  greenLighter: '#f1f9f4',
  gptGreen: '#00A878',
  orchidDark: '#8c5e83',
  orchid: '#a7779e',
  orchidLight: '#c391b9',
  orchidLighter: '#fff2fc',
  grapeDark: '#635983',
  grape: '#8779b3',
  grapeLight: '#bdadea',
  grapeLighter: '#f5f3fc',
  blueDark: '#243f79',
  blue: '#5a6eae',
  blueLight: '#8fa1e6',
  blueLighter: '#f2f5fc',
  persianBlueDark: '#054770',
  persianBlue: '#0166a4',
  persianBlueLight: '#3198d8',
  persianBlueLightest: '#d2eeff',
  inputOutline: '#c1c7cd',
  outline: '#d7e2e8',
  headerBG: '#f5f7fa',
  blackTransparent: 'rgba(0, 0, 0, .3)',
  blackLessTransparent: 'rgba(0, 0, 0, .7)',
  blackMoreTransparent: 'rgba(0, 0, 0, 0.1)',
  midGrayTransparent: 'rgba(229, 229, 229, .6)',
  darkGrayTransparent: 'rgba(102, 102, 102, .6)',
  whiteTransparent: 'rgba(255, 255, 255, .5)',
  whiteMoreTransparent: 'rgba(255, 255, 255, 0.25)',
  transparent: 'rgba(0, 0, 0, 0)',
};

export const materialShadow = '0 0.5rem 0.4rem 0 rgba(150, 159, 171, 0.5)';
export const cardShadow = '0 0.3rem 0.2rem 0 rgba(150,159,171,0.4)';
export const strongShadow =
  '0.4rem 0.7rem 1.9rem 1rem rgba(150, 159, 171, 0.5)';
export const lightShadow =
  '0.2rem 0.5rem 1.7rem 0.8rem rgba(150, 159, 171, 0.2)';
export const windowShadow = '0.5rem 0.8rem 2rem rgba(150, 159, 171, 0.5)';
export const hotlistCardShadow = `0 0.3rem 1.2rem 0.3rem ${Colors.blackMoreTransparent}`;

export const tagColors = {
  green: Colors.green,
  yellow: Colors.yellow,
  orange: Colors.bhOrange,
  red: Colors.red,
  purple: Colors.orchidLight,
  blue: Colors.blue,
};

export const profileInitialsColors = [
  '#0B748C',
  '#0AAFC4',
  '#FF7656',
  '#FBAC9E',
  '#00A878',
  '#FABC3C',
  '#C391B9',
  '#8779B3',
  '#5A6EAE',
];

export const statusColors = {
  draft: Colors.textLighter,
  inReview: Colors.tealDarker,
  open: Colors.green,
  paused: Colors.yellow,
  closed: Colors.red,
};

export const jobSharingColors = {
  global: Colors.tealLighter,
  internal: Colors.bhOrange,
  vendors: Colors.blueDark,
};

export const candidateStatusColors = {
  new: Colors.green,
  active: Colors.blue,
  submitted: Colors.grey,
  reviewed: Colors.blue,
  declined: Colors.red,
};

export const workTypeColors = {
  permanent: Colors.redLight,
  contract: Colors.tealDark,
  referral: Colors.blue,
};

export const tableColors = {
  backgroundColor: Colors.white,
  backgroundColorAccent: Colors.tealLighter,
  textColor: Colors.text,
  resizerColor: Colors.inputOutline,
  sorterColor: '#bfbfbf',
  sorterColorActive: Colors.tealDark,
  rowBorderColorHead: Colors.outline,
  rowBorderColorBody: Colors.outline,
  filterBorderColor: Colors.inputOutline,
  filterBorderColorActive: Colors.tealDark,
  overlayBackgroundColor: '#FAFBFCAA',
  countLabelColor: '#abb4bd',
  paginationGradientTop: '#ffffff00',
  paginationGradientBottom: '#ffffff',
};

export const companyProfileTypeColors = {
  vendor: Colors.grape,
  endClient: Colors.blue,
};

export const reviewStatusColors = {
  pending: Colors.yellow,
  accepted: Colors.green,
  rejected: Colors.red,
};

export const workOrderStatusColors = {
  pending: Colors.bhOrange,
  upcoming: Colors.blue,
  active: Colors.green,
  declined: Colors.red,
  archived: Colors.textLighter,
};

export const affiliationRequestStatusColors = {
  null: Colors.white,
  requested: Colors.greyLight,
  accepted: Colors.green,
  rejected: Colors.red,
  revoked: Colors.greyLight,
};

export const premiumFeatureColors = {
  feature: Colors.yellow,
  addon: Colors.orchid,
};

export const featureVersionColors = {
  alpha: Colors.bhOrange,
  beta: Colors.yellow,
};

export const scoreColors = (score) => {
  if (score <= 25) {
    return Colors.red;
  }
  if (score <= 50) {
    return Colors.bhOrange;
  }
  if (score <= 75) {
    return Colors.yellow;
  }
  return Colors.green;
};

export const mediaSizes = {
  small: 1070,
  medium: 1300,
};

export const sharedListStatusColors = {
  draft: Colors.textLighter,
  active: Colors.green,
  paused: Colors.yellow,
  archived: Colors.red,
};

export const hlCandidateStatusColors = {
  active: Colors.green,
  ending: Colors.yellow,
  draft: Colors.textLighter,
  ended: Colors.red,
  requested: Colors.teal,
  contacted: Colors.grape,
  not_contacted: Colors.textLighter,
  revealed: Colors.green,
  archived: Colors.red,
  own: Colors.textLighter,
  company: Colors.textLighter,
  declined: Colors.red,
  interview: Colors.persianBlue,
};

export const slCandidateStatusColors = {
  active: Colors.green,
  inactive: Colors.yellow,
  ended: Colors.yellow,
  draft: Colors.textLighter,
  ready: Colors.persianBlueLight,
  rejected: Colors.red,
};

export const hlCandidateStatusTheme = {
  no_status: {
    main: Colors.text,
    bg: Colors.labelBg,
    border: Colors.outline,
  },
  to_review: {
    main: Colors.grape,
    bg: Colors.grapeLighter,
  },
  created: {
    main: Colors.tealDark,
    bg: Colors.tealLightest,
  },
  requested: {
    main: Colors.teal,
    bg: Colors.tealLightest,
  },
  contacted: {
    main: Colors.grape,
    bg: Colors.grapeLighter,
  },
  not_contacted: {
    main: Colors.textLighter,
    bg: Colors.headerBG,
  },
  revealed: {
    main: Colors.green,
    bg: Colors.greenLighter,
  },
  declined: {
    main: Colors.red,
    bg: Colors.redLighter,
  },
  interview: {
    main: Colors.persianBlue,
    bg: Colors.blueLighter,
  },
};
