const Express = require('express');
const Next = require('next');
const bodyParser = require('body-parser');

const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handle = routes.getRequestHandler(app);

(async () => {
  await app.prepare();
  const server = Express();

  server.use(bodyParser.json());

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', req.params);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
