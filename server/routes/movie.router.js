const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET request for all movies for the home page
router.get('/', (req, res) => {
  const query = `
    SELECT ARRAY_AGG ("genres".name), "movies".* FROM "movies"
    JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
    JOIN "genres" ON "movies_genres".genre_id = "genres".id
    GROUP BY "movies".id
    ;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

// GET request for a single movie for the Details page along with genre data
router.get('/:id', (req, res) => {
  const movieId = req.params.id
  console.log('Inside single movie GET with ID:', movieId);
  
  const query = `SELECT ARRAY_AGG ("genres".name), "movies".* FROM "movies"
                 JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
                 JOIN "genres" ON "movies_genres".genre_id = "genres".id
                 WHERE "movies".id = $1
                 GROUP BY "movies".id;`;
  pool.query(query, [movieId])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});



router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})


// PUT request to edit movie details
router.put('/:id', (req, res) => {
  console.log('in PUT request', req.params.id, req.body);
  const query = `UPDATE "movies" SET "title" = $1, "description" = $2 WHERE "id" = $3;`;
  // set up values
  const values = [req.body.title, req.body.description, req.params.id];
  // send query to DB
  pool.query(query, values).then(result => {
    res.sendStatus(200);
  }).catch(err => {
    console.log(`Problem with PUT request to DB,`, err)
    res.sendStatus(500);
  });
})

module.exports = router;