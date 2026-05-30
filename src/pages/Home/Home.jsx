import React from 'react'
import CreateLobby from '../../components/CreateLobby/CreateLobby';
import JoinLobby from '../../components/JoinLobby/JoinLobby';
import Alert from '../../components/Alert/Alert';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import './Home.scss';

const Home = () => {


  return (
    <div className="home">
        <section className="welcome">
            <h1>
                <span className="highlight">Swipe</span>Flix 🎬
            </h1>

            <p className="tagline">
                Find what everyone wants to watch.
            </p>
            <p>
                Create a lobby, invite your friends, swipe on movies and get a match!🍿
                
            </p>
        </section>

        <section className="actions">
            <div>
                <CreateLobby />
            </div>
            <span className="divider">OR</span>
            <div>
                <JoinLobby />
            </div>
        </section>
        
        <section>
            <HowItWorks />
        </section>
    </div>
  )
}

export default Home