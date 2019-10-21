const Path = require('path');

module.exports = {
  serverRuntimeConfig: {

  },
  publicRuntimeConfig: {
    graphqlEndpoint: 'http://localhost:3000/graphql',
    //subscriptionEndpoint: 'ws://localhost:3000/subscription',
  },
  webpack: (config, {}) => {

    config.module.rules.push({ test: /\.(svg|jpg|png|gif)$/, loader: 'url-loader', options: { name: 'images/[name].[ext]', outputPath: 'static' } });
    config.module.rules.push({ test: /\.(ttf|eot|woff|woff2)$/, loader: 'url-loader', options: { name: 'fonts/[name].[ext]', outputPath: 'static' } });

    return config;
  },
};
