import { useHistory } from "react-router";



function MovieItem( {movie} ) {
    // bring in history for navigation on click
    const history = useHistory();

    // navigate to DetailsPage component on click
    const handleClick = () => {
        history.push(`/details/${movie.id}`);
    }

    return (
    <div key={movie?.id}>
        <h3>{movie?.title}</h3>
        <img src={movie?.poster} alt={movie?.title} onClick={handleClick}/>
    </div>

    )
}

export default MovieItem;