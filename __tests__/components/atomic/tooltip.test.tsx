import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tooltip from "../../../components/atomic/Tooltip/index";

function mockedTooltipFormatter(text: string): string {
  return text.toUpperCase();
}

describe(Tooltip.displayName || "Tooltip", () => {
  const validValue = "This is a valid tooltip text value.";

  it("displays the tooltip with a valid value string", () => {
    render(<Tooltip value={validValue} isVisible={true} />);
    expect(screen.getByText(validValue)).toBeInTheDocument();
  });

  // Test an empty string

  it("does not display the tooltip when the value string is empty", () => {
    render(<Tooltip value={""} isVisible={true} />);
    expect(document.getElementById("tooltipText")).not.toBeInTheDocument();
  });

  it("renders the tooltip when isVisible is true", () => {
    render(<Tooltip value={validValue} isVisible={true} />);
    expect(document.getElementById("tooltipText")).toBeInTheDocument();
  });

  it("does not render the tooltip when isVisible is false", () => {
    render(<Tooltip value={validValue} isVisible={false} />);
    expect(document.getElementById("tooltipText")).not.toBeInTheDocument();
  });

  it("formats the tooltip text when a formatterFunction is provided", () => {
    render(
      <Tooltip
        value={validValue}
        isVisible={true}
        tooltipFormatter={mockedTooltipFormatter}
      />
    );
    expect(screen.getByText(validValue.toUpperCase())).toBeInTheDocument();
  });

  it("formats the tooltip text when a formatterFunction is provided", () => {
    render(<Tooltip value={validValue} isVisible={true} />);
    expect(screen.getByText(validValue)).toBeInTheDocument();
  });
});
