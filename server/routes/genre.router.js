const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Get all genres from DB
  const query = 'SELECT * FROM GENRES ORDER BY "id" ASC;';
  pool.query(query)
    .then( result => {
      res.send(result.rows)
    })
    .catch(err => {
      console.log('ERROR: GET all genres', err)
      res.sendStatus(500)
    })
});

module.exports = router;