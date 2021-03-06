const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET request for all movies for the home page, gathers genre data for each as well
router.get('/', (req, res) => {
  const query = `
    SELECT ARRAY_AGG ("genres".name), "movies".* FROM "movies"
    JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
    JOIN "genres" ON "movies_genres".genre_id = "genres".id
    GROUP BY "movies".id
    ;`;
  pool.query(query)
    .then(result => {
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
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});


// add a new movie to the database
router.post('/', (req, res) => {
  console.log('current req.body', req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.newMovie.title, req.body.newMovie.poster, req.body.newMovie.description])
    .then(result => {
      // Now handle the genre reference
      // save the array of genre data
      let genresArray = req.body.genresArray;
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
      // save the ID of the movie that was just added to put into the junction table
      const createdMovieId = result.rows[0].id

      // loop through this process once for each new genre added
      genresArray.forEach(genre => {
        console.log('in for each, genre:', genre);

        const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" ("movie_id", "genre_id")
        VALUES  ($1, $2);
        `
        // add the genre id and movie id data into the junction table
        pool.query(insertMovieGenreQuery, [createdMovieId, genre.id]).then(result => {
          //Now that both are done, send back success!
          // console.log('in .then inside loop for genre:', genre);

          // I was throwing errors about headers already being sent here, sometimes all
          // of my genres would add and sometimes the last one would throw the error.
          // I'm guessing it's bad practice to not have a sendStatus but getting rid of it solved 
          // the bug and everything seems to work. My thought is that the forEach is moving too quickly and that I should
          // find a way to have each iteration in it's own .then, but I'm not sure how to handle that.
          // I would love to learn more.

          // res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        })
      }) // end for each

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