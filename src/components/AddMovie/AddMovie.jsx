// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// material-UI components
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



function AddMovie() {
    const dispatch = useDispatch();
    // get all genres from reducer
    const genres = useSelector(store => store.genres);
    // GET all genres on page load
    const [newMovie, setNewMovie] = useState({
        title: '',
        poster: '',
        description: '',
        genre_id: ''
    });

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

    console.log(newMovie);
    return (
        <div>
            <h2>Add a Movie</h2>
            <TextField
                label="title"
                onChange={(event) => handleChangeFor(event, 'title')}
            >
            </TextField>
            <TextField
                label="poster URL"
                onChange={(event) => handleChangeFor(event, 'poster')}
            >
            </TextField>
            <TextField
                label="description"
                multiline
                rows={6}
                rowsMax={6}
                variant="outlined"
                onChange={(event) => handleChangeFor(event, 'description')}
            >
            </TextField>
            {/*   onChange={() => setGenreChoice(event.target.value)} */}
            <label for="genre-select">genre</label>
            <select 
                name="genre" 
                id="genre-select"
                // on change, sets the newMovie state for genre_id to the id provided from DB
                onChange={(event) => handleChangeFor(event, 'genre_id')}
            >
                {genres.map(genre => (
                    <option value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>

            {/* Getting some strange errors working with materialUI selects */}
            {/* <InputLabel id="genre-select-label">genre</InputLabel>
            <Select
                labelId="genre-select-label"
                onChange={() => setGenreChoice(event.target.value)}
            >{genres.map(genre => {
                    return <MenuItem 
                        key={genre?.id}
                        value={value}
                    >
                        {genre?.name}
                    </MenuItem>
                })};
            </Select> */}
        </div>

    )
}

export default AddMovie;