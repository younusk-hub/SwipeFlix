import React from 'react'
import CreateLobby from '../CreateLobby/CreateLobby';
import JoinLobby from '../JoinLobby/JoinLobby';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
        <section className="welcome">
            <h1>
                Swipe<span className="highlight">Flix</span> 🎬
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
        
        <section className="how-it-works">

            <h2>How it works</h2>

            <div className="step">
                <div className="number">1</div>
                <div className="content">
                    <h3>Create a lobby</h3>
                    <p>Give your lobby a name</p>
                </div>
            </div>

            <div className="step">
                <div className="number">2</div>
                <div className="content">
                    <h3>Share the code</h3>
                    <p>Invite your friends</p>
                </div>
            </div>

            <div className="step">
                <div className="number">3</div>
                <div className="content">
                    <h3>Swipe movies together</h3>
                    <p>Like or skip movies</p>
                </div>
            </div>

            <div className="step">
                <div className="number">4</div>
                <div className="content">
                    <h3>Get a match!</h3>
                    <p>If everyone likes the same movie, it's a match 🍿</p>
                </div>
            </div>

        </section>
    </div>
  )
}

export default Home