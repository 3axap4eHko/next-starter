import React from 'react';
import Helmet from 'react-helmet';
import routes from './routes';

Helmet.prototype.shouldComponentUpdate = () => true;

const linkModule = require('next/link');
const NextLink = linkModule.default;

linkModule.default = function Link({ as, href, ...props }) {
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
};

