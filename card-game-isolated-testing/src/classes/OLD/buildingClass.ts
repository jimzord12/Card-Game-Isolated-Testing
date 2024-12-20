// import {
//   levelMultiplier,
//   levelReqMulti,
//   rarityMultiplier,
//   upgradeCoef,
// } from "../constants/cards/cardStats/coefficients";
// import { templateIdToTemplateDataBuilding } from "../constants/templates/buildings";
// import {
//   BuildingCardData,
//   BuildingMaintenance,
//   BuildingName,
//   BuildingOutput,
//   BuildingSpot,
//   BuildingStats,
//   BuildingTemplateId,
//   CardLevel,
//   CardRarity,
//   CardRequirements,
//   CardType,
//   OneToFive,
// } from "../types";
// import { formatDate, roundToDecimal } from "../utils/utilityFunctions";

// export default class BuildingCard {
//   readonly id: number;
//   readonly templateId: BuildingTemplateId;
//   readonly type: CardType = "building"; // ✨
//   readonly img: string;
//   // readonly templateData: templateIdToTemplateDataBuilding;
//   public spot: BuildingSpot; // ✨
//   public rarity: CardRarity;
//   public priceTag: number | null;
//   public forSale: boolean;
//   public creationTime: string;
//   public creator: string;
//   public state: boolean;
//   public name: BuildingName;
//   public output: BuildingOutput;
//   public maintenance: BuildingMaintenance;
//   public requirements: CardRequirements;
//   public stats?: BuildingStats; // Replace 'any' with a more specific type if possible
//   public ownerId: number;
//   public level: CardLevel;
//   readonly desc: string;
//   // private endDate?: number;
//   // private usedFrom?: any; // Replace 'any' with a more specific type if possible
//   public doctors?: number;

//   private constructor(
//     data: BuildingCardData,
//     // templateData: templateIdToTemplateDataBuilding,
//     image: string
//   ) {
//     console.log("======================================================");
//     console.log("1. The dataFromDB: ", data);
//     console.log("======================================================");

//     // From Caller
//     this.img = image;

//     // From DB or From Frontend
//     this.id = data.id;
//     this.state = Boolean(data.state);
//     this.rarity = data.rarity;
//     this.priceTag = data.priceTag;
//     this.forSale = Boolean(data.in_mp);
//     this.creationTime = data.creationTime;
//     this.creator = data.creator;
//     this.spot = data.spot;
//     this.level = data.level;
//     this.ownerId = data.ownerId;

//     // From Templates
//     this.templateId = data.templateId;
//     this.maintenance = this.updateMaintenance(
//       templateIdToTemplateDataBuilding[this.templateId].baseMaintenance
//     );
//     this.requirements = this.updateRequirements(
//       templateIdToTemplateDataBuilding[this.templateId].baseRequirements
//     );
//     this.output = this.updateOutput(
//       templateIdToTemplateDataBuilding[this.templateId].baseOutput
//     )!;
//     this.desc = templateIdToTemplateDataBuilding[this.templateId].desc;
//     this.name = templateIdToTemplateDataBuilding[this.templateId].name;
//   }

//   // Factory Methods
//   static createNew(
//     newId: number,
//     ownerId: number,
//     playerName: string,
//     image: string,
//     _templateId: BuildingTemplateId,
//     _spot: BuildingSpot = 0,
//     _state: boolean = false
//   ) {
//     const _level: OneToFive = 1;
//     const defaultValues = {
//       id: newId + 1000,
//       rarity: this.generateRarityLevel(),
//       priceTag: null,
//       in_mp: false,
//       creationTime: formatDate(new Date()),
//       creator: playerName,
//       spot: _spot,
//       level: _level,
//       templateId: _templateId,
//       ownerId: ownerId,
//       state: _state,
//     };
//     return new BuildingCard(defaultValues, image);
//   }

//   static fromDb(
//     dataFromDB: BuildingCardData,
//     // templateData: templateIdToTemplateDataBuilding,
//     image: string
//   ) {
//     // Transform CardFromDB to BuildingCard properties
//     return new BuildingCard(dataFromDB, image);
//   }

//   /////////////////////////////////////////////////////////////////////////////
//   public levelUp(): CardLevel {
//     if (this.level === 5) return 5 as CardLevel;
//     const newLevel = (this.level + 1) as CardLevel;
//     if (newLevel >= 1 && newLevel <= 5) this.level = newLevel as CardLevel;

//     const calculatedOutput = this.updateOutput(
//       templateIdToTemplateDataBuilding[this.templateId].baseOutput
//     );

//     if (calculatedOutput === undefined)
//       throw new Error("⛔ From: Building Class, updateObjectValuesV1");

//     this.output = calculatedOutput;

//     this.maintenance = this.updateMaintenance(
//       templateIdToTemplateDataBuilding[this.templateId].baseMaintenance
//     );
//     this.requirements = this.updateRequirements(
//       templateIdToTemplateDataBuilding[this.templateId].baseRequirements
//     );

//     return this.level;
//   }

//   public activate(): void {
//     this.state = true;
//   }

//   public deactivate(): void {
//     this.state = false;
//   }

//   public setOwner(newOwnerId: number): void {
//     this.ownerId = newOwnerId;
//   }

//   public updateStats(statsObj: BuildingStats): void {
//     this.stats = { ...this.stats, ...statsObj };
//   }

//   private static generateRarityLevel(): OneToFive {
//     const randomNumber = Math.random();
//     if (randomNumber < 0.5) {
//       return 1; // common 50%
//     } else if (randomNumber < 0.7) {
//       return 2; // special 30%
//     } else if (randomNumber < 0.88) {
//       return 3; // rare 15%
//     } else if (randomNumber < 0.96) {
//       return 4; // mythic 5%
//     } else {
//       return 5; // legendary
//     }
//   }

//   private updateOutput(
//     baseValueObject: BuildingOutput
//   ): BuildingOutput | undefined {
//     const updatedVersion: BuildingOutput = { boost: -1 };

//     for (const key in baseValueObject) {
//       if (Object.hasOwnProperty.call(baseValueObject, key)) {
//         updatedVersion.boost = roundToDecimal(
//           baseValueObject.boost *
//             (levelMultiplier[Number(`${this.level}`)] +
//               rarityMultiplier[Number(`${this.rarity}`)] +
//               1),
//           2
//         );
//       }
//       return updatedVersion;
//     }
//     return undefined;
//   }

//   private updateMaintenance(
//     baseValueObject: BuildingMaintenance
//   ): BuildingMaintenance {
//     console.log("1. Base Requirements: ", baseValueObject);
//     const updatedVersion: BuildingMaintenance = { energy: -1 };

//     console.log("2 | this.level: ", this.level);

//     const levelMulti = levelReqMulti[Number(`${this.level}`)];
//     const _upgradeCoef = upgradeCoef[Number(`${this.level}`)];
//     console.log("3.1 | levelMulti: ", levelMulti);
//     console.log("3.1 | _upgradeCoef: ", _upgradeCoef);

//     const multiplier = levelMulti - _upgradeCoef + 1;

//     for (const key in baseValueObject) {
//       if (Object.hasOwnProperty.call(baseValueObject, key)) {
//         updatedVersion.energy = roundToDecimal(
//           Number(baseValueObject.energy) * multiplier,
//           2
//         );
//       }
//     }
//     console.log("4. Updated Requirements: ", updatedVersion);

//     return updatedVersion;
//   }

//   private updateRequirements(
//     baseValueObject: CardRequirements
//   ): CardRequirements {
//     console.log("Base Requirements: ", baseValueObject);
//     const updatedVersion: CardRequirements = {
//       gold: -1,
//       concrete: -1,
//       crystals: -1,
//       metals: -1,
//       dieselBarrels: -1,
//       citizens: -1,
//     };

//     const levelMulti = levelReqMulti[Number(`${this.level}`)];
//     const _upgradeCoef = upgradeCoef[Number(`${this.level}`)];

//     const multiplier = levelMulti - _upgradeCoef + 1;

//     for (const key in baseValueObject) {
//       if (Object.hasOwnProperty.call(baseValueObject, key)) {
//         const typedKey = key as keyof CardRequirements; // Type assertion here
//         updatedVersion[typedKey] = roundToDecimal(
//           Number(baseValueObject[typedKey]) * multiplier,
//           2
//         );
//       }
//     }
//     console.log("Updated Requirements: ", updatedVersion);

//     return updatedVersion;
//   }
// }
