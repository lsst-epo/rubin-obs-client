import { type StoryObj, type Meta } from "@storybook/react";
import { summitData } from "../mock";
import { SummitDataContext } from "@/contexts/SummitData";

import CameraFeeds from ".";

const meta: Meta<typeof CameraFeeds> = {
  component: CameraFeeds,
  decorators: [
    (Story) => (
      <ul>
        <SummitDataContext.Provider value={summitData}>
          <Story />
        </SummitDataContext.Provider>
      </ul>
    ),
  ],
  argTypes: {},
};
export default meta;

export const Primary: StoryObj<typeof CameraFeeds> = {
  args: {},
};
