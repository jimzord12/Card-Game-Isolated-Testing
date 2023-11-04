import styles from "./button.module.css";

interface ImageButtonProps {
  imageSrc: string;
  text: string;
  onClick: () => void; // Assuming no arguments for the callback
}

const Button = ({ imageSrc, text, onClick }: ImageButtonProps) => {
  return (
    <div className={styles.general}>
      <button className={styles.button} onClick={onClick}>
        <img
          className={styles.image}
          src={imageSrc}
          alt={text}
          style={{ maxWidth: "100%" }}
        />
        <div className={styles.text}>{text}</div>
      </button>
    </div>
  );
};

export default Button;
