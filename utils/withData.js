import React, { Component } from 'react';
import { object } from 'prop-types';
import Head from 'next/head';
import Helmet from 'react-helmet';
import { getDataFromTree } from 'react-apollo';
import getApolloClient from '../utils/getApolloClient';
import getStore from '../redux/getStore';

export default WrappedComponent => {
  const componentName = WrappedComponent.displayName || WrappedComponent.name;

  return class WithData extends Component {
    static displayName = `withData(${componentName})`;
    static WrappedComponent = WrappedComponent;

    static async getInitialProps({ Component, router, ctx }) {
      let pageProps = {};
      ctx.store = getStore();
      ctx.apolloClient = getApolloClient();

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      if (!process.browser) {
        try {
          await getDataFromTree(
            <WrappedComponent
              {...pageProps}
              Component={Component}
              router={router}
              store={ctx.store}
              apolloClient={ctx.apolloClient}
            />
            ,
          );
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }
        Helmet.rewind();
        Head.rewind();
      }

      const storeState = ctx.store.getState();
      storeState.__get = () => ctx.store;
      const apolloState = ctx.apolloClient.cache.extract();
      apolloState.__get = () => ctx.apolloClient;

      return {
        ...pageProps,
        storeState,
        apolloState,
      };
    }

    // Server Side Transfer
    store = getStore(this.props.storeState);
    apolloClient = getApolloClient(this.props.apolloState);

    render() {
      return (
        <WrappedComponent {...this.props} apolloClient={this.apolloClient} store={this.store} sheetsManager={new Map} />
      );
    };
  };
};
