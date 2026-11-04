import { describe, expect, it, vi } from "vitest";
import queryAPI from "@/lib/api/client/query";
import getRootPages from "./rootPages";

// `getLocale` reads the request scope, which doesn't exist under Vitest
vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("es"),
}));

// The query document is only passed through to the mocked `queryAPI`, and
// fragment masking only narrows types, so `useFragment` returns its data as is
vi.mock("@/gql", () => ({
  graphql: vi.fn(),
  useFragment: vi.fn((_fragment, data) => data),
}));

vi.mock("@/lib/api/client/query", () => ({ default: vi.fn() }));

const customBreadcrumbs = [
  { header: "Learn", pageEntry: [{ id: "1", title: "Learn", uri: "learn" }] },
];

const mockData = (data: unknown) => {
  vi.mocked(queryAPI).mockResolvedValue({ data } as never);
};

describe("getRootPages", () => {
  it("returns the custom breadcrumbs when the typename matches", async () => {
    mockData({
      rootPages: {
        __typename: "rootPageInformation_GlobalSet",
        customBreadcrumbs,
      },
    });

    expect(await getRootPages()).toEqual(customBreadcrumbs);
  });

  it("returns undefined when the typename does not match", async () => {
    mockData({
      rootPages: { __typename: "other_GlobalSet", customBreadcrumbs },
    });

    expect(await getRootPages()).toBeUndefined();
  });

  it("returns undefined when the query returns no data", async () => {
    mockData(undefined);

    expect(await getRootPages()).toBeUndefined();
  });

  it("returns undefined when there are no custom breadcrumbs", async () => {
    mockData({
      rootPages: {
        __typename: "rootPageInformation_GlobalSet",
        customBreadcrumbs: null,
      },
    });

    expect(await getRootPages()).toBeUndefined();
  });

  it("queries the rootPageInformation set for the current site", async () => {
    mockData(undefined);

    await getRootPages();

    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { site: "es", set: "rootPageInformation" },
      })
    );
  });
});
