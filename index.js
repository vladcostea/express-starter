const express = require('express');
const app = express();
const port = 4000;

const db = require('./db');

app.get('/ping', (req, res) => res.send('pong'));

app.get('/find/:id', (req, res) => {
  let obj = db.find(req.params.id);
  if (obj) {
    res.json(obj);
  } else {
    res.status(404).json({ error: 'not found' });
  }
});

function onListen() {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Example app listening on port ${port}!`);
  }
}

module.exports = app.listen(port, onListen);
