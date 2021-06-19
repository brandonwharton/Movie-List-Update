// styling
import './Header.css';
// material-UI components
import '@fontsource/roboto'
import Typography from '@material-ui/core/Typography';

function Header() {

    return (
        <div className="header-main">
            <Typography variant="h2" component="h1">
                The Movies Saga!
            </Typography>
        </div>
    )
}

export default Header;