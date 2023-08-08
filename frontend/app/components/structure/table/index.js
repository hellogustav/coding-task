import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isArray, isFunction } from 'lodash';
import equal from 'fast-deep-equal';

import { Table } from './table';
import { Tr } from './tr';
import { Td } from './td';
import { Th } from './th';
import { Tbody } from './tbody';
import { Thead } from './thead';
import { Tfoot } from './tfoot';

/* eslint no-nested-ternary: 0 */
function normalizeComponent(Comp = (a) => a, params = {}, fallback = Comp) {
  return isFunction(Comp) ? (
    Object.getPrototypeOf(Comp).isReactComponent ? (
      <Comp {...params} />
    ) : (
      Comp(params)
    )
  ) : (
    fallback
  );
}

export class TableComponent extends Component {
  shouldComponentUpdate(nextProps) {
    const { data } = this.props;
    return !equal(data, nextProps.data);
  }

  computedTableHead(columns) {
    return columns.map((column, index) => (
      <Th key={`th-${column.header || index}`}>
        {normalizeComponent(column.header)}
      </Th>
    ));
  }

  computedTableBody(data, columns) {
    return data.map((entry, rowIndex) => (
      <Tr key={`tr-${entry.id || rowIndex}`}>
        {columns.map((column, cellIndex) => {
          let results;
          if (isArray(column.accessor)) {
            results = {};
            column.accessor.forEach((accessor) => {
              results[accessor] = entry[accessor];
            });
          } else {
            results = entry[column.accessor];
          }

          /* eslint-disable react/no-array-index-key */
          return (
            <Td key={`td-${cellIndex}`} {...column.cellProps}>
              {normalizeComponent(column.cell, results)}
            </Td>
          );
        })}
      </Tr>
    ));
  }

  render() {
    const { data, columns, displayHeader, ...rest } = this.props;
    return (
      <Table {...rest}>
        {displayHeader && (
          <Thead>
            <Tr>{this.computedTableHead(columns)}</Tr>
          </Thead>
        )}
        <Tbody>{this.computedTableBody(data, columns)}</Tbody>
        <Tfoot>
          <Tr />
        </Tfoot>
      </Table>
    );
  }
}

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      cellProps: PropTypes.object,
      cell: PropTypes.func,
    })
  ),
  displayHeader: PropTypes.bool,
};

TableComponent.defaultProps = {
  data: [],
  columns: [],
  displayHeader: true,
};

export { Table, Tr, Td, Th, Tbody, Thead, Tfoot };
