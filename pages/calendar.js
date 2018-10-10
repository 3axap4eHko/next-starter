import React, { Component } from 'react';
import {} from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/Layout';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

@withStyles(styles)
export default class Calendar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Helmet>
          <title>Calendar</title>
        </Helmet>
      </Layout>
    );
  }
}
