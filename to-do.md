To-Do
- [ ] DetailsPage '/details'
    - [x] Brought to DetailsPage for a movie on-click of that movie poster from the MovieList page
        - [x] GET request with req.params/ req.query
    - [x] Show all details from that movie
    - [x] Show ALL genres for selected movie - stored in redux
        - [x] useSelector for genres in the MovieItem component?
    - [x] Back to List button, brings user to Home page
        - [ ] Make this a component?
    - [x] Base mode doesn't require correct details to load after browser refresh


- [ ] AddMovie page '/addmovie'
    - [x] local states for inputs, look into one change handler to create object
    - [x] TextField for title
    - [x] TextField for image url
        - [x] These are stored in public/images right now, make this possible with web URLs also?
    - [x] textarea (look into this) for movie description
    - [x] dropdown for genres
        - [x] get these from DB using saga/reducer, map over them
    - [x] Cancel button, brings user back to '/' route (use goBack, make as a component for possible use in stretch goals?)
    - [x] Save button, POSTs to DB and nav to '/' route
    - [ ] Base mode doesn't need multiple genres/movie available

- [ ] Styling
    - [x] Research cards for movie posters
    - [ ] Research grids for movie posters

- [ ] Stretch
    - [x] Maintain refresh on details page
        - [x] Research React Router URL PARAMS
    - [ ] Edit page button on detail page
        - [x] TextField for changing the movie title
        - [x] textarea for changing movie description
        - [x] Cancel button, navigate back to details page
        - [x] Save button, update title and description in DB
            - [x] Need a PUT saga and a PUT route in movie.router
        - [x] Display current (not yet changed) values?

- [ ] Form validation?

- [ ] Other Ideas
    - [x] Navbar
    - [ ] Display all genres on movie list page
        - [ ] Research array_agg
    - [ ] Allow multiple genres as they add
        - [ ] Change INSERT statement
        - [ ] View as checkmarks, movie genre is an object inside POST body with key of genres?
        - [ ] OR: View selected genres on screen somewhere with a remove button to alter state before send
    - [ ] Move sagas and reducers into separate folders
    - [ ] Ability to add a genre, probably from Edit page
    - [ ] Ability to remove a genre, proabably from Edit page
        - [ ] Will need a DELETE route to remove from movies_genres table
    - [ ] Only display top 10 movies, allow user to search for movie titles from home page
        - [ ] Client or Server side, server side is bigger stretch but better practice
    - [ ] Admin page
        - [ ] Link from Home page
        - [ ] Display login form at first
            - [ ] username camera//password action
            - [ ] js logic for checking
        - [ ] Display a form to add genres to DB
            - [ ] Require a new POST route/saga
        - [ ] List out all genres with an x button to delete from DB
            - [ ] Require anothe DELETE route/saga




- [ ] Maybe: Make a MovieItem component for list?