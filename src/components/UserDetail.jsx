import { Link, useParams } from "react-router-dom";

function UserDetail({
  users,
  loading,
  error,
}) {
  const { id } = useParams();

  if (loading) {
    return <p>Loading user...</p>;
  }

  if (error) {
    return (
      <p className="error">
        {error}
      </p>
    );
  }

  const user = users.find(
    (user) => user.id === Number(id)
  );

  if (!user) {
    return (
      <div>
        <h1>User not found</h1>

        <Link to="/">
          ← Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="user-detail">

      <Link
        to="/"
        className="back-button"
      >
        ← Back to Users
      </Link>

      <h1>
        {user.name}
      </h1>

      <div className="detail-card">

        <h2>
          Personal Information
        </h2>

        <p>
          <strong>
            Username:
          </strong>{" "}
          {user.username}
        </p>

        <p>
          <strong>
            Email:
          </strong>{" "}
          {user.email}
        </p>

        <p>
          <strong>
            Phone:
          </strong>{" "}
          {user.phone}
        </p>

        <p>
          <strong>
            Website:
          </strong>{" "}
          <a
            href={
              user.website.startsWith("http")
                ? user.website
                : `https://${user.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        </p>

        <h2>
          Address
        </h2>

        <p>
          <strong>
            Street:
          </strong>{" "}
          {user.address.street}
        </p>

        <p>
          <strong>
            Suite:
          </strong>{" "}
          {user.address.suite}
        </p>

        <p>
          <strong>
            City:
          </strong>{" "}
          {user.address.city}
        </p>

        <p>
          <strong>
            Zipcode:
          </strong>{" "}
          {user.address.zipcode}
        </p>

        <h2>
          Company
        </h2>

        <p>
          <strong>
            Company:
          </strong>{" "}
          {user.company.name}
        </p>

        <p>
          <strong>
            Catch Phrase:
          </strong>{" "}
          {user.company.catchPhrase}
        </p>

        <p>
          <strong>
            Business:
          </strong>{" "}
          {user.company.bs}
        </p>

      </div>

    </div>
  );
}

export default UserDetail;
