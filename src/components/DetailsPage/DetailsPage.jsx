// hooks

import { useEffect } from "react";
import { useParams } from "react-router";


function DetailsPage () {
    // save the DB id of the movie clicked
    const { id } = useParams();
    // GET request dispatch on navigation
    useEffect(() => {
        
    }, [])

    return (
        <h2>In DetailsPage: {id}</h2>
    )
}

export default DetailsPage;