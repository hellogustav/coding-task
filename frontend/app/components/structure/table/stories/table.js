import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import { Icon } from 'components/elements/icon';
import { Select } from 'components/form/select/select';
import { Button } from 'components/elements/button';
import { ButtonGroup } from 'components/elements/styles/button';

import { Members } from 'mocks/team-member';

import { TableComponent, Table, Tr, Td, Th, Thead, Tbody } from '..';

/* eslint no-console: 0 */
const roles = [
  {
    linkName: 'Owner',
    slug: 'owner',
  },
  {
    linkName: 'Admin',
    slug: 'admin',
  },
  {
    linkName: 'Recruiter',
    slug: 'recruiter',
  },
];

const columns = [
  {
    header: 'Name',
    accessor: ['first_name', 'last_name'],
    cell: ({ first_name: firstName, last_name: lastName }) =>
      `${firstName} ${lastName}`,
  },
  {
    header: 'Initials',
    accessor: ['first_name', 'last_name'],
    cell: ({ first_name: firstName, last_name: lastName }) =>
      `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`,
  },
  {
    header: 'Email',
    accessor: 'email',
  },
  {
    header: 'Permission',
    accessor: 'role',
    cell: (data) => (
      <Select
        selected={data}
        options={roles}
        onChange={(selected) => console.log('change role', selected)}
      />
    ),
  },
  {
    header: 'Invitation',
    accessor: 'id',
    cell: () => 'No pending invitation',
  },
  {
    header: null,
    accessor: 'id',
    cellProps: {
      hasActions: true,
    },
    cell: (data) => (
      <ButtonGroup>
        <Button color="danger" onClick={() => console.log('remove', data)}>
          Remove
        </Button>
      </ButtonGroup>
    ),
  },
];

storiesOf('[Legacy Table]', module)
  .add('simple', () => (
    <Table isBordered={boolean('is bordered', true)}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Initial</Th>
          <Th>Email</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Michael Ströck</Td>
          <Td>MS</Td>
          <Td>mstroeck@hellogustav.com</Td>
          <Td hasActions>
            <ButtonGroup>
              <Button color="mono" size="small">
                <Icon icon="NotePencil" />
              </Button>
              <Button color="danger" size="small">
                <Icon icon="Trash" />
                Remove
              </Button>
            </ButtonGroup>
          </Td>
        </Tr>
        <Tr>
          <Td>Peter Panther</Td>
          <Td>PP</Td>
          <Td>ppanther@hellogustav.com</Td>
          <Td hasActions>
            <ButtonGroup>
              <Button color="mono" size="small">
                <Icon icon="NotePencil" />
              </Button>
              <Button color="danger" size="small">
                <Icon icon="Trash" />
                Remove
              </Button>
            </ButtonGroup>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  ))
  .add('composition', () => (
    <TableComponent data={Members} columns={columns} displayHeader={false} />
  ))

  .add('no header', () => (
    <TableComponent data={Members} columns={columns} displayHeader={false} />
  ));
