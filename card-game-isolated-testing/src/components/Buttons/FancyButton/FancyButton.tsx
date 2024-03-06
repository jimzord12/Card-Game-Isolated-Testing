import "./styles.css";

interface FancyButtonProps {
  text: string;
  onClick: () => void;
}

const FancyButton = ({ text, onClick }: FancyButtonProps) => {
  return (
    <button className="fancy-btn-btn" type="button" onClick={onClick}>
      <strong>{text}</strong>
      <div id="fancy-btn-container-stars">
        <div id="fancy-btn-stars"></div>
      </div>

      <div id="fancy-btn-glow">
        <div className="fancy-btn-circle"></div>
        <div className="fancy-btn-circle"></div>
      </div>
    </button>
  );
};

export default FancyButton;
