import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./signup.css";

const API_URL = "https://irontrips-backend.onrender.com";

function SignupPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { firstName, lastName, username, email, password };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="main-div-signup">
      <div
        className="parent-signup-div"
        data-aos="flip-up"
        data-aos-duration="1000"
      >
        <div className="signup">
          <h1>
            Create an account<span className="dot">.</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                className="text"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </label>
            <label>
              Last Name:
              <input
                className="text"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </label>
            <label>
              Username:
              <input
                className="text"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
            <label>
              Email:
              <input
                className="text"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </label>
            <label>
              Password:
              <input
                className="text"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <button className="button-login" type="submit">
              Signup
            </button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
