import React from 'react';
import {} from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import makeLink from '../components/makeLink';

export default function Posts() {
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
