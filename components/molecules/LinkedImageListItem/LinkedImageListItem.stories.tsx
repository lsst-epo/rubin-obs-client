import { type StoryObj, type Meta } from "@storybook/react";

import LinkedImageListItem from ".";

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

const meta: Meta<typeof LinkedImageListItem> = {
  component: LinkedImageListItem,
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
  argTypes: {},
};
export default meta;

export const Primary: StoryObj<typeof LinkedImageListItem> = {
  args: {
    count,
    text,
    target,
    href,
    image,
  },
};
export const MissingImage: StoryObj<typeof LinkedImageListItem> = {
  args: {
    count,
    text,
    target,
    href,
  },
};
