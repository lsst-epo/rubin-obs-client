import IconButton from ".";

const meta = {
  component: IconButton,
  argTypes: { onClickCallback: { action: "Clicked" } },
};
export default meta;

export const Primary = {
  args: { icon: "Plus", accessibleText: "Expand this content" },
};
