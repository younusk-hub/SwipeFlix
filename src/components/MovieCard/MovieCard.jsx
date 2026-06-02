import React from 'react'
import { motion, AnimatePresence } from "motion/react";
import './MovieCard.scss';

const MovieCard = ({ activeMovie, handleVote, pulse }) => {
    const isSwipeable = !!handleVote;

    return (
        <div className="movie-card">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeMovie.id}
                    className="movie-card"
                    drag={isSwipeable ? "x" : false}
                    onDragEnd={(event, info) => {
                         if (!isSwipeable) return;
                        if (info.offset.x > 150) {
                            handleVote(true);
                        }
                        if (info.offset.x < -150) {
                            handleVote(false);
                        }
                    }}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    animate={pulse ? { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] } : { scale: 1, opacity: 1 }}
                    transition={pulse ? { duration: 2, repeat: Infinity } : { duration: 0.5 }}
                >
                    <div className="movie-poster">
                        <img
                            src={activeMovie.posterUrl}
                            alt={activeMovie.title}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="movie-info">
                <h1 className="movie-title">
                    {activeMovie.title}
                </h1>

                <p className="movie-meta">
                    {activeMovie.releaseYear} • {activeMovie.rating?.toFixed(1)} / 10
                </p>

                <p className="movie-description">
                    {activeMovie.overview}
                </p>

                <div className="genre-list">
                    {activeMovie.genres?.map((genre) => (
                        <span
                            key={genre}
                            className="genre"
                        >
                            {genre}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieCard