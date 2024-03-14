//TODO: ALL OF IT!

import { EffectOutput, SPName } from "../types";
import SPCard from "./spClass_V2";

class EffectClass {
  public name: SPName;
  public originatesFrom: SPCard;
  public boost: number;
  public output: EffectOutput;
  public expiresAtUnix: number;

  constructor(data: SPCard, expiresAtUnix: number, radioStationBoost?: number) {
    // TODO: Add constructor logic here
    this.name = data.name;
    this.originatesFrom = data;
    this.boost = data.output.boost + (radioStationBoost ?? 0);
    this.expiresAtUnix = expiresAtUnix;
    this.output = this.getOutput();
  }

  // TODO: Add class methods and properties here
  public getRemainingTimeUnix(): number {
    return this.expiresAtUnix - Date.now() / 1000;
  }

  private getOutput() {
    const base: EffectOutput = {
      goldGathRate: 1,
      popGrowthRate: 1,
      concreteGathRate: 1,
      metalsGathRate: 1,
      crystalsGathRate: 1,
      dieselGathRate: 1,
    };

    if (this.name === "WallStreet") {
      return { ...base, goldGathRate: base.goldGathRate + this.boost };
    } else if (this.name === "LoveApp") {
      return { ...base, popGrowthRate: base.popGrowthRate + this.boost };
    } else if (this.name === "SuperStrong") {
      return {
        ...base,
        concreteGathRate: base.goldGathRate + this.boost,
        metalsGathRate: base.goldGathRate + this.boost,
        crystalsGathRate: base.goldGathRate + this.boost,
        dieselGathRate: base.goldGathRate + this.boost,
      };
    } else {
      return base;
    }
  }
}

export default EffectClass;
