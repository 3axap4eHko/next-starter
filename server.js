import { createServer } from 'http';
import Express from 'express';
import Next from 'next';
import bodyParser from 'body-parser';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handler = app.getRequestHandler();


function graphqlMock(req, res) {
  res.json({
    data: {
      values: Array.from({ length: 10 }).map(() => ({ __typename: 'Value', id: Math.random() })),
    }
  });
}

(async () => {
  await app.prepare();

  const expressServer = Express();
  const httpServer = createServer(expressServer);

  expressServer.use(Express.static('public'));
  expressServer.use(bodyParser.json());
  expressServer.use('/graphql', graphqlMock);

  expressServer.get('*', (req, res) => handler(req, res));


  httpServer.listen(port, (err) => {
    if (err) {
      throw err;
    }
    expressServer.emit('listening', httpServer);
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
