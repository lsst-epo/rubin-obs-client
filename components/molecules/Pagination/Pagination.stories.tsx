import { type StoryObj, type Meta } from "@storybook/react";

import Pagination from ".";

const limit = 10;
const offset = 1;
const page = 13;
const total = 20;

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  //   argTypes: {},
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

// const Template: StoryFn<typeof Pagination> = (args) => {
//   return (
//     <Pagination {...args}>

//     </Pagination>
//   );
// };

// export const Primary: StoryObj<typeof Pagination> = Template.bind({});

type Story = StoryObj<typeof Pagination>;

export const FirstStory: Story = {
  args: {
    limit,
    offset,
    page,
    total,
  },
};
