# Mini Social App

A simple full-stack social media application where users can create accounts, share posts with images, and manage their content through an easy-to-use interface.

Frontend Link:
https://mini-social-9tto4j4xg-tanay20.vercel.app/

Backend Link:
https://mini-social-app-backend-izry.onrender.com

## 🚀 Features

* 🔐 User Registration & Login
* 👤 User Authentication with JWT
* 📝 Create and publish posts
* 🖼️ Upload images from your device
* 🗑️ Delete your own posts
* ⋮ Three-dot menu for post actions
* 📱 Responsive and clean UI
* 🔒 Protected API routes
* 💾 MongoDB database integration

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer for image uploads

## 📂 Project Structure

```text
mini-social-app/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone "https://github.com/TaNaY963/mini-social-app.git"
cd mini-social-app
```

### 2. Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Start the backend

```bash
cd server
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will run on the Vite development URL shown in your terminal.

## 🔑 Authentication

Users can:

1. Register an account
2. Log in securely
3. Receive an authentication token
4. Access protected features such as creating and deleting posts

## 📸 Post Management

Authenticated users can:

* Create text-based posts
* Upload images directly from their device
* View posts in the social feed
* Open the three-dot menu on their own posts
* Delete their posts

## 🔮 Future Improvements

* ❤️ Like and unlike posts
* 💬 Comments
* 👥 Follow/unfollow users
* 🔔 Notifications
* 👤 User profiles
* 🔎 Search users and posts
* ☁️ Cloud image storage
* 🌙 Dark mode

## 👨‍💻 Author

**Tanay Pant**

B.Tech Computer Science & Engineering

### Technologies

`Java` `JavaScript` `React.js` `Node.js` `Express.js` `MongoDB` `Spring Boot` `REST APIs` `Git` `GitHub`
