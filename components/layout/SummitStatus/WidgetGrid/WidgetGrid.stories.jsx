import styled from "styled-components";
import WidgetGrid from ".";
import WidgetPreview from "@/layout/SummitStatus/WidgetPreview";

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

const MockRows = [
  [
    {
      size: "medium",
      title: "How am I feeling today?",
      callout: "Rubin's rocking!",
    },
    {
      size: "medium",
      title: "Observation-related information",
      callout: "We are successfully surveying the southwest sky",
    },
    {
      size: "medium",
      title: "Weather at the summit",
      callout: "It is nice out there!",
    },
  ],
  [
    {
      size: "small",
      title: "Alerts",
      callout: "That's a lot!",
    },
    {
      size: "large",
      title: "Astroweather",
      callout: "It will be a good night for infrared observations",
    },
    {
      size: "small",
      title: "In-summit cameras",
      callout: "The sky over Rubin",
    },
  ],
  [
    {
      size: "full",
      title: "Special announcements",
      callout: "This is our special and cosmic announcement for you tonight",
    },
  ],
];

const Template = ({ ...args }) => {
  return (
    <WidgetGrid>
      {MockRows.map((cells, i) =>
        cells.map((props, j) => <WidgetPreview key={`${i}-${j}`} {...props} />)
      )}
    </WidgetGrid>
  );
};

export const Primary = Template.bind({});
