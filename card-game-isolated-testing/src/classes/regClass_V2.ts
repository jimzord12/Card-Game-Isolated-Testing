import {
  levelMultiplier,
  levelReqMulti,
  rarityMultiplier,
  upgradeCoef,
} from "../constants/cards/cardStats/coefficients";
import { templateIdToTemplateDataREG } from "../constants/templates/regsTemplates";
import {
  CardLevel,
  CardRarity,
  CardRequirements,
  CardType,
  OneToFive,
  RegCardData,
  RegMaintenance,
  RegName,
  RegOutput,
  RegSpot,
  RegTemplateId,
} from "../types";
import { formatDate, roundToDecimal } from "../utils";

interface NewRegCardArgs {
  ownerId: number;
  playerName: string;
  templateId: RegTemplateId;
}

export default class RegCard {
  public id: number | null;
  readonly templateId: RegTemplateId; // ✨
  readonly type: CardType = "reg"; // ✨
  readonly img: string;
  public spot: RegSpot; // ✨
  public rarity: CardRarity;
  public priceTag: number | null;
  public forSale: boolean;
  public creationTime: string;
  public creator: string;
  public state: boolean;
  public name: RegName;
  public output: RegOutput; // ✨
  public maintenance: RegMaintenance; // ✨
  public requirements: CardRequirements;
  public ownerId: number;
  public level: CardLevel;
  readonly desc: string;
  // private endDate?: number;
  // private usedFrom?: any; // Replace 'any' with a more specific type if possible

  private constructor(data: RegCardData) {
    // console.log("======================================================");
    // console.log("| ⚡ Constructor REG Card | The provided data: ", data);
    // console.log("======================================================");

    // console.log(
    //   "[1] - CLASS | REG::: Template Data: ",
    //   templateIdToTemplateDataREG
    // );
    // console.log("[2] - CLASS | REG::: Template ID: ", data.templateId);
    // console.log(
    //   "[3] - CLASS | REG::: Template Data based on ID: ",
    //   templateIdToTemplateDataREG[data.templateId]
    // );
    // From Caller
    this.img = templateIdToTemplateDataREG[data.templateId].image;

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
      templateIdToTemplateDataREG[this.templateId].baseMaintenance
    );
    this.requirements = this.updateRequirements(
      templateIdToTemplateDataREG[this.templateId].baseRequirements
    );
    this.output = this.updateOutput(
      templateIdToTemplateDataREG[this.templateId].baseOutput
    )!;
    this.desc = templateIdToTemplateDataREG[this.templateId].desc;
    this.name = templateIdToTemplateDataREG[this.templateId].name;
  }

  // Factory Methods - Use <ONLY> when creating a New Card
  static createNew({ ownerId, playerName, templateId }: NewRegCardArgs) {
    const _level: OneToFive = 1;
    const defaultValues = {
      id: null,
      rarity: this.generateRarityLevel(),
      priceTag: null,
      in_mp: false,
      creationTime: formatDate(new Date()),
      creator: playerName,
      spot: 0 as RegSpot,
      level: _level,
      templateId,
      ownerId: ownerId,
      state: false,
    };
    return new RegCard(defaultValues);
  }

  static fromDb(dataFromDB: RegCardData) {
    return new RegCard(dataFromDB);
  }

  /////////////////////////////////////////////////////////////////////////////
  public levelUp(): CardLevel | undefined {
    if (this.level === 5) return 5 as CardLevel;
    const newLevel = (this.level + 1) as CardLevel;
    if (newLevel >= 1 && newLevel <= 5) this.level = newLevel as CardLevel;

    const calculatedOutput = this.updateOutput(
      templateIdToTemplateDataREG[this.templateId].baseOutput
    );

    if (calculatedOutput === undefined)
      throw new Error("⛔ From: Reg Class, updateObjectValuesV1");

    this.output = calculatedOutput;

    this.maintenance = this.updateMaintenance(
      templateIdToTemplateDataREG[this.templateId].baseMaintenance
    );
    this.requirements = this.updateRequirements(
      templateIdToTemplateDataREG[this.templateId].baseRequirements
    );

    return this.level;
  }

  public activate(spot: RegSpot): void {
    this.state = true;
    this.spot = spot;
  }

  public deactivate(): void {
    this.state = false;
  }

  public setOwner(newOwnerId: number): void {
    this.ownerId = newOwnerId;
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

  private updateOutput(baseValueObject: RegOutput): RegOutput | undefined {
    const updatedVersion: RegOutput = { energy: -1 };

    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion.energy = roundToDecimal(
          baseValueObject.energy *
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

  private updateMaintenance(baseValueObject: RegMaintenance): RegMaintenance {
    // console.log("1. Base Requirements: ", baseValueObject);
    const updatedVersion: RegMaintenance = { gold: -1 };

    // console.log("2 | this.level: ", this.level);

    const levelMulti = levelReqMulti[Number(`${this.level}`)];
    const _upgradeCoef = upgradeCoef[Number(`${this.level}`)];
    // console.log("3.1 | levelMulti: ", levelMulti);
    // console.log("3.1 | _upgradeCoef: ", _upgradeCoef);

    const multiplier = levelMulti - _upgradeCoef + 1;

    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion.gold = roundToDecimal(
          Number(baseValueObject.gold) * multiplier,
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
