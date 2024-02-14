import type { Meta, StoryObj } from "@storybook/react";
import LabelWithIcon from "./LabelWithIcon";
import workers from "../../../assets/imgs_new_convention/workers";
import labels from "../../../assets/imgs_new_convention/labels";

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
    size: "small",
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

export const QuarryWorkersSM: Story = {
  args: {
    size: "small",
    labelImages: labels,
    labelType: "rusty",
    image: workers.resourceWorkers.concrete,
    value: 100,
    desc: {
      text: "Workers",
    },
  },
};

export const QuarryWorkersMD: Story = {
  args: {
    size: "medium",
    labelImages: labels,
    labelType: "rusty",
    image: workers.resourceWorkers.concrete,
    value: 100,
    desc: {
      text: "Workers",
    },
  },
};

export const QuarryWorkersLG: Story = {
  args: {
    size: "large",
    labelImages: labels,
    labelType: "rusty",
    image: workers.resourceWorkers.concrete,
    value: 100,
    desc: {
      text: "Workers",
    },
  },
};

export const DoctorWorkersSM: Story = {
  args: {
    size: "small",
    labelImages: labels,
    labelType: "golden",
    image: workers.other.doctor,
    value: 100,
    desc: {
      text: "Doctors",
    },
  },
};

export const DoctorWorkersMD: Story = {
  args: {
    size: "medium",
    labelImages: labels,
    labelType: "golden",
    image: workers.other.doctor,
    value: 100,
    desc: {
      text: "Doctors",
    },
  },
};

export const DoctorWorkersLG: Story = {
  args: {
    size: "large",
    labelImages: labels,
    labelType: "golden",
    image: workers.other.doctor,
    value: 100,
    desc: {
      text: "Doctors",
    },
  },
};
