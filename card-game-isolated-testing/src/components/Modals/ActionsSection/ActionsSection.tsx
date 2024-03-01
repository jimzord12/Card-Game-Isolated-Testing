import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
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
import { CardLevel, CardRequirements, Level } from "../../../types";
import { useGameVarsStore } from "../../../stores/gameVars";
import useModalActions from "./useModalActions";
import { useToastError } from "../../../hooks/notifications";
import useCardLevelUp from "./useCardLevelUp";
import useDefaultBuildingLevelUp from "./useDefaultBuildingLevelUp";
import LoadingModal from "../LoadingModal/LoadingModal";
import { useModalStore } from "../../../stores/modalStore";
import { waitFor } from "../../../utils/general/waitPlease";

interface ActionsSectionProps {
  contentType: ActionsSectionType;
  setCurrentScreenIndex: Dispatch<SetStateAction<number>>;
  currentScreenIndex: number;
  setCardLevel: Dispatch<SetStateAction<Level | CardLevel>>;
  card?: BuildingCard | RegCard;
  handleCloseModal: () => void;
}

const ActionsSection = ({
  contentType,
  card,
  setCurrentScreenIndex,
  currentScreenIndex,
  setCardLevel,
  handleCloseModal,
}: ActionsSectionProps) => {
  const removeEntityFromMap = useTownMapStore((state) => state.removeEntity);
  const addCardToInventory = useAllCardsStore(
    (state) => state.addCardToInventory
  );
  const removeCardFromActiveCards = useAllCardsStore(
    (state) => state.removeCardFromActiveCards
  );

  const player = useGameVarsStore((state) => state.player);

  const townhallLevel = useGameVarsStore((state) => state.townhallLevel);

  const factoryLevel = useGameVarsStore((state) => state.factoryLevel);

  const toastError = useToastError();

  const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);

  const { levelUpCard } = useCardLevelUp({
    setCardLevel,
  });
  const { levelUpDefaultBuilding } = useDefaultBuildingLevelUp();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) pushModal(<LoadingModal />);
  }, [isLoading]);

  // TODO: Make the Backend Updates first! And the Client ones after
  async function deactivate() {
    setIsLoading(true);
    console.log("⚡ - Deactiating Card: ", card);
    if (
      (card instanceof BuildingCard || card instanceof RegCard) &&
      card.id !== null
    ) {
      // Regarding Client Side:
      // 1. Remove Card from map
      removeEntityFromMap(card);
      // 2. Make Card state false (inactive)
      // 3. Set Card's spot to 0
      card.deactivate(); //This does both 1 and 2

      // 4. Remove Card from Active Cards
      removeCardFromActiveCards(card);

      // 5. Add Card to Inventory
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
      setIsLoading(false);
      popModal();
    } else {
      setIsLoading(false);
      popModal();
      throw new Error(
        "⛔ ActionsSection: |deactivate| Card is not an instance of any of the card classes!"
      );
    }
  }

  async function levelUp() {
    setIsLoading(true);
    console.log("⚡ - (Action Section) - Leveling Up Card: ", card);
    if (
      player === null ||
      player.gold === null ||
      player.concrete === null ||
      player.metals === null ||
      player.crystals === null ||
      player.population === null ||
      player.diesel === null
    ) {
      toastError.showError(
        "There was an Error!",
        "ActionsSection: LevelUp: Something is null!"
      );
      throw new Error("⛔ ActionsSection: LevelUp: Player is null!");
    }
    const playerResources: CardRequirements = {
      gold: player.gold,
      concrete: player.concrete,
      metals: player.metals,
      crystals: player.crystals,
      population: player.population,
      diesel: player.diesel,
    };

    await waitFor(2);

    // In Case of [Townhall] or [Factory]
    if (contentType === "townhall" || contentType === "factory") {
      levelUpDefaultBuilding({
        playerResources,
        playerId: player.id,
        contentType,
      });
    } else if (card) {
      // 💥 In Case of [Card]
      levelUpCard({
        card,
        playerResources,
        playerId: player.id,
      });
    } else {
      toastError.showError(
        "There was an Error!",
        "ActionsSection: LevelUp: Card is null, or contentType is not 'townhall' or 'factory'!"
      );
      popModal();
      setIsLoading(false);
      throw new Error(
        "⛔ ActionsSection: LevelUp: Card is null! or contentType is not 'townhall' or 'factory'!"
      );
    }
    setIsLoading(false);
    popModal();
  }

  const actions = useModalActions({
    contentType,
    card,
    deactivate,
    levelUp,
    currentScreenIndex,
    setCurrentScreenIndex,
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
