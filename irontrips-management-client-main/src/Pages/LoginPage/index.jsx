import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import AOS from "aos";
import "aos/dist/aos.css";
import "./login.css";

const API_URL = "https://irontrips-backend.onrender.com";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);

        authenticateUser();

        navigate("/home");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="main-div-login">
      <div
        className="parent-login-div"
        data-aos="flip-up"
        data-aos-duration="1000"
      >
        <div className="login">
          <h1>
            Welcome<span className="dot">.</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                className="text"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                className="text"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <input
              type="checkbox"
              id="checkbox-1-1"
              className="custom-checkbox"
            />
            <label htmlFor="checkbox-1-1" className="custom-checkbox-label">
              Keep me logged in
            </label>
            <button className="button-login" type="submit">
              Login
            </button>

            <a
              className="f-password"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              Forgot Password?
            </a>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
          <Link to="/auth/signup">Don't have an account yet? Sign Up!</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
