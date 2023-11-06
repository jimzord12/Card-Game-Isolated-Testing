// import {
//   levelReqMulti,
//   upgradeCoef,
// } from "../constants/cardStats/coefficients";
// import { roundToDecimal } from "../utils/utilituFunctions";

// // interface DataObject {
// //   id: string | string[]; // Assumed to be either string or array of strings
// //   templateId: number;
// //   rarity: number;
// //   priceTag?: number;
// //   in_mp?: boolean;
// //   creationTime?: number;
// //   creator?: string;
// //   state?: boolean;
// //   level?: number;
// //   ownerId?: string;
// //   stats?: any; // Replace 'any' with a more specific type if possible
// //   endDate?: string;
// //   usedFrom?: any; // Replace 'any' with a more specific type if possible
// // }

// interface TemplateData {
//   type: string;
//   name: string;
//   img: string;
//   baseOutput: Record<string, number>;
//   baseMaintenance: Record<string, number>;
//   baseRequirements: Record<string, number>;
//   baseStats?: any; // Replace 'any' with a more specific type if possible
//   desc: string;
// }

// export default class Card {
//   private id: string | string[];
//   private templateId: number;
//   private rarity: number;
//   private priceTag?: number;
//   private forSale: boolean;
//   private templateData: TemplateData;
//   private creationTime: number;
//   private creator?: string;
//   private state: boolean;
//   private disabled: boolean;
//   private name: string;
//   private type: string;
//   private img: string;
//   private output: Record<string, number>;
//   private maintenance?: Record<string, number>;
//   private requirements: Record<string, number>;
//   private stats?: any; // Replace 'any' with a more specific type if possible
//   private endDate?: number;
//   private usedFrom?: any; // Replace 'any' with a more specific type if possible
//   private ownerId?: string;
//   private level: CardLevel;
//   private desc: string;

//   constructor(
//     dataObj: CardFromDB,
//     templateData: TemplateData,
//     newCard: boolean = false
//   ) {
//     // Constructor implementation...
//     // ... rest of the constructor
//   }

//   public levelUp(): void {
//     if (this.level === 5) return console.log("Max Level Reached!");
//     this.level += 1;
//     this.output =
//       this.templateId === 13
//         ? this.output
//         : this.#updateObjectValuesV1(this.templateData.baseOutput); // + Rarity, + level
//     // this.output = this.#updateObjectValuesV1(this.output);
//     this.maintenance = this.#updateObjectValuesV2(
//       this.templateData.baseMaintenance
//     );
//     this.requirements = this.#updateObjectValuesV2(
//       this.templateData.baseRequirements
//     );
//   }

//   public activate(): void {
//     // activate method implementation...
//   }

//   public deactivate(): void {
//     // deactivate method implementation...
//   }

//   public setOwner(newOwnerId: string): void {
//     // setOwner method implementation...
//   }

//   public updateStats(statsObj: any): void {
//     // updateStats method implementation...
//   }

//   private generateRarityLevel(): number {
//     // generateRarityLevel method implementation...
//   }

//   private updateObjectValuesV1(
//     baseValueObject: Record<string, number>
//   ): Record<string, number> {
//     // updateObjectValuesV1 method implementation...
//   }

//   private updateObjectValuesV2(
//     baseValueObject: Record<string, number>
//   ): Record<string, number> {
//     // updateObjectValuesV2 method implementation...
//   }

//   private updateObjectValuesV1_SE(
//     baseValueObject: Record<string, number>
//   ): Record<string, number> {
//     console.log("Base Requirements: ", baseValueObject);
//     const updatedVersion = {};
//     const levelMulti = levelReqMulti[`${this.level}`];
//     const _upgradeCoef = upgradeCoef[`${this.level}`];
//     const multiplier = levelMulti - _upgradeCoef + 1;
//     for (const key in baseValueObject) {
//       if (Object.hasOwnProperty.call(baseValueObject, key)) {
//         updatedVersion[key] = roundToDecimal(
//           Number(baseValueObject[key]) * multiplier,
//           2
//         );
//       }
//     }
//     console.log("Updated Requirements: ", updatedVersion);

//     return updatedVersion;
//   }

//   private unixConverter(mysqlDatetime: string): number {
//     // unixConverter method implementation...
//   }
// }
