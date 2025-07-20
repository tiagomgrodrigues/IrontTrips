import { Link } from "react-router-dom";
import './landingpage.css'

function LandingPage() {
  return (
    <div id="landing-page">
      <video autoPlay loop muted playsInline className="back-video">
        <source src="/videos/globe-landing-page.mp4" type="video/mp4" />
      </video>

      <div className="landing-content">
        <h1>Iron Trips</h1>
        <br />
        <p>Pin Your Travels, Leave Your Mark: Mapping Memories with us!</p>
        <br />
        <Link to={`/home`}>
          <button className="button button-transparency">Join Us</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
