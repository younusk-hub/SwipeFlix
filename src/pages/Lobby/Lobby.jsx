import { React , useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { getMovies, submitVote } from '../../services/api';

const Lobby = () => {
    const navigate = useNavigate();
    const lobbyId = useParams().lobbyId;
    const [lobbyData, setLobbyData] = useState({});

    const [movies, setMovies] = useState([]); // movies array from db 
    const [movieOrder, setMovieOrder] = useState([]); // array of movie ids in order to be swiped on
    const [activeMovieIndex, setActiveMovieIndex] = useState(0); // index of the current movie in the movieOrder array
    const playerName = localStorage.getItem("playerName");

    
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

                    // match detected
                    if (data.status === "matched") {
                        localStorage.setItem("match", JSON.stringify(data));
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
        return <div>Waiting for other players...</div>;
    }

    return (
        <div>
            <h1>Lobby: {lobbyId}</h1>
            <div>

                <h1>{activeMovie.title}</h1>
                <button onClick={() => handleVote(true)}>
                    👍 Like
                </button>

                <button onClick={() => handleVote(false)}>
                    👎 Dislike
                </button>

            </div>
        </div>

    )
}

export default Lobby