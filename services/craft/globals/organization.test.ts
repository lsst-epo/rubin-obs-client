import { beforeEach, describe, expect, it, vi } from "vitest";
import { getGlobalData } from "@/lib/api/globals";
import { getLogos } from "./logos";
import getSocials from "./socials";
import { getOrganizationData } from "./organization";

// `.env` is gitignored and `createEnv` throws on missing variables in CI
vi.mock("@/env", () => ({
  env: { NEXT_PUBLIC_BASE_URL: "https://rubinobservatory.org" },
}));

// `getLocale` reads the request scope, which doesn't exist under Vitest
vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("en"),
}));

// Fragment masking only narrows types at runtime, so the stand-in returns the
// data unchanged
vi.mock("@/gql", () => ({
  useFragment: vi.fn((_fragment, data) => data),
}));
vi.mock("@/gql/graphql", () => ({ SiteInfoFragmentFragmentDoc: {} }));

vi.mock("@/lib/api/globals", () => ({ getGlobalData: vi.fn() }));
vi.mock("./logos", () => ({ getLogos: vi.fn() }));
vi.mock("./socials", () => ({ default: vi.fn() }));

// Matches the shape `getSocials` returns, which still includes `__typename`
// because that's what its own guard checks
const socials = (overrides = {}) => ({
  __typename: "siteInfo_GlobalSet",
  email: "info@example.org",
  facebook: "https://facebook.com/example",
  instagram: "https://instagram.com/example",
  linkedIn: null,
  twitter: "",
  youTube: "https://youtube.com/example",
  ...overrides,
});

const mockSiteInfo = (siteInfo = {}) => {
  vi.mocked(getGlobalData).mockResolvedValue({
    siteInfo: { siteTitle: "Example Observatory", siteImage: [], ...siteInfo },
  } as never);
};

describe("getOrganizationData", () => {
  beforeEach(() => {
    mockSiteInfo();
    vi.mocked(getLogos).mockResolvedValue({
      large: { src: "https://example.com/logo.png" },
    } as never);
    vi.mocked(getSocials).mockResolvedValue(socials() as never);
  });

  it("sets the name from the site title", async () => {
    const organization = await getOrganizationData();

    expect(organization.name).toBe("Example Observatory");
  });

  it("sets the url from the base url env", async () => {
    const organization = await getOrganizationData();

    expect(organization.url).toBe("https://rubinobservatory.org");
  });

  it("sets the logo from the large logo", async () => {
    const organization = await getOrganizationData();

    expect(organization.logo).toBe("https://example.com/logo.png");
  });

  it("leaves the logo undefined when there are no logos", async () => {
    vi.mocked(getLogos).mockResolvedValue(undefined);

    const organization = await getOrganizationData();

    expect(organization.logo).toBeUndefined();
  });

  it("sets the email from the socials", async () => {
    const organization = await getOrganizationData();

    expect(organization.email).toBe("info@example.org");
  });

  it("leaves the email undefined when there are no socials", async () => {
    vi.mocked(getSocials).mockResolvedValue(undefined);

    const organization = await getOrganizationData();

    expect(organization.email).toBeUndefined();
  });

  it("includes only image urls from general image assets that have a url", async () => {
    mockSiteInfo({
      siteImage: [
        { __typename: "generalImages_Asset", url: "https://example.com/a.jpg" },
        { __typename: "heroes_Asset", url: "https://example.com/hero.jpg" },
        { __typename: "generalImages_Asset", url: null },
        null,
      ],
    });

    const organization = await getOrganizationData();

    expect(organization.image).toEqual(["https://example.com/a.jpg"]);
  });

  it("includes the social profile urls in sameAs", async () => {
    const organization = await getOrganizationData();

    expect(organization.sameAs).toEqual(
      expect.arrayContaining([
        "https://facebook.com/example",
        "https://instagram.com/example",
        "https://youtube.com/example",
      ])
    );
  });

  it("excludes empty values from sameAs", async () => {
    const organization = await getOrganizationData();

    // `linkedIn` is null and `twitter` is an empty string in the fixture
    (organization.sameAs as Array<string>).forEach((item) => {
      expect(item).toBeTruthy();
    });
  });

  it("returns an empty sameAs when there are no socials", async () => {
    vi.mocked(getSocials).mockResolvedValue(undefined);

    const organization = await getOrganizationData();

    expect(organization.sameAs).toEqual([]);
  });
});
