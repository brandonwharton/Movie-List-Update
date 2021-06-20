// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
// components
import CancelButton from '../CancelButton/CancelButton';
// material-UI components
import Typography from '@material-ui/core/Typography';
import '@fontsource/roboto'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

function EditPage () {
    const dispatch = useDispatch();
    const history = useHistory();
    // save the DB id of the movie to be edited
    const { id } = useParams();
    // movies reducer always holds an array, target the only element
    // of array with useSelector
    const movie = useSelector(store => store.movies[0])
    // local state to track changes
    const [movieDetails, setMovieDetails] = useState({
        title: movie?.title,
        description: movie?.description,
        id: id
    })

    // GET request dispatch on navigation or reload
    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: id});
        setMovieDetails({
            title: movie?.title,
            description: movie?.description,
            id: id
        })
    }, [])

    // change handler for both TextFields, adjusts local state as changes occur
    const handleChangeFor = (event, propertyName) => {
        setMovieDetails({
            ...movieDetails,
            [propertyName]: event.target.value
        })
    }

    // on submit click, set a PUT request dispatch to edit movie details in DB, then return to details page
    const handleSubmit = (event) => {
        event.preventDefault();
        // send request to edit details with saved local state
        dispatch({ type: 'EDIT_MOVIE_DETAILS', payload: movieDetails })
        // send user back to details page
        history.push(`/details/${id}`)
    }



    // console.log(movieDetails);
    return (
        <div>
            <Typography variant="h3" component="h3">
                Edit Movie: {movie?.title}
            </Typography>
            <FormControl className="add-edit-form" onSubmit={handleSubmit}>
                <TextField
                    label="title"
                    value={movieDetails.title}
                    onChange={(event) => handleChangeFor(event, 'title')}
                >
                </TextField>
                <TextField
                    label="description"
                    multiline
                    required
                    rows={6}
                    rowsMax={6}
                    variant="outlined"
                    value={movieDetails.description}
                    onChange={(event) => handleChangeFor(event, 'description')}
                >
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Save Details
                </Button>
            </FormControl>
            <CancelButton />
        </div>

    )
}

export default EditPage;