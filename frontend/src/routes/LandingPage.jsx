import React from 'react';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faBell, faComments } from '@fortawesome/free-solid-svg-icons';
import Typography from "@mui/material/Typography";

function LandingPage() {
  return (
    <div className="landing-page">

      <main className="main-content">
        <Typography variant="h1">Welcome to Zot Support!</Typography>
        <div className="cta-box">
          <Typography variant="body1" className="cta-text">Make the most of your academic resources.</Typography>
          <a href="/sign-in" className="cta-button">
          <Typography variant="button">Sign in →</Typography>
            </a>
        </div>

        <section className="zot-support-info">
        <Typography variant="h2">What is Zot Support?</Typography>
        <Typography variant="body1">Zot Support is made for UC Irvine students, by UC Irvine students. We aim to:</Typography>
          <div className="info-bullets">
            <div className="bullet">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faNetworkWired} size="2x" />
              </div>
              <Typography variant="body1">Provide a centralized place for students<br></br>
              to discover learning support programs and their services</Typography>
            </div>
            <div className="bullet">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faBell} size="2x" />
              </div>
              <Typography variant="body1">Remind students to attend <br></br>
              learning support events they have registered for</Typography>
            </div>
            <div className="bullet">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faComments} size="2x" />
              </div>
              <Typography variant="body1">Ease communication between <br></br>
              learning support programs and students</Typography>
            </div>
          </div>
        </section>

        <section className="who-can-use">
            <Typography variant="h2">Who can use Zot Support?</Typography>
            <Typography variant="body1">Zot Support is available to anyone with an active UC Net ID.</Typography>
            <div className="image-box">
                <img src="https://buissonlab.files.wordpress.com/2018/07/uci-e1530888873503.jpg" alt="UC Irvine"/>
            </div>
        </section>

        <section className="learning-programs">
        <Typography variant="h2">Our Sponsor:</Typography>
        <div className="programs-grid">
          <div className="program-container">
            <div className="program program1"></div>
            <div className="program-name">
            <Typography variant="h3">UCI LARC</Typography>
              </div>
          </div>
        </div>
      </section>
      </main>

    </div>
  );
}

export default LandingPage;
