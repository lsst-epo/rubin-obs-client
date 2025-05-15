import { type Meta, type StoryObj } from "@storybook/react";

import SizeComparison from ".";

const meta: Meta<typeof SizeComparison> = {
  component: SizeComparison,
};
export default meta;

export const Primary: StoryObj<typeof SizeComparison> = {
  args: {},
};
