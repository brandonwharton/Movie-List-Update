
// material-UI components
import TextField from '@material-ui/core/TextField';


function AddMovie() {

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
        </div>

    )
}

export default AddMovie;