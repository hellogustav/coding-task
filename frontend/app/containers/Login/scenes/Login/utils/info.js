import { Colors } from 'components/utils/styles/ui';

import i18n from './i18n';

const loginCandidately = {
  title: i18n.candidately.infoLoginHeader,
  list: [
    {
      icon: 'ChartBar',
      title: i18n.candidately.infoActivityFeedTitle,
      color: Colors.yellowLight,
      text: i18n.candidately.infoActivityFeedText,
    },
  ],
};

export const infoLoginFlow = loginCandidately;
