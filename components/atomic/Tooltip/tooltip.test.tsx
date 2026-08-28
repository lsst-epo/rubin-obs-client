import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tooltip from "@/components/atomic/Tooltip/index";

function mockedTooltipFormatter(text: string): string {
  return text.toUpperCase();
}

describe(Tooltip.displayName || "Tooltip", () => {
  const validValue = "This is a valid tooltip text value.";

  it("displays the tooltip with a valid value string", () => {
    render(<Tooltip value={validValue} isRendered={true} isVisible={true} />);
    expect(screen.getByText(validValue)).toBeInTheDocument();
  });

  it("does not render the tooltip when isVisible is false", () => {
    render(<Tooltip value={validValue} isRendered={false} isVisible={false} />);
    expect(screen.queryByText(validValue)).not.toBeInTheDocument();
  });

  it("formats the tooltip text when a formatterFunction is provided", () => {
    render(
      <Tooltip
        value={validValue}
        isVisible={true}
        isRendered={true}
        tooltipFormatter={mockedTooltipFormatter}
      />
    );
    expect(screen.getByText(validValue.toUpperCase())).toBeInTheDocument();
  });

  it("does not modify the tooltip text when a formatterFunction is NOT provided", () => {
    render(<Tooltip value={validValue} isRendered={true} isVisible={true} />);
    expect(
      screen.queryByText(validValue.toUpperCase())
    ).not.toBeInTheDocument();
  });
});
