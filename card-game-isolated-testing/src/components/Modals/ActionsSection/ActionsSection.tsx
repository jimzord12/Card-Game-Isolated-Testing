import type { Dispatch, SetStateAction } from "react";
import { updateCardData } from "../../../../api/apiFns";
import BuildingCard from "../../../classes/buildingClass_V2";
import RegCard from "../../../classes/regClass_V2";
import { useAllCardsStore } from "../../../stores/allCards";
import { useTownMapStore } from "../../../stores/townMapEntitiesStore";
import {
  ActionsSectionAction,
  ActionsSectionType,
} from "../../../types/ModalTypes/ActionsSectionTypes";
import ActionSectionBtn from "../../Buttons/ActionSectionBtn/ActionSectionBtn";
import styles from "./styles.module.css";
import type { AxiosError } from "axios";
import { CardLevel, Level } from "../../../types";
import { useGameVarsStore } from "../../../stores/gameVars";
import { createActions } from "../../../types/ModalTypes/modalActions";

interface ActionsSectionProps {
  contentType: ActionsSectionType;
  setCurrentScreen: Dispatch<SetStateAction<number>>;
  currentScreen: number;
  setCardLevel: Dispatch<SetStateAction<Level | CardLevel>>;
  card?: BuildingCard | RegCard;
  handleCloseModal: () => void;
}

const ActionsSection = ({
  contentType,
  card,
  setCurrentScreen,
  currentScreen,
  setCardLevel,
  handleCloseModal
}: ActionsSectionProps) => {
  const removeEntityFromMap = useTownMapStore((state) => state.removeEntity);
  const addCardToInventory = useAllCardsStore(
    (state) => state.addCardToInventory
  );
  const townhallLevel = useGameVarsStore((state) => state.townhallLevel);
  const setTownhallLevel = useGameVarsStore((state) => state.setTownhallLevel);

  const factoryLevel = useGameVarsStore((state) => state.factoryLevel);
  const setFactoryLevel = useGameVarsStore((state) => state.setFactoryLevel);

  // TODO: Make the Backend Updates first! And the Client ones after
  async function deactivate() {
    console.log("⚡ - Deactiating Card: ", card);
    if (card instanceof BuildingCard || card instanceof RegCard) {
      // Regarding Client Side:
      // 1. Remove Card from map
      removeEntityFromMap(card);
      // 2. Make Card state false (inactive)
      // 3. Set Card's spot to 0
      card.deactivate(); //This does both 1 and 2
      // 4. Add Card to Inventory
      addCardToInventory(card);
      console.log("⚡+✅ - In Frontend: Card Successfully Deactivated: ", card);
      
      handleCloseModal();

      // Regarding Server Side:
      // 1. Update Card's State and Spot in DB
      const success = await updateCardData({
        id: card.id,
        state: 0,
        on_map_spot: null,
      });
      if (!success)
        throw new Error(
          "⛔ ActionsSection: deactivate: Card was not updated in DB!"
        );
      console.log("⚡+✅ - In Backend: Card Successfully Deactivated: ", card);
    } else {
      throw new Error(
        "⛔ ActionsSection: |deactivate| Card is not an instance of any of the card classes!"
      );
    }
  }

  async function levelUp() {
    console.log("⚡ - Leveling Up Card: ", card);

    if (card instanceof BuildingCard || card instanceof RegCard) {
      // Regarding Client Side:
      // 1. Level up Card
      card.levelUp();
      setCardLevel(card.level);
      console.log("⚡+✅ - In Frontend: Card Successfully Leveled Up: ", card);
      // Regarding Server Side:
      // 1. Update Card's Level in DB
      try {
        const success = await updateCardData({
          id: card.id,
          level: card.level,
        });
        if (!success)
          throw new Error(
            "⛔ ActionsSection: levelUp: Card was not updated in DB! Probably it does not exists"
          );
        console.log("⚡+✅ - In Backend: Card Successfully Leveled Up: ", card);
      } catch (error) {
        throw new Error(
          "⛔ ActionsSection: levelUp: Card was not updated in DB!",
          error as AxiosError
        );
      }
    } else if (card === undefined && contentType === "townhall") {
      if (townhallLevel === 5) return;
      setTownhallLevel((townhallLevel + 1) as Level);
      console.log("✅ Townhall Leveled Up: ", townhallLevel);
      //TODO: Update Townhall Level in DB
    } else if (card === undefined && contentType === "factory") {
      if (factoryLevel === 5) return;
      setFactoryLevel((factoryLevel + 1) as Level);
      console.log("✅ Factory Leveled Up: ", factoryLevel);

      //TODO: Update factoryLevel in DB
      //TODO: Create a factoryLevel Column in the DB
    }
  }

  const actions = createActions({
    contentType,
    card,
    deactivate,
    levelUp,
    currentScreen,
    setCurrentScreen,
    townhallLevel,
    factoryLevel,
  });

  return (
    <div className={styles.actionSectionContainer}>
      {actions.map((action: ActionsSectionAction) => (
        <ActionSectionBtn
          key={action.label}
          text={action.label}
          clickHandler={action.handler}
          isDisabled={action.isDisabled}
        />
      ))}
    </div>
  );
};

export default ActionsSection;
