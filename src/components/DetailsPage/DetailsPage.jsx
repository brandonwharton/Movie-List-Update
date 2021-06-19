// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
// material-UI components
import Button from "@material-ui/core/Button";


function DetailsPage () {
    const dispatch = useDispatch();
    const history = useHistory();
    // save the DB id of the movie clicked
    const { id } = useParams();
    // movies reducer always holds an array, target the only element
    // of array with useSelector
    const movie = useSelector(store => store.movies[0])
    // get specific genres from reducer
    const genres = useSelector(store => store.genres);
    // get recentDetail reducer data to assist in navigation from AddMovie back to detail page
    const recentDetail = useSelector(store => store.recentDetail);

    // GET request dispatch on navigation or reload
    useEffect(() => {
        if (recentDetail) {
            console.log('inside conditional recentDetail');
            dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: recentDetail});
        }
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: id});
    }, [])

    // navigate back to list view on click of Back to List button
    const handleClick = () => {
        console.log('clicked');
        history.goBack();
    }


    console.log('Recent detail number', recentDetail);
    return (
    <div>
        <h3>{movie?.title}</h3>
        <img src={movie?.poster} alt={movie?.title}/>
        <h4>{movie?.description}</h4>
        <h4>List of genres:</h4>
        <ul>
        {genres.map( (genre, index) => (
            <li key={index}>{genre}</li>
        ))}
        </ul>
        <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
        >
            Back to List
        </Button>
    </div>
    )
}

export default DetailsPage;