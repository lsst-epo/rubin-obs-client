import { type StoryObj, type Meta, type StoryFn } from "@storybook/react";

import ScrollCarousel from ".";

const count = 1;
const text = "Large FOV Image";
const target = "";
const href = "/first-look/large-fov-image";
const image = {
  src: "https://Rubin.canto.com/direct/image/788tsbtj5h0q969gc3219i944o/-FGCERYh0Gm5GqjZd1spz_Oxqfo/m800/800",
  width: 3000,
  height: 3000,
  alt: "",
};

const meta: Meta<typeof ScrollCarousel> = {
  component: ScrollCarousel,
  argTypes: {},
};
export default meta;

const Template: StoryFn<typeof ScrollCarousel> = (args) => {
  return (
    <ScrollCarousel style={{ height: "400px" }} {...args}>
      <div style={{ backgroundColor: "red" }} />
      <div style={{ backgroundColor: "blue" }} />
      <div style={{ backgroundColor: "green" }} />
      <div style={{ backgroundColor: "yellow" }} />
    </ScrollCarousel>
  );
};

export const Primary: StoryObj<typeof ScrollCarousel> = Template.bind({});
