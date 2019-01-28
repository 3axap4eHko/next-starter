import React, { Component, Fragment } from 'react';
import {} from 'prop-types';
import Link from 'next/link';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';


const styles = (theme) => ({
  link: {
    color: '#000'
  }

});

@injectSheet(styles)
export default class Posts extends Component {

  static getInitialProps({ query }) {
    console.log(query);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Link href="/">
          <a className={classes.link}>Dashboard</a>
        </Link>
        Post
        <Helmet>
          <title>Posts</title>
        </Helmet>
      </Fragment>
    );
  }
}
