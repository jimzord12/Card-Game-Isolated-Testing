import type { Meta, StoryObj } from "@storybook/react";
import LabelWithIcon from "./LabelWithIcon";
import workers from "../../../assets/imgs_new_convention/workers";
import labels from "../../../assets/imgs_new_convention/labels";
import gameIcons from "../../../assets/imgs_new_convention/gameIcons";

const meta: Meta<typeof LabelWithIcon> = {
  title: "Genera/Labels/LabelWithIcon",
  component: LabelWithIcon,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["small", "medium", "large"],
      },
    },
  },
} satisfies Meta<typeof LabelWithIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "golden",
    image: workers.resourceWorkers.crystals,
    value: 200,
    valueType: {
      type: "/h",
    },
    desc: {
      text: "Crystal Workers",
    },
  },
};

export const ConcreteWorker: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "rusty",
    image: workers.resourceWorkers.concrete,
    value: 100,
    valueType: {
      type: "maxLimit",
      limit: 240,
    },
    desc: {
      text: "Concrete Workers",
    },
    position: "top",
  },
};

export const CrystalsWorker: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "rusty",
    image: workers.resourceWorkers.crystals,
    value: 100,
    valueType: {
      type: "maxLimit",
      limit: 240,
    },
    desc: {
      text: "Crystal Workers",
    },
    position: "top",
  },
};

export const MetalsWorker: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "rusty",
    image: workers.resourceWorkers.metals,
    value: 100,
    valueType: {
      type: "maxLimit",
      limit: 240,
    },
    desc: {
      text: "Metal Workers",
    },
    position: "top",
  },
};

export const DieselWorker: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "rusty",
    image: workers.resourceWorkers.oilRig,
    value: 100,
    valueType: {
      type: "maxLimit",
      limit: 240,
    },
    desc: {
      text: "Oil Rig Workers",
    },
    position: "top",
  },
};

export const SimpleCitizen: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "golden",
    image: workers.other.simpleCitizen,
    value: 100,
    desc: {
      text: "Simple Citizens",
    },
    position: "top",
  },
};

export const DoctorWorkers: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "special",
    image: workers.other.doctor,
    value: 100,
    valueType: {
      type: "maxLimit",
      limit: 240,
    },
    desc: {
      text: "Doctors",
    },
    position: "top",
  },
};

export const RPH_Gold: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "rusty",
    image: gameIcons.resourcesIcons.goldResourceIcon,
    value: 125,
    valueType: {
      type: "/h",
    },
    desc: {
      text: "Gold Production",
    },
    position: "top",
  },
};

export const RPH_Concrete: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "rusty",
    image: gameIcons.resourcesIcons.concreteResourceIcon,
    value: 125,
    valueType: {
      type: "/h",
    },
    desc: {
      text: "Concrete Production",
    },
    position: "top",
  },
};

export const RPH_Metals: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "rusty",
    image: gameIcons.resourcesIcons.metalsResourceIcon,
    value: 125,
    valueType: {
      type: "/h",
    },
    desc: {
      text: "Metals Production",
    },
    position: "top",
  },
};

export const RPH_Crystals: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "rusty",
    image: gameIcons.resourcesIcons.crystalsResourceIcon,
    value: 125,
    valueType: {
      type: "/h",
    },
    desc: {
      text: "Crystals Production",
    },
    position: "top",
  },
};

export const RPH_Diesel: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "rusty",
    image: gameIcons.resourcesIcons.dieselbarrelResourceIcon,
    value: 125,
    valueType: {
      type: "/h",
    },
    desc: {
      text: "Diesel Production",
    },
    position: "top",
  },
};

export const CD_ID: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "golden",
    image: gameIcons.detailsIcons.id,
    value: 12345,
    position: "left",
  },
};

export const CD_Creator: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "golden",
    image: gameIcons.detailsIcons.user,
    value: "MasterG 22",
    position: "left",
  },
};

export const CD_CraftedAt: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "golden",
    image: gameIcons.detailsIcons.calendar,
    value: "12/12/2023",
    position: "left",
  },
};

export const CD_Expenses: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "golden",
    image: gameIcons.detailsIcons.expenses,
    value: 2500.25,
    valueType: {
      type: "/h",
    },
    position: "left",
  },
};

export const CD_TownHall: Story = {
  args: {
    isStoryBook: true,
    size: "extraSmall",
    labelImages: labels,
    labelType: "golden",
    image: gameIcons.detailsIcons.buildingsSpace,
    value: 2500.25,
    valueType: {
      type: "/h",
    },
    position: "left",
  },
};
