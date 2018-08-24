const Pattern = require('uriil/Pattern');

class Router {

  constructor(routeMap = {}) {

    this.routes = [];
    this.addMany(routeMap);
  }

  inject(Link) {
    if (Link.__injected) {
      return;
    }
    const _formatUrls = Link.prototype.formatUrls;
    const router = this;
    Link.__injected = true;

    Link.prototype.formatUrls = function (props) {
      const { page, matches } = router.match(props.href);
      if (matches) {
        const href = {
          pathname: page,
          query: matches,
        };
        _formatUrls.call(this, {
          ...props,
          href,
          as: props.href,
        });
      } else {
        _formatUrls.call(this, props);
      }
    };
  }

  add(route, options) {
    const page = typeof options === 'string' ? options : options.page;

    this.routes.push({
      route,
      page,
      pattern: Pattern.fromString(route),
    });
  }

  addMany(routeMap) {
    Object.keys(routeMap).forEach(route => this.add(route, routeMap[route]));
  }

  match(url) {
    let matches = null;
    const route = this.routes.find(route => matches = route.pattern.match(url)) || {};
    return { ...route, matches };
  }

  getRequestHandler(app) {
    const handler = app.getRequestHandler();
    return (req, res, next) => {
      const { page, matches } = this.match(req.url);
      if (matches) {
        console.log('Matched', page, matches);
        app.render(req, res, page, matches);
      } else {
        handler(req, res, next);
      }
    };
  }
}

module.exports = function (routeMap) {
  return new Router(routeMap);
};
