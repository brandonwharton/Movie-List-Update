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
    }, []);


    return (
        <main>
            <Typography variant="h4" component ="h2" className="list-title">
                Movies
            </Typography>
            <section className="movies">
                {movies.map(movie => (
                    <MovieItem movie={movie} />
                ))}
            </section>
        </main>

    );
}

export default MovieList;