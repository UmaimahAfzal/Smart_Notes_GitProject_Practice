import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [summarizingId, setSummarizingId] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
 const [profileOpen, setProfileOpen] = useState(false);
const [topProfileOpen, setTopProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Load notes from the backend.
  async function fetchNotes() {
    try {
      const response = await fetch(`${API_URL}/notes`);

      if (!response.ok) {
        throw new Error("Could not load notes.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("The backend returned an invalid notes list.");
      }

      setNotes(data);
      setError("");
    } catch {
      setError(
        "Unable to connect to the backend. You can still explore the dashboard."
      );
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // Navigate to a section.
  function navigateTo(sectionId) {
    setActiveSection(sectionId);
    setProfileOpen(false);

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Save a note.
  async function handleSaveNote(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!title.trim() || !content.trim()) {
      setError("Please enter both a note title and note content.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("The server could not save your note.");
      }

      const savedNote = await response.json();

      if (savedNote.id == null && savedNote._id == null) {
        throw new Error("The saved note is missing its ID.");
      }

      setNotes((previousNotes) => {
        const newId = String(savedNote.id ?? savedNote._id);

        const remainingNotes = previousNotes.filter(
          (note) => String(note.id ?? note._id) !== newId
        );

        return [savedNote, ...remainingNotes];
      });

      setTitle("");
      setContent("");
      setMessage("Your note has been saved successfully!");

      setActiveSection("notes");
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot reach the backend. Check that Ummi's server is running."
          : err.message || "Unable to save your note."
      );
    } finally {
      setLoading(false);
    }
  }

  // Generate a summary through the backend.
  async function handleSummarize(noteId) {
    if (noteId == null) {
      setError("This note does not have an ID.");
      return;
    }

    try {
      setSummarizingId(noteId);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/notes/${encodeURIComponent(noteId)}/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("The server could not generate a summary.");
      }

      const data = await response.json();

      if (typeof data.summary !== "string") {
        throw new Error("The server returned an invalid summary.");
      }

      setNotes((previousNotes) =>
        previousNotes.map((note) => {
          const currentId = note.id ?? note._id;

          return String(currentId) === String(noteId)
            ? { ...note, summary: data.summary }
            : note;
        })
      );

      setMessage("Summary generated successfully!");
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot reach the backend. Check the server and CORS settings."
          : err.message || "Unable to generate the summary."
      );
    } finally {
      setSummarizingId(null);
    }
  }

  // Filter notes by title or content.
  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();

    return `${note.title ?? ""} ${note.content ?? ""}`
      .toLowerCase()
      .includes(query);
  });

  const summaryCount = notes.filter(
    (note) => typeof note.summary === "string" && note.summary.trim()
  ).length;

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <button
          className="brand"
          type="button"
          onClick={() => navigateTo("home")}
          aria-label="Go to dashboard"
        >
          <span className="brand-icon">✳</span>

          <span className="brand-text">
            <strong>notely</strong>
            <small>YOUR SMART WORKSPACE</small>
          </span>
        </button>

        <p className="nav-label">WORKSPACE</p>

        <nav className="navigation" aria-label="Main navigation">
          <button
            className={`nav-item ${activeSection === "home" ? "active" : ""}`}
            onClick={() => navigateTo("home")}
            type="button"
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className={`nav-item ${activeSection === "notes" ? "active" : ""}`}
            onClick={() => navigateTo("notes")}
            type="button"
          >
            <span>▤</span>
            My Notes
          </button>

          <button
            className={`nav-item ${
              activeSection === "summaries" ? "active" : ""
            }`}
            onClick={() => navigateTo("summaries")}
            type="button"
          >
            <span>✧</span>
            AI Summaries
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="tip-icon">✦</div>

          <strong>A little note of wisdom</strong>

          <p>
            Great ideas start with a single thought. Save yours today.
          </p>

          <span className="sidebar-decoration">✳</span>
        </div>

        {/* PROFILE */}
        <div className="profile-container">
          {profileOpen && (
            <div className="profile-menu">
              <button
                type="button"
                onClick={() => navigateTo("home")}
              >
                <span>▦</span> Dashboard
              </button>

              <button
                type="button"
                onClick={() => navigateTo("create-note")}
              >
                <span>✎</span> Create a note
              </button>

              <button
                type="button"
                onClick={() => navigateTo("notes")}
              >
                <span>▤</span> My notes
              </button>

              <button
                type="button"
                onClick={() => setProfileOpen(false)}
              >
                <span>×</span> Close menu
              </button>
            </div>
          )}

          <button
            className="profile"
            type="button"
            onClick={() => setProfileOpen((previous) => !previous)}
            aria-expanded={profileOpen}
            aria-label="Toggle workspace profile menu"
          >
            <span className="avatar">S</span>

            <span className="profile-info">
              <strong>My Workspace</strong>
              <small>Personal notes</small>
            </span>

            <span className="profile-dots">•••</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content" id="home">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>Dashboard</strong>
          </div>

          <div className="topbar-right">
            <span className="online-dot"></span>
            <span>Ready to capture ideas</span>
          <div className="top-profile-container">
  <button
    type="button"
    className="top-avatar"
    aria-label="Open workspace profile"
    aria-expanded={topProfileOpen}
    onClick={() => setTopProfileOpen((previous) => !previous)}
  >
    S
  </button>

  {topProfileOpen && (
    <div className="top-profile-menu">
      <strong>My Workspace</strong>

      <button
        type="button"
        onClick={() => {
          setTopProfileOpen(false);
          navigateTo("home");
        }}
      >
        Dashboard
      </button>

      <button
        type="button"
        onClick={() => {
          setTopProfileOpen(false);
          navigateTo("create-note");
        }}
      >
        Create a Note
      </button>

      <button
        type="button"
        onClick={() => {
          setTopProfileOpen(false);
          navigateTo("notes");
        }}
      >
        My Notes
      </button>

      <button
        type="button"
        onClick={() => setTopProfileOpen(false)}
      >
        Close Menu
      </button>
    </div>
  )}
</div>
          </div>
        </header>

        <div className="dashboard">
          {/* WELCOME */}
          <section className="welcome-section">
            <div className="welcome-text-block">
              <p className="eyebrow">YOUR PERSONAL THINKING SPACE</p>

              <h1>
                Ideas worth keeping<span>.</span>
              </h1>

              <p className="welcome-copy">
                A little space for your big thoughts. Write, save, and
                let AI help you find the important bits.
              </p>

              <button
                className="welcome-button"
                type="button"
                onClick={() => navigateTo("create-note")}
              >
                Create a note <span>↗</span>
              </button>
            </div>

            <div className="welcome-art" aria-hidden="true">
              <div className="art-sun"></div>
              <div className="art-paper paper-back"></div>

              <div className="art-paper paper-front">
                <span></span>
                <span></span>
                <span></span>
                <i>✦</i>
              </div>

              <div className="art-star star-one">✳</div>
              <div className="art-star star-two">✦</div>
            </div>
          </section>

          {/* STATISTICS */}
          <section className="stats-row">
            <article className="stat-card">
              <div className="stat-icon lavender">▤</div>

              <div>
                <p>Total notes</p>
                <h2>{notes.length}</h2>
              </div>

              <span className="stat-decoration">↗</span>
            </article>

            <article className="stat-card">
              <div className="stat-icon peach">✧</div>

              <div>
                <p>AI summaries</p>
                <h2>{summaryCount}</h2>
              </div>

              <span className="stat-decoration">✦</span>
            </article>

            <article className="stat-card">
              <div className="stat-icon mint">✎</div>

              <div>
                <p>Workspace</p>
                <h2 className="workspace-status">Looking good</h2>
              </div>

              <span className="status-pill">ACTIVE</span>
            </article>
          </section>

          {/* CREATE NOTE */}
          <section className="editor-card" id="create-note">
            <div className="section-title">
              <div className="title-icon">✎</div>

              <div>
                <h2>Create a new note</h2>
                <p>Every brilliant idea starts somewhere.</p>
              </div>
            </div>

            <form onSubmit={handleSaveNote}>
              <label htmlFor="note-title">Give your note a title</label>

              <input
                id="note-title"
                type="text"
                placeholder="e.g. Operating Systems — quick revision"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={120}
              />

              <div className="content-label-row">
                <label htmlFor="note-content">Your thoughts</label>

                <span>{content.length} characters</span>
              </div>

              <textarea
                id="note-content"
                placeholder="Start writing here... capture an idea, save a lesson, or jot down something you don't want to forget."
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={5}
              />

              <div className="editor-footer">
                <p>
                  <span>✦</span> Your ideas, all in one place.
                </p>

                <button
                  className="primary-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Note"}
                  {!loading && <span>↗</span>}
                </button>
              </div>
            </form>
          </section>

          {/* MESSAGES */}
          {(message || error) && (
            <div className="feedback-area" aria-live="polite">
              {message && (
                <p className="success-message" role="status">
                  <span>✓</span> {message}
                </p>
              )}

              {error && (
                <p className="error-message" role="alert">
                  <span>!</span> {error}
                </p>
              )}
            </div>
          )}

          {/* NOTES */}
          <section className="notes-section" id="notes">
            <div className="notes-heading">
              <div>
                <p className="eyebrow">YOUR KNOWLEDGE LIBRARY</p>

                <h2>
                  My notes <span>✳</span>
                </h2>

                <p className="notes-subtitle">
                  Little thoughts that add up to big things.
                </p>
              </div>

              <div className="notes-tools">
                <label className="search-box">
                  <span>⌕</span>

                  <input
                    type="search"
                    placeholder="Find a note..."
                    aria-label="Search notes"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>

                <button
                  className="refresh-button"
                  type="button"
                  onClick={fetchNotes}
                  title="Refresh notes"
                  aria-label="Refresh notes"
                >
                  ↻
                </button>
              </div>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-art">
                  <span>✎</span>
                  <i>✦</i>
                </div>

                <h3>
                  {search ? "No notes found" : "Your story starts here"}
                </h3>

                <p>
                  {search
                    ? "Try a different search term."
                    : "Your saved notes will appear here. Add your first thought above!"}
                </p>

                {!search && (
                  <button
                    className="empty-button"
                    type="button"
                    onClick={() => navigateTo("create-note")}
                  >
                    Create your first note <span>↗</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="notes-grid">
                {filteredNotes.map((note, index) => {
                  const noteId = note.id ?? note._id;

                  const isSummarizing =
                    String(summarizingId) === String(noteId);

                  return (
                    <article
                      className={`note-card note-tone-${index % 3}`}
                      key={noteId ?? `${note.title}-${index}`}
                    >
                      <div className="note-card-top">
                        <span className="note-type">
                          <span>✎</span> NOTE
                        </span>

                        <span className="note-sparkle">✦</span>
                      </div>

                      <h3>{note.title}</h3>

                      <p className="note-preview">{note.content}</p>

                      {note.summary && (
                        <div className="summary-box">
                          <div className="summary-heading">
                            <span>✧</span>
                            <strong>AI Summary</strong>
                          </div>

                          <p>{note.summary}</p>
                        </div>
                      )}

                      <div className="note-card-footer">
                        <span className="saved-label">
                          <span>●</span> Saved note
                        </span>

                        <button
                          className="summary-button"
                          type="button"
                          disabled={
                            summarizingId !== null ||
                            noteId == null
                          }
                          onClick={() => handleSummarize(noteId)}
                        >
                          {isSummarizing
                            ? "Generating..."
                            : note.summary
                              ? "Regenerate summary ↗"
                              : "Generate summary ↗"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* AI SUMMARIES */}
          <section className="summaries-section" id="summaries">
            <div className="notes-heading">
              <div>
                <p className="eyebrow">YOUR IMPORTANT TAKEAWAYS</p>

                <h2>
                  AI summaries <span>✧</span>
                </h2>

                <p className="notes-subtitle">
                  Review the important information from your notes.
                </p>
              </div>
            </div>

            {notes.filter(
              (note) => typeof note.summary === "string" && note.summary.trim()
            ).length === 0 ? (
              <div className="summary-empty">
                <span>✧</span>

                <div>
                  <h3>No summaries yet</h3>
                  <p>
                    Open one of your saved notes and select Generate
                    Summary to see the result here.
                  </p>
                </div>

                <button
                  type="button"
                  className="summary-button"
                  onClick={() => navigateTo("notes")}
                >
                  View notes ↗
                </button>
              </div>
            ) : (
              <div className="summary-list">
                {notes
                  .filter(
                    (note) =>
                      typeof note.summary === "string" &&
                      note.summary.trim()
                  )
                  .map((note) => (
                    <article
                      className="summary-list-card"
                      key={note.id ?? note._id}
                    >
                      <span className="summary-list-icon">✧</span>

                      <div>
                        <h3>{note.title}</h3>
                        <p>{note.summary}</p>
                      </div>

                      <button
                        type="button"
                        className="text-button"
                        onClick={() => navigateTo("notes")}
                      >
                        View note ↗
                      </button>
                    </article>
                  ))}
              </div>
            )}
          </section>

          <footer className="page-footer">
            <span>✳</span> Made for curious minds.
            <span className="footer-right">
              Think it. Note it. Keep it.
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;