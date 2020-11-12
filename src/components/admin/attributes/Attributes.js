import React from 'react';
import Link from 'next/link';
import { Grid, Button } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import AttributesTable from 'src/components/admin/attributes/AttributesTable';
import classes from 'src/components/admin/attributes/attributes.module.scss';

const Attributes = () => {

  return (
    <main className={classes.content}>
      <Grid container>
        <Grid item xs={12} container>
          <div className={classes.attributes}>
            <div className={classes.tableTop}>
              <h1>مدیریت ویژگی های اصلی</h1>
              <div className={classes.addAttribute}>
                <Link href="/admin/attribute-create">
                  <a href="/admin/attribute-create">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddRoundedIcon />}
                    >
                      اضافه کردن ویژگی اصلی
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
            <AttributesTable />
          </div>
        </Grid>
      </Grid>
    </main>
  );
};

export default Attributes;
