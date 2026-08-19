import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfoIcon from "@/components/molecules/InfoIcon";

describe("InfoIcon", () => {
  const defaultProps = {
    tooltipLabel: "More information",
    tooltipText: "This is a valid tooltip text value.",
    showTooltips: true,
  };

  it("shows the tooltip on hover when tooltipText and showTooltips are both truthy", async () => {
    const user = userEvent.setup();
    render(<InfoIcon {...defaultProps} />);

    const tooltip = screen.getByLabelText(defaultProps.tooltipLabel);

    await user.hover(tooltip);
    expect(screen.getByText(defaultProps.tooltipText)).toBeInTheDocument();
  });

  it("does not show the tooltip on hover when tooltipText is absent", async () => {
    const user = userEvent.setup();
    render(<InfoIcon {...defaultProps} tooltipText="" />);

    const tooltip = screen.getByLabelText(defaultProps.tooltipLabel);

    await user.hover(tooltip);
    expect(
      screen.queryByText(defaultProps.tooltipText)
    ).not.toBeInTheDocument();
  });

  it("does not show the tooltip on hover when showTooltips is false", async () => {
    const user = userEvent.setup();
    render(<InfoIcon {...defaultProps} showTooltips={false} />);

    const tooltip = screen.getByLabelText(defaultProps.tooltipLabel);

    await user.hover(tooltip);
    expect(
      screen.queryByText(defaultProps.tooltipText)
    ).not.toBeInTheDocument();
  });

  it("hides the tooltip when the mouse leaves after hovering", async () => {
    const user = userEvent.setup();
    render(<InfoIcon {...defaultProps} />);

    const tooltip = screen.getByLabelText(defaultProps.tooltipLabel);

    await user.hover(tooltip);
    await user.unhover(tooltip);
    expect(
      screen.queryByText(defaultProps.tooltipText)
    ).not.toBeInTheDocument();
  });

  it("opens the tooltip when the icon is clicked", async () => {
    const user = userEvent.setup();
    render(<InfoIcon {...defaultProps} />);

    const tooltip = screen.getByLabelText(defaultProps.tooltipLabel);

    await user.click(tooltip);
    expect(screen.getByText(defaultProps.tooltipText)).toBeInTheDocument();
  });

  it("closes the tooltip when the icon is clicked a second time", async () => {
    const user = userEvent.setup();
    render(<InfoIcon {...defaultProps} />);

    const tooltip = screen.getByLabelText(defaultProps.tooltipLabel);

    await user.click(tooltip); // Click to open
    await user.click(tooltip); // Click to close
    expect(
      screen.queryByText(defaultProps.tooltipText)
    ).not.toBeInTheDocument();
  });

  it("keeps a click-opened tooltip visible after the mouse leaves", async () => {
    const user = userEvent.setup();
    render(<InfoIcon {...defaultProps} />);

    const tooltip = screen.getByLabelText(defaultProps.tooltipLabel);

    await user.hover(tooltip); // Move pointer onto tooltip button
    await user.click(tooltip); // Click to hold open
    await user.unhover(tooltip); // Move pointer away from tooltip

    expect(screen.getByText(defaultProps.tooltipText)).toBeInTheDocument();
  });

  it("fully hides the tooltip when closed by click while still hovering", async () => {
    const user = userEvent.setup();
    render(<InfoIcon {...defaultProps} />);

    const tooltip = screen.getByLabelText(defaultProps.tooltipLabel);

    await user.hover(tooltip); // Move pointer onto tooltip button
    await user.click(tooltip); // Click to hold open
    await user.click(tooltip); // Click to close
    expect(
      screen.queryByText(defaultProps.tooltipText)
    ).not.toBeInTheDocument();
  });

  it("uses tooltipLabel as the button's accessible name", () => {
    const user = userEvent.setup();
    render(<InfoIcon {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: defaultProps.tooltipLabel })
    ).toBeInTheDocument();
  });
});
