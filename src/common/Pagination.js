import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import _ from 'lodash';
const useStyles = makeStyles((theme) => ({
  root: {
    direction: 'ltr !important',
    display : "flex",
    justifyContent : "center",
    marginTop : "18px"
  },
  pagination: {},
}));

const MyPagination = ({ currentPage, onPageChange, pageSize, itemsCount }) => {
  const classes = useStyles();
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  return (
    <div className={classes.root}>
      <Pagination
        page={currentPage}
        onChange={onPageChange}
        count={pages.length}
        color="primary"
        shape="rounded"
      />
    </div>
  );
};

export default MyPagination;
