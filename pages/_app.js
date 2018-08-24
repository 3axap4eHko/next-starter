import React, { Component } from 'react';
import { object } from 'prop-types';
import Application from 'next/app';
import Link from 'next/link';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider } from '@material-ui/core';

import router from '../routes';
import withData from '../utils/withData';
import theme from '../theme';

router.inject(Link);

@withData
export default class App extends Application {

  componentDidMount() {
    const ssrStyles = document.getElementById('ssr-styles');
    ssrStyles && document.head.removeChild(ssrStyles);
  }

  render() {
    const { Component, pageProps, apolloClient, sheetsManager } = this.props;
    return (
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}
