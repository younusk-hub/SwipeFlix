import React from 'react'
import { useParams } from 'react-router-dom';

const Lobby = () => {
    const lobbyId = useParams().lobbyId;


    return (
        <div>Lobby: {lobbyId}</div>
    )
}

export default Lobby