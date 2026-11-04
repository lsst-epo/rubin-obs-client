import { describe, expect, it, vi } from "vitest";
import queryAPI from "@/lib/api/client/query";
import getSocials from "./socials";

// `getLocale` reads the request scope, which doesn't exist under Vitest
vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("es"),
}));

// The query document is only passed through to the mocked `queryAPI`
vi.mock("@/gql", () => ({ graphql: vi.fn() }));

vi.mock("@/lib/api/client/query", () => ({ default: vi.fn() }));

const globalSet = { __typename: "siteInfo_GlobalSet", name: "example" };

const mockData = (data: unknown) => {
  vi.mocked(queryAPI).mockResolvedValue({ data } as never);
};

describe("getSocials", () => {
  it("returns the global set when the typename matches", async () => {
    mockData({ socials: globalSet });

    expect(await getSocials()).toEqual(globalSet);
  });

  it("returns undefined when the typename does not match", async () => {
    mockData({ socials: { ...globalSet, __typename: "other_GlobalSet" } });

    expect(await getSocials()).toBeUndefined();
  });

  it("returns undefined when the query returns no data", async () => {
    mockData(undefined);

    expect(await getSocials()).toBeUndefined();
  });

  it("queries the siteInfo set for the current site", async () => {
    mockData({ socials: globalSet });

    await getSocials();

    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { site: "es", set: "siteInfo" },
      })
    );
  });

  it("tags the request with globals", async () => {
    mockData({ socials: globalSet });

    await getSocials();

    // Revalidation refreshes the `globals` tag, so an untagged request would
    // never be refreshed
    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        fetchOptions: { next: { tags: ["globals"] } },
      })
    );
  });
});
