import styled from "styled-components";
import WidgetGrid from ".";

const meta = {
  component: WidgetGrid,
};
export default meta;

const MockWidget = styled.div`
  border-radius: 6px;
  background-color: var(--neutral60);
  grid-column: span min(${({ $span = 1 }) => $span}, var(--widget-columns));
  height: 8rem;
  width: 100%;
`;

const MockRows = [[2, 2, 2], [1, 4, 1], [6]];

const Template = ({ ...args }) => {
  return (
    <WidgetGrid>
      {MockRows.map((cells, i) =>
        cells.map((cell, j) => <MockWidget key={`${i}-${j}`} $span={cell} />)
      )}
    </WidgetGrid>
  );
};

export const Primary = Template.bind({});
