import '../utils/setup';
import React, { Component } from 'react';
import Application, { Container } from 'next/app';
import withData from '../utils/withData';
import getInitialProps from '../utils/getInitialProps';

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
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
