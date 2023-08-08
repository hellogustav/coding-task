import React from 'react';
import { storiesOf } from '@storybook/react';

import { Pagination } from '../pagination';

const context = {
  totalCount: 123,
  page: 8,
  maxPage: 21,
};
const onPageChange = () => {};

storiesOf('[Pagination]', module)
  .add('without item count', () => (
    <Pagination {...context} onPageChange={onPageChange} />
  ))
  .add('with item count', () => (
    <Pagination
      {...context}
      onPageChange={onPageChange}
      labelCount="Resources"
    />
  ));
