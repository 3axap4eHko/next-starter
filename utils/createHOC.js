import React, { Component } from 'react';

export default function createHOC(name) {
  return WrappedComponent => {
    const componentName = WrappedComponent.displayName || WrappedComponent.name;

    return class HOC extends Component {
      static displayName = `${name}(${componentName})`;
      static WrappedComponent = WrappedComponent;

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };
}

createHOC('withStyles', () => {

});