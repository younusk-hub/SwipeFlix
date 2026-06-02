

export const createLobby = async ( hostId, genres ) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL_DEV}/create-lobby`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostId, genres }),
    });
    return res.json();
};

export const submitVote = async (data) => {
    await fetch(`${import.meta.env.VITE_API_URL_DEV}/vote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const joinLobby = async (lobbyId, userId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL_DEV}/join-lobby`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ lobbyId, userId }),
    });
    return res.json();
};

export const getMovies = async (lobbyId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL_DEV}/get-movies?lobbyId=${lobbyId}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    return res.json();
};

export const completedList = async (lobbyId, userId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL_DEV}/completed-list?lobbyId=${lobbyId}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ lobbyId, userId }),
    });
    return res.json();
};