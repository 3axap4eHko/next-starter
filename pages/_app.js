import React, { Component } from 'react';
import { object } from 'prop-types';
import Application from 'next/app';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider } from '@material-ui/core';
import withData from '../utils/withData';
import theme from '../theme';

@withData
export default class App extends Application {

  componentDidMount() {
    const ssrStyles = document.getElementById('ssr-styles');
    ssrStyles && document.head.removeChild(ssrStyles);
  }

  render() {
    const { Component, pageProps, apolloClient, store, sheetsManager } = this.props;
    return (
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}
