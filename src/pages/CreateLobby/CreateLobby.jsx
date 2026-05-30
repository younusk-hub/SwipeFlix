import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { createLobby } from '../../services/api';
import './CreateLobby.scss';


const CreateLobby = () => {
    const navigate = useNavigate();
    const [lobbyCode, setLobbyCode] = useState('');
    const [hostId, setHostId] = useState('');
    // need to at loading screen and error handling for lobby creation

    const handleCreateLobby = async () => {
        // Logic to create a lobby and generate a lobby code
        if (!hostId) {
            alert("Please enter your name to create a lobby.");
            return;
        }
        const res = await createLobby(hostId);
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
            <h2>Create Lobby</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={hostId}
                onChange={(e) => setHostId(e.target.value)}
            />
            <button className="create-lobby-button" onClick={handleCreateLobby}>Create Lobby</button>
        </div>
    )
}

export default CreateLobby