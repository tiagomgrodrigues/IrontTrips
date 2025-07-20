import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditArticlePage.css";

const API_URL = "https://irontrips-backend.onrender.com";

function EditArticlePage() {
    // State Declaration
    // State Declaration
    const [generalComment, setGeneralComment] = useState("");
    const [review, setReview] = useState("");
    const [overall, setOverall] = useState(1);
    const [cost, setCost] = useState("");
    const [gallery, setGallery] = useState("");
    const [country, setCountry] = useState("");
    const [countryName, setCountryName] = useState("");
    const [countryImage, setCountryImage] = useState("");
    // Uses
    const { articleId } = useParams();
    const navigate = useNavigate();
    /* const storedToken = localStorage.getItem("authToken"); */

    useEffect(() => {
        axios
            .get(`${API_URL}/editArticle/${articleId}`)
            .then((response) => {
                const currentArticle = response.data;
                setGeneralComment(currentArticle.generalComment);
                setReview(currentArticle.review);
                setOverall(currentArticle.overall);
                setCost(currentArticle.cost);
                setGallery(currentArticle.gallery);
                setCountry(currentArticle.country.cca2);
                setCountryName(currentArticle.country.name.common);
                setCountryImage(currentArticle.country.flags.png);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [articleId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
            generalComment,
            review,
            overall,
            cost,
            gallery,
            country,
        };
        axios
            .put(`${API_URL}/editArticle/${articleId}`, requestBody)
            .then(() => {
                // navigate === redirect
                navigate(`/user-profile`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteArticle = (articleId) => {
        axios
            .delete(`${API_URL}/editArticle/${articleId}`)
            .then(() => {
                navigate("/user-profile");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <div className="parent-profileEdit-div">
                <div className="profileEdit">
                    <h1>
                        Edit Article<span className="dot">.</span>
                    </h1>
                    <img
                        src={countryImage}
                        alt={countryName}
                        style={{ marginTop: "20px" }}
                        width={100}
                    />
                    <form onSubmit={handleSubmit}>
                        <label>
                            Country:
                            <input
                                type="text"
                                name="country"
                                value={countryName}
                                className="text"
                                disabled
                            />
                        </label>
                        <label>
                            Comment:
                            <input
                                type="text"
                                name="generalComment"
                                value={generalComment}
                                onChange={(e) =>
                                    setGeneralComment(e.target.value)
                                }
                                className="text"
                            />
                        </label>
                        <label>
                            Review:
                            <input
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
                                className="text"
                                name="cost"
                                onChange={(e) => setCost(e.target.value)}
                            >
                                <option value="Budget-Friendly">
                                    Budget-Friendly
                                </option>
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
                                    SAVE
                                </button>
                            </div>
                            <div>
                                <button
                                    className="button-profile-card"
                                    onClick={() => deleteArticle(articleId)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    DELETE
                                </button>
                            </div>
                        </div>
                        <div className="btnContainer">
                            <div>
                                <Link to={"/user-profile"}>
                                    <button className="button-profile-card">
                                        BACK
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditArticlePage;
