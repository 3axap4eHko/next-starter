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

export default function Posts() {
  const classes = useStyles();

  return (
    <>
      <Link {...makeLink('/')}>
        <a className={classes.link}>Dashboard</a>
      </Link>
      Post
      <Helmet>
        <title>Posts</title>
      </Helmet>
    </>
  );
}
