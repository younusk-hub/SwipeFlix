import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { joinLobby } from '../../services/api';
import Alert from '../Alert/Alert';
import './JoinLobby.scss';

const JoinLobby = () => {
    const navigate = useNavigate();
    const [lobbyCode, setLobbyCode] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // need to at loading screen and error handling for lobby joining

    const handleJoinLobby = async () => {
        if (!lobbyCode || !playerName) {
            setAlertMessage("Please enter both the lobby code and your name to join a lobby.");
            return;
        }
        setLoading(true);
        const res = await joinLobby(lobbyCode.toLowerCase(), playerName);
        setLoading(false);
        console.log(res);
        if (res.success) {
            localStorage.setItem("playerName", playerName);
            console.log(localStorage.getItem("playerName"));
            navigate(`/lobby/${lobbyCode.toLowerCase()}`);
        } else {
            setAlertMessage(res.message || "Failed to join lobby. Please check the lobby code and try again.");
        }
    }

    if (loading) {
        return <div className="loading">Joining lobby...</div>;
    }

    return (
        <div className="join-lobby">
            <h2>Join a Lobby</h2>
            <Alert message={alertMessage} />
            <input
                type="text"
                placeholder="Enter your Lobby Code"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter your Name to Join"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <button className="join-lobby-button" onClick={handleJoinLobby}>Join Lobby</button>
        </div>
    )
}

export default JoinLobby