import React from 'react'

const Connect = () => {
    const handleCreateLobby = () => {
        // Logic to create a new lobby
    };

    const handleJoinLobby = () => {
        // Logic to join an existing lobby using the entered code
    }; 
  
    return (
    <div>
        
        <button>Create Lobby</button>  
        <p1>OR</p1>
        <input type="text" placeholder='Enter lobby code'></input>
        <button>Join Lobby</button>
 
    </div>
  )
}

export default Connect