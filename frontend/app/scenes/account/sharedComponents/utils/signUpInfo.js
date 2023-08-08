import { Colors } from 'components/utils/styles/ui';
import { THEME } from 'themes';

import i18n from './i18n';

const candidatelyInfo = {
  title: i18n.candidately.infoShareCandidatesTitle,
  list: [
    {
      icon: 'Link',
      title: i18n.candidately.infoSharedCandidateLinkTitle,
      color: Colors.greenLight,
    },
    {
      icon: 'UserCircleGear',
      title: i18n.candidately.infoATSIntegrationTitle,
      color: Colors.blueLight,
    },
    {
      icon: 'HighlighterCircle',
      title: i18n.candidately.infoCustomBrandingTitle,
      color: Colors.redLight,
    },
    {
      icon: 'At',
      title: i18n.candidately.infoCustomDomainTitle,
      color: Colors.yellowLight,
    },
    {
      icon: 'ChatCircle',
      title: i18n.candidately.infoClientFeedbackTitle,
      color: Colors.orchidLight,
    },
    {
      icon: 'HardDrives',
      title: i18n.candidately.infoCustomFields,
      color: Colors.tealLight,
    },
  ],
};

const gustavInfo = {
  title: i18n.gustav.infoShareCandidatesTitle,
  list: [
    {
      icon: 'Lightning',
      title: i18n.gustav.infoInstantAccess,
      color: Colors.greenLight,
    },
    {
      icon: 'MapPin',
      title: i18n.gustav.infoTrusted,
      color: Colors.blueLight,
    },
    {
      icon: 'Handshake',
      title: i18n.gustav.infoCompliant,
      color: Colors.orchidLight,
    },
    {
      icon: 'Users',
      title: i18n.gustav.infoTalentpool,
      color: Colors.redLight,
    },
    {
      icon: 'ClockCounterClockwise',
      title: i18n.gustav.infoSaveTime,
      color: Colors.teal,
    },
    {
      icon: 'ChartBar',
      title: i18n.gustav.infoMeasure,
      color: Colors.yellowLight,
    },
  ],
};
export const signUpInfo =
  THEME === 'candidately' ? candidatelyInfo : gustavInfo;
