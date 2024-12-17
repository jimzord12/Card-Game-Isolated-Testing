// import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ScoreRows from "../../components/_LeaderboardComps_/ScoreRows/ScoreRows";
import "./Leaderboard.styles.css";

import { useQuery } from "@tanstack/react-query";
import {
  getAllPlayers,
  getPlayerByWallet,
  top10PlayersReport,
} from "../../../api/apiFns";

import { useGameVarsStore } from "../../stores/gameVars";
import useGA4 from "../../hooks/useGA4";
import LoadingModal from "../../components/Modals/LoadingModal/LoadingModal";
import FlipClockCountDown from "../../components/FlipClockCountDown/FlipClockCountDown";

import ScoreRowsTop10 from "../../components/_LeaderboardComps_/ScoreRows/ScoreRowsTop10";
import WorkshopBtn from "./WorkshopBtn";
// import testDataTopPlayers from "./top10PlayersReport.json";

function Leaderboard() {
  useGA4();
  const navigate = useNavigate();
  const [workshop2, setWorkshop2] = useState(false);
  const [workshop3, setWorkshop3] = useState(false);

  const playerData = useGameVarsStore((state) => state.player);
  const [isLoading, setIsLoading] = useState(false);
  const AllPlayersQuery = useQuery({
    queryKey: ["players-lb"],
    queryFn: getAllPlayers,
  });

  useEffect(() => {
    if (workshop2) setWorkshop3(false);
  }, [workshop2]);

  useEffect(() => {
    if (workshop3) setWorkshop2(false);
  }, [workshop3]);

  const fetchedPlayerQuery = useQuery({
    queryKey: ["fetchPlayer-lb"],
    queryFn: () => getPlayerByWallet(playerData.wallet),
  });

  const {
    data: top10PlayersReportData,
    // isSuccess: topPlayersIsSuccess,
    // isError: topPlayersIsError,
    isLoading: topPlayersIsLoading,
    error: topPlayersError,
  } = useQuery({
    queryKey: ["topPlayers-lb"],
    queryFn: top10PlayersReport,
  });

  // const testDate = new Date();
  // testDate.setHours(testDate.getHours() + 2);

  return (
    <div className="root">
      <main>
        <div className="leaderboard-header">
          <div>
            <h1 className="page-header">Leaderboard </h1>
            <p className="page-subheader">
              Check out the top players and see where you stand!
            </p>
          </div>

          <div style={{ height: 28 }} />

          <div
            style={{
              overflow: "auto",
              border: "3px solid purple",
              padding: 12,
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            <p className="page-subheader">Next MGS Rewards Give away in:</p>
            {topPlayersIsLoading ? (
              <LoadingModal />
            ) : (
              <FlipClockCountDown
                targetDate={new Date(top10PlayersReportData.nextExecution)}
              />
            )}
          </div>
        </div>
        <p className="goback-link" onClick={() => navigate(-1)}>
          Go Back
        </p>

        <div className="container-leaderboard">
          <div className="score-list">
            <div className="title-box">
              <h2 className="sub-title">Ranking List</h2>
              <button
                className="btn-score-submit"
                type="button"
                id="btn-refresh"
                onClick={async () => {
                  setIsLoading(true);
                  <LoadingModal />;
                  await AllPlayersQuery.refetch();
                  setIsLoading(false);
                }}
              >
                Refresh <i className="bi bi-arrow-repeat"></i>
              </button>
            </div>
            <p className="score-list-box-header">
              The Last Month's Top 10 Players
            </p>
            <div className="score-list-box top-players">
              {topPlayersIsLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingModal />
                </div>
              ) : (
                <ScoreRowsTop10
                  top10Players={top10PlayersReportData.top10Players}
                  fetchedPlayerQuery={fetchedPlayerQuery}
                  error={topPlayersError}
                />
              )}
            </div>
            <div style={{ height: 64 }} />
            <div className="flex items-center justify-between gap-8 pr-6">
              <p className="score-list-box-header">
                The Current Month's Ranking
              </p>
              <div className="flex items-center gap-6">
                <WorkshopBtn
                  setWorkshop={setWorkshop2}
                  name="WorkShop 2"
                  state={workshop2}
                />
                <WorkshopBtn
                  setWorkshop={setWorkshop3}
                  name="WorkShop 3"
                  state={workshop3}
                />
              </div>
            </div>
            <div className="score-list-box current-list">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingModal />
                </div>
              ) : (
                <ScoreRows
                  AllPlayersQuery={AllPlayersQuery}
                  fetchedPlayerQuery={fetchedPlayerQuery}
                  workshop2={workshop2}
                  workshop3={workshop3}
                />
              )}
            </div>
            <p className="fetch-error"></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Leaderboard;
