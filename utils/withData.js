import React, { Component } from 'react';
import Head from 'next/head';
import Helmet from 'react-helmet';
import { getDataFromTree } from 'react-apollo';
import getApolloClient from '../utils/getApolloClient';

export default WrappedComponent => {
  const componentName = WrappedComponent.displayName || WrappedComponent.name;

  return class WithData extends Component {
    static displayName = `withData(${componentName})`;
    static WrappedComponent = WrappedComponent;

    static async getInitialProps({ Component, router, ctx }) {
      let pageProps = {};
      ctx.apolloClient = getApolloClient();

      if (WrappedComponent.getInitialProps) {
        pageProps = await WrappedComponent.getInitialProps(ctx);
      }
      if (!process.browser) {
        try {
          await getDataFromTree(
            <WrappedComponent
              {...pageProps}
              Component={Component}
              router={router}
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

      const apolloState = ctx.apolloClient.cache.extract();
      apolloState.__get = () => ctx.apolloClient;

      return {
        ...pageProps,
        apolloState,
      };
    }

    // Server Side Transfer
    apolloClient = getApolloClient(this.props.apolloState);

    render() {
      return (
        <WrappedComponent {...this.props} apolloClient={this.apolloClient} sheetsManager={new Map} />
      );
    };
  };
};
