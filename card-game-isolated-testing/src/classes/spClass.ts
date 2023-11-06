import { rarityMultiplier } from "../constants/cardStats/coefficients";
import { templateDataSP } from "../constants/templates/sps";
import {
  SPTemplateId,
  CardType,
  CardRarity,
  SPName,
  SPOutput,
  CardRequirements,
  SPCardData,
  OneToFive,
} from "../types";
import { formatDate, roundToDecimal } from "../utils/utilityFunctions";

export default class SPCard {
  readonly id: number;
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
  readonly desc: string;
  // private endDate?: number;
  // private usedFrom?: any; // Replace 'any' with a more specific type if possible

  private constructor(
    data: SPCardData,

    image: string
  ) {
    console.log("======================================================");
    console.log("1. The dataFromDB: ", data);
    console.log("======================================================");

    // From Caller
    this.img = image;

    // From DB or From Frontend
    this.id = data.id;
    this.state = Boolean(data.state);
    this.rarity = data.rarity;
    this.priceTag = data.priceTag;
    this.forSale = Boolean(data.in_mp);
    this.creationTime = data.creationTime;
    this.creator = data.creator;
    this.ownerId = data.ownerId;

    // From Templates
    this.templateId = data.templateId;

    this.requirements = this.calculateRequirements(
      templateDataSP[this.templateId].baseRequirements
    );
    this.output = this.calculateOutput(
      templateDataSP[this.templateId].baseOutput
    )!;
    this.desc = templateDataSP[this.templateId].desc;
    this.name = templateDataSP[this.templateId].name;
  }

  // Factory Methods
  static createNew(
    newId: number,
    ownerId: number,
    playerName: string,
    image: string,
    _templateId: SPTemplateId,

    _state: boolean = false
  ) {
    const defaultValues = {
      id: newId,
      rarity: this.generateRarityLevel(),
      priceTag: null,
      in_mp: false,
      creationTime: formatDate(new Date()),
      creator: playerName,
      templateId: _templateId,
      ownerId: ownerId,
      state: _state,
    };
    return new SPCard(defaultValues, image);
  }

  static fromDb(dataFromDB: SPCardData, image: string) {
    return new SPCard(dataFromDB, image);
  }

  public activate(): void {
    this.state = true;
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
    console.log("Base Requirements: ", baseValueObject);
    const updatedVersion: CardRequirements = {
      gold: -1,
      concrete: -1,
      crystals: -1,
      metals: -1,
      dieselBarrels: -1,
      citizens: -1,
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
    console.log("Updated Requirements: ", updatedVersion);

    return updatedVersion;
  }
}
