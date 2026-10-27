# SkillSwap Hub — Cyber Space Edition (CA-3 Examination)

**PRN:** 25070521023  
**Course:** Full Stack Web Development (CA-3 Examination)

---

## 📌 Project Overview
**SkillSwap Hub — Cyber Space Edition** is a peer-to-peer skill marketplace featuring a dark aesthetic, space-theme navigation, glassmorphism UI cards, credit wallet system, and complete CRUD functionality.

---

## 🚀 Technology Stack
- **Frontend:** React.js, Vite, Tailwind CSS, React Router, Axios, Lucide Icons
- **Backend:** Node.js, Express.js, REST API, Mongoose
- **Database:** MongoDB, MongoDB Compass

---

## 📂 Folder Structure
```text
25070521023/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── README.md
```

---

## ⚙️ How to Run

### Step 1: Environment Setup
- `server/.env`:
  ```env
  PORT=5000
  MONGODB_URI=mongodb://127.0.0.1:27017/skillswap_db
  JWT_SECRET=super_secret_skillswap_jwt_key
  CLIENT_URL=http://localhost:5173
  ```
- `client/.env`:
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```

### Step 2: Install & Start
Open two VS Code terminals:

* **Terminal 1 (Backend):**
  ```bash
  cd server
  npm install
  npm run dev
  ```

* **Terminal 2 (Frontend):**
  ```bash
  cd client
  npm install
  npm run dev
  ```
