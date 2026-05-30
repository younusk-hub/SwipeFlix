import React from 'react'
import './HowItWorks.scss';

const HowItWorks = () => {
  return (
    <div className="how-it-works">
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
        </div>
  )
}

export default HowItWorks