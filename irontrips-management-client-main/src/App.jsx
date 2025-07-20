import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProviderWrapper } from "./Context/auth.context";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
/*import IsAnon from "./Components/IsAnon";
import IsPrivate from "./Components/IsPrivate";*/
import ContactsPage from "./Pages/ContactsPage";
import CommunityPage from "./Pages/CommunityPage";
import GalleryPage from "./Pages/GalleryPage";
import TheGlobePage from "./Pages/TheGlobePage";
import CountryDetailsPage from "./Pages/CountryDetailPage";
import UserProfilePage from "./Pages/UserProfilePage";
import ArticlePage from "./Pages/ArticlePage";
import NavBar from "./Components/NavBar";
import SouthAmerica from "./Components/Continents/South-America";
import NorthAmerica from "./Components/Continents/North-America";
import Africa from "./Components/Continents/Africa";
import Asia from "./Components/Continents/Asia";
import Europe from "./Components/Continents/Europe";
import Oceania from "./Components/Continents/Oceania";
import UserProfileEdit from "./Pages/UserProfileEdit";
import EditArticlePage from "./Pages/EditArticlePage";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div>
      <AuthProviderWrapper>
        {!isLandingPage && <NavBar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/user-profile/edit" element={<UserProfileEdit />} />
          <Route path="/user-profile/newArticle" element={<ArticlePage />} />
          <Route path="/editArticle/:articleId" element={<EditArticlePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/theglobe" element={<TheGlobePage />} />
          <Route
            path="/theglobe/:countryCode"
            element={<CountryDetailsPage />}
          />
          <Route path="/south-america" element={<SouthAmerica />} />
          <Route path="/north-america" element={<NorthAmerica />} />
          <Route path="/africa" element={<Africa />} />
          <Route path="/asia" element={<Asia />} />
          <Route path="/europe" element={<Europe />} />
          <Route path="/oceania" element={<Oceania />} />
        </Routes>
      </AuthProviderWrapper>
    </div>
  );
}

export default App;
