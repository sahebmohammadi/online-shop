import React, { useState, useEffect } from 'react';
import { rows, columns } from './RowData';
import LinkComponent from '../../../common/Link';
import { makeStyles } from '@material-ui/core/styles';
import DeleteComponent from '../../../common/Delete';
import Pagination from '../../../common/Pagination';
import paginate from '../../../utils/Paginate';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import { getMerchantsList } from 'services/merchantsListService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    textAlign: 'center',
    color: '#052971',
    fontSize: '10px',
    fontWeight: 'bold',
  },
  tableHeader: {
    height: '30px',
    backgroundColor: '#052971',
  },
  tabelHeaderCell: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '10px',
    fontWeight: 'bold',
  },
});

const MerchantTable = () => {
  // state
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // useEffect to get merchant list :
  useEffect(() => {
    //create  :
    const getAllMerchantsList = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await getMerchantsList(token);
        const { data: userData } = data;
        const { user: merchantsData } = userData;
        const filteredMerchantData = merchantsData.filter(m => m.profile);
        setRowData(filteredMerchantData);
        console.log('merchants Data', merchantsData);
        toast.success(data.message);
      } catch (error) {}
    };
    // Execute :
    getAllMerchantsList();
  }, []);

  const classes = useStyles();
  const handleDelete = (row) => {
    setRowData(rowData.filter((r) => r.id !== row.id));
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const PaginatedRowData = paginate(rowData, currentPage, pageSize);
  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              {columns.map((item) => {
                const { name, id } = item;
                return (
                  <TableCell key={id} className={classes.tabelHeaderCell}>
                    {name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {PaginatedRowData.map((row, index) => {
              const {
                profile,
                business,
                // profileImage,
                // merchantName,
                // userName,
                storeName = 'saxnax',
                // profileStatus,
                // storeStatus = 'inactive',
                // id,
                link = '#',
              } = row;

              // if (!profile) return null;
              const {
                name = 'saheb',
                email = 'ex@d.com',
                profile_image: profileImage = 'image',
                status: profileStatus = '2',
                status_string: storeStatus = 'inActive',
              } = profile;

              return (
                <TableRow key={uuid()}>
                  <TableCell className={classes.tableCell}>{index + 1}</TableCell>
                  <TableCell className={classes.tableCell}>
                  <Avatar alt="Remy Sharp" src={profileImage} />
                  </TableCell>
                  <TableCell className={classes.tableCell}>{name}</TableCell>
                  <TableCell className={classes.tableCell}>{email}</TableCell>
                  <TableCell className={classes.tableCell}> storeName</TableCell>
                  <TableCell className={classes.tableCell}>{profileStatus}</TableCell>
                  <TableCell className={classes.tableCell}> {storeStatus}</TableCell>
                  <TableCell className={classes.tableCell}>
                    <LinkComponent name="پروفایل" link={link} />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <LinkComponent name="فروشگاه" link={link} />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <DeleteComponent onDelete={() => handleDelete(row)} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        itemsCount={rowData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default MerchantTable;
