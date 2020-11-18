import React, { useState, useEffect } from 'react';
import { columns } from './ColumnData';
import LinkComponent from 'src/common/LinkComponent';
import { makeStyles } from '@material-ui/core/styles';
import DeleteComponent from 'src/common/Delete';
import Pagination from 'src/common/Pagination';
import paginate from 'src/utils/Paginate';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import UserStatus from 'src/common/UserStatus';
import { getMerchantsList } from 'services/adminGetAllMerchantsService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
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
  const classes = useStyles();
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
        setRowData(merchantsData);
        console.log(merchantsData);
        toast.success(data.message);
      } catch (error) {}
    };
    // Execute :
    getAllMerchantsList();
  }, []);

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
              const { id: merchantId, profile, email } = row;
              const {
                name = 'تعیین نشده',
                profile_image: profileImage,
                status: profileStatus,
                business_name: businessName = 'تعیین نشده',
              } = profile || {};
              return (
                <TableRow key={uuid()}>
                  <TableCell className={classes.tableCell}>{index + 1}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {profileImage ? (
                      <Avatar alt="M" src={profileImage} />
                    ) : (
                      <Avatar src="" alt="M"></Avatar>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{name}</TableCell>
                  <TableCell className={classes.tableCell}>{email}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {businessName ? businessName : 'تعیین نشده'}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <UserStatus status={profileStatus ? profileStatus : 0} />
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    <UserStatus status={storeStatus ? storeStatus : 0} />
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    <LinkComponent
                      as={`/admin/merchantProfile/${merchantId}`}
                      href="/admin/merchantProfile/[id]"
                      name="پروفایل"
                    >
                      {/* <a>profile</a> */}
                    </LinkComponent>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <LinkComponent
                      name="فروشگاه"
                      as={`/admin/merchantStore/${merchantId}`}
                      href="/admin/merchantStore/[id]"
                    />
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
