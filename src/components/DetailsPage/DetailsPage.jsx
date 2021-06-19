// hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";


function DetailsPage () {
    const dispatch = useDispatch();
    // save the DB id of the movie clicked
    const { id } = useParams();
    // movies reducer always holds an array, target the only element
    // of array with useSelector
    const movie = useSelector(store => store.movies[0])


    // GET request dispatch on navigation
    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: id});
    }, [])

    console.log('Movie in detail page:', movie);
    return (
    <div>
        <h3>{movie?.title}</h3>
        <img src={movie?.poster} alt={movie?.title}/>
    </div>
    )
}

export default DetailsPage;