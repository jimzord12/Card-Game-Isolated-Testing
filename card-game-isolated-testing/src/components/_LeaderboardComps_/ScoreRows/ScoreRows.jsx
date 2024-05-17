import React, { useEffect } from "react";

import ScoreRow from "./ScoreRow.jsx";

import {
  sortedPlayers,
  TopThreeScores,
  AlternatingBackground,
} from "./utils.js";

const ScoreRows = ({ AllPlayersQuery, fetchedPlayerQuery }) => {
  const {
    data: players,
    isSuccess,
    isError,
    isLoading,
    error,
  } = AllPlayersQuery;
  const {
    data: fetchedPlayer,
    isSuccess: fetchedPlayerSuccess,
    isLoading: fetchedPlayerIsLoading,
    isError: fetchedPlayerIsError,
    error: fetchedPlayerError,
  } = fetchedPlayerQuery;

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
          {fetchedPlayerError}
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
