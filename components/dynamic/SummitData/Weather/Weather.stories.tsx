import { type StoryObj, type Meta } from "@storybook/react";
import { SummitDataContext } from "@/contexts/SummitData";
import { summitData } from "@/components/dynamic/SummitData/mock";
import { WeatherUnitProvider } from "@/contexts/WeatherUnit";
import Weather from ".";

const meta: Meta<typeof Weather> = {
  component: Weather,
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

export const Primary: StoryObj<typeof Weather> = {
  args: {},
};
