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
import { templateIdToTemplateDataBuilding } from "../../../constants/templates";

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
    activeBuildingCards,
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

  const noCardsTextStyles =
    "bg-slate-800/85 px-6 rounded-xl flex flex-col items-center justify-center leading-12 h-fit p-4 text-white text-3xl largeMobile:text-2xl tablet:text-3xl tablet:leading-12 tablet:p-6 largeScreen:text-5xl largeScreen:leading-12 largeScreen:p-8";

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

    if (isBuildingCard(card)) {
      let isAHospitalActive = false;
      // 1.1 Checking if the Card is a Hospital
      // 1.2 If it is, check if there is already an Active Hospital
      if (
        templateIdToTemplateDataBuilding[card.templateId].name === "Hospital"
      ) {
        activeBuildingCards.forEach((activeCard) => {
          console.log("activeCard: ", activeCard);
          console.log("cardName: ", templateIdToTemplateDataBuilding);

          const cardName =
            templateIdToTemplateDataBuilding[
              (activeCard as BuildingCard).templateId
            ].name;

          if (cardName === "Hospital") {
            toastError.showError(
              "Invalid Action",
              "You can only have one Active Hospital at a time!"
            );
            isAHospitalActive = true;
          }
        });
      }

      if (isAHospitalActive) return;
      card.activate(spot as BuildingSpot);
    }
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

    console.log("🤞👌:CardPickerModal: Card: ", card);

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
          `You need more ⚡ Energy to activate the (${card.name}) Card!`,
          `Energy Needed: ${card.maintenance.energy - energyRemaining}`
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
        }}
        className={styles.backgroundImage}
      />
      <div className={styles.backgroundFilter} />

      <div className={styles.templateCardsContainer}>
        {type === "building" && buildingCards.length === 0 ? (
          <div className={noCardsTextStyles}>
            <h1>No Available Cards.</h1>
            <div className="h-4 largeScreen:h-12" />
            <p className="text-xl largeScreen:text-3xl text-start">
              Try Crafting a Card by using the Craft Button.
            </p>
            <p className="text-xl self-start largeScreen:text-3xl">
              To find it:
            </p>
            <menu className="list-decimal mt-4 text-lg largeScreen:text-3xl">
              <li>Close this window.</li>
              <li>
                Then click the <span className="text-emerald-400">Actions</span>{" "}
                button on the{" "}
                <span className="text-emerald-400">top-right</span>.
              </li>
            </menu>
          </div>
        ) : type === "reg" && regCards.length === 0 ? (
          <div className={noCardsTextStyles}>
            <h1>No Available Cards.</h1>
            <div className="h-4 largeScreen:h-12" />
            <p className="text-xl largeScreen:text-3xl">
              Try Crafting Card, using the Craft Button.
            </p>
            <p className="text-xl self-start">To find it:</p>
            <menu className="list-decimal mt-4 text-lg largeScreen:text-3xl">
              <li>Close this window.</li>
              <li>
                Then click on the button on the{" "}
                <span className="text-emerald-400">top-right</span>.
              </li>
            </menu>
          </div>
        ) : (
          (type === "building" ? buildingCards : regCards).map((card) => (
            <CompleteCard
              card={card}
              onClick={() => handleActivate(card)}
              key={`CardPickerModal-${card.name}-${card.id}`}
            />
          ))
        )}
      </div>

      <div className={styles.modalElements}>
        <ModalCloseBtn onCloseHandler={handleClose} isClosing={isClosing} />
        <ModalRarityIndicator isClosing={isClosing} label={"Pick A Card"} />
      </div>
    </div>
  );
};

export default CardPickerModal;
