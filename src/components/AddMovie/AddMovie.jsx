// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// components/styling
import CancelButton from '../CancelButton/CancelButton';
import './AddMovie.css';
// material-UI components
import Typography from '@material-ui/core/Typography';
import '@fontsource/roboto'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';





function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();
    // get all genres from reducer
    const genres = useSelector(store => store.genres);

    // state for keeping track of form inputs
    const [newMovie, setNewMovie] = useState({
        title: '',
        poster: '',
        description: '',
    });
    // state for holding the list of genres the user wants to add to a new movie
    const [newGenres, setNewGenres] = useState([]);

    // GET all genres on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'});
    }, []);

    // change handler for entire input form, sets individual newMovie
    // keys as they're changed by user
    const handleChangeFor = (event, propertyName) => {
        setNewMovie({
            ...newMovie,
            [propertyName]: event.target.value
        })
    }

    // change handler for genres, adds each genre to the newGenres array as they're chosen from dropdown
    const handleGenreAdd = (event) => {
        const newGenreId = event.target.value;
        // prevent duplicates
        if(newGenres.includes(genres[newGenreId-1])) {
            return;
        }
        // set state for added genre, need to target newGenreId-1 because the id of the genre is one higher than it's array index
        setNewGenres([...newGenres, genres[newGenreId-1]]);
    }


    // submit handler for save button to dispatch newMovie data and navigation back to list
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('in handlesubmit show newGenres', newGenres);
        // send newMovie data to redux saga
        dispatch({ type: 'ADD_NEW_MOVIE', payload: {newMovie: newMovie, genresArray: newGenres }});
        // navigate back to movie list
        history.push('/');
    }


    // conditional rendering for the display of genres that are being added to movie
    const selectedGenresDisplay = () => {
        // Once one genre is added, start displaying the return below
        if (newGenres.length !== 0) {
            return <div>
                        <Typography variant="h5" content="h5">Genres Added:</Typography>
                        <Typography variant="p" content="p">
                            {newGenres.map(genreObject => {
                                return `${genreObject.name} `
                            })}
                        </Typography>
                   </div>
        }
    }

    // console.log(newMovie);
    // console.log(newGenres);
    return (
        <div>
            <Typography variant="h4" content="h4" className="add-movie-heading">
                Add a Movie
            </Typography>
            <FormControl onSubmit={handleSubmit} className="add-edit-form">
                <TextField 
                    label="title"
                    required
                    onChange={(event) => handleChangeFor(event, 'title')}
                >
                </TextField>
                <TextField
                    label="poster URL"
                    required
                    onChange={(event) => handleChangeFor(event, 'poster')}
                >
                </TextField>
                <TextField
                    label="description"
                    multiline
                    required
                    rows={7}
                    rowsMax={7}
                    variant="outlined"
                    onChange={(event) => handleChangeFor(event, 'description')}
                >
                </TextField>
                {/* <InputLabel id="genre-select-label">
                    Genre
                </InputLabel> */}
                <Select value={newGenres.name} label="genre" onChange={handleGenreAdd}>
                    {genres?.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                    </MenuItem>
                    ))}
                </Select>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </FormControl>
            <CancelButton />
            {selectedGenresDisplay()}
        </div>

    )
}

export default AddMovie;