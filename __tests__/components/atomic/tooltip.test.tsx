import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tooltip from "../../../components/atomic/Tooltip/index";

function mockedTooltipFormatter(text: string): string {
  return text.toUpperCase();
}

describe(Tooltip.displayName || "Tooltip", () => {
  const validValue = "This is a valid tooltip text value.";
  const invalidValue = 42;

  it("displays the tooltip with a valid string value", () => {
    render(<Tooltip value={validValue} isVisible={true} />);
    expect(screen.getByText(validValue)).toBeInTheDocument();
  });

  it("does not render when a number is passed as value", () => {
    render(<Tooltip value={invalidValue as any} isVisible={true} />);
    expect(document.getElementById("tooltipText")).not.toBeInTheDocument();
  });

  it("does not render when the text value is undefined", () => {
    render(<Tooltip value={undefined as any} isVisible={true} />);
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
