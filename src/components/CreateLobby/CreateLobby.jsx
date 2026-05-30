import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { createLobby } from '../../services/api';
import Alert from '../Alert/Alert';
import './CreateLobby.scss';


const CreateLobby = () => {
    const navigate = useNavigate();
    const [lobbyCode, setLobbyCode] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    // need to at loading screen and error handling for lobby creation

    const handleCreateLobby = async () => {
        // Logic to create a lobby and generate a lobby code
        if (!playerName) {
            setAlertMessage("Please enter your name to create a lobby.");
            return;
        }
        const res = await createLobby(playerName);
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
            <button className="create-lobby-button" onClick={handleCreateLobby}>Create Lobby</button>
        </div>
    )
}

export default CreateLobby