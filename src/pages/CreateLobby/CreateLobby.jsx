import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const CreateLobby = () => {
    const navigate = useNavigate();
    const [lobbyCode, setLobbyCode] = useState('');


    const handleCreateLobby = () => {
        // Logic to create a lobby and generate a lobby code
        const newLobbyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setLobbyCode(newLobbyCode);
    }


    return (
        <div>
            <h1>Create Lobby</h1>
            <button onClick={handleCreateLobby}>Create Lobby</button>
            {lobbyCode && (
                navigate(`/lobby/${lobbyCode}`)
            )}
        </div>
    )
}

export default CreateLobby