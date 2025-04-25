import { Category } from "@/services/noirlab";
import { isRubinAsset, rewriteAssetUrl } from "./noirlab";

const imageId = "ann25007a";
const imageUrl = `https://noirlab.edu/public/images/${imageId}/`;
const videoId = "rubin-ComCamSkyVid1";
const videoUrl = `https://noirlab.edu/public/videos/${videoId}/`;
const localizedImageId = "ann25007b";
const localizedImageUrl = `https://noirlab.edu/public/es/images/${localizedImageId}/`;

describe("rewriteAssetUrl", () => {
  it("should re-write a NOIRLab image gallery link to a Rubin image gallery link", () => {
    const output = rewriteAssetUrl({ url: imageUrl, locale: "en" });

    const { origin, pathname } = new URL(output);
    const parts = pathname.split("/");
    expect(origin).to.eq(Cypress.env("NEXT_PUBLIC_BASE_URL"));
    expect(parts.pop()).to.eq(imageId);
    expect(parts.pop()).to.eq("news-images");
    expect(parts.pop()).to.eq("collections");
    expect(parts.pop()).to.eq("gallery");
  });
  it("should re-write a NOIRLab video gallery link to a Rubin video gallery link", () => {
    const output = rewriteAssetUrl({ url: videoUrl, locale: "en" });

    const { origin, pathname } = new URL(output);
    const parts = pathname.split("/");
    expect(origin).to.eq(Cypress.env("NEXT_PUBLIC_BASE_URL"));
    expect(parts.pop()).to.eq(videoId);
    expect(parts.pop()).to.eq("news-videos");
    expect(parts.pop()).to.eq("collections");
    expect(parts.pop()).to.eq("gallery");
  });
  it("should re-write localized links", () => {
    const locale = "es";
    const output = rewriteAssetUrl({ url: localizedImageUrl, locale });

    const { origin, pathname } = new URL(output);
    const parts = pathname.split("/");
    expect(origin).to.eq(Cypress.env("NEXT_PUBLIC_BASE_URL"));
    expect(parts.pop()).to.eq(localizedImageId);
    expect(parts.pop()).to.eq("news-images");
    expect(parts.pop()).to.eq("collections");
    expect(parts.pop()).to.eq("gallery");
    expect(parts.pop()).to.eq(locale);
  });
  it("should re-write localized links that are not tagged correctly", () => {
    const locale = "en";
    const output = rewriteAssetUrl({
      url: localizedImageUrl,
      locale,
    });

    const { origin, pathname } = new URL(output);
    const parts = pathname.split("/");
    expect(origin).to.eq(Cypress.env("NEXT_PUBLIC_BASE_URL"));
    expect(parts.pop()).to.eq(localizedImageId);
    expect(parts.pop()).to.eq("news-images");
    expect(parts.pop()).to.eq("collections");
    expect(parts.pop()).to.eq("gallery");
  });
});

const categories: Array<Category> = [
  {
    slug: "illustrations",
    name: "Illustrations",
    logo_url: null,
  },
  {
    slug: "rubin",
    name: "Vera C. Rubin Observatory",
    logo_url: "https://noirlab.edu/public/static/images/logos/rubin.svg",
  },
];

describe("isRubinAsset", () => {
  it("should return `true` if the one of the tagged categories is Rubin", () => {
    const result = isRubinAsset(categories);

    expect(result).to.eq(true);
  });
  it("should return `false` if no categories match for Rubin", () => {
    const result = isRubinAsset([categories[0]]);

    expect(result).to.eq(false);
  });
});
