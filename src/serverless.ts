import serverlessExpress from '@vendia/serverless-express';
import { initApp } from './app';

let serverlessExpressInstance;

async function setup(event, context) {
  const app = await initApp();
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

function handler(event, context) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context);

  return setup(event, context);
}

exports.handler = handler;
