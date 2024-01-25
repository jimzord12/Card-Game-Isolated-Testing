import "./styles.css";

interface AwesomeProcessBarProps {
  text: string;
  percentage: number;
}

const AwesomeProcessBar = ({ text, percentage }: AwesomeProcessBarProps) => {
  return (
    <div className="progress-container">
      <span className="span-abs">{text}</span>
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default AwesomeProcessBar;
