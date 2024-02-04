import { useState } from "react";
import BuildingCard from "../../../classes/buildingClass_V2";
import RegCard from "../../../classes/regClass_V2";
import { useModalStore } from "../../../stores/modalStore";
import { useTownMapStore } from "../../../stores/townMapEntitiesStore";
import { BuildingSpot, CardSpot, CardType, RegSpot } from "../../../types";
import ModalCloseBtn from "../BaseModalParts/ModalCloseBtn/ModalCloseBtn";
import ModalRarityIndicator from "../BaseModalParts/ModalCenterLabel/ModalCenterLabel";
import styles from "./cardPickerModalStyles.module.css";
import { UseGlobalContext } from "../../../context/GlobalContext/GlobalContext";
import { useAllCardsStore } from "../../../stores/allCards";
import { updateCardData } from "../../../../api/apiFns";
import { isBuildingCard } from "../../../types/TypeGuardFns/BuildingGuards";
import { isRegCard } from "../../../types/TypeGuardFns/RegGuards";
import { useGameVarsStore } from "../../../stores/gameVars";
import { useToastError } from "../../../hooks/notifications";
import CompleteCard from "../../Cards/CardTemplates/CompleteCard/CompleteCard";

type Props = {
  type: CardType;
  spot: CardSpot;
};

const CardPickerModal = ({ type, spot }: Props) => {
  // State
  const [isClosing, setIsClosing] = useState(false);

  // Zustang Stores
  const popModal = useModalStore((state) => state.popModal);
  const addEntity = useTownMapStore((state) => state.addEntity);
  const {
    inventory: inventoryCards,
    addCardToActiveCards,
    removeCardFromInventory,
  } = useAllCardsStore((state) => state);
  const { energyRemaining, player } = useGameVarsStore((state) => state);

  // Hooks
  const toastError = useToastError();
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ CardPicker, images is undefined!");

  // Local Vars
  const buildingCards: BuildingCard[] = inventoryCards.filter(isBuildingCard);
  const regCards: RegCard[] = inventoryCards.filter(isRegCard);

  // Animation Classes
  const modalClass = isClosing
    ? `${styles.cardPickerModalContainer} ${styles.slideOutEllipticTopBck}`
    : `${styles.cardPickerModalContainer} ${styles.enterAnimation}`;

  // Handlers
  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      popModal();
    }, 700);
  };

  const handleActivate = (card: BuildingCard | RegCard) => {
    // 0. Perform Nessessary Checks (Includes Toasts)
    if (card.id === null)
      throw new Error("⛔ CardPickerModal: Card ID is undefined!");
    if (!canBeActivated(card))
      throw new Error("⛔ CardPickerModal: Card can NOT be Activated!");

    // 1. Activate the Card
    if (isBuildingCard(card)) card.activate(spot as BuildingSpot);
    if (isRegCard(card)) card.activate(spot as RegSpot);
    if (!isBuildingCard(card) && !isRegCard(card)) {
      toastError.showError(
        "Invalid Card Type",
        "CardPicker: Card is neither a BuildingCard or a RegCard!"
      );
      throw new Error(
        "⛔ CardPickerModal: handleActivate: Card is neither a BuildingCard or a RegCard!"
      );
    }

    // 2. Add the Card to the TownMap
    addEntity(card);

    // 3. Add the Card to the Activated Cards
    addCardToActiveCards(card);

    // 4. Remove the Card from the Inventory
    removeCardFromInventory(card);

    // 5. Update Card's State in MySQL Database

    updateCardData({
      id: card.id,
      on_map_spot: spot,
      state: 1,
    });

    // console.log("✅ SUCCESSFUL ACTIVATION ✅");
    setTimeout(() => {
      popModal();
    }, 250);
  };

  // Utility Functions
  const canBeActivated = (card: BuildingCard | RegCard): boolean => {
    if (isBuildingCard(card)) {
      if (energyRemaining - card.maintenance.energy < 0) {
        toastError.showError(
          "Insufficient Energy",
          `You need more ⚡ Energy to activate the (${card.name}) Card!`
        );
        return false;
      }
      return true;
    } else {
      if (player === null || player.gold === null)
        throw new Error(
          "⛔ CardPickerModal: canBeActivated: Player is nulll or player.gold is null!"
        );
      if (player.gold - card.maintenance.gold < 0) {
        toastError.showError(
          "Insufficient Energy",
          `You need more 💰 Gold to activate the (${card.name}) Card!`
        );
        return false;
      }
      return true;
    }
  };

  return (
    <div className={modalClass}>
      <div
        style={{
          background: `url(${
            type === "reg"
              ? images.modal_backgrounds.levelUpRegBG
              : images.modal_backgrounds.levelUpBuildingBG
          })`,
          backgroundSize: "cover",
          // backgroundAttachment: "fixed",
          // backgroundPosition: "center",
        }}
        className={styles.backgroundImage}
      />
      <div className={styles.backgroundFilter} />

      <div className={styles.templateCardsContainer}>
        {type === "building"
          ? buildingCards.map((card) => (
              <CompleteCard
                card={card}
                onClick={() => handleActivate(card)}
                key={`CardPickerModal-${card.name}`}
              />
            ))
          : regCards.map((card) => (
              <CompleteCard
                card={card}
                onClick={() => handleActivate(card)}
                key={`CardPickerModal-${card.name}`}
              />
            ))}
      </div>

      <div className={styles.modalElements}>
        <ModalCloseBtn onCloseHandler={handleClose} isClosing={isClosing} />
        {/* <ModalLevelIndicator isClosing={isClosing} level={townhallLevel} /> */}
        <ModalRarityIndicator isClosing={isClosing} label={"Pick A Card"} />
      </div>
    </div>
  );
};

export default CardPickerModal;
