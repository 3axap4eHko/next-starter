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

export default function Posts() {
  const classes = useStyles();

  return (
    <>
      <Link href="/">
        <a className={classes.link}>Dashboard</a>
      </Link>
      Post
      <Helmet>
        <title>Posts</title>
      </Helmet>
    </>
  );
}
