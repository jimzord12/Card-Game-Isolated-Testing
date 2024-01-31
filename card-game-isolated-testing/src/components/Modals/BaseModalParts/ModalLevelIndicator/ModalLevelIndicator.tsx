import { useEffect, useState } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { ActionsSectionType } from "../../../../types/ModalTypes/ActionsSectionTypes";
import styles from "./modalLevel.module.css";
import { useGameVarsStore } from "../../../../stores/gameVars";

interface Props {
  isClosing?: boolean;
  level: number | null | undefined;
  contentType: ActionsSectionType;
  storybookTesting?: string;
  withAnimation?: boolean;
  usage: "Modal" | "Card";
}

const ModalLevelIndicator = ({
  isClosing,
  level,
  contentType,
  withAnimation = true,
  usage,
}: Props) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ ModalLevelIndicator, images is undefined!");

  const [levelToDisplay, setLevelToDisplay] = useState<
    number | null | undefined
  >(level);

  const townhallLevel = useGameVarsStore((state) => state.townhallLevel);
  const factoryLevel = useGameVarsStore((state) => state.factoryLevel);

  // I do not like it, but it works.
  useEffect(() => {
    console.log("ModalLevelIndicator: Updating Internal State: ", level);
    setLevelToDisplay(level);
  }, [level]);

  useEffect(() => {
    if (contentType === "townhall") setLevelToDisplay(townhallLevel);
    if (contentType === "factory") setLevelToDisplay(factoryLevel);
  }, [contentType, factoryLevel, townhallLevel]);

  const modalLevelIconClass = withAnimation
    ? isClosing
      ? `${styles.modalLevelIconContainer} ${styles.slideOutEllipticTopBck}`
      : `${styles.modalLevelIconContainer} ${styles.bounceInTop}`
    : `${styles.modalLevelIconContainer}`;

  return (
    <div className={modalLevelIconClass}>
      {level !== null && (
        <>
          <img
            className={styles[`modalLevelIconImg${usage}`]}
            src={images?.labels?.levelLabel}
            alt="modal Level Icon"
          />
          <h3 className={styles[`levelText${usage}`]}>{levelToDisplay}</h3>
        </>
      )}
    </div>
  );
};

export default ModalLevelIndicator;
