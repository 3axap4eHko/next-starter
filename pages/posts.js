import React from 'react';
import {} from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import useTheme from '../components/useTheme';
import makeLink from '../components/makeLink';

export default function Posts() {
  const theme = useTheme();

  return (
    <>
      <Link {...makeLink('/')}>
        <a className={''}>Dashboard</a>
      </Link>
      Post
      <Head>
        <title>Posts</title>
      </Head>
    </>
  );
}
