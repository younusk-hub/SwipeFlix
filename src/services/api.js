export const createLobby = async ( hostId ) => {
    const res = await fetch("http://localhost:3001/create-lobby", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostId }),
    });
    return res.json();
};

export const submitVote = async (data) => {
    await fetch("http://localhost:3001/vote", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const joinLobby = async (lobbyId, userId) => {
    const res = await fetch("http://localhost:3001/join-lobby", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ lobbyId, userId }),
    });
    return res.json();
};