import { useEffect, useState } from "react";
import "./App.css";

import MapView from "./components/MapView";

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
        <div className="logo">
          ReactApp
        </div>

        <div className="nav-links">
          <button
            className={activePage === "home" ? "active" : ""}
            onClick={() => setActivePage("home")}
          >
            Home
          </button>

          <button
            className={activePage === "map" ? "active" : ""}
            onClick={() => setActivePage("map")}
          >
            Map
          </button>

          <button
            className={activePage === "about" ? "active" : ""}
            onClick={() => setActivePage("about")}
          >
            About
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="container">

        {/* HOME */}
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

            {error && (
              <p className="error">
                {error}
              </p>
            )}

            {!loading && !error && (
              <div className="users">

                {filteredUsers.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      className="card"
                      key={user.id}
                    >
                      <h2>{user.name}</h2>

                      <p>
                        Email: {user.email}
                      </p>

                      <p>
                        Phone: {user.phone}
                      </p>

                      <p>
                        Website: {user.website}
                      </p>

                      <p>
                        Location:{" "}
                        {user.address.city}
                      </p>
                    </div>
                  ))
                )}

              </div>
            )}
          </>
        )}

        {/* MAP */}
        {activePage === "map" && (
          <>
            <h1>User Locations</h1>

            {loading && <p>Loading map data...</p>}

            {error && (
              <p className="error">
                {error}
              </p>
            )}

            {!loading && !error && (
              <>
                <MapView users={users} />

                <div className="map-info">
                  <p>
                    Showing {users.length} user locations
                  </p>
                </div>
              </>
            )}
          </>
        )}

        {/* ABOUT */}
        {activePage === "about" && (
          <div className="about">

            <h1>About Us</h1>

            <p>
              Welcome to ReactApp.
            </p>

            <p>
              This application fetches user
              data from a REST API and displays
              the data in a searchable interface.
            </p>

            <p>
              User locations are displayed
              using OpenLayers.
            </p>

            <h2>Technology Used</h2>

            <ul>
              <li>React</li>
              <li>Vite</li>
              <li>REST API</li>
              <li>OpenLayers</li>
              <li>Docker</li>
              <li>Docker Compose</li>
              <li>GitHub Actions</li>
            </ul>

          </div>
        )}

      </div>
    </>
  );
}

export default App;