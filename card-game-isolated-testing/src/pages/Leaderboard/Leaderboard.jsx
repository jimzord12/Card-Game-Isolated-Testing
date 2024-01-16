// import { Link, useHistory } from 'react-router-dom';
import React from "react";
import { useNavigate } from "react-router-dom";

import ScoreRows from "../../components/_LeaderboardComps_/ScoreRows/ScoreRows";
import "./Leaderboard.styles.css";

function Leaderboard() {
  const navigate = useNavigate();

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <div className="root">
      <main>
        {/* <div id="canvas"></div> */}
        <h1 className="page-header">Leaderboard </h1>
        <p className="goback-link" onClick={() => navigate(-1)}>
          Go Back
        </p>
        <div className="container-leaderboard">
          <div className="score-list">
            <div className="title-box">
              <h2 className="sub-title">
                Ranking List <strong>(Player is Hardcoded!)</strong>
              </h2>
              <button
                className="btn-score-submit"
                type="button"
                id="btn-refresh"
                onClick={handleRefresh}
              >
                Refresh <i className="bi bi-arrow-repeat"></i>
              </button>
            </div>
            <div className="score-list-box">
              <ScoreRows />
            </div>
            <p className="fetch-error"></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Leaderboard;
