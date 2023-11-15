import styles from "./actionSectionBtnStyles.module.css";

interface Props {
  text: string;
  clickHandler: () => void;
}

const ActionSectionBtn = ({ text, clickHandler }: Props) => {
  return (
    <button className={styles.glowOnHover} type="button" onClick={clickHandler}>
      {text}
    </button>
  );
};

export default ActionSectionBtn;