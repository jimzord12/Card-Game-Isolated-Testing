import React, { useEffect, useMemo } from "react";

import ScoreRow from "./ScoreRow.jsx";

import {
  sortedPlayers,
  TopThreeScores,
  AlternatingBackground,
} from "./utils.js";

const ScoreRows = ({
  AllPlayersQuery,
  fetchedPlayerQuery,
  workshop2,
  workshop3,
}) => {
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

  // Filter logic
  const filteredData = useMemo(() => {
    if (AllPlayersQuery.isFetching) return [];

    // Apply filtering based on states
    return players.filter((player) => {
      if (workshop2) return player.name.startsWith("uniwa ws2");
      if (workshop3) return player.name.startsWith("uniwa ws3");
      return true;
    });

    // AlternatingBackground(fetchedPlayer.player, filteredPlayers);
    // return filteredPlayers;
  }, [AllPlayersQuery.isFetching, players, workshop2, workshop3]);

  useEffect(() => {
    if (isSuccess && fetchedPlayerSuccess) {
      if (filteredData.length > 0) {
        // ✨ 🥩 Use the utils functions with the right sequence to store the data into sessionStorage
        // ✨ 🥩 and then retrieve and display them
        TopThreeScores(filteredData);

        AlternatingBackground(fetchedPlayer.player, filteredData);
        console.log(filteredData);
      }
    }
  }, [fetchedPlayer, fetchedPlayerSuccess, isSuccess, filteredData]);

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
            {filteredData.length > 0 ? (
              sortedPlayers(filteredData).map((player, index) => (
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
