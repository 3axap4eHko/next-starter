import React from 'react';
import {} from 'prop-types';
import Link from 'next/link';
import Helmet from 'react-helmet';
import { createUseStyles } from 'react-jss';
import makeLink from '../components/makeLink';

const useStyles = createUseStyles(({ palette }) => ({
  link: {
    color: palette.primary,
  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <>
      <Link {...makeLink('/posts')}>
        <a className={classes.link}>Post</a>
      </Link>
      Dashboard
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
    </>
  );
}
