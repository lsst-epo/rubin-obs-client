import { beforeEach, describe, expect, it, vi } from "vitest";
import queryAPI from "@/lib/api/client/query";
import { getSiblings } from "./siblings";

// `getLocale` reads the request scope, which doesn't exist under Vitest
vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("es"),
}));

// The query document is only passed through to the mocked `queryAPI`
vi.mock("@/gql/gql", () => ({ graphql: vi.fn() }));

vi.mock("@/lib/api/client/query", () => ({ default: vi.fn() }));

const siblings = { siblings: { prev: null, next: { uri: "learn/next" } } };

const queryVariables = () => vi.mocked(queryAPI).mock.calls[0][0].variables;

describe("getSiblings", () => {
  beforeEach(() => {
    vi.mocked(queryAPI).mockResolvedValue({ data: siblings } as never);
  });

  it("converts the parent id to an integer", async () => {
    await getSiblings("12", "learn/current");

    // The query declares `$parentId` as an `Int`, but callers pass a string
    expect(queryVariables()).toMatchObject({ parentId: 12 });
  });

  it("defaults to level 1", async () => {
    await getSiblings("12", "learn/current");

    expect(queryVariables()).toMatchObject({ level: 1 });
  });

  it("uses the level it is given", async () => {
    await getSiblings("12", "learn/current", 3);

    expect(queryVariables()).toMatchObject({ level: 3 });
  });

  it("queries for the uri and the current site", async () => {
    await getSiblings("12", "learn/current");

    expect(queryVariables()).toMatchObject({
      uri: "learn/current",
      site: "es",
    });
  });

  it("tags the request with globals", async () => {
    await getSiblings("12", "learn/current");

    // Revalidation refreshes the `globals` tag, so an untagged request would
    // never be refreshed
    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        fetchOptions: { next: { tags: ["globals"] } },
      })
    );
  });

  it("returns the query data", async () => {
    expect(await getSiblings("12", "learn/current")).toEqual(siblings);
  });
});
