import {
  levelMultiplier,
  levelReqMulti,
  rarityMultiplier,
  upgradeCoef,
} from "../constants/cards/cardStats/coefficients";
import {
  nameToTemplateDataBuilding,
  templateIdToTemplateDataBuilding,
} from "../constants/templates/buildingsTemplates";
import {
  BuildingCardData,
  BuildingMaintenance,
  BuildingName,
  BuildingOutput,
  BuildingSpot,
  BuildingStats,
  BuildingTemplateId,
  CardLevel,
  CardRarity,
  CardRequirements,
  CardType,
  OneToFive,
} from "../types";
import { formatDate, roundToDecimal } from "../utils";
import { formatDateString } from "../utils/dateRelated/dateRelated";

interface NewBuildingCardArgs {
  ownerId: number;
  playerName: string;
  templateId: BuildingTemplateId;
}

export default class BuildingCard {
  public id: number | null;
  readonly templateId: BuildingTemplateId;
  readonly type: CardType = "building"; // ✨
  readonly img: string;
  // readonly templateData: templateIdToTemplateDataBuilding;
  public spot: BuildingSpot; // ✨
  public rarity: CardRarity;
  public priceTag: number | null;
  public forSale: boolean;
  public creationTime: string;
  public creator: string;
  public state: boolean;
  public name: BuildingName;
  public output: BuildingOutput;
  public maintenance: BuildingMaintenance;
  public requirements: CardRequirements;
  public stats?: BuildingStats; // Replace 'any' with a more specific type if possible
  public ownerId: number;
  public level: CardLevel;
  readonly desc: string;
  public in_mp?: boolean;
  public locked?: boolean;
  public town_id?: number;
  public disabled?: boolean;
  public endDate?: string;
  // private endDate?: number;
  // private usedFrom?: any; // Replace 'any' with a more specific type if possible
  public doctors?: number;

  private constructor(
    data: BuildingCardData
    // templateData: templateIdToTemplateDataBuilding,
  ) {
    // console.log("======================================================");
    // console.log("| 🏡 Constructor Building Card | The provided data: ", data);
    // console.log("======================================================");

    // From Caller
    this.img = templateIdToTemplateDataBuilding[data.templateId].image;

    // From DB or From Frontend
    this.id = data.id ? data.id : null;
    this.state = Boolean(data.state);
    this.rarity = data.rarity;
    this.priceTag = data.priceTag;
    this.forSale = Boolean(data.in_mp);
    this.creationTime = data.creationTime;
    this.creator = data.creator;
    this.spot = data.spot;
    this.level = data.level;
    this.ownerId = data.ownerId;

    // From Templates
    this.templateId = data.templateId;
    this.maintenance = this.updateMaintenance(
      templateIdToTemplateDataBuilding[this.templateId].baseMaintenance
    );
    this.requirements = this.updateRequirements(
      templateIdToTemplateDataBuilding[this.templateId].baseRequirements
    );
    this.output = this.updateOutput(
      templateIdToTemplateDataBuilding[this.templateId].baseOutput
    )!;
    this.desc = templateIdToTemplateDataBuilding[this.templateId].desc;
    this.name = templateIdToTemplateDataBuilding[this.templateId].name;

    // ToolsStore
    if (data.templateId === nameToTemplateDataBuilding.ToolStore.id) {
      this.stats = data.stats
        ? data.stats
        : { gold: 1, concrete: 1, crystals: 1, metals: 1 };
    }
  }

  // Factory Methods
  static createNew({ ownerId, playerName, templateId }: NewBuildingCardArgs) {
    const _level: OneToFive = 1;
    const defaultValues = {
      id: null,
      rarity: this.generateRarityLevel(),
      priceTag: null,
      in_mp: false,
      creationTime: formatDate(new Date()),
      creator: playerName,
      spot: 0 as BuildingSpot,
      level: _level,
      templateId,
      ownerId: ownerId,
      state: false,
    };
    return new BuildingCard(defaultValues);
  }

  static fromDb(
    dataFromDB: BuildingCardData
    // templateData: templateIdToTemplateDataBuilding,
  ) {
    // Transform CardFromDB to BuildingCard properties
    return new BuildingCard(dataFromDB);
  }

  /////////////////////////////////////////////////////////////////////////////
  public levelUp(): CardLevel {
    if (this.level === 5) return 5 as CardLevel;
    const newLevel = (this.level + 1) as CardLevel;
    if (newLevel >= 1 && newLevel <= 5) this.level = newLevel as CardLevel;

    const calculatedOutput = this.updateOutput(
      templateIdToTemplateDataBuilding[this.templateId].baseOutput
    );

    if (calculatedOutput === undefined)
      throw new Error("⛔ From: Building Class, updateObjectValuesV1");

    this.output = calculatedOutput;

    this.maintenance = this.updateMaintenance(
      templateIdToTemplateDataBuilding[this.templateId].baseMaintenance
    );
    this.requirements = this.updateRequirements(
      templateIdToTemplateDataBuilding[this.templateId].baseRequirements
    );

    return this.level;
  }

  public getCreationTime(): string {
    return formatDateString(this.creationTime);
  }

  public activate(spot: BuildingSpot): void {
    this.state = true;
    this.spot = spot;
  }

  public deactivate(): void {
    this.state = false;
    this.spot = 0;
  }

  public setOwner(newOwnerId: number): void {
    this.ownerId = newOwnerId;
  }

  public updateStats(statsObj: BuildingStats): void {
    this.stats = { ...this.stats, ...statsObj };
  }

  private static generateRarityLevel(): OneToFive {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      return 1; // common 50%
    } else if (randomNumber < 0.7) {
      return 2; // special 30%
    } else if (randomNumber < 0.88) {
      return 3; // rare 15%
    } else if (randomNumber < 0.96) {
      return 4; // mythic 5%
    } else {
      return 5; // legendary
    }
  }

  private updateOutput(
    baseValueObject: BuildingOutput
  ): BuildingOutput | undefined {
    const updatedVersion: BuildingOutput = { boost: -1 };

    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion.boost = roundToDecimal(
          baseValueObject.boost *
            (levelMultiplier[Number(`${this.level}`)] +
              rarityMultiplier[Number(`${this.rarity}`)] +
              1),
          2
        );
      }
      return updatedVersion;
    }
    return undefined;
  }

  private updateMaintenance(
    baseValueObject: BuildingMaintenance
  ): BuildingMaintenance {
    // console.log("1. Base Requirements: ", baseValueObject);
    const updatedVersion: BuildingMaintenance = { energy: -1 };

    // console.log("2 | this.level: ", this.level);

    const levelMulti = levelReqMulti[Number(`${this.level}`)];
    const _upgradeCoef = upgradeCoef[Number(`${this.level}`)];
    // console.log("3.1 | levelMulti: ", levelMulti);
    // console.log("3.1 | _upgradeCoef: ", _upgradeCoef);

    const multiplier = levelMulti - _upgradeCoef + 1;

    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion.energy = roundToDecimal(
          Number(baseValueObject.energy) * multiplier,
          2
        );
      }
    }
    // console.log("4. Updated Requirements: ", updatedVersion);

    return updatedVersion;
  }

  private updateRequirements(
    baseValueObject: CardRequirements
  ): CardRequirements {
    // console.log("Base Requirements: ", baseValueObject);
    const updatedVersion: CardRequirements = {
      gold: -1,
      concrete: -1,
      crystals: -1,
      metals: -1,
      diesel: -1,
      population: -1,
    };

    const levelMulti = levelReqMulti[Number(`${this.level}`)];
    const _upgradeCoef = upgradeCoef[Number(`${this.level}`)];

    const multiplier = levelMulti - _upgradeCoef + 1;

    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        const typedKey = key as keyof CardRequirements; // Type assertion here
        updatedVersion[typedKey] = roundToDecimal(
          Number(baseValueObject[typedKey]) * multiplier,
          2
        );
      }
    }
    // console.log("Updated Requirements: ", updatedVersion);

    return updatedVersion;
  }
}
