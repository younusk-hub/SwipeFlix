import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { joinLobby } from '../../services/api';

const JoinLobby = () => {
    const navigate = useNavigate();
    const [lobbyCode, setLobbyCode] = useState('');
    const [userId, setUserId] = useState('');
    // need to at loading screen and error handling for lobby joining

    const handleJoinLobby = async () => {
        if (!lobbyCode || !userId) {
            alert("Please enter both the lobby code and your name to join a lobby.");
            return;
        }
        const res = await joinLobby(lobbyCode, userId);
        console.log(res);
        if (res.success) {
            navigate(`/lobby/${lobbyCode}`);
        } else {
            alert("Failed to join lobby. Please check the lobby code and try again.");
        }
    }

    return (
        <div>
            <h1>Join Lobby</h1>
            <button onClick={handleJoinLobby}>Join Lobby</button>
            <input
                type="text"
                placeholder="Enter your Lobby Code"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter your Name to Join"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
        </div>
    )
}

export default JoinLobby