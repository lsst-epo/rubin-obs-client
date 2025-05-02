import { type StoryObj, type Meta } from "@storybook/react";

import Pagination from ".";

// Values based of the main site gallery page at time of writing
const limit = 30;
const offset = 0;
const page = 1;
const total = 495;

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  argTypes: {},
};
export default meta;

export const Primary: StoryObj<typeof Pagination> = {
  args: {
    limit,
    offset,
    page,
    total,
  },
};
