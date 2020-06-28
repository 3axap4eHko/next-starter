const isDev = process.env.NODE_ENV !== 'production';
const DEBUGGER = !!process.env.DBG ? '--inspect-brk' : '';

const instances = isDev ? 1 : 'max';
const execMode = isDev ? 'fork' : 'cluster';
const watch = isDev ? ['./server.js', './next.config.js', './utils'] : false;
const node_args = isDev ? `-r @babel/register -r dotenv/config ${DEBUGGER}` : '';

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
      node_args,
    },
  ],
};
