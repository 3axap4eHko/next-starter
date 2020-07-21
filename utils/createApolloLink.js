import getConfig from 'next/config';
import { createHttpLink, split } from '@apollo/client';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const { publicRuntimeConfig } = getConfig();

export default () => {

  const httpLink = createHttpLink({
    uri: publicRuntimeConfig.graphqlEndpoint,
    credentials: 'same-origin',
  });

  const persistedHttpLink = createPersistedQueryLink({
    useGETForHashedQueries: true,
  }).concat(httpLink);

  if (!process.browser || !publicRuntimeConfig.subscriptionEndpoint) {
    return persistedHttpLink;
  }

  const wsLink = new WebSocketLink({
    uri: publicRuntimeConfig.subscriptionEndpoint,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: {},
    },
  });

  return split(({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    persistedHttpLink,
  );
};
