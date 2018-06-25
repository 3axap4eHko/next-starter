import React, { Component } from 'react';
import { string, object, oneOf } from 'prop-types';
import Highcharts from 'highcharts';
import Highstock from 'highcharts/modules/stock';
import Highmap from 'highcharts/modules/map';

export default class Chart extends Component {
  static propTypes = {
    id: string.isRequired,
    options: object.isRequired,
    type: oneOf(['chart', 'stock', 'map']),
  };
  static defaultProps = {
    type: 'chart',
  };

  componentDidMount() {
    switch (this.props.type) {
      case 'chart':
        this.chart = Highcharts.chart(this.props.id, this.props.options);
        break;
      case 'stock':
        Highstock(Highcharts);
        this.chart = Highcharts.stockChart(this.props.id, this.props.options);
        break;
      case 'map':
        Highmap(Highcharts);
        this.chart = Highcharts.mapChart(this.props.id, this.props.options);
        break;
    }
  }

  componentDidUpdate() {
    this.chart.update(this.props.options);
  }
  
  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div id={this.props.id} />
    );
  }
}
