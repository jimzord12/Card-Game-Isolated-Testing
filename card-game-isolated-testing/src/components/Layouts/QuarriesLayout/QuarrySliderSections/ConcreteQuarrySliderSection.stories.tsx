import type { Meta, StoryObj } from "@storybook/react";
import ConcreteQuarrySliderSection from "./ConcreteQuarrySliderSection";
import ImageProviderV5 from "../../../../context/GlobalContext/GlobalContext";

const meta: Meta<typeof ConcreteQuarrySliderSection> = {
  title: "Genera/Quarries/ConcreteQuarrySliderSection",
  component: ConcreteQuarrySliderSection,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConcreteQuarrySliderSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {
    
};

export const Default: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ConcreteQuarrySliderSection {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};
