import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    // watches for dispatches from MovieList
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    // watches for dispatches from DetailsPage 
    yield takeEvery('FETCH_SINGLE_MOVIE', fetchSingleMovie);
    // watches for dispatches to add genres while inside of fetchSingleMovie
    yield takeEvery('FETCH_SPECIFIC_GENRES', fetchSpecificGenres);
    // watches for dispatches to GET all genres from AddMovie
    yield takeEvery('FETCH_GENRES', fetchGenres);
    // watches for dispatches from AddMovie to POST a new movie to DB
    yield takeEvery('ADD_NEW_MOVIE', addNewMovie);
    // watches for dispatches to reset genre reducer
    yield takeEvery('CLEAR_GENRES', clearGenres);
    // watches for dispatches to edit movie details in DB
    yield takeEvery('EDIT_MOVIE_DETAILS', editMovieDetails)
}


function* fetchAllMovies() {
    // reset the recentDetail reducer
    // yield put ({ type: 'RESET_DETAIL_ID'});
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.error('GET all movies error');
    }
}

function* fetchSingleMovie(action) {
    // action.payload is the DB id of the movie we want to GET
    const movieId = action.payload
    // save the DB id into the recentDetail reducer to assist in navigation
    // yield put({ type: 'SET_DETAIL_ID', payload: movieId})
    // get one movie from the DB
    try {
        // movieData comes back as a separate array element for each genre
        // associated with that movie
        const movie= yield axios.get(`/api/movie/${movieId}`);
        console.log('Troubleshooting movieData and genres', movie.data);
        
        // save one element of movieData to send to movies reducer
        
        // send movie data to movies reducer as an array to maintain default state
        yield put({ type: 'SET_MOVIES', payload: movie.data });
        // using movieData from database, set genres reducer with each genre
        yield put({ type: 'FETCH_SPECIFIC_GENRES', payload: movie.data })
    } catch {
        console.error('GET single movie error')
    }
}


// only gets called inside of fetchSingleMovie generator
// sets genres reducer with the genres specific to the movie shown currently in DetailsPage
function* fetchSpecificGenres(action) {
    // pull genres out of data and save them as an array
    // genres come in as the 'name' key for each individual array element passed as action.payload
    let genreArray = action.payload[0].array_agg;
    console.log('action payload in fetch specific genre', action.payload, genreArray);
    
    // action.payload.forEach(genre => genreArray.push(genre.name));
    // set genres reducer with newly created array 
    yield put({ type: 'SET_GENRES', payload: genreArray })
}

function* fetchGenres() {
    // get all genres from DB
    try {
        const genres = yield axios.get('/api/genre');
        yield put({ type: 'SET_GENRES', payload: genres.data});
    } catch {
        console.error('GET all genres error');
    }
}


function* addNewMovie(action) {
    // POST new movie to the DB
    try {
        yield axios.post('/api/movie', action.payload);
        // reset state with updated DB data
        yield put({ type: fetchAllMovies });
    } catch {
        console.error('POST new movie error');
    }
}

function* clearGenres() {
    // reset genres
    yield put({ type: 'RESET_GENRES' });
}


function* editMovieDetails(action) {
    const movieId = action.payload.id
    // console.log(action.payload);
    // PUT request to DB to change movie details
    try {
        yield axios.put(`/api/movie/${movieId}`, action.payload)
    } catch {
        console.error('PUT details edit error')
    }
    
}





// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        case 'RESET_GENRES':
            return [];
        default:
            return state;
    }
}


// Used to store the most recently visited detail page for navigation
// const recentDetail = (state = 0, action) => {
//     switch (action.type) {
//         case 'SET_DETAIL_ID':
//             return action.payload;
//         case 'RESET_DETAIL_ID':
//             return 0;
//         default:
//             return state;
//     }
// }


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        // recentDetail
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
