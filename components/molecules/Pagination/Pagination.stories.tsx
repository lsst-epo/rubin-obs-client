import { type StoryObj, type Meta, type StoryFn } from "@storybook/react";

import Pagination from ".";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  argTypes: {
    limit: { control: "number", description: "" },
    offset: { control: "number", description: "" },
    page: { control: "number", description: "current page number" },
    total: { control: "number", description: "total number of pages" },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

const Template: StoryFn<typeof Pagination> = (args) => {
  return <Pagination {...args} />;
};

export const Primary: StoryObj<typeof Pagination> = Template.bind({});
