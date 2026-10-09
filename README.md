# 📝 Smart Notes with AI

**Write smarter. Organize better. Learn together.**

Smart Notes with AI is a web application designed to help users create, manage, and summarize notes in one place. The project combines a simple React interface with a Node.js and Express backend, along with a JavaScript-based text summarization module.

This project was developed as a **hands-on learning exercise** to practise web development, Git, GitHub, collaborative coding, and frontend–backend integration.

## ✨ Features

- 📝 **Create Notes:** Add notes with a title and content.
- 📚 **View Notes:** Retrieve and display saved notes.
- 🧠 **Text Summarization:** Generate shorter versions of longer notes.
- 🔗 **API Integration:** Connect the frontend with backend REST APIs.
- 💻 **Interactive Interface:** Use a simple and user-friendly interface.

*Note: Features are being integrated and tested. Some functionality may not be available until development is complete.*

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

*The structure above represents the planned project layout. Additional files may be included as development progresses.*

## 🚀 Getting Started

### Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

npm is included with Node.js.

### 1. Clone the Repository

```bash
git clone https://github.com/UmaimahAfzal/Smart_Notes_GitProject_Practice.git
```

Navigate into the project directory:

```bash
cd Smart_Notes_GitProject_Practice
```

### 2. Start the Backend

Open a terminal in the project directory and run:

```bash
cd backend
npm install
npm start
```

The backend server runs at:

```text
http://localhost:5000
```

To verify that the server is running, open the address in your browser.

Expected response:

```text
Smart Notes with AI backend is running!
```

Keep this terminal open while using the application.

### 3. Start the Frontend

Open a second terminal in the project directory and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

The frontend must be configured to communicate with the backend API at `http://localhost:5000`.

## 🔌 Backend API

The backend currently supports the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/notes` | Retrieve saved notes |
| POST | `/notes` | Create a new note |
| POST | `/notes/:id/summarize` | Summarize a saved note |

*The summarization endpoint requires integration with the summarization module before it can be used.*

## 🎓 Learning Objectives

This project provides practical experience with:

- Building a frontend using React and Vite
- Developing backend APIs using Node.js and Express
- Understanding frontend–backend communication
- Organizing code into reusable JavaScript modules
- Using Git for version control
- Creating and managing a GitHub repository
- Practising commits, pushes, pulls, and collaborative workflows
- Integrating code developed by multiple people
- Testing and debugging a web application

## 🤝 GitHub Collaboration

An important goal of this project is to learn how developers collaborate using Git and GitHub.

During development, we practise:

- Sharing a repository with collaborators
- Organizing project files into folders
- Tracking changes using Git
- Saving progress through commits
- Pushing local changes to GitHub
- Pulling updates from a shared repository
- Combining frontend and backend code
- Managing integration issues during development

This workflow helps us understand how individual components can be developed separately and brought together into one application.

## 📌 Project Status

**Status: In Development 🚧**

The frontend, backend, and summarization module are being developed and integrated.

The current backend stores notes in memory, so saved notes are lost when the server restarts. Persistent database storage has not yet been implemented.

## 🔮 Future Improvements

Possible improvements include:

- Persistent storage for notes
- More advanced AI-powered summarization
- Search and filtering
- Editing and deleting notes
- User authentication
- Improved accessibility and user experience
- Additional testing and error handling

## 🎯 Project Goal

Our goal is to build a functional note-taking application while gaining practical experience in web development, API integration, version control, and collaborative software development.

---

**Built with ❤️ as a collaborative learning project.**