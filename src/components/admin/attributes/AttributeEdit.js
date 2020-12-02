import React from 'react';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import EditForm from "./EditForm";
import classes from 'src/components/admin/attributes/attributes.module.scss';

function AttributeEdit(attribute) {

  return (
    <main className={classes.content}>
      <Grid container>
        <Grid item xs={12} container>
          <div className={classes.attributes}>
            <div className={classes.tableTop}>
              <h1>ویرایش ویژگی اصلی</h1>
              <div className={classes.returnLink}>
                <Link href="/admin/attributes">
                  <a href="/admin/attributes">
                    برگشت
                  </a>
                </Link>
              </div>
            </div>
            <div className={classes.formWrapper}>
              <EditForm data={attribute} />
            </div>
          </div>
        </Grid>
      </Grid>
    </main>
  );
};

export default AttributeEdit;
