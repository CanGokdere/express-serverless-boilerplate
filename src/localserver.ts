import { initApp } from './app';
import db from './models';

const port = process.env.PORT || 8080; // default port to listen

db.sequelize.sync();

// start Local Express server
async function startServer() {
  const app = await initApp();
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}

(async () => {
  await startServer();
})();
