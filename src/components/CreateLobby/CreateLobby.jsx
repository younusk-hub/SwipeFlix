import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { createLobby } from '../../services/api';
import Alert from '../Alert/Alert';
import './CreateLobby.scss';

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10749, name: "Romance" },
];

const CreateLobby = () => {
    const navigate = useNavigate();
    const [lobbyCode, setLobbyCode] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);

    // need to at loading screen and error handling for lobby creation

    const handleCreateLobby = async () => {
        // Logic to create a lobby and generate a lobby code
        
        if (!playerName) {
            setAlertMessage("Please enter your name to create a lobby.");
            return;
        }
        if (selectedGenres.length === 0) {
            setAlertMessage("Please select at least one genre to create a lobby.");
            return;
        }
        const res = await createLobby(playerName, selectedGenres);
        if (!res.success) {
            setAlertMessage("Failed to create lobby. Please try again.");
            return;
        }
        localStorage.setItem("playerName", playerName);
        console.log(localStorage.getItem("playerName"));
        console.log(res);
        setLobbyCode(res.lobbyId);
    }

    useEffect(() => {
        console.log(lobbyCode);
        if (lobbyCode) {
            navigate(`/lobby/${lobbyCode}`);
        }
    }, [lobbyCode]);

    const toggleGenreSelection = (genreId) => {
        if (selectedGenres.includes(genreId)) {
            setSelectedGenres(selectedGenres.filter(id => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    }

    return (
        <div className="create-lobby">
            <h2>Create a Lobby</h2>
            <Alert message={alertMessage} />
            <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <div className="genres">
                {genres.map(genre => (
                    <div
                        key={genre.id}
                        className={`genre ${selectedGenres.includes(genre.id) ? 'selected' : ''}`}
                        onClick={() => toggleGenreSelection(genre.id)}
                    >
                        {genre.name}
                    </div>
                ))}
            </div>
            <button className="create-lobby-button" onClick={handleCreateLobby}>Create Lobby</button>
        </div>
    )
}

export default CreateLobby