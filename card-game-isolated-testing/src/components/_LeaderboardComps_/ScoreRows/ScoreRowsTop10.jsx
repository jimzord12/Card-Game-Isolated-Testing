import { useEffect } from "react";
import { AlternatingBackground } from "./utils.js";
import ScoreRowTop10 from "./ScoreRowTop10.jsx";

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
