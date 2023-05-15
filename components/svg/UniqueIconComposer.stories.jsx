import UniqueIconComposer from "./UniqueIconComposer";
import CustomIcons from "./unique";

const meta = {
  component: UniqueIconComposer,
  argTypes: {
    icon: { control: { type: "select" }, options: Object.keys(CustomIcons) },
  },
};
export default meta;

export const Primary = { args: { icon: "Cloudy" } };
