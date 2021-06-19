// hooks
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
// material-ui components
import Button from '@material-ui/core/Button'



function CancelButton() {
    const history = useHistory();
    const dispatch = useDispatch();

    // go back to previous page on click
    const handleClick = () => {
        // clear genres first to fix a page reload bug
        dispatch({ type: 'CLEAR_GENRES'});
        // go back to previously viewed page
        history.goBack();
    }

    return (
        <Button
            onClick={handleClick}
            variant="contained"
            color="secondary"
        >
            Cancel
        </Button>
    )
}

export default CancelButton;