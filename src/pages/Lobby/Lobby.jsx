import { React , useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { getMovies, submitVote } from '../../services/api';
import { motion, AnimatePresence } from "motion/react";
import './Lobby.scss';

const Lobby = () => {
    const navigate = useNavigate();
    const lobbyId = useParams().lobbyId;
    const [lobbyData, setLobbyData] = useState({});
    const [copyCode, setCopyCode] = useState(false);

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
        return <div>Waiting for other players...</div>;
    }

    return (
        <div className="lobby">
            <div className="lobby__content">

                <div className="lobby-code">
                    <p className="lobby-code__label">
                        <span>Lobby Code</span>
                        <span>Players: {numberOfPlayers}</span>
                    </p>

                    <div className="lobby-code__header">
                        <h2 className="lobby-code__value">
                            {lobbyId.toUpperCase()}
                        </h2>

                        <button className="lobby-code__copy-btn"
                            onClick={() => {
                                navigator.clipboard.writeText(lobbyId.toUpperCase());
                                setCopyCode(true);
                                setTimeout(() => setCopyCode(false), 2000);
                            }}
                        >
                            {copyCode ? "Copied!" : "Copy Code"}
                        </button>
                    </div>

                    <p>
                        Share this code with your friends!
                    </p>
                </div>

                <div className="movie-card">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMovie.id}
                            className="movie-card"
                            drag="x"
                            onDragEnd={(event, info) => {
                                if (info.offset.x > 150) {
                                    handleVote(true);
                                }
                                if (info.offset.x < -150) {
                                    handleVote(false);
                                }
                            }}
                        >
                            <div className="movie-poster">
                                <img
                                    src={activeMovie.posterUrl}
                                    alt={activeMovie.title}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="movie-info">
                        <h1 className="movie-title">
                            {activeMovie.title}
                        </h1>

                        <p className="movie-meta">
                            {activeMovie.releaseYear} • {activeMovie.rating?.toFixed(1)} / 10
                        </p>

                        <p className="movie-description">
                            {activeMovie.overview}
                        </p>

                        <div className="genre-list">
                            {activeMovie.genres?.map((genre) => (
                                <span
                                    key={genre}
                                    className="genre"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
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