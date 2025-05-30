import React from 'react';
import { Link } from 'react-router-dom';
import ConnectFour from '../components/ConnectFour';

function ConnectFourPage() {
  return (
    <div className="connect-four-page">
      <h1>Connect Four Game</h1>
      <ConnectFour />
      <div className="back-navigation">
        <Link to="/home" className="back-to-home">Back to Home</Link>
      </div>
    </div>
  );
}

export default ConnectFourPage;