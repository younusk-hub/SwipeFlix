import { React , useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { getMovies, submitVote, completedList } from '../../services/api';
import LobbyCode from '../../components/LobbyCode/LobbyCode';
import MovieCard from '../../components/MovieCard/MovieCard';

import './Lobby.scss';

const Lobby = () => {
    const navigate = useNavigate();
    const lobbyId = useParams().lobbyId;
    const [lobbyData, setLobbyData] = useState({});

    const [movies, setMovies] = useState([]); // movies array from db 
    const [movieOrder, setMovieOrder] = useState([]); // array of movie ids in order to be swiped on
    const [activeMovieIndex, setActiveMovieIndex] = useState(0); // index of the current movie in the movieOrder array
    
    const playerName = localStorage.getItem("playerName");
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [noMatch, setNoMatch] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const fetchMovies = async (lobbyId) => {
        const res = await getMovies(lobbyId);
        setMovies(res.movies);
        setMovieOrder(res.movies.map(movie => movie.id));
        console.log(res.movies.map(movie => movie.id));
        console.log(res.movies);
    }

    useEffect(() => {
        fetchMovies(lobbyId);
        setLoading(false);

        console.log("LISTENER CREATED");
        const unsub = onSnapshot(
            doc(db, "lobbies", lobbyId),
            (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log(data);
                    setLobbyData(data);
                    setNumberOfPlayers(Object.keys(data.users).length);

                    // match detected
                    if (data.status === "matched" && data.match) {
                        navigate(`/lobby/${lobbyId}/match/${data.match}`);
                    }
                    if (data.status === "No match") {
                        setNoMatch(true);
                    }
                }
                console.log("SNAPSHOT FIRED");
            },
            (error) => {
                console.error("Lobby listener error:", error);
            }
        );
        return () => {
            unsub()
            console.log("LISTENER REMOVED");
        };
    }, [lobbyId]);


    const activeMovieId = movieOrder[activeMovieIndex];
    console.log(activeMovieId);

    const activeMovie = movies.find(
        movie => movie.id === activeMovieId
    ) || null;


    const handleVote = async (vote) => {
        setActiveMovieIndex(prev => prev + 1); 
        await submitVote({
            lobbyId: lobbyId,
            movieId: activeMovieId,
            userId: playerName,
            vote: vote
        }); 

        console.log(activeMovieIndex);

        if (activeMovieIndex + 1 >= movieOrder.length) {
            await handleCompletedList();
        }
    };

    const handleCompletedList = async () => {
        const res = await completedList(lobbyId, playerName);
        console.log(res);
    }

    if (!activeMovie && lobbyData.status !== "matched") {
        return (
            <div className="lobby">
                <div className="lobby__content">
                    <LobbyCode lobbyId={lobbyId} numberOfPlayers={numberOfPlayers} />
                    {noMatch ? (
                        <div className="no-match">
                            <h2 className="no-more-movies">No match found!</h2>
                            <button className="try-again-button" onClick={() => navigate(`/`)}>Play Again</button>
                        </div>
                    ) : (
                        <div className="waiting-for-players">
                            <h2 className="no-more-movies">No more movies to swipe on!</h2>
                            <p>Waiting for other players to finish...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="lobby">
                <div className="lobby__content">
                    <LobbyCode lobbyId={lobbyId} numberOfPlayers={numberOfPlayers} />
                    <div className="loading">Loading movies...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="lobby">
            <div className="lobby__content">

                <LobbyCode lobbyId={lobbyId} numberOfPlayers={numberOfPlayers} />

                <MovieCard activeMovie={activeMovie} handleVote={handleVote} pulse={false} />
            </div>

            <div className="vote-bar">
                <button
                    className="vote-btn vote-btn--dislike"
                    onClick={() => handleVote(false)}
                >
                    ❌
                </button>
                <button
                    className="vote-btn vote-btn--like"
                    onClick={() => handleVote(true)}
                >
                    ❤️
                </button>
            </div>
        </div>

    )
}

export default Lobby