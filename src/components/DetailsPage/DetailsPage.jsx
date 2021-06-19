// hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";


function DetailsPage () {
    const dispatch = useDispatch();
    // save the DB id of the movie clicked
    const { id } = useParams();
    const movie = useSelector(store => store.movies)


    // GET request dispatch on navigation
    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: id});
    }, [])

    console.log('Movie in detail page:', movie);
    return (
        <h2>In DetailsPage: {id}</h2>
    )
}

export default DetailsPage;