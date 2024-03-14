import { rarityMultiplier } from "../constants/cards/cardStats/coefficients";
import { templateIdToTemplateDataSP } from "../constants/templates/spsTemplates";
import { mysqlDatetimeToUnixTimestamp } from "../hooks/game/gameLoop/utils";
import {
  CardRarity,
  CardRequirements,
  CardType,
  OneToFive,
  SPCardData,
  SPName,
  SPOutput,
  SPTemplateId,
} from "../types";
import { formatDate, roundToDecimal } from "../utils";

interface NewSPCardArgs {
  ownerId: number;
  playerName: string;
  templateId: SPTemplateId;
}

export default class SPCard {
  public id: number | null;
  readonly templateId: SPTemplateId; // ✨
  readonly type: CardType = "sp"; // ✨
  readonly img: string;
  public rarity: CardRarity;
  public priceTag: number | null;
  public forSale: boolean;
  public creationTime: string;
  public creator: string;
  public state: boolean;
  public name: SPName;
  public output: SPOutput; // ✨
  public requirements: CardRequirements;
  public ownerId: number;
  public disabled: boolean = false;
  readonly desc: string;
  public expiresAtUnix: number | null;
  // private usedFrom?: any; // Replace 'any' with a more specific type if possible

  private constructor(data: SPCardData) {
    // console.log("======================================================");
    // console.log("| ✨ Constructor SP Card | The provided data: ", data);
    // console.log("======================================================");

    // From Caller
    this.img = templateIdToTemplateDataSP[data.templateId].image;

    // From DB or From Frontend
    this.id = data?.id ? data.id : null;
    this.state = Boolean(data.state);
    this.rarity = data.rarity;
    this.priceTag = data.priceTag;
    this.forSale = Boolean(data.in_mp);
    this.creationTime = data.creationTime;
    this.creator = data.creator;
    this.ownerId = data.ownerId;
    this.disabled = Boolean(data.disabled);
    this.expiresAtUnix = data.endDate
      ? mysqlDatetimeToUnixTimestamp(data.endDate) * 1000
      : null;

    // From Templates
    this.templateId = data.templateId;

    this.requirements = this.calculateRequirements(
      templateIdToTemplateDataSP[this.templateId].baseRequirements
    );
    this.output = this.calculateOutput(
      templateIdToTemplateDataSP[this.templateId].baseOutput
    )!;
    this.desc = templateIdToTemplateDataSP[this.templateId].desc;
    this.name = templateIdToTemplateDataSP[this.templateId].name;
  }

  // Factory Methods
  static createNew({ ownerId, playerName, templateId }: NewSPCardArgs) {
    const defaultValues = {
      id: null,
      rarity: this.generateRarityLevel(),
      priceTag: null,
      in_mp: false,
      creationTime: formatDate(new Date()),
      creator: playerName,
      templateId,
      ownerId: ownerId,
      state: false,
      disabled: false,
    };
    return new SPCard(defaultValues);
  }

  static fromDb(dataFromDB: SPCardData) {
    return new SPCard(dataFromDB);
  }

  public activate(expiresAtUnix: number): void {
    this.state = true;
    this.expiresAtUnix = expiresAtUnix;
  }

  public disable(): void {
    this.disabled = true;
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

  private calculateOutput(baseValueObject: SPOutput): SPOutput | undefined {
    const updatedVersion: SPOutput = { boost: -1 };

    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion.boost = roundToDecimal(
          baseValueObject.boost *
            (rarityMultiplier[Number(`${this.rarity}`)] + 0.25 + +1),
          2
        );
      }
      return updatedVersion;
    }
    return undefined;
  }

  private calculateRequirements(
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

    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        const typedKey = key as keyof CardRequirements; // Type assertion here
        updatedVersion[typedKey] = roundToDecimal(
          Number(baseValueObject[typedKey]),
          2
        );
      }
    }
    // console.log("Updated Requirements: ", updatedVersion);

    return updatedVersion;
  }
}
