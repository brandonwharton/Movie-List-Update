// hooks

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";


function DetailsPage () {
    const dispatch = useDispatch();
    // save the DB id of the movie clicked
    const { id } = useParams();
    // GET request dispatch on navigation
    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: id});
    }, [])

    return (
        <h2>In DetailsPage: {id}</h2>
    )
}

export default DetailsPage;