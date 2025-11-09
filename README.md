
# Tic Tac Toe — React + WebSocket

**Real-time multiplayer Tic-Tac-Toe built with React (Vite) and Node.js + WebSocket**

> Lightweight, fast, and easy-to-understand Tic-Tac-Toe app with three play modes:
>
> 1. **Vs Computer** — single-player against a computer with random moves.
> 2. **Vs Friends** — two players on the same device.
> 3. **Online** — real-time multiplayer matchmaking and play using WebSockets.

---

## Features

* Clean, minimal UI built with React + Vite.
* Three playable modes: local, single-player (AI), and online multiplayer.
* Real-time synchronization of game state via WebSocket (server-authoritative moves).
* Simple matchmaking for online games (create/join or random pairing).
* Move validation.
* Friendly, readable code ready for learning.

---

## Tech stack

**Frontend**

* React (Vite)
* Tailwind CSS

**Backend**

* Node.js
* Express (CORS enabled)
* WebSocket server (native `ws`)
* nodemon for development

**Dev tools**

* Git/GitHub

---

## Project structure (example)

```
root/               # React (Vite) app
├─ src/
├─ public/
├─ src/
├─ package.json
├─ backend/                 # Node + Express + WebSocket
│  ├─ src/
│  └─ package.json
├─ .gitignore
└─ README.md
```

---

## Getting started (development)

> Make sure you have Node.js (v14+) and npm/yarn installed.

### 1) Clone the repo

```bash
git clone https://github.com/sahil0028/tic_tac_toe.git
```

### 2) Install dependencies

```bash
# Frontend
npm install
npm run dev

# Backend (in new terminal)
cd ./backend
npm install
npm start
```

### 3) Run in development

```bash
# Start backend (from /server)
npm start        # nodemon or similar

# Start frontend (from /client)
npm run dev        # Vite dev server
```

Open the client URL shown by Vite (`http://localhost:5173`).

---

---

## WebSocket message schema (recommended)

Use explicit `type` keys so messages are easy to handle:

```json

{ "type": "init_game", "payload": { "color":"O" } }
{ "type": "move", "payload": { "move": "abc", "board": [[],[],[]],"turn":"You","moves":"123", } }
{ "type": "finish", "payload": { "winner": "You", "board": [[],[],[]]} }
{ "type": "draw", "payload": { "winner":"none","board":[[],[],[]] } }
```

---

## Vs Computer

* Computer does a random move from the remaining valid moves.

---

## Deployment tips

* Build the client (`npm run build`) and serve it from the Node/Express server for a single deploy.
* Or deploy frontend separately to Vercel / Netlify and backend to Render / Railway / Heroku.
* Ensure `CLIENT_ORIGIN`/CORS and WebSocket endpoint URLs are set correctly for production.
* If you use reverse proxies (NGINX), configure `Upgrade` headers for WebSocket passthrough.

---

## Testing and debugging

* Use browser devtools to inspect WebSocket frames and console logs.
* Add server logging for connections / disconnections and invalid moves.

---

## Security & stability notes

* Always validate moves server-side.

---

## Contributing

1. Fork the repo
2. Create a branch (`feature/my-feature`)
3. Make changes and add tests if possible
4. Open a PR with a clear description

---

## Example resume bullets

* Built a **real-time multiplayer Tic-Tac-Toe** web app using **React (Vite)** and **Node.js + WebSocket**; implemented matchmaking, authoritative game state, and an AI opponent.
* Designed and documented the WebSocket protocol and ensured server-side move validation and reconnection handling.

You can copy one of these to your resume and append any deployment link (if available).

---

## License

This project is free to use — example: **MIT License**. Add a `LICENSE` file to the repo.

---

## Author / Contact

GitHub: `https://github.com/sahil0028`

---

### Notes

* Replace placeholders like `<sahil0028>`, repo name and contact details before publishing.
---

*Enjoy building — and good luck with interviews!*


