import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import "./UserProfileEdit.css";

const API_URL = "https://irontrips-backend.onrender.com";

function UserProfileEdit() {
  const [user, setUser] = useState("");
  // State Declaration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [username, setUsername] = useState("");
  // Picture
  const [profilePicture, setProfilePicture] = useState("");
  const [uploading, setUploading] = useState(false);
  // Uses
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  // Logout
  const { logout, tokenUpdate } = useContext(AuthContext);

  // Handles
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handleNationality = (e) => setNationality(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const getProfile = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/user-profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setGender(response.data.gender);
      setNationality(response.data.nationality);
      setUsername(response.data.username);
      setProfilePicture(response.data.profilePicture);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleImageChange = (e) => {
    setUploading(true);

    const uploadData = new FormData();

    uploadData.append("img", e.target.files[0]);
    const fileName = event.target.files[0]?.name || "No file selected"; // Get the selected filename or set default text
    const fileNameSpan = document.getElementById("file-name");
    fileNameSpan.textContent = fileName;

    axios
      .post(`${API_URL}/upload`, uploadData)
      .then((response) => {
        setProfilePicture(response.data.fileUrl);
        console.log(profilePicture);
        setUploading(false);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      firstName,
      lastName,
      email,
      gender,
      nationality,
      username,
      profilePicture,
    };
    try {
      const storedToken = localStorage.getItem("authToken");

      await axios.put(`${API_URL}/user-profile`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setGender("");
      setNationality("");
      setUsername("");
      setProfilePicture("");

      navigate(`/user-profile`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      await axios.delete(`${API_URL}/user-profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      logout();

      navigate("/");
    } catch (error) {}
  };

  /* useEffect(() => {
        axios
            .get(`${API_URL}/user-profile`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                const currentUser = response.data;
                setUser(currentUser);
                setFirstName(currentUser.firstName);
                setLastName(currentUser.lastName);
                setEmail(currentUser.email);
                setGender(currentUser.gender);
                setNationality(currentUser.nationality);
                setUsername(currentUser.username);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [storedToken]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
            firstName,
            lastName,
            email,
            gender,
            nationality,
            username,
        };
        axios
            .put(`${API_URL}/user-profile`, requestBody, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                // navigate === redirect
                navigate(`/user-profile`);
            })
            .catch((error) => {
                console.log(error);
            });
    }; */

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleFirstName}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleLastName}
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsername}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                    />
                </label>
                <label>
                    Gender:
                    <select name="gender" onChange={handleGender}>
                        <option value="male">Male</option>
                        <option value="female">Female </option>
                        <option value="non-binary">Non binary</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                            Prefer not to say
                        </option>
                    </select>
                </label>
                <label>
                    Nationality:
                    <input
                        type="text"
                        name="nationality"
                        value={nationality}
                        onChange={handleNationality}
                    />
                </label>
                <label htmlFor="image-upload">Image:</label>
                <input
                    id="image-upload"
                    type="file"
                    name="profilePicture"
                    onChange={handleImageChange}
                />

                <button type="submit">Edit Article</button>
            </form> */}
      <div className="parent-profileEdit-div">
        <div className="profileEdit">
          <h1>
            Edit Profile<span className="dot">.</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleFirstName}
                className="text"
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleLastName}
                className="text"
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleUsername}
                className="text"
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmail}
                className="text"
              />
            </label>
            <label>
              Gender:
              <select className="text" name="gender" onChange={handleGender}>
                <option value="">Choose your gender</option>
                <option value="male">Male</option>
                <option value="female">Female </option>
                <option value="non-binary">Non binary</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </label>
            <label>
              Nationality:
              <input
                type="text"
                name="nationality"
                value={nationality}
                onChange={handleNationality}
                className="text"
              />
            </label>
            <div className="btnContainer">
              <div className="uploadImg">
                <label htmlFor="image-upload" className="custom-file-upload">
                  upload Image{" "}
                </label>

                <input
                  className="btnFile"
                  id="image-upload"
                  type="file"
                  name="profilePicture"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="spanImg">
              <span>File name:</span>
              <span id="file-name">No file selected</span>
            </div>
            <div className="btnContainer">
              <div>
                <button className="button-profile-card" type="submit">
                  SAVE
                </button>
              </div>
            </div>
            <div className="btnContainer">
              <div>
                <Link to={"/user-profile"}>
                  <button className="button-profile-card">BACK</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfileEdit;
