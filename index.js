const app = require('./app');
const port = 4000;

function onListen() {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Example app listening on port ${port}!`);
  }
}

app.listen(port, onListen);
