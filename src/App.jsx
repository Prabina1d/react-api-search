import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
    );
  });

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">ReactApp</div>

        <div className="nav-links">
          <button
            className={activePage === "home" ? "active" : ""}
            onClick={() => setActivePage("home")}
          >
            Home
          </button>

          <button
            className={activePage === "about" ? "active" : ""}
            onClick={() => setActivePage("about")}
          >
            About
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        {activePage === "home" && (
          <>
            <h1>React API User Search</h1>

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {loading && <p>Loading...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && (
              <div className="users">
                {filteredUsers.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div className="card" key={user.id}>
                      <h2>{user.name}</h2>
                      <p>Email: {user.email}</p>
                      <p>Phone: {user.phone}</p>
                      <p>Website: {user.website}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}

        {activePage === "about" && (
          <div className="about">
            <h1>About Us</h1>

            <p>
              Welcome to ReactApp. This application fetches user data from an
              API and displays it in a simple and responsive interface.
            </p>

            <p>
              You can search users by their name or email using the search box
              on the Home page.
            </p>

            <h2>Technology Used</h2>

            <ul>
              <li>React</li>
              <li>Vite</li>
              <li>REST API</li>
              <li>Docker</li>
              <li>Docker Compose</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;