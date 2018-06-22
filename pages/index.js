import React, { Component, createRef } from 'react';
import {} from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chart from '../components/Chart';
import Layout from '../components/Layout';

const chartOptions = {

  title: {
    text: 'Solar Employment Growth by Sector, 2010-2016',
  },

  subtitle: {
    text: 'Source: thesolarfoundation.com',
  },

  yAxis: {
    title: {
      text: 'Number of Employees',
    },
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },

  series: [
    {
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
    }],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      }],
  },
};

const styles = () => ({
  card: {
    height: 440,
  },
});

@withStyles(styles)
export default class Index extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Layout>

        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Chart options={chartOptions} id="chart-1" />
            </CardContent>
          </Card>
        </Grid>

        <Helmet>
          <title>Dashboard</title>
        </Helmet>
      </Layout>
    );
  }
}
