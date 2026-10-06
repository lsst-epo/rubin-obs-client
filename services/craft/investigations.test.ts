import { describe, expect, it, vi } from "vitest";
import queryAPI from "@/lib/api/client/query";
import {
  addRelatedInvestigation,
  getRelatedInvestigation,
} from "./investigations";

// `getLocale` reads the request scope, which doesn't exist under Vitest
vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("es"),
}));

// The query document is only passed through to the mocked `queryAPI`
vi.mock("@/gql", () => ({ graphql: vi.fn() }));

vi.mock("@/lib/api/client/query", () => ({ default: vi.fn() }));

const investigation = { investigation: { uri: "investigations/example" } };

const mockData = (data: unknown = investigation) => {
  vi.mocked(queryAPI).mockResolvedValue({ data } as never);
};

describe("addRelatedInvestigation", () => {
  it("returns null when there is no entry data", async () => {
    expect(await addRelatedInvestigation(undefined)).toBeNull();
    expect(queryAPI).not.toHaveBeenCalled();
  });

  it("returns null when the entry has no id", async () => {
    expect(await addRelatedInvestigation({})).toBeNull();
    expect(queryAPI).not.toHaveBeenCalled();
  });

  it("fetches the related investigation when the entry has an id", async () => {
    mockData();

    expect(await addRelatedInvestigation({ id: 1 })).toEqual(investigation);
  });
});

describe("getRelatedInvestigation", () => {
  it("queries with the entry id and its ancestor ids", async () => {
    mockData();

    await getRelatedInvestigation({ id: 1, ancestors: [{ id: 2 }, { id: 3 }] });

    // Either the page or any ancestor can be the investigation's landing page
    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { ids: [1, 2, 3], site: "es" },
      })
    );
  });

  it("queries with only the entry id when there are no ancestors", async () => {
    mockData();

    await getRelatedInvestigation({ id: 1 });

    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { ids: [1], site: "es" },
      })
    );
  });

  it("returns null when there is no entry data", async () => {
    expect(await getRelatedInvestigation(undefined)).toBeNull();
    expect(queryAPI).not.toHaveBeenCalled();
  });

  it("returns null when the entry has no id", async () => {
    expect(
      await getRelatedInvestigation({ ancestors: [{ id: 2 }] })
    ).toBeNull();
    expect(queryAPI).not.toHaveBeenCalled();
  });

  it("returns the query data", async () => {
    mockData();

    expect(await getRelatedInvestigation({ id: 1 })).toEqual(investigation);
  });
});
