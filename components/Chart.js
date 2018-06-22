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
        return Highcharts.chart(this.props.id, this.props.options);
      case 'stock':
        Highstock(Highcharts);
        return Highcharts.stockChart(this.props.id, this.props.options);
      case 'map':
        Highmap(Highcharts);
        return Highcharts.mapChart(this.props.id, this.props.options);
    }
  }

  render() {
    return (
      <div id={this.props.id} />
    );
  }
}
