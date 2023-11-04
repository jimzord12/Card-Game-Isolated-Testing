declare global {
  type EntityType = "building" | "reg" | "default" | "placeholder" | "padlock";
  type SubType = "wind" | "solar" | "hall" | "diesel" | "reg" | "building";
  type Level = 1 | 2 | 3 | 4 | 5;

  type MapEntity = {
    creationTime: string;
    creator: string;
    desc: string;
    disabled: boolean;
    forSale: boolean;
    id: number;
    image: string; // This is the src path
    img: string; // This is the ImageName. Ex. "WindTurbine"
    name: string;
    ownerId: string;
    priceTag: null | number;
    rarity: null | number;
    state: boolean;
    stats: any;
    templateId: number;
    type: EntityType;
    level: Level;

    requirements?: {
      concrete?: number;
      crystals?: number;
      gold?: number;
      metals?: number;
      citizens?: number;
      diesel?: number;
    };
    maintenance?: {
      gold?: number;
      energy?: number;
    };
    output?: {
      [key: string]: number;
    };
  };

  interface PlaceholderImageDetail {
    id: number;
    spot: number;
    type: EntityType;
    subType: SubType;
  }

  interface ImageDetail {
    id: number;
    src: string;
    alt: string;
    isHovered: boolean;
    spot: number;
    type: EntityType;
    subType?: SubType;
  }

  interface TreeImageDetail {
    img: string;
    spot: number;
  }
}

export {}; // This turns the file into a module
