import styled from "styled-components";
import WidgetPreview from ".";

const meta = {
  component: WidgetPreview,
  argTypes: {
    title: {
      description: "Title of preview section, shown in top header.",
    },
    callout: {
      description: "Callout text shown at bottom of preview section.",
    },
    openModalCallback: {
      action: "Opened modal",
      description: "Callback to open additional content",
    },
    size: {
      description:
        "Size that the preview container will take up along with the number of columns that will be available inside of it.",
    },
  },
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
    children: (
      <>
        <MockWidget /> <MockWidget />
      </>
    ),
    title: "How am I feeling today?",
    callout: "Rubin's rocking!",
  },
};
