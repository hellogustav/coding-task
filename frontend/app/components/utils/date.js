import React from 'react';

import moment from 'moment';

export const timeUnitsAgo = (dt, units = 'seconds') =>
  moment().diff(moment.utc(dt).local(), units);
