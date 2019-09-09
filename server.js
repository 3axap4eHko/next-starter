import 'dotenv/config';
import Express from 'express';
import Next from 'next';
import bodyParser from 'body-parser';
import routes from './utils/routes';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handle = routes.getRequestHandler(app);

(async () => {
  await app.prepare();
  const server = Express();

  server.use(Express.static('public'));
  server.use(bodyParser.json());

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
