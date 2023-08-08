import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';

import { ButtonSet } from '..';
import { Button } from '../../../elements/button';

const buttons = [
  <Button>Button</Button>,
  <Button>Button</Button>,
  <Button>Button</Button>,
];

storiesOf('[ButtonSet]', module)
  .add('default', () => <ButtonSet>{buttons}</ButtonSet>)

  .add('buttonset playground', () => {
    const alignOptions = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      'space between': 'space-between',
    };
    return (
      <ButtonSet
        isVertical={boolean('is vertical', false)}
        isPadded={boolean('is padded', false)}
        align={select('align', alignOptions, 'flex-start')}
      >
        {buttons}
      </ButtonSet>
    );
  });
