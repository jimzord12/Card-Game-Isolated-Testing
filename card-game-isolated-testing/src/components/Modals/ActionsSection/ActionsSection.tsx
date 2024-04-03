import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { updateCardData, updatePlayerData } from "../../../../api/apiFns";
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
import QuizModal from "../QuizModal/QuizModal";
import {
  factoryRequirements,
  townhallRequirements,
} from "../../../constants/game/defaultBuildingsConfig";
import { AxiosError } from "axios";
import { templateIdToTemplateDataBuilding } from "../../../constants/templates";
import { isBuildingCard } from "../../../types/TypeGuardFns/BuildingGuards";

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
      if (card instanceof RegCard) {
        const currentEnergyComsumed =
          useGameVarsStore.getState().energyConsumed;
        const currentEnergyProduced =
          useGameVarsStore.getState().energyProduced;
        const energyCardProduces = card.output.energy;
        const newEnergyProduced = currentEnergyProduced - energyCardProduces;

        if (currentEnergyComsumed > newEnergyProduced) {
          toastError.showError(
            "Invalid Action!",
            "You cannot deactivate this card, because it will cause an energy shortage!",
            "First, deactivate some Buildings."
          );
          setIsLoading(false);
          // popModal();
          return;
        }
      }
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

      // 🔷 Specificly For Hospital:
      if (
        isBuildingCard(card) &&
        templateIdToTemplateDataBuilding[card.templateId].name === "Hospital"
      ) {
        if (player !== null && player.id !== null) {
          updatePlayerData(player.id, {
            workers_hospital: 0,
          });
        } else {
          throw new Error(
            "⛔ ActionsSection: deactivate: Player is null or Player's ID is null!"
          );
        }
      }

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

    await waitFor(1);

    // In Case of [Townhall] or [Factory]
    if (contentType === "townhall" || contentType === "factory") {
      let success = undefined;
      const resources =
        contentType === "townhall"
          ? townhallRequirements[townhallLevel]
          : factoryRequirements[factoryLevel];

      console.log("ActionSection::levelup() => Townhall => resoruces: ", resources);

      try {
        success = await levelUpDefaultBuilding({
          playerResources,
          playerId: player.id,
          contentType,
        });
      } catch (error) {
        toastError.showError(
          "There was an Error!",
          "ActionsSection: LevelUp: Something went wrong!"
        );
        setIsLoading(false);
        popModal();
        throw new Error(
          "⛔ ActionsSection: LevelUp: Townhall or Factory was not updated in DB!",
          error as AxiosError
        );
      } finally {
        setIsLoading(false);
        popModal();
      }

      if (success) pushModal(<QuizModal resourceCosts={resources} />);
    } else if (card) {
      // 💥 In Case of [Card]
      const success = await levelUpCard({
        card,
        playerResources,
        playerId: player.id,
      });

      setIsLoading(false);
      popModal();

      if (card?.requirements === null || card?.requirements === undefined)
        throw new Error(
          "⛔ ActionsSection.tsx: Card's requirements are null or undefined!"
        );
      if (success) pushModal(<QuizModal resourceCosts={card?.requirements} />);
    } else {
      toastError.showError(
        "There was an Error!",
        "ActionsSection: LevelUp: Card is null, or contentType is not 'townhall' or 'factory'!"
      );
      popModal();
      throw new Error(
        "⛔ ActionsSection: LevelUp: Card is null! or contentType is not 'townhall' or 'factory'!"
      );
    }
    setIsLoading(false);
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
