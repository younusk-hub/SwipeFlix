import React from 'react'
import CreateLobby from '../CreateLobby/CreateLobby';

const Home = () => {
  return (
    <div>
        <section className="home-description">
            <h1>Welcome to SwipeFlix 🎬</h1>
            <p>
                SwipeFlix helps you and your friends, family, or partner decide what to watch
                without endless scrolling.
            </p>
            <p>
                Create a lobby, share the code, and start swiping through movies and shows
                together. Swipe right if you would watch it, or swipe left if you would skip it.
            </p>
            <p>
                When everyone likes the same movie, you get a match! 🍿
            </p>
        </section>

        <section className="createlobby"> 
            <CreateLobby />
        </section>


    </div>
  )
}

export default Home