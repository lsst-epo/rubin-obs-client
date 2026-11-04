import { describe, expect, it, vi } from "vitest";
import queryAPI from "@/lib/api/client/query";
import getContactForm from "./contactForm";

// `getLocale` reads the request scope, which doesn't exist under Vitest
vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("es"),
}));

// The query document is only passed through to the mocked `queryAPI`
vi.mock("@/gql", () => ({ graphql: vi.fn() }));

vi.mock("@/lib/api/client/query", () => ({ default: vi.fn() }));

const globalSet = { __typename: "contactForm_GlobalSet", name: "example" };

const mockData = (data: unknown) => {
  vi.mocked(queryAPI).mockResolvedValue({ data } as never);
};

describe("getContactForm", () => {
  it("returns the global set when the typename matches", async () => {
    mockData({ contactForm: globalSet });

    expect(await getContactForm()).toEqual(globalSet);
  });

  it("returns undefined when the typename does not match", async () => {
    mockData({ contactForm: { ...globalSet, __typename: "other_GlobalSet" } });

    expect(await getContactForm()).toBeUndefined();
  });

  it("returns undefined when the query returns no data", async () => {
    mockData(undefined);

    expect(await getContactForm()).toBeUndefined();
  });

  it("queries the contactForm set for the current site", async () => {
    mockData({ contactForm: globalSet });

    await getContactForm();

    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { site: "es", set: "contactForm" },
      })
    );
  });

  it("tags the request with globals", async () => {
    mockData({ contactForm: globalSet });

    await getContactForm();

    // Revalidation refreshes the `globals` tag, so an untagged request would
    // never be refreshed
    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        fetchOptions: { next: { tags: ["globals"] } },
      })
    );
  });
});
