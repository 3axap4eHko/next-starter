import React from 'react';
import Helmet from 'react-helmet';
import routes from './routes';

Helmet.prototype.shouldComponentUpdate = () => true;

function inject(module, callback) {
  const DefaultModule = module.default;
  module.default = callback(DefaultModule);
}

inject(require('next/link'), NextLink => function Link({ as, href, ...props }) {
  if (href && href.pathname) {
    const { page, matches } = routes.match(href.pathname);
    if (matches) {
      as = href;
      href = {
        pathname: page,
        query: matches,
      };
    }
  }
  return <NextLink {...props} as={as} href={href} />;
});
