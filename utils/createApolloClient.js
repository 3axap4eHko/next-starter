import { ApolloClient, InMemoryCache } from '@apollo/client';
import createApolloLink from './createApolloLink';

export default (initState) => {
  const link = createApolloLink();
  const cache = new InMemoryCache().restore(initState || {});

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: !process.browser,
    link,
    cache,
  });
};
