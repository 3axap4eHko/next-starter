import Router from './router';

export default new Router({
  '/': '/index',
  '/dashboard': '/index',
  '/posts': '/posts',
  '/posts/:id': '/posts',
});
