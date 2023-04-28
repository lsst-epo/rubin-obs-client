import styled from "styled-components";
import WidgetSection from ".";

const meta = {
  component: WidgetSection,
  argTypes: {
    children: { control: "none", table: { category: "Display" } },
    title: {
      description: "Title shown at the top of the section",
      table: { category: "Display" },
    },
    onToggleCallback: {
      action: `onToggleCallback`,
      description:
        "Callback that will pass `true` or `false` indicating if the section is now open or closed.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Function",
      },
    },
    isCollapsible: {
      description: "Indicates if this section should be collapsible or not.",
      table: { category: "Display" },
    },
    isOpen: {
      description: "Indicates if the section is currently open.",
      table: { category: "Display" },
    },
  },
};
export default meta;

const MockBlock = styled.div`
  border-radius: 10px;
  height: 100%;
  width: 100%;
`;
const MockGray = styled(MockBlock)`
  background-color: #313333;
`;
const MockGreen = styled(MockBlock)`
  background-color: #12726d;
`;

const MockGrid = styled.div`
  display: grid;
  grid-auto-rows: 6rem;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  grid-gap: var(--PADDING_SMALL, 20px);
`;

export const Primary = {
  args: {
    title: "Weather at the summit now",
    isOpen: true,
    children: (
      <>
        <MockGrid>
          <MockGray />
          <MockGreen />
          <MockGreen />
          <MockGray />
        </MockGrid>
        <h3>Forecast (next seven days)</h3>
        <MockGrid>
          <MockGray />
        </MockGrid>
      </>
    ),
  },
};
