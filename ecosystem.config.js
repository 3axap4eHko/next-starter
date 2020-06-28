const isDev = process.env.NODE_ENV !== 'production';
const DEBUGGER = !!process.env.DBG ? '--inspect-brk' : '';

const script = isDev ? './server.js' : './.next/server.js';
const instances = isDev ? 1 : 'max';
const exec_mode = isDev ? 'fork' : 'cluster';
const watch = isDev ? ['./server.js', './next.config.js', './utils'] : false;
const node_args = isDev ? `-r @babel/register -r dotenv/config ${DEBUGGER}` : '';

module.exports = {
  apps: [
    {
      name: 'website',
      script,
      instances,
      exec_mode,
      autorestart: true,
      watch,
      max_memory_restart: '2G',
      node_args,
    },
  ],
};
