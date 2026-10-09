# 📝 Smart Notes with AI

**Write smarter. Organize better. Learn together.**

Smart Notes with AI is a web application that allows users to create, manage, search, and summarize notes in one place.

The application combines a React frontend with a Node.js and Express backend. It also includes a JavaScript-based extractive summarization module that identifies important sentences from the original note and produces a shorter version.

This project was developed as a **hands-on learning exercise** to practise web development, Git, GitHub, collaborative coding, and frontend–backend integration.

## ✨ Features

- 📝 **Create Notes:** Add notes with a title and content.
- 📚 **View Notes:** Display saved notes in the dashboard.
- 🔍 **Search Notes:** Find notes by searching their titles or content.
- 🧠 **Text Summarization:** Generate concise summaries of longer notes.
- 🔗 **REST API Integration:** Connect the frontend with backend endpoints.
- 💬 **Feedback Messages:** Display success and error messages during interactions.
- 💻 **Interactive Dashboard:** Navigate between notes and summaries through a user-friendly interface.

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
- JavaScript-based extractive summarization

### Development Tools
- Visual Studio Code
- Git
- GitHub

## 🏗️ Project Structure

```text
Smart_Notes_GitProject_Practice/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
├── backend/
│   ├── server.js
│   ├── summarizer.js
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following tools:

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

Open a terminal in the project directory:

```bash
cd backend
npm install
npm start
```

The backend server runs at:

```text
http://localhost:5000
```

To check whether the server is running, open that address in your browser.

Expected response:

```text
Smart Notes with AI backend is running!
```

Keep the backend terminal running while using the application.

### 3. Start the Frontend

Open a second terminal in the project directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

The frontend communicates with the backend at `http://localhost:5000`.

Keep both terminals running while using the application.

## 🔌 Backend API

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/notes` | Retrieve saved notes |
| POST | `/notes` | Create a new note |
| POST | `/notes/:id/summarize` | Generate a summary for a saved note |

### Example: Create a Note

Request:

```json
{
  "title": "Operating Systems",
  "content": "An operating system manages computer hardware and software resources. It also manages memory and processes."
}
```

Endpoint:

```text
POST /notes
```

### Example: Generate a Summary

Endpoint:

```text
POST /notes/:id/summarize
```

Example response:

```json
{
  "summary": "An operating system manages computer hardware and software resources."
}
```

The actual summary depends on the content of the note.

## 🧠 How Summarization Works

The application uses a basic extractive summarization technique.

The summarizer:

1. Splits the note into individual sentences.
2. Counts meaningful words while excluding common stop words.
3. Scores sentences using word frequencies.
4. Selects sentences with higher scores.
5. Returns the selected sentences in their original order.

This implementation uses JavaScript without an external AI service or API key.

It is a basic text summarization method rather than a generative AI model.

## 🎓 Learning Objectives

This project provided practical experience with:

- Building a React frontend using Vite
- Developing REST APIs using Node.js and Express
- Understanding frontend–backend communication
- Creating and importing reusable JavaScript modules
- Connecting a summarization function to a backend API
- Using Git for version control
- Creating and managing a GitHub repository
- Making commits and pushing code
- Pulling updates from a shared repository
- Reviewing and merging pull requests
- Collaborating through GitHub branches
- Integrating independently developed components
- Testing and debugging a complete application

## 🤝 GitHub Collaboration

An important goal of this project was to learn how developers collaborate using Git and GitHub.

During development, we practised:

- Sharing a repository with collaborators
- Organizing code into frontend and backend folders
- Tracking changes using Git
- Saving progress through commits
- Pushing changes to GitHub
- Pulling updates from a shared repository
- Creating and reviewing pull requests
- Merging changes into the main branch
- Integrating code developed by different team members
- Testing the combined application

This experience helped us understand how separately developed components can be brought together into one working application.

## 📌 Project Status

**Status: Integrated and Tested ✅**

The frontend, backend, and summarization module have been integrated.

The application has been tested for note creation and summary generation.

## ⚠️ Current Limitations

- Notes are stored in memory and are lost when the backend server restarts.
- The summarization feature uses a basic extractive algorithm rather than a generative AI model.
- The application does not currently include user authentication or persistent database storage.

## 🔮 Future Improvements

Possible improvements include:

- Persistent database storage for notes
- More advanced AI-powered summarization
- Editing and deleting notes
- User authentication
- Improved error handling and validation
- Additional automated tests
- Further improvements to accessibility and user experience

## 🎯 Project Goal

The goal of Smart Notes with AI is to provide a simple note-taking and summarization application while gaining practical experience in full-stack development, API integration, version control, and collaborative software development.

---

**Built with ❤️ as a collaborative learning project.**