import React from 'react';
import Link from 'next/link';
import classes from './link.module.scss';

const LinkComponent = ({ name, link}) => {
  return (
    <Link href={link}>
      <a>
        <button className={classes.linkButton} >
          {name}
        </button>
      </a>
    </Link>
  );
};
export default LinkComponent;
