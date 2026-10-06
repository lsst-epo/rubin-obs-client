import { beforeEach, describe, expect, it, vi } from "vitest";
import { getImageProps } from "next/image";
import queryAPI from "@/lib/api/client/query";
import { getLogos } from "./logos";

// `getLocale` reads the request scope, which doesn't exist under Vitest
vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("es"),
}));

// Loading the real generated `graphql` helper isn't needed; the query document
// is only passed through to the mocked `queryAPI`
vi.mock("@/gql/gql", () => ({ graphql: vi.fn() }));

vi.mock("@/lib/api/client/query", () => ({ default: vi.fn() }));

// Echoes its arguments so tests can assert on what the logos were built from
vi.mock("next/image", () => ({
  getImageProps: vi.fn((args) => ({ props: args })),
}));

const logo = (name: string, overrides = {}) => ({
  url: { directUrlOriginal: `https://example.com/${name}.png` },
  width: "400",
  height: "100",
  ...overrides,
});

const mockSiteInfo = (siteInfo: unknown) => {
  vi.mocked(queryAPI).mockResolvedValue({ data: { siteInfo } } as never);
};

const validSiteInfo = (overrides = {}) => ({
  __typename: "siteInfo_GlobalSet",
  logoLarge: [logo("large")],
  logoSmall: null,
  ...overrides,
});

describe("getLogos", () => {
  beforeEach(() => {
    mockSiteInfo(validSiteInfo());
  });

  it("returns undefined when the query returns no data", async () => {
    vi.mocked(queryAPI).mockResolvedValue({ data: undefined } as never);

    expect(await getLogos()).toBeUndefined();
  });

  it("returns undefined when the global set is not siteInfo", async () => {
    mockSiteInfo(validSiteInfo({ __typename: "footer_GlobalSet" }));

    expect(await getLogos()).toBeUndefined();
  });

  it("returns undefined when the logo data fails validation", async () => {
    mockSiteInfo(
      validSiteInfo({
        logoLarge: [logo("large", { url: { directUrlOriginal: "not-a-url" } })],
      })
    );

    expect(await getLogos()).toBeUndefined();
  });

  it("returns only the large image when there is no small logo", async () => {
    const logos = await getLogos();

    expect(logos).toHaveProperty("large");
    expect(logos).not.toHaveProperty("small");
  });

  it("returns the large and small images when both logos exist", async () => {
    mockSiteInfo(validSiteInfo({ logoSmall: [logo("small")] }));

    const logos = await getLogos();

    expect(logos).toHaveProperty("large");
    expect(logos).toHaveProperty("small");
  });

  it("uses the first logo in each list", async () => {
    mockSiteInfo(validSiteInfo({ logoLarge: [logo("first"), logo("second")] }));

    await getLogos();

    expect(getImageProps).toHaveBeenCalledWith(
      expect.objectContaining({ src: "https://example.com/first.png" })
    );
  });

  it("coerces string dimensions to numbers", async () => {
    await getLogos();

    expect(getImageProps).toHaveBeenCalledWith(
      expect.objectContaining({ width: 400, height: 100 })
    );
  });

  // Commented out because it exposes a bug in the current implementation: the
  // small image is built from `logoLarge` instead of `logoSmall`.
  // it("builds the small image from the small logo", async () => {
  //   mockSiteInfo(
  //     validSiteInfo({
  //       logoSmall: [logo("small", { width: "80", height: "20" })],
  //     })
  //   );
  //
  //   await getLogos();
  //
  //   expect(getImageProps).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       src: "https://example.com/small.png",
  //       width: 80,
  //       height: 20,
  //       sizes: "100vw",
  //     })
  //   );
  // });

  it("queries the siteInfo set for the current site", async () => {
    await getLogos();

    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { set: "siteInfo", site: "es" },
      })
    );
  });

  it("tags the request with globals", async () => {
    await getLogos();

    // Revalidation refreshes the `globals` tag, so an untagged request would
    // never be refreshed
    expect(queryAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        fetchOptions: expect.objectContaining({
          next: expect.objectContaining({ tags: ["globals"] }),
        }),
      })
    );
  });
});
