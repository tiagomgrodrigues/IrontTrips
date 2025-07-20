import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css";

const API_URL = "https://irontrips-backend.onrender.com";

function UserProfilePage() {
    // Req body
    const [nVisitedCountries, setNVisitedCountries] = useState(0);
    const [percentageCountries, setPercentageCountries] = useState(0);
    const [articles, setArticles] = useState("");
    const [user, setUser] = useState(null);
    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios
            .get(`${API_URL}/user-profile`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                const oneUser = response.data;
                setUser(oneUser);
                setNVisitedCountries(oneUser.visitedCountries.length);
                const percentage = Math.floor(
                    (oneUser.visitedCountries.length * 100) / 195
                );
                setArticles(oneUser.articles.length);
                setPercentageCountries(percentage);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [storedToken]);

    return (
        <div>
            <div>
                {user && (
                    <div>
                        <div className="parent-profile-div">
                            <div className="profile">
                                <h1>
                                    PROFILE<span className="dot">.</span>
                                </h1>

                                <form>
                                    <div className="imgProfile">
                                        <div>
                                            <img
                                                className="roundedImg"
                                                src={user.profilePicture}
                                                width={170}
                                            />
                                        </div>
                                        <div>
                                            <label>{user.username}</label>
                                        </div>
                                    </div>
                                    <div className="labelContainer">
                                        <label>
                                            <span className="profileTitles">
                                                Name:{" "}
                                            </span>
                                            {user.firstName} {user.lastName}
                                        </label>
                                        <label>
                                            <span className="profileTitles">
                                                Email:{" "}
                                            </span>
                                            {user.email}
                                        </label>
                                        <label>
                                            <span className="profileTitles">
                                                Nationality:{" "}
                                            </span>
                                            {user.nationality}
                                        </label>
                                        <label>
                                            <span className="profileTitles">
                                                Gender:{" "}
                                            </span>
                                            {user.gender}
                                        </label>
                                        <label>
                                            <p className="pProfile">
                                                <em>
                                                    Member since{" "}
                                                    {new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString()}
                                                </em>
                                            </p>
                                        </label>
                                    </div>
                                    <div className="btnContainer">
                                        <div>
                                            <Link to="/user-profile/edit">
                                                <button
                                                    className="button-profile-card"
                                                    type="submit"
                                                >
                                                    EDIT PROFILE
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="parent-profile-div">
                            <div className="profile">
                                <h2>
                                    Fun Facts<span className="dot">.</span>
                                </h2>
                                <br />
                                <div className="labelFunFacts">
                                    <p className="paragraphFunFacts">
                                        <span className="dot">.</span>
                                        <span className="profileTitles">
                                            You have been to{" "}
                                            <span className="spanWhite">
                                                {nVisitedCountries}{" "}
                                            </span>
                                            countries, and that means{" "}
                                            <span className="spanWhite">
                                                {percentageCountries}%{" "}
                                            </span>
                                            of the world you've seen.✈️
                                        </span>
                                    </p>
                                    <p>
                                        <span className="dot">.</span>

                                        <span className="profileTitles">
                                            You have contributed{" "}
                                            <span className="spanWhite">
                                                {articles}
                                            </span>{" "}
                                            articles to the community.📝
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="parent-profile-div">
                            <div className="profile">
                                <h2>
                                    Visited Countries
                                    <span className="dot">.</span>
                                </h2>
                                <br />
                                <div className="scrollmenu">
                                    {user.visitedCountries.map((country) => {
                                        return (
                                            <div key={country._id}>
                                                <Link
                                                    to={`/theglobe/${country.cca2}`}
                                                >
                                                    <img
                                                        className="countriesImg"
                                                        src={country.flags.png}
                                                        width={80}
                                                        height={50}
                                                    />
                                                    <h2>
                                                        {country.name.common}
                                                    </h2>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="parent-profile-div">
                            <div className="profile">
                                <h2>
                                    My articles<span className="dot">.</span>
                                </h2>
                                <br />
                                <div className="scrollmenuArticles">
                                    {user.articles.map((article) => {
                                        return (
                                            <div
                                                key={article._id}
                                                className="articlesContainer"
                                            >
                                                <div className="scrollmenuArticlesv2">
                                                    <h2
                                                        style={{
                                                            marginBottom:
                                                                "30px",
                                                        }}
                                                    >
                                                        {article.generalComment}
                                                    </h2>
                                                    <h3
                                                        style={{
                                                            marginBottom:
                                                                "30px",
                                                        }}
                                                    >
                                                        {article.country.flag}{" "}
                                                        {
                                                            article.country.name
                                                                .common
                                                        }
                                                    </h3>

                                                    <Link
                                                        to={`/editArticle/${article._id}`}
                                                    >
                                                        <div className="pulse">
                                                            <span className="material-symbols-outlined">
                                                                edit_note
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div>
                                    <div className="containerBtnArticle">
                                        <Link to="/user-profile/newArticle">
                                            <button className="button-profile-card">
                                                Create Article
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="parent-profile-div">
                            <div className="profile">
                                <h2>
                                    Favorites Countries
                                    <span className="dot">.</span>
                                </h2>
                                <br />
                                <div className="scrollmenu">
                                    {user.favoritesCountries.map((country) => {
                                        return (
                                            <div key={country._id}>
                                                <Link
                                                    to={`/theglobe/${country.cca2}`}
                                                >
                                                    <img
                                                        className="countriesImg"
                                                        src={country.flags.png}
                                                        width={80}
                                                        height={50}
                                                    />
                                                    <h2>
                                                        {country.name.common}
                                                    </h2>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfilePage;
