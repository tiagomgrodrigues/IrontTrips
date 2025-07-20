import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://irontrips-backend.onrender.com";

function ArticlePage() {
  // State Declaration
  const [generalComment, setGeneralComment] = useState("");
  const [review, setReview] = useState("");
  const [overall, setOverall] = useState(1);
  const [cost, setCost] = useState("");
  const [gallery, setGallery] = useState("");
  // Use states
  const [countryCode, setCountryCode] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/user-profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const currentUser = response.data;
        setUser(currentUser);
      })
      .catch((error) => console.log(error));
  }, [storedToken]);

  // Handle Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      generalComment,
      review,
      overall,
      cost,
      gallery,
      countryCode,
    };

    axios
      .post(`${API_URL}/user-profile/newArticle`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setGeneralComment("");
        setReview("");
        setOverall(0);
        setCost("");
        setGallery("");
        setCountryCode("");
      })
      .catch((error) => console.log(error));

    navigate("/user-profile");
  };
  return (
    <div>
      {user && (
        <div>
          {/* NEW FORM */}
          <div className="parent-profileEdit-div">
            <div className="profileEdit">
              <h1>
                New Article<span className="dot">.</span>
              </h1>

              <form onSubmit={handleSubmit}>
                <label>
                  Country:
                  <select
                    required
                    name="countryCode"
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="text"
                  >
                    <option value="">Please select</option>
                    {user.visitedCountries.map((country) => (
                      <option key={country._id} value={country.cca2}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Comment:
                  <input
                    required
                    type="text"
                    name="generalComment"
                    value={generalComment}
                    onChange={(e) => setGeneralComment(e.target.value)}
                    className="text"
                  />
                </label>
                <label>
                  Review:
                  <input
                    required
                    type="text"
                    name="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="text"
                  />
                </label>
                <label>
                  Overall:
                  <input
                    required
                    type="number"
                    name="overall"
                    value={overall}
                    onChange={(e) => setOverall(e.target.value)}
                    min="1"
                    max="10"
                    className="text"
                  />
                </label>
                <label>
                  Cost:
                  <select
                    required
                    name="cost"
                    onChange={(e) => setCost(e.target.value)}
                    className="text"
                  >
                    <option value="">Please select</option>
                    <option value="Budget-Friendly">Budget-Friendly</option>
                    <option value="Moderate">Moderate </option>
                    <option value="Expensive">Expensive</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </label>
                <label>
                  Gallery:
                  <input
                    type="text"
                    name="gallery"
                    value={gallery}
                    onChange={(e) => setGallery(e.target.value)}
                    className="text"
                  />
                </label>

                <div className="btnContainer">
                  <div>
                    <button
                      className="button-profile-card"
                      type="submit"
                      style={{ marginRight: "10px" }}
                    >
                      CREATE
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
      )}
    </div>
  );
}

export default ArticlePage;
