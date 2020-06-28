module.exports = {
  serverRuntimeConfig: {

  },
  publicRuntimeConfig: {
    graphqlEndpoint: process.env.GRAPHQL_ENDPOINT,
    //subscriptionEndpoint: process.env.GRAPHQL_SUBSCRIPTION,
  },
  webpack: (config, {}) => {

    config.module.rules.push({ test: /\.(svg|jpg|png|gif)$/, loader: 'url-loader', options: { name: 'images/[name].[ext]', outputPath: 'static' } });
    config.module.rules.push({ test: /\.(ttf|eot|woff|woff2)$/, loader: 'url-loader', options: { name: 'fonts/[name].[ext]', outputPath: 'static' } });

    return config;
  },
};
