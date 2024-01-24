import BuildingCard from "../../classes/buildingClass_V2";
import RegCard from "../../classes/regClass_V2";
import {
  ActionsSectionAction,
  ActionsSectionType,
} from "./ActionsSectionTypes";
import { levelUpScreenIndexes, modalWithManagement } from "./constants";

interface createActionsProps {
  contentType: ActionsSectionType;
  card: BuildingCard | RegCard | undefined;
  townhallLevel: number;
  factoryLevel: number;
  currentScreen: number;
  setCurrentScreen: React.Dispatch<React.SetStateAction<number>>;
  deactivate: () => void;
  levelUp: () => void;
}

const createActions = ({
  contentType,
  card,
  factoryLevel,
  currentScreen,
  townhallLevel,
  setCurrentScreen,
  deactivate,
  levelUp,
}: createActionsProps) => {
  const handleLevelUp = (lvlUpScreenIndex: number) => {
    if (currentScreen === lvlUpScreenIndex) {
      levelUp();
    } else {
      setCurrentScreen(lvlUpScreenIndex);
    }
  };

  const deactivateAction: ActionsSectionAction = {
    label: "Deactivate",
    handler: deactivate,
  };

  const manageHospital: ActionsSectionAction = {
    label: "Manage",
    handler: () => setCurrentScreen(1),
  };

  const manageToolStore: ActionsSectionAction = {
    label: "Upgrade",
    handler: () => setCurrentScreen(1),
  };

  const manageTownHall: ActionsSectionAction = {
    label: "Manage Workers",
    handler: () => setCurrentScreen(1),
  };

  const goBack: ActionsSectionAction = {
    label: "Go Back",
    handler: () => setCurrentScreen(0),
  };

  // Level Up Actions
  // REGs
  const levelUpActionReg: ActionsSectionAction = {
    label: "Level Up",
    handler: () => handleLevelUp(levelUpScreenIndexes.reg),
    isDisabled: card?.level === 5,
  };

  // Building Passive
  const levelUpActionBP: ActionsSectionAction = {
    label: "Level Up",
    handler: () => handleLevelUp(levelUpScreenIndexes.buildingPassive),
    isDisabled: card?.level === 5,
  };

  // Hospital
  const levelUpActionHospital: ActionsSectionAction = {
    label: "Level Up",
    handler: () => handleLevelUp(levelUpScreenIndexes.hospital),
    isDisabled: card?.level === 5,
  };

  // Tool Store
  const levelUpActionToolStore: ActionsSectionAction = {
    label: "Level Up",
    handler: () => handleLevelUp(levelUpScreenIndexes.toolStore),
    isDisabled: card?.level === 5,
  };

  // Townhall
  const levelUpActionTownHall: ActionsSectionAction = {
    label: "Level Up",
    handler: () => handleLevelUp(levelUpScreenIndexes.townhall),
    isDisabled: townhallLevel === 5,
  };

  // Factory
  const levelUpActionFactory: ActionsSectionAction = {
    label: "Level Up",
    handler: () => handleLevelUp(levelUpScreenIndexes.factory),
    isDisabled: factoryLevel === 5,
  };

  const actions = (() => {
    switch (contentType) {
      case "reg":
        return [deactivateAction, levelUpActionReg];

      case "building-passive":
        return [deactivateAction, levelUpActionBP];

      case "hospital":
        return [deactivateAction, levelUpActionHospital, manageHospital];

      case "toolStore":
        return [deactivateAction, levelUpActionToolStore, manageToolStore];

      case "townhall":
        return [levelUpActionTownHall, manageTownHall];

      case "factory":
        return [levelUpActionFactory];
      default:
        return [];
    }
  })();

  if (modalWithManagement.includes(contentType) && currentScreen > 0) {
    // actions.pop();
    actions[actions.length - 1] = goBack;
  } else if (currentScreen !== 0) {
    actions.push(goBack);
  }

  return actions;
};
export { createActions };
