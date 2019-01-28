const Path = require('path');

module.exports = {
  serverRuntimeConfig: {

  },
  publicRuntimeConfig: {
    //graphqlEndpoint: 'ws://localhost:3000/subscription',
    //subscriptionEndpoint: 'ws://localhost:3000/subscription',
  },
  webpack: (config, {}) => {

    config.resolve = {
      alias: {
        UI: Path.resolve(__dirname, './components/UI'),
        dbg: Path.resolve(__dirname, './utils/dbg'),
      },
    };
    config.module.rules.push({ test: /\.(svg|jpg|png|gif)$/, loader: 'url-loader', options: { name: 'images/[name].[ext]', outputPath: 'static' } });
    config.module.rules.push({ test: /\.(ttf|eot|woff|woff2)$/, loader: 'url-loader', options: { name: 'fonts/[name].[ext]', outputPath: 'static' } });

    return config;
  },
};