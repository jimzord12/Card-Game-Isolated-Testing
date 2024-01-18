import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import ScoreRow from "./ScoreRow.jsx";

import { getAllPlayers, getPlayerByWallet } from "../../../../api/apiFns";

import {
  sortedPlayers,
  TopThreeScores,
  AlternatingBackground,
} from "./utils.js";

const ScoreRows = () => {
  const {
    data: players,
    isSuccess,
    isLoading,
    isError,
    error,
    // refetch: refectAll,
  } = useQuery({
    queryKey: ["players-lb"],
    queryFn: getAllPlayers,
  });

  //TODO: 💥 Have to use Zustang store instead of Context API
  const testingAddress = "0xe63761bfe4599aab4a7d4cfbb2229103199b3631"; // // TODO: Remove this

  const {
    data: fetchedPlayer,
    isSuccess: fetchedPlayerSuccess,
    isLoading: fetchedPlayerIsLoading,
    isError: fetchedPlayerIsError,
    error: fetchedPlayerError,
  } = useQuery({
    queryKey: ["fetchPlayer-lb"],
    queryFn: () => getPlayerByWallet(testingAddress),
  });

  useEffect(() => {
    if (isSuccess && fetchedPlayerSuccess) {
      if (players.length > 0) {
        // ✨ 🥩 Use the utils functions with the right sequence to store the data into sessionStorage
        // ✨ 🥩 and then retrieve and display them
        TopThreeScores(players);

        AlternatingBackground(fetchedPlayer.player, players);
      }
    }
  }, [fetchedPlayer, players, fetchedPlayerSuccess, isSuccess]);

  return (
    <>
      {(isError || fetchedPlayerIsError) && (
        <div style={{ fontSize: 24 }}>
          Oops! Something Went Wrong! Please try again later.
        </div>
      )}

      {isLoading || fetchedPlayerIsLoading ? (
        <div style={{ fontSize: 24 }}>Loading...</div>
      ) : (
        isSuccess &&
        fetchedPlayerSuccess && (
          <div className="wrapper-score-list-box-jz">
            {players.length > 0 ? (
              sortedPlayers(players).map((player, index) => (
                <ScoreRow
                  player={player}
                  key={`${player.name}-${index}`}
                  index={index}
                />
              ))
            ) : (
              <div>
                <p>{error}</p>
                <p>{fetchedPlayerError}</p>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

export default ScoreRows;
