import gold from "./metalsImgs/gold.png";
import silver from "./metalsImgs/silver.png";
import bronze from "./metalsImgs/bronze.png";

const ScoreRowTop10 = ({ player, index }) => {
  let medalImage = null;
  if (index === 0) {
    medalImage = <img src={gold} alt="Gold medal" className="medal" />;
  } else if (index === 1) {
    medalImage = <img src={silver} alt="Silver medal" className="medal" />;
  } else if (index === 2) {
    medalImage = <img src={bronze} alt="Bronze medal" className="medal" />;
  }

  return (
    <div className="score-list-row">
      <div className="wrapper-serial-image">
        <span className="serial-number">{index + 1}</span>
        <div className="image-holder">{medalImage}</div>
      </div>
      <div className="wrapper-name-score">
        <p className="score-list-name">{player.name}</p>
        <p className="score-list-score">{`+${(10 - index) * 3} MGS`}</p>
      </div>
    </div>
  );
};

export default ScoreRowTop10;
