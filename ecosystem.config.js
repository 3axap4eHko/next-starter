const isDev = process.env.NODE_ENV === 'development';

const instances = isDev ? 1 : 3;
const execMode = isDev ? 'fork' : 'cluster';
const watch = isDev ? './server.js' : false;

module.exports = {
  apps: [
    {
      name: 'website',
      script: './server.js',
      instances,
      exec_mode: execMode,
      autorestart: true,
      watch,
      max_memory_restart: '2G',
      node_args: '-r @babel/register',
    },
  ],
};
