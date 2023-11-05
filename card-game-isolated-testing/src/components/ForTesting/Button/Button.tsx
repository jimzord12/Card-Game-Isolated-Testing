import styles from "./button.module.css";

interface ImageButtonProps {
  // imageSrc: string;
  children: string;
  onClick: () => void; // Assuming no arguments for the callback
}

const Button = ({ children, onClick }: ImageButtonProps) => {
  return (
    <div className={styles.general}>
      <button className={styles.button} onClick={onClick}>
        {/* <img
          className={styles.image}
          src={imageSrc}
          alt={text}
          style={{ maxWidth: "100%" }}
        /> */}
        <div className={styles.text}>{children}</div>
      </button>
    </div>
  );
};

export default Button;
