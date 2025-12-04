import { type StoryObj, type Meta } from "@storybook/react";
import { SummitDataContext } from "@/contexts/SummitData";
import { WeatherUnitProvider } from "@/contexts/WeatherUnit";
import { summitData } from "@/components/dynamic/SummitData/mock";
import Observation from ".";

const meta: Meta<typeof Observation> = {
  component: Observation,
  decorators: [
    (Story) => (
      <ul>
        <SummitDataContext.Provider value={summitData}>
          <WeatherUnitProvider>
            <Story />
          </WeatherUnitProvider>
        </SummitDataContext.Provider>
      </ul>
    ),
  ],
  argTypes: {},
};
export default meta;

export const Primary: StoryObj<typeof Observation> = {
  args: {},
};
