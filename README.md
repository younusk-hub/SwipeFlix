🎬 SwipeFlix

swipe-flix-rho.vercel.app

A fun, interactive web app that helps groups decide what to watch together — no more endless scrolling or arguing on movie night.

Users join a shared lobby and swipe yes/no on movies and TV shows (like a dating app).
When everyone likes the same title… 🎉 it’s a match!

⸻

🚀 Features

* 🔗 Lobby System
    * Create or join a room using a unique code
    * Designed for couples, friends, or groups
* 🎯 Swipe-Based Matching
    * Swipe right 👍 = Interested
    * Swipe left 👎 = Not interested
    * Clean Tinder-style UI
* 🤝 Group Matching Logic
    * Detects when all users like the same movie
    * Displays a “MATCH” result instantly
* ⚙️ Custom Game Settings (Host)
    * Select genres (e.g. Action, Comedy, Horror)
    * Set number of participants
    * Filter by release year / popularity
    * Time limits for decision rounds
* 🧠 Smart Fallback
    * If no full match:
        * App calculates the closest match
        * Based on highest shared likes across users

⸻

🛠️ Tech Stack

Frontend

* React
* JavaScript (ES6+)
* SCSS

Backend (planned)

* Node.js + Express

Database

* Firebase Firestore

APIs

* Movie data API (e.g. TMDB)

Deployment (planned)

* Vercel (Frontend)
* Firebase / Render (Backend)

⸻

🧱 Architecture Overview

* Client (React) handles UI + swipe interactions
* Backend manages:
    * Lobby creation
    * User sessions
    * Match logic
* Firebase stores:
    * Lobbies
    * Users
    * Swipe decisions

⸻

🗄️ Database Schema (Firebase - simplified)

lobbies: {
  lobbyId: {
    hostId: "user123",
    settings: {
      genres: ["Action", "Comedy"],
      maxUsers: 4,
      timeLimit: 60
    },
    users: ["user1", "user2"],
    movies: ["movie1", "movie2"],
    swipes: {
      user1: { movie1: true, movie2: false },
      user2: { movie1: true, movie2: true }
    },
    match: "movie1"
  }
}

⸻

🧠 How Matching Works

1. Each user swipes on the same set of movies
2. App collects all swipe data
3. Logic checks:
    * If all users liked the same movie → ✅ MATCH
4. If no match:
    * Calculate highest overlap score
    * Return best possible option


🌍 Future Improvements

* 🔐 Authentication (Firebase Auth)
* 💬 Real-time chat in lobby
* 🎥 Trailer previews
* 🧠 AI recommendations based on group taste
* 📱 Mobile-first optimisation
* 🎯 Swipe animations + haptics
* 📊 Analytics (most picked genres, etc.)

⸻

🎯 Goal of the Project

This project is built to:

* Practice full-stack development
* Learn real-time interactions
* Improve UI/UX design skills
* Build something genuinely fun and useful

⸻

🤝 Contributing

Open to ideas, feedback, and improvements.

⸻

📄 License

MIT License

⸻
