import { React, useState } from 'react'
import './LobbyCode.scss';

const LobbyCode = ({ lobbyId, numberOfPlayers }) => {
    const [copyCode, setCopyCode] = useState(false);

    return (
        <div className="lobby-code">
            <p className="lobby-code__label">
                <span>Lobby Code</span>
                <span>Players: {numberOfPlayers}</span>
            </p>

            <div className="lobby-code__header">
                <h2 className="lobby-code__value">
                    {lobbyId.toUpperCase()}
                </h2>

                <button className="lobby-code__copy-btn"
                    onClick={() => {
                        navigator.clipboard.writeText(lobbyId.toUpperCase());
                        setCopyCode(true);
                        setTimeout(() => setCopyCode(false), 2000);
                    }}
                >
                    {copyCode ? "Copied!" : "Copy Code"}
                </button>
            </div>

            <p>
                Share this code with your friends!
            </p>
        </div>
    )
}

export default LobbyCode