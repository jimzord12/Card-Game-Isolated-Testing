import { CardRequirements } from "../../types";

interface hasEnoughResourcesProps {
  playerResources: CardRequirements;
  requirements: CardRequirements;
}

export const hasEnoughResources = ({
  playerResources,
  requirements,
}: hasEnoughResourcesProps): string[] => {
  const alertFlags: string[] = [];

  for (const key in requirements) {
    if (Object.hasOwnProperty.call(requirements, key)) {
      // Checks if the requirements are met
      if (
        playerResources[key as keyof CardRequirements] <
        requirements[key as keyof CardRequirements]
      ) {
        // If they are NOT...
        alertFlags.push(key);
      }
    }
  }

  return alertFlags;
};

interface subtractResourcesProps {
  playerResources: CardRequirements;
  requirements: CardRequirements;
}

export const subtractResources = ({
  playerResources,
  requirements,
}: subtractResourcesProps) => {
  const newPlayerResources = { ...playerResources };
  for (const resource in requirements) {
    if (Object.hasOwnProperty.call(requirements, resource)) {
      newPlayerResources[resource as keyof CardRequirements] -=
        requirements[resource as keyof CardRequirements];
    }
  }

  return newPlayerResources;
};

interface addResourcesProps {
  playerResources: CardRequirements;
  requirements: CardRequirements;
  percentage?: number;
}

export const addResources = ({
  playerResources,
  requirements,
  percentage,
}: addResourcesProps) => {
  const newPlayerResources = { ...playerResources };
  for (const resource in requirements) {
    if (Object.hasOwnProperty.call(requirements, resource)) {
      newPlayerResources[resource as keyof CardRequirements] +=
        requirements[resource as keyof CardRequirements] * (percentage || 1);
    }
  }

  return newPlayerResources;
};
