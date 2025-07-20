import { Link as ScrollLink } from "react-scroll";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './homepage.css'

function HomePage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div id="home" data-aos="fade-down" data-aos-duration="1500">
      <div className="main-div">
        <div className="top-content">
          <div>
            <a
              href="https://www.ironhack.com/pt/en/lisbon"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="top-content-ironhack-logo"
                src="/images/ironhack-logo.png"
                alt="Ironhack Logo"
              ></img>
            </a>
          </div>
          <div className="home-page-text">
            <h1>Iron</h1>
            <h1>Trips</h1>
            <h6>Discover story-worthy travel moments</h6>
          </div>
        </div>
        <div className="bottom-content">
          <ScrollLink to="second-div" smooth={true} duration={1500}>
            <div className="bottom-content-text">
              <h3>Who we are and what is our purpose</h3>
            </div>
            <div className="scroll-container">
              <div className="scroller"></div>
            </div>
          </ScrollLink>
        </div>
      </div>

      <div className="second-div">
        <div className="text-wrapper">
          <div
            className="section-1"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h2>
              <span className="irontrips-span dot">Iron Trips:</span> Crafting
              Journeys, Connecting Explorers
            </h2>
            <br></br>
            <p>
              Welcome to IronTrips, a fusion of travel enthusiasts and web
              developers forging a dynamic community. We're avid explorers
              turned tech aficionados, dedicated to offering a platform that
              lets you chronicle your worldwide escapades.
            </p>
          </div>
          <div
            className="section-2"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h2><span className="dot">Who We Are:</span></h2>
            <p>
              We're a team of enthusiastic adventurers who double as web
              developers. Our shared love for exploration and technology brought
              us together to build a space here travelers can document their
              journeys.
            </p>
          </div>
          <div
            className="section-3"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h2><span className="dot">Our Purpose:</span></h2>
            <p>
              At Iron Trips, we are more than just a platform - we are a
              community of fellow travelers. Our purpose is to provide you with
              a digital haven to document your voyages, reminisce about your
              favorite spots and discover hidden gems through the experiences of
              others.
            </p>
          </div>
          <div
            className="section-4"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h2><span className="dot">We Offer:</span></h2>
            <p>
              Whether you're a seasoned globetrotter or a first-time traveler,
              our platform is your companion. We offer tools to map your
              adventures, galleries to display your memories and diaries to
              recount your stories.
            </p>
          </div>
          <div
            className="section-5"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h2><span className="dot">Join Us</span>:</h2>
            <p>
              Step into the world of Iron Trips, where every click fosters
              connections, preserves memories and fuels wanderlust. We're here
              to celebrate the beauty of our world, one story at a time.
            </p>
            <br></br>
            <br></br>
          </div>
          <div
            className="section-6"
            data-aos="zoom-in"
            data-aos-duration="3000"
          >
            <h3>
              Cheers to exploration and shared stories, The Iron Trips Crew<span className="dot">.</span>
            </h3>
            <br></br>
          </div>
        </div>
        <div className="footer-second-div">
          <ScrollLink to="main-div" smooth={true} duration={1500}>
            <div className="scroll-container">
              <div className="scroller"></div>
            </div>
          </ScrollLink>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
