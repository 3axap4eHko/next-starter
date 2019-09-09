import '../utils/setup';
import React, { Component } from 'react';
import Application, { Container } from 'next/app';
import getInitialProps from '../utils/getInitialProps';
import withData from '../components/withData';

@withData
export default class App extends Application {

  static async getInitialProps({ Component, ctx }) {
    return getInitialProps(Component, ctx);
  }

  componentDidMount() {
    const ssrStyles = document.getElementById('ssr-styles');
    ssrStyles && document.head.removeChild(ssrStyles);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component {...pageProps} />
    );
  }
}
