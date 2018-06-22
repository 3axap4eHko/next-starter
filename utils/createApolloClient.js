import getConfig from 'next/config';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default (initState) => {

  const httpLink = createHttpLink({
    uri: publicRuntimeConfig.graphqlEndpoint,
    credentials: 'same-origin',
  });

  const persistedHttpLink = createPersistedQueryLink({
    useGETForHashedQueries: true,
  }).concat(httpLink);

  const cache = new InMemoryCache().restore(initState || {});

  if (!process.browser || !publicRuntimeConfig.subscriptionEndpoint) {
    return new ApolloClient({
      connectToDevTools: false,
      ssrMode: true,
      link: persistedHttpLink,
      cache,
    });
  }

  const wsLink = new WebSocketLink({
    uri: publicRuntimeConfig.subscriptionEndpoint,
    options: {
      reconnect: true,
      connectionParams: {},
    },
  });

  const link = split(({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    persistedHttpLink,
  );

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: false,
    link,
    cache,
  });
};
