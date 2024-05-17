import { useEffect } from "react";
import { AlternatingBackground_Top10 } from "./utils.js";
import ScoreRowTop10 from "./ScoreRowTop10.jsx";

const ScoreRowsTop10 = ({ top10Players, fetchedPlayerQuery, error }) => {
  const {
    data: fetchedPlayer,
    isSuccess: fetchedPlayerSuccess,
    // isLoading: fetchedPlayerIsLoading,
    isError: fetchedPlayerIsError,
    error: fetchedPlayerError,
  } = fetchedPlayerQuery;

  useEffect(() => {
    if (fetchedPlayerSuccess && top10Players.length > 0) {
      AlternatingBackground_Top10(fetchedPlayer.player, top10Players);
      console.log("9999999999999999999999");
      console.log(top10Players);
    }
  }, [fetchedPlayerSuccess, top10Players.length]);

  if (error || fetchedPlayerIsError) {
    return (
      <div style={{ fontSize: 24, color: "red" }}>
        Oops! Something Went Wrong! Please try again later.
        {error}
        {fetchedPlayerError}
      </div>
    );
  }

  return (
    <>
      <div className="wrapper-score-list-box-jz">
        {top10Players.length > 0 ? (
          top10Players.map((player, index) => (
            <ScoreRowTop10
              player={player}
              key={`${player.name}-${index}`}
              index={index}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            Currently there are not any Players yet...
          </p>
        )}
      </div>
    </>
  );
};

export default ScoreRowsTop10;
