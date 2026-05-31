export const createLobby = async ( hostId, genres ) => {
    const res = await fetch("http://localhost:3001/create-lobby", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostId, genres }),
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

export const getMovies = async (lobbyId) => {
    const res = await fetch(`http://localhost:3001/get-movies?lobbyId=${lobbyId}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    return res.json();
};