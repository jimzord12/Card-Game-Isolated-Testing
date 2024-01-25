import styles from "./actionSectionBtnStyles.module.css";

export interface ActionSectionBtnProps {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickHandler: ((any: any) => void) | (() => void);
  isDisabled?: boolean;
}

const ActionSectionBtn = ({
  text,
  clickHandler,
  isDisabled = false,
}: ActionSectionBtnProps) => {
  return (
    <button
      className={
        isDisabled
          ? styles.glowOnHover.concat(" ", styles.disabled)
          : styles.glowOnHover.concat(" ", styles.rollInRight)
      }
      type="button"
      onClick={clickHandler}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default ActionSectionBtn;
