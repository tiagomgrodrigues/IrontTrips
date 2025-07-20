import "./contactsPage.css";

function ContactsPage() {
    return (
        <div className="divContainerPerfil">
            <div className="contactsAdjust">
                <h2>
                    Contacts<span className="dot">.</span>
                </h2>
            </div>
            <div className="contacts-card" style={{ marginTop: "100px" }}>
                <div className="card" style={{ width: "18rem" }}>
                    <img
                        className="card-img-top"
                        src="https://res.cloudinary.com/dbyotexip/image/upload/v1694136908/IronTrip/ewwklxdv3yfr3x1v5aiu.jpg"
                        alt="Tiago Rodrigues"
                    />
                    <div className="card-body">
                        <h5 className="card-title">Tiago Rodrigues</h5>
                        <p>
                            <i>Web Developer</i>
                        </p>
                        <a href="https://www.linkedin.com/in/tiagomrodrigues/">
                            Connect on LinkedIn
                        </a>
                        <br />
                        <a href="https://github.com/tiagomgrodrigues">
                            Check my work
                        </a>
                    </div>
                </div>
                <div className="card" style={{ width: "18rem" }}>
                    <img
                        className="card-img-top"
                        src="https://res.cloudinary.com/dbyotexip/image/upload/v1694167620/bruno_ykuo4z.jpg"
                        alt="Bruno Cunha"
                    />
                    <div className="card-body">
                        <h5 className="card-title">Bruno Cunha</h5>
                        <p>
                            <i>Web Developer</i>
                        </p>
                        <a href="https://www.linkedin.com/in/brunorcunha3000/">
                            <i className="bi bi-linkedin"></i>
                            Connect on LinkedIn
                        </a>
                        <br />
                        <a href="https://github.com/brcunha3000">
                            Check my work
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactsPage;
