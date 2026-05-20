import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { createLobby } from '../../services/api';


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
        <div>
            <h1>Create Lobby</h1>
            <button onClick={handleCreateLobby}>Create Lobby</button>
            <input
                type="text"
                placeholder="Enter your name"
                value={hostId}
                onChange={(e) => setHostId(e.target.value)}
            />
            {/* {lobbyCode && (
                <div>
                    <p>Lobby Code: {lobbyCode}</p>
                    <button onClick={() => navigate(`/lobby/${lobbyCode}`)}>Go to Lobby</button>
                </div>
            )} */}
        </div>
    )
}

export default CreateLobby