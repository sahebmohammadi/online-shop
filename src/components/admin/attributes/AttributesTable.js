import React from 'react';
import { rows, columns } from 'src/components/admin/attributes/Data';
import DeleteComponent from 'src/common/Delete';
import EditComponent from 'src/common/Edit';
import classes from 'src/components/admin/attributes/attributes.module.scss';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

const AttributesTable = () => {

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              {columns.map((item, index) => {
                const { name, id } = item;
                return (
                  <TableCell key={id} size={ index === 0 ? 'small' : 'medium' }>
                    {name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item, index) => {
                const { number, name, type, unit } = item;
                return (
                  <TableRow>
                    <TableCell key={number} className={classes.tableBodyCell} size='small'>
                      {number}
                    </TableCell>
                    <TableCell key={number} className={classes.tableBodyCell}>
                      {name}
                    </TableCell>
                    <TableCell key={number} className={classes.tableBodyCell}>
                      {type}
                    </TableCell>
                    <TableCell key={number} className={classes.tableBodyCell}>
                      {unit}
                    </TableCell>
                    <TableCell key={number} className={classes.tableBodyCell}>
                      <div className={classes.actionCell}>
                        <EditComponent />
                        <DeleteComponent />
                      </div>
                    </TableCell>
                  </TableRow>
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AttributesTable;
