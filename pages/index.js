import React from 'react';
import {} from 'prop-types';
import Link from 'next/link';
import Helmet from 'react-helmet';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors }) => ({
  link: {
    color: colors.primary,
  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <>
      <Link href="/posts">
        <a className={classes.link}>Post</a>
      </Link>
      Dashboard
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
    </>
  );
}
