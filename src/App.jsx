import { useEffect, useState } from "react";
import "./App.css";

import MapView from "./components/MapView";
import UserDetail from "./components/UserDetail";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">
        ReactApp
      </div>

      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/map"
          className={location.pathname === "/map" ? "active" : ""}
        >
          Map
        </Link>

        <Link
          to="/about"
          className={location.pathname === "/about" ? "active" : ""}
        >
          About
        </Link>
      </div>
    </nav>
  );
}

function Home({
  users,
  search,
  setSearch,
  loading,
  error,
}) {
  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
    );
  });

  return (
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
              <Link
                key={user.id}
                to={`/user/${user.id}`}
                className="card"
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
                  Location: {user.address.city}
                </p>
              </Link>
            ))
          )}

        </div>
      )}
    </>
  );
}

function MapPage({
  users,
  loading,
  error,
}) {
  return (
    <>
      <h1>User Locations</h1>

      {loading && (
        <p>
          Loading map data...
        </p>
      )}

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
  );
}

function About() {
  return (
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

      <h2>
        Technology Used
      </h2>

      <ul>
        <li>React</li>
        <li>Vite</li>
        <li>REST API</li>
        <li>OpenLayers</li>
        <li>React Router</li>
        <li>Docker</li>
        <li>Docker Compose</li>
        <li>GitHub Actions</li>
      </ul>

    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://jsonplaceholder.typicode.com/users"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch data"
          );
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

  return (
    <BrowserRouter>

      <Navbar />

      <div className="container">

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <Home
                users={users}
                search={search}
                setSearch={setSearch}
                loading={loading}
                error={error}
              />
            }
          />

          {/* USER DETAIL */}
          <Route
            path="/user/:id"
            element={
              <UserDetail
                users={users}
                loading={loading}
                error={error}
              />
            }
          />

          {/* MAP */}
          <Route
            path="/map"
            element={
              <MapPage
                users={users}
                loading={loading}
                error={error}
              />
            }
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={<About />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;
