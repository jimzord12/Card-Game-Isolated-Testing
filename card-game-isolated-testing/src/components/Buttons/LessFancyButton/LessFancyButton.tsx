import styles from "./styles.module.css";

interface LessFancyButtonProps {
  text: string;
  onClick: () => void;
  variant?: "default" | "redish";
}

const LessFancyButton = ({
  text,
  onClick,
  variant = "default",
}: LessFancyButtonProps) => {
  return (
    <button className={styles.lessFancyBtn} onClick={onClick}>
      <span
        className={styles.text}
        style={{
          backgroundColor: variant === "redish" ? "rgba(173, 7, 7, 0.76)" : "",
        }}
      >
        {text}
      </span>
    </button>
  );
};

export default LessFancyButton;
