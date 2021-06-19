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
    const [genreChoice, setGenreChoice] = useState('');

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'});
    }, []);

    console.log(genres);
    console.log(genreChoice);
    return (
        <div>
            <h2>Add a Movie</h2>
            <TextField
                label="title"
            >
            </TextField>
            <TextField
                label="poster URL"
            >
            </TextField>
            <TextField
                label="description"
                multiline
                rows={6}
                rowsMax={6}
                variant="outlined"
            >
            </TextField>
            <label for="genre-select">genre</label>
            <select name="genre" id="genre-select" onChange={() => setGenreChoice(event.target.value)}>
                {genres.map(genre => (
                    <option value={genre.name}>{genre.name}</option>
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