import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components/styling
import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem';
// material-UI components
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

function MovieList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // click handler to navigate to AddMovie route
    const handleClick = () => {
        history.push('/addmovie');
    }

    return (
        <main>
            <h1>MovieList</h1>
            <Button
                variant="contained"
                onClick={handleClick}
            >
                Add New Movie
            </Button>
            <section className="movies">
                {movies.map(movie => (
                    <MovieItem movie={movie} />
                ))}
            </section>
        </main>

    );
}

export default MovieList;