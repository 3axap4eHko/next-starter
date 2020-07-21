import React from 'react';
import { } from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import gql from 'graphql-tag'
import useQuery from '../components/useQuery';
import makeLink from '../components/makeLink';

const ViewerQuery = gql`
  query DummyQuery {
    values {
      id
    }
  }
`;

export default function Index() {
  const { data, loading, error } = useQuery(ViewerQuery);

  return (
    <>
      <Link {...makeLink('/posts')}>
        <a className={''}>Post</a>
      </Link>
      Dashboard
      {data?.values.map(({ id }, index) => <div key={index}>{id}</div>)}
      <Head>
        <title>Dashboard</title>
      </Head>
    </>
  );
}
