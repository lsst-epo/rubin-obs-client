import Moon from ".";

const meta = {
  component: Moon,
  argTypes: {
    phase: {
      control: { type: "number", min: 0, max: 1, step: 0.05 },
    },
    size: {
      control: { type: "number", min: 0 },
    },
    fill: { control: { type: "text" } },
  },
};
export default meta;

export const Primary = {
  args: { phase: 0.5 },
};
