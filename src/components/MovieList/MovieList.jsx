import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components/styling
import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem';
// material-UI components
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import '@fontsource/roboto';

function MovieList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'CLEAR_GENRES' });
    }, []);


    return (
        <main>
            <div className="list-title">
            <Typography variant="h4" component ="h2">
                Movies
            </Typography>
            </div>
            <section className="movies">
                {movies.map(movie => (
                    <MovieItem key={movie.id} movie={movie} />
                ))}
            </section>
        </main>

    );
}

export default MovieList;