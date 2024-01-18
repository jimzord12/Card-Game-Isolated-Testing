import { useMemo, useState } from "react";
import BuildingCard from "../../../classes/buildingClass_V2";
import RegCard from "../../../classes/regClass_V2";
import { nameToTemplateDataBuilding } from "../../../constants/templates/buildings";
import { nameToTemplateDataREG } from "../../../constants/templates/regs";
import { useModalStore } from "../../../stores/modalStore";
import { useTownMapStore } from "../../../stores/townMapEntitiesStore";
import {
  BuildingName,
  BuildingSpot,
  CardSpot,
  CardType,
  RegName,
  RegSpot,
} from "../../../types";
import { getRandomNumberInRange } from "../../../utils/general/getRandomNumberInRange";
import TemplateCard from "../../Cards/TemplateCard/TemplateCard";
import ModalCloseBtn from "../BaseModalParts/ModalCloseBtn/ModalCloseBtn";
import ModalRarityIndicator from "../BaseModalParts/ModalRarityIndicator/ModalRarityIndicator";
import styles from "./cardPickerModalStyles.module.css";

type Props = {
  // type: Omit<CardType, "sp">;
  type: CardType;
  spot: CardSpot;
};

const CardPickerModal = ({ type, spot }: Props) => {
  const popModal = useModalStore((state) => state.popModal);
  const modalBg = useModalStore((state) => state.modalData.modalBg);
  const addEntity = useTownMapStore((state) => state.addEntity);

  const [isClosing, setIsClosing] = useState(false);
  // const provideModalData = useModalStore((state) => state.provideModalData);

  const buildingCardsNames: BuildingName[] = useMemo(
    () => ["AmusementPark", "Hospital", "RadioStation", "ToolStore"],
    []
  );

  const regCardsNames: RegName[] = useMemo(
    () => [
      "SimpleWindTurbine",
      "SuperWindTurbine",
      "SimpleSolarPanel",
      "SuperSolarPanel",
    ],
    []
  );

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      popModal();
    }, 700);
  };
  const modalClass = isClosing
    ? `${styles.cardPickerModalContainer} ${styles.slideOutEllipticTopBck}`
    : `${styles.cardPickerModalContainer} ${styles.enterAnimation}`;

  return (
    <div className={modalClass}>
      <div
        style={{
          background: `url(${modalBg})`,
          backgroundSize: "cover",
          // backgroundAttachment: "fixed",
          // backgroundPosition: "center",
        }}
        className={styles.backgroundImage}
      />
      <div className={styles.backgroundFilter} />

      <div className={styles.templateCardsContainer}>
        {type === "building"
          ? buildingCardsNames.map((cardName) => (
              <TemplateCard
                cardTemplateData={nameToTemplateDataBuilding[cardName]}
                onClick={() => {
                  console.log("[Building] - You Clicked this Card: ", cardName);
                  const cardId = Math.trunc(getRandomNumberInRange(1, 1000000));
                  const ownerId = Math.trunc(
                    getRandomNumberInRange(1, 1000000)
                  );
                  const newCard = BuildingCard.createNew(
                    cardId,
                    ownerId,
                    "generaTester01",
                    cardName,
                    spot as BuildingSpot,
                    true
                  );
                  console.log("JJJJJJJJ: ", spot);
                  addEntity(newCard);
                  setTimeout(() => {
                    popModal();
                  }, 400);
                }}
                // spot={spot}
                type={type}
                key={cardName}
              />
            ))
          : regCardsNames.map((cardName) => (
              <TemplateCard
                cardTemplateData={nameToTemplateDataREG[cardName]}
                onClick={() => {
                  console.log("[REG] - You Clicked this Card: ", cardName);
                  const cardId = getRandomNumberInRange(1, 1000000);
                  const ownerId = getRandomNumberInRange(1, 1000000);
                  const newCard = RegCard.createNew(
                    cardId,
                    ownerId,
                    "generaTester01",
                    cardName,
                    spot as RegSpot,
                    true
                  );
                  addEntity(newCard);
                  setTimeout(() => {
                    popModal();
                  }, 400);
                }}
                // size={200}
                type={type}
                key={cardName}
              />
            ))}
      </div>

      <div className={styles.modalElements}>
        <ModalCloseBtn onCloseHandler={handleClose} isClosing={isClosing} />
        {/* <ModalLevelIndicator isClosing={isClosing} level={townhallLevel} /> */}
        <ModalRarityIndicator
          isClosing={isClosing}
          rarityOrName={"Pick A Card"}
        />
      </div>
    </div>
  );
};

export default CardPickerModal;
