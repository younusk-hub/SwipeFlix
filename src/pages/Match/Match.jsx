import { React, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getMovies } from '../../services/api';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Match.scss';

const Match = () => {
    const { lobbyId, matchId } = useParams();
    const navigate = useNavigate();
    const [matchedMovies, setMatchedMovies] = useState(null);

    // need to fetch matched movies using matchId and display them here
    const fetchMatchedMovies = async () => {
            const res = await getMovies(lobbyId);
            console.log(res);
            // filter movies based on matchId and set state to display them
            const matchedMovies = res.movies.find(movie => movie.id === matchId);
            setMatchedMovies(matchedMovies);
            console.log(matchedMovies);
    }

    useEffect(() => {
        fetchMatchedMovies();
    }, [lobbyId, matchId]);

    if (!matchedMovies) {
        return <div>Loading...</div>;
    }

    return (
        <div className="match-page">
            <div className="match-content">
                <h1 className="match-title">It's a Match! You're next watch is:</h1>
                <MovieCard activeMovie={matchedMovies} pulse={true} />
                <button className="play-again-button" onClick={() => navigate(`/`)}>Play Again</button>
            </div>
        </div>
    )
}

export default Match