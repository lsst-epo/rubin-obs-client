import { type Meta, type StoryObj } from "@storybook/react";
import Share from ".";

const meta: Meta<typeof Share> = {
  component: Share,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    variant: {
      options: ["primary", "large"],
      control: { type: "radio" },
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof Share> = {
  args: { variant: "primary" },
};
export const Large: StoryObj<typeof Share> = {
  args: { variant: "large" },
};
