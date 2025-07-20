import axios from "axios";
import "./community.css";
import { useState, useEffect } from "react";

const API_URL = "https://irontrips-backend.onrender.com";

function CommunityPage() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/community`).then((response) => {
      const allUsers = response.data;
      setUsers(allUsers);
    });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div>
      <div>
        <div className="top-content-community-title">
          <h2>
            The Community<span className="dot">.</span>
          </h2>
        </div>
        <div>
          <div className="top-content-community">
            <div className="find-user-main-div">
              <div className="label-input-container">
                <form>
                  <label>
                    Search for an user
                    <input
                      name="searchUser"
                      type="text"
                      className="text"
                      onChange={(e) => setSearchUser(e.target.value)}
                      value={searchUser}
                    ></input>
                  </label>
                </form>
              </div>
            </div>
          </div>
          <div className="community-box">
            <div className="user-cards-row">
              {filteredUsers.map((user) => (
                <div key={user._id} className="user-card">
                  <img
                    style={{ height: "50px" }}
                    src={user.profilePicture}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <br></br>
                  <br></br>
                  <p className="name">
                    {user.firstName} {user.lastName}
                  </p>
                  <p>
                    <span className="goldenrod-title">{user.username}</span>
                  </p>
                  <br></br>
                  <p>Visited Countries: {user.visitedCountries.length}</p>
                  <p>
                    Member Since:{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    Last Visit: {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
