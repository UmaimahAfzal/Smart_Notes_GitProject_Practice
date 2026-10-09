# 📝 Smart Notes with AI

A simple web application designed to help users create, manage, and summarize their notes in one place.

Smart Notes with AI is a collaborative practice project built to explore frontend development, backend APIs, GitHub collaboration, and text summarization.

## ✨ Features

- 📝 Create notes with a title and content
- 📚 View saved notes
- 🧠 Summarize long notes into shorter text
- 🔗 Connect a frontend with a backend API
- 💻 Simple and user-friendly interface

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- CSS
- Vite

### Backend
- Node.js
- Express.js
- CORS

### Summarization
- JavaScript-based text summarization

### Development Tools
- Visual Studio Code
- Git
- GitHub

## 🏗️ Project Structure

```text
Smart_Notes_GitProject_Practice/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── index.html
├── backend/
│   ├── server.js
│   ├── summarizer.js
│   └── package.json
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following tools before running the project:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/UmaimahAfzal/Smart_Notes_GitProject_Practice.git
```

Navigate into the project directory:

```bash
cd Smart_Notes_GitProject_Practice
```

### 2. Run the Backend

Open a terminal and execute:

```bash
cd backend
npm install
npm start
```

The backend server runs at:

http://localhost:5000

To check whether the backend is running, open the address above in your browser.

You should see:

```text
Smart Notes with AI backend is running!
```

Keep the backend terminal running while using the application.

### 3. Run the Frontend

Open a second terminal in the project directory and execute:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

http://localhost:5173

The frontend must be configured to communicate with the backend at `http://localhost:5000`.

## 🔌 Backend API

The backend currently supports the following endpoints:

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/notes` | Retrieve saved notes |
| POST | `/notes` | Create a new note |
| POST | `/notes/:id/summarize` | Summarize a saved note |

**Note:** The summarization endpoint will be available after the summarization module is integrated into the backend.

## 👩‍💻 Team Contributions

### Umaimah Afzal
- Backend development using Node.js and Express.js
- API development and integration
- GitHub repository management

### Hafsah
- Frontend development using React
- User interface design
- Frontend and backend connectivity

### Farhana Maheen
- JavaScript-based text summarization module
- Summarization logic and testing

## 📌 Project Status

🚧 **Currently in Development**

The team is working on integrating the frontend, backend, and summarization module into one functional application.

Some features may not be available until integration and testing are complete.

## 🎯 Project Goal

To build a simple and user-friendly note-taking application that allows users to create notes, view saved content, and generate concise summaries through a connected frontend and backend.

## 🌱 Learning Objectives

This project provides hands-on experience with:

- React frontend development
- Node.js and Express.js backend development
- REST API communication
- JavaScript module integration
- Git and GitHub collaboration
- Team-based software development
- Application testing and debugging

## 🔮 Future Improvements

Potential improvements include:

- Persistent storage for notes
- More advanced AI-powered summarization
- Search and filter functionality
- Note editing and deletion
- User authentication
- Improved user experience and accessibility

## ❤️ Acknowledgements

Built collaboratively as a hands-on learning project to explore web development, teamwork, and application integration.

---

**Made with ❤️ by the Smart Notes with AI team.**