const app = require('./app');
const db = require('./app/db');
const routes = require('./app/routes');
const port = 4000;

function onListen() {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Example app listening on port ${port}!`);
  }
}

app.use(routes.createRoutes(db));
app.listen(port, onListen);
