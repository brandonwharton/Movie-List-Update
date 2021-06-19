// hooks
import { useHistory } from 'react-router';
// material-ui components
import Button from '@material-ui/core/Button'


function CancelButton() {
    const history = useHistory()
    // go back to previous page on click
    const handleClick = () => {
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