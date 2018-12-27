const router = require('express').Router();

function createRoutes(db) {
  router.get('/item/:id', (req, res) => {
    let obj = db.find(req.params.id);
    if (obj) {
      res.json(obj);
    } else {
      res.status(404).json({ error: 'not found' });
    }
  })
  
  return router
}
module.exports = { createRoutes };
