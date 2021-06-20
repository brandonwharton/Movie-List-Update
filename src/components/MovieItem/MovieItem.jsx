import { useHistory } from "react-router";
// material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    root: {
        width: 300,
        margin: 6,
        background: '#555',
    },
    media: {
        // width: 300,
        width: '100%',
        height: 425,
    },
    img: {
        width: '50%',
        height: '50%',
    },
});


function MovieItem( {movie} ) {
    const classes = useStyles();
    // bring in history for navigation on click
    const history = useHistory();

    // navigate to DetailsPage component on click
    const handleClick = () => {
        history.push(`/details/${movie.id}`);
    }

    // console.log('movie', movie);
    return (

        <Card key={movie.id} className={classes.root}>
            <CardActionArea>
                <CardMedia
                    image={movie.poster}
                    title={movie.title}
                    className={classes.media}
                    onClick={handleClick}
                /> 
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                        {movie.title}
                    </Typography>
                    <Typography variant="p" component ="p">
                        Genres: {movie.array_agg.map(genre => {
                            return `${genre} `
                        })}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" variant="contained" onClick={handleClick}>
                    See Details
                </Button>
            </CardActions>
        </Card>


    // <div key={movie?.id}>
    //     <h3>{movie?.title}</h3>
    //     <img src={movie?.poster} alt={movie?.title} onClick={handleClick}/>
    // </div>

    )
}

export default MovieItem;