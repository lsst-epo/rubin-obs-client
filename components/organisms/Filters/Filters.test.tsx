import "@testing-library/jest-dom";
import type { FC } from "react";
import { render, screen } from "@testing-library/react";
import Filters from "@/components/organisms/Filters";

const MockedChild: FC = () => {
  return <p>Mocked Child</p>;
};

/**
 * The ClearFiltersButton component in the Filters component
 * imports useRouter, usePathname, and useSearchParams from next/navigation
 * so we have to mock them because they are not available
 * in the JSDOM environment where Jest tests run.
 */
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

describe("Filters", () => {
  it("renders the Search component when hasSearch is omitted", async () => {
    render(
      <Filters className="test-class" width="wide">
        <MockedChild />
      </Filters>
    );

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("renders the Search component when hasSearch is true", async () => {
    render(
      <Filters hasSearch={true} className="test-class" width="wide">
        <MockedChild />
      </Filters>
    );

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("does not render the Search component when hasSearch is false", async () => {
    render(
      <Filters hasSearch={false} className="test-class" width="wide">
        <MockedChild />
      </Filters>
    );

    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });

  it("passes className through to the first wrapping element", async () => {
    const { container } = render(
      <Filters className="test-class" width="wide">
        <MockedChild />
      </Filters>
    );

    expect(container.firstChild).toHaveClass("test-class");
  });
});
