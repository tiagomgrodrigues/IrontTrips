import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./countrydetailspage.css";

const API_URL = "https://irontrips-backend.onrender.com";

function CountryDetailsPage() {
  const [country, setCountry] = useState(null);
  const [fetching, setFetching] = useState(true);
  const { countryCode } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const [isFavorite, setIsFavorite] = useState(false);

  // Add to favourites
  const addToMyFavorites = () => {
    axios
      .post(`${API_URL}/theglobe/addFavorites/${countryCode}`, "", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setIsFavorite(response.data);
        console.log(response.data);
        axios
          .get(`${API_URL}/theglobe/${countryCode}`, "", {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            const updateCountry = response.data;
            setCountry(updateCountry);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add to visited
  const addToMyVisited = () => {
    axios
      .post(`${API_URL}/theglobe/addVisited/${countryCode}`, "", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        axios
          .get(`${API_URL}/theglobe/${countryCode}`, "", {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            const updateCountry = response.data;
            setCountry(updateCountry);

            const messageElement = document.getElementById("message");
            messageElement.textContent =
              "Country has been added to your visited list";
            messageElement.style.display = "block"; // Show the message

            // Automatically hide the message after 5 seconds (5000 milliseconds)
            setTimeout(() => {
              messageElement.style.display = "none";
            }, 1500);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/theglobe/${countryCode}`)
      .then((response) => {
        const oneCountry = response.data;
        setCountry(oneCountry);
        setFetching(false);
      })
      .catch((error) => console.log(error));
  }, [countryCode, setCountry]);

  return (
    <div>
      {fetching && <p>Loading...</p>}
      {country && (
        <div>
          <div className="countryinfo-main">
            <div className="countryinfo-title">
              <h1>
                {country.name.common}
                <span className="dot">.</span>
              </h1>
            </div>
          </div>
          <div className="countryinfo-flag-container">
            <div>
              <div className="countryinfo-flag-image">
                <img src={country.flags.png} alt={country.name.common} />
              </div>
            </div>
          </div>
          <div>
            <div className="countryinfo-info-container">
              <div>
                <h5 className="countryinfo-title">
                  Been favorited<span className="dot">:</span>
                </h5>{" "}
                <span className="normal-text">{country.favorites}</span>
                <h5 className="countryinfo-title">
                  Capital<span className="dot">:</span>
                </h5>{" "}
                <span className="normal-text">{country.capital}</span>
                <h5 className="countryinfo-title">
                  Area<span className="dot">:</span>
                </h5>{" "}
                <span className="normal-text">{country.area} km²</span>
                <h5 className="countryinfo-title">
                  Borders<span className="dot">:</span>
                </h5>{" "}
                <span className="normal-text">{country.borders}</span>
                <h5 className="countryinfo-title">
                  Cities<span className="dot">:</span>
                </h5>{" "}
                <span className="normal-text">{country.cities.length}</span>
                <br></br>
                <br></br>
                <span className="normal-text">
                  This country has {country.articles.length} articles created by
                  users.
                </span>
                <br></br>
                <a
                  href={country.maps.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                >
                  Find more about {country.name.common} and look for it on{" "}
                  <span className="underlined">google maps</span>!
                </a>
              </div>
            </div>
            <div className="countryinfo-buttons-div">
              <button
                className={`button-coutrydetails ${isFavorite ? "liked" : ""}`}
                onClick={addToMyFavorites}
                type="submit"
              >
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button
                className="button-coutrydetails"
                onClick={addToMyVisited}
                type="submit"
              >
                Add to visited
              </button>
            </div>
            <br></br>
            <div id="message" className="warning-message"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryDetailsPage;
