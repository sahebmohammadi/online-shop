import React from 'react';
import Link from 'next/link';
import classes from './link.module.scss';

const LinkComponent = ({ name, pathname, merchantId }) => {
  return (
    <Link href={{ pathname: pathname, query: { id: merchantId } }}>
      <a>
        <button className={classes.linkButton}>{name}</button>
      </a>
    </Link>
  );
};
export default LinkComponent;
