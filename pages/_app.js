import React, { Component } from 'react';
import Application from 'next/app';
import withData from '../components/withData';

@withData
export default class App extends Application {

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
