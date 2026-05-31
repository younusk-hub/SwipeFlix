import { React, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getMovies } from '../../services/api';

const Match = () => {
    const { lobbyId, matchId } = useParams();
    // need to fetch matched movies using matchId and display them here
    useEffect(() => {
        const fetchMatchedMovies = async () => {
            const res = await getMovies(lobbyId);
            console.log(res);
            // filter movies based on matchId and set state to display them
            const matchedMovies = res.movies.find(movie => movie.id === matchId);
            console.log(matchedMovies);
        }
        fetchMatchedMovies();
    }, [lobbyId, matchId]);

    return (
        <div>Match Screen</div>
    )
}

export default Match