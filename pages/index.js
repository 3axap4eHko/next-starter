import React, { Component, Fragment } from 'react';
import {} from 'prop-types';
import Link from 'next/link';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

const styles = ({ colors }) => ({
  link: {
    color: colors.primary,
  },
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
