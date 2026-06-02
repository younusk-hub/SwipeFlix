import { React , useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { getMovies, submitVote } from '../../services/api';
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
    
    const fetchMovies = async (lobbyId) => {
        const res = await getMovies(lobbyId);
        setMovies(res.movies);
        setMovieOrder(res.movies.map(movie => movie.id));
        console.log(res.movies.map(movie => movie.id));
        console.log(res.movies);
    }

    useEffect(() => {
        fetchMovies(lobbyId);

        console.log("LISTENER CREATED");
        const unsub = onSnapshot(
            doc(db, "lobbies", lobbyId),
            (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log(data);
                    setLobbyData(data);
                    setNumberOfPlayers(data.users.length);

                    // match detected
                    if (data.status === "matched") {
                        navigate(`/lobby/${lobbyId}/match/${data.match}`);
                    }
                }
                console.log("SNAPSHOT FIRED");
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
    };

    if (!activeMovie && lobbyData.status !== "matched") {
        return (
            <div className="lobby">
                <div className="lobby__content">
                    <LobbyCode lobbyId={lobbyId} numberOfPlayers={numberOfPlayers} />
                    <h2 className="no-more-movies">No more movies to swipe on!</h2>
                    <p className="waiting-for-players">Waiting for other players to finish...</p>
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