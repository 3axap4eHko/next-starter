import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createApolloLink from './createApolloLink';

export default (initState) => {
  const link = createApolloLink();
  const cache = new InMemoryCache().restore(initState || {});

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: false,
    link,
    cache,
  });
};
