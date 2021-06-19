import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components/styling
import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <MovieItem />
            <section className="movies">
                {movies.map(movie => (
                    <MovieItem movie={movie} />
                ))}
                
            </section>
        </main>

    );
}

export default MovieList;