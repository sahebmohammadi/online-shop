import React from 'react';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import CreateForm from "./CreateForm";
import classes from 'src/components/admin/attributes/attributes.module.scss';

function AttributeCreate() {

  return (
    <main className={classes.content}>
      <Grid container>
        <Grid item xs={12} container>
          <div className={classes.attributes}>
            <div className={classes.tableTop}>
              <h1>اضافه کردن ویژگی های اصلی</h1>
              <div className={classes.returnLink}>
                <Link href="/admin/attributes">
                  <a href="/admin/attributes">
                    برگشت
                  </a>
                </Link>
              </div>
            </div>
            <div className={classes.formWrapper}>
              <CreateForm />
            </div>
          </div>
        </Grid>
      </Grid>
    </main>
  );
};

export default AttributeCreate;
