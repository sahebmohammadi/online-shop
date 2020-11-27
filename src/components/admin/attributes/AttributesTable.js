import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import DeleteComponent from 'src/common/Delete';
import EditComponent from 'src/common/Edit';
import uuid from 'react-uuid';
import axios from 'axios';
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
  const [attributes, setAttributes] = useState([]);
  const columns = [
    { name: '#', id: uuid() },
    { name: 'نام ویژگی', id: uuid() },
    { name: 'نوع ویژگی', id: uuid() },
    { name: 'واحد', id: uuid() },
    { name: 'عملیات', id: uuid() },
  ];

  let all_attributes = [];

  const getAttributes = async () => {
    try {
      const res = await axios.get(`${process.env.apiUrl}/attribute`);
      setAttributes(res.data.data.attribute);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttributes();
  }, []);

  if (attributes !== [] && attributes !== undefined) {
    attributes.map((item, index) => {
      all_attributes.push({
        id: item.id,
        name: item.name,
        type: item.type.name,
        unit: item.unit !== null  ? item.unit.name : 'ندارد'
      });
    })
  }

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
            {attributes !== [] && attributes !== undefined ? all_attributes.map((item, index) => {
                const { id, name, type, unit } = item;
                return (
                  <TableRow key={id}>
                    <TableCell className={classes.tableBodyCell} size='small'>
                      {id}
                    </TableCell>
                    <TableCell className={classes.tableBodyCell}>
                      {name}
                    </TableCell>
                    <TableCell className={classes.tableBodyCell}>
                      {type}
                    </TableCell>
                    <TableCell className={classes.tableBodyCell}>
                      {unit}
                    </TableCell>
                    <TableCell className={classes.tableBodyCell}>
                      <div className={classes.actionCell}>
                        <Link href={`/admin/attribute/${id}`}>
                          <a href={`/admin/attribute/${id}`}>
                            <EditComponent/>
                          </a>
                        </Link>
                        <DeleteComponent />
                      </div>
                    </TableCell>
                  </TableRow>
                );
            }) :
            <TableRow>
              Nothing
            </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AttributesTable;
