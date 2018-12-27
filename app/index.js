const express = require('express');
const app = express();
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

module.exports = app;
