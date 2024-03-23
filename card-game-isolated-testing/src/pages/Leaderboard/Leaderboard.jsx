// import { Link, useHistory } from 'react-router-dom';
import React from "react";
import { useNavigate } from "react-router-dom";

import ScoreRows from "../../components/_LeaderboardComps_/ScoreRows/ScoreRows";
import "./Leaderboard.styles.css";

import { useQuery } from "@tanstack/react-query";
import { getAllPlayers, getPlayerByWallet } from "../../../api/apiFns";

import { useGameVarsStore } from "../../stores/gameVars";
import useGA4 from "../../hooks/useGA4";

function Leaderboard() {
  useGA4();
  const navigate = useNavigate();

  const playerData = useGameVarsStore((state) => state.player);

  const AllPlayersQuery = useQuery({
    queryKey: ["players-lb"],
    queryFn: getAllPlayers,
  });

  const fetchedPlayerQuery = useQuery({
    queryKey: ["fetchPlayer-lb"],
    queryFn: () => getPlayerByWallet(playerData.wallet),
  });

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
                onClick={AllPlayersQuery.refetch}
              >
                Refresh <i className="bi bi-arrow-repeat"></i>
              </button>
            </div>
            <div className="score-list-box">
              <ScoreRows
                AllPlayersQuery={AllPlayersQuery}
                fetchedPlayerQuery={fetchedPlayerQuery}
              />
            </div>
            <p className="fetch-error"></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Leaderboard;
