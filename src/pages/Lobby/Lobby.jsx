import { React , useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const Lobby = () => {
    const navigate = useNavigate();
    const lobbyId = useParams().lobbyId;
    const [movies, setMovies] = useState([]);
    const [lobbyData, setLobbyData] = useState({});
    

    useEffect(() => {
        console.log("LISTENER CREATED");
        const unsub = onSnapshot(
            doc(db, "lobbies", lobbyId),
            (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();

                    console.log(data);

                    setLobbyData(data);

                    // match detected
                    if (data.status === "matched") {
                        navigate(`/lobby/${lobbyId}/match/${data.match}`);
                    }
                }
                console.log("SNAPSHOT FIRED");
            }
        );
        return () => {
            unsub()
            console.log("LISTENER REMOVED");
        };
    }, [lobbyId]);

    return (
        <div>Lobby: {lobbyId}
            <ul>
                
            </ul>
        </div>

    )
}

export default Lobby