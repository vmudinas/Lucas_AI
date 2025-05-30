import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>This is my first AI page</h1>
      <div className="cta-button">
        <Link to="/connect-four" className="connect-four-button">
          Play Connect Four
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;