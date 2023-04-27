import styled from "styled-components";
import WidgetPreview from ".";

const meta = {
  component: WidgetPreview,
  argTypes: {},
};
export default meta;

const MockWidget = styled.div`
  border-radius: 0.5rem;
  background-color: #313333;
  width: 100%;
  height: 100%;
`;

export const Primary = {
  args: {
    children: [<MockWidget />, <MockWidget />],
    title: "How am I feeling today?",
    callout: "Rubin's rocking!",
  },
};
