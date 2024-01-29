import Confetti from "react-confetti";

interface Props {
  message: string;
  title: string;
  seconds?: number;
}

const CustomToastWithConfetti = ({ message, title }: Props) => {
  return (
    <div>
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      <h2 style={{ color: "green", fontSize: "24px" }}>{title}</h2>
      <p style={{ color: "black", fontSize: "16px" }}>{message}</p>
    </div>
  );
};

export default CustomToastWithConfetti;
