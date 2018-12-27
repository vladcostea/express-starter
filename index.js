const express = require('express');
const app = express();
const port = 3000;

app.get('/ping', (req, res) => res.send('pong'));

function onListen() {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Example app listening on port ${port}!`);
  }
}

module.exports = app.listen(port, onListen);
