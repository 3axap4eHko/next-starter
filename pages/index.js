import React, { Component, Fragment } from 'react';
import {} from 'prop-types';
import Link from 'next/link';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

const styles = () => ({
  link: {
    color: '#000'
  }
});

@injectSheet(styles)
export default class Index extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Link href="/posts">
          <a className={classes.link}>Post</a>
        </Link>
        Dashboard
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
      </Fragment>
    );
  }
}
