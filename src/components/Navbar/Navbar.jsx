// material-UI components
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// hooks
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
    const classes = useStyles();
    const history = useHistory();

    const navHome = () => {
        history.push('/')
    }

    const navAdd = () => {
        history.push('/addmovie')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        color="inherit"
                        onClick={navHome}
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        onClick={navAdd}
                    >
                        Add A Movie
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )

}

export default Navbar;