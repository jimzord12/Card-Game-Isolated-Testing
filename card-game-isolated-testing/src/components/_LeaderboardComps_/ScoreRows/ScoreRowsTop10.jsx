import { useEffect } from "react";
import ScoreRow from "./ScoreRow.jsx";
import { AlternatingBackground } from "./utils.js";

const ScoreRowsTop10 = ({ top10Players, error }) => {
  useEffect(() => {
    if (top10Players.length > 0) {
      AlternatingBackground(null, top10Players);
    }
  }, []);

  if (error) {
    return (
      <div style={{ fontSize: 24, color: "red" }}>
        Oops! Something Went Wrong! Please try again later.
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="wrapper-score-list-box-jz">
        {top10Players.length > 0 ? (
          top10Players.map((player, index) => (
            <ScoreRow
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
