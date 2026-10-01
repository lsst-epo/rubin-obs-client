import { describe, it, expect, vi } from "vitest";
import { ImageMini, VideoMini } from "@/services/noirlab";
import {
  extractDescription,
  isRubinAsset,
  rewriteAssetUrl,
  imagesToAsides,
  videosToAsides,
} from "./noirlab";

// `.env` is gitignored, so the real env module would fail validation in CI.
vi.mock("@/env", () => ({
  env: { NEXT_PUBLIC_BASE_URL: "https://rubinobservatory.org" },
}));

const assetUrl = "https://noirlab.edu/public/images/noirlab2301a/";
const galleryUrl =
  "https://rubinobservatory.org/gallery/collections/news-images/noirlab2301a";
const newsfeature = "https://noirlab.edu/public/media/newsfeature.jpg";

const makeImage = (overrides: Partial<ImageMini> = {}): ImageMini => ({
  id: "noirlab2301a",
  url: assetUrl,
  title: "Rubin at dusk",
  width: 800,
  height: 600,
  categories: [],
  formats: { newsfeature },
  ...overrides,
});

const makeVideo = (overrides: Partial<VideoMini> = {}): VideoMini => ({
  id: "noirlab2301a",
  url: "https://noirlab.edu/public/videos/noirlab2301a/",
  title: "Rubin timelapse",
  duration: "00:01:00",
  categories: [],
  formats: { newsfeature },
  ...overrides,
});

describe("extractDescription", () => {
  it("returns an empty string when description is null", () => {
    expect(extractDescription(null)).toBe("");
  });

  it("returns an empty string when description is empty", () => {
    expect(extractDescription("")).toBe("");
  });

  it("strips html tags", () => {
    expect(extractDescription("<p>Rubin sees the <em>sky</em></p>")).toBe(
      "Rubin sees the sky"
    );
  });

  it("returns the first sentence", () => {
    expect(
      extractDescription("Rubin is in Chile. It surveys the southern sky.")
    ).toBe("Rubin is in Chile.");
  });

  it("does not split on single-letter abbreviations", () => {
    expect(
      extractDescription("Photo by J. Smith. It surveys the southern sky.")
    ).toBe("Photo by J. Smith.");
  });

  it("returns the cleaned string when no sentence boundary is found", () => {
    expect(extractDescription("Rubin sees the sky")).toBe("Rubin sees the sky");
  });
});

describe("isRubinAsset", () => {
  it("returns true when a category slug is rubin", () => {
    expect(
      isRubinAsset([
        { slug: "noirlab", name: "NOIRLab" },
        { slug: "rubin", name: "Rubin" },
      ])
    ).toBe(true);
  });

  it("returns false when no category slug is rubin", () => {
    expect(isRubinAsset([{ slug: "noirlab", name: "NOIRLab" }])).toBe(false);
  });
});

describe("rewriteAssetUrl", () => {
  it("rewrites to the gallery collection path", () => {
    expect(
      rewriteAssetUrl({ url: "https://noirlab.edu/public/images/noirlab2301a" })
    ).toBe(
      "https://rubinobservatory.org/gallery/collections/news-images/noirlab2301a"
    );
  });

  it("prefixes a non-default locale", () => {
    expect(
      rewriteAssetUrl({
        url: "https://noirlab.edu/public/images/noirlab2301a",
        locale: "es",
      })
    ).toBe(
      "https://rubinobservatory.org/es/gallery/collections/news-images/noirlab2301a"
    );
  });

  it("ignores a trailing slash", () => {
    expect(
      rewriteAssetUrl({
        url: "https://noirlab.edu/public/images/noirlab2301a/",
      })
    ).toBe(
      "https://rubinobservatory.org/gallery/collections/news-images/noirlab2301a"
    );
  });
});

describe("imagesToAsides", () => {
  it("maps images to aside props", () => {
    expect(imagesToAsides([makeImage({ lang: "en" })], "en")).toEqual([
      {
        title: "Rubin at dusk",
        image: {
          src: newsfeature,
          alt: "Rubin at dusk",
          width: 800,
          height: 600,
        },
        link: { href: galleryUrl, prefetch: null },
      },
    ]);
  });

  it("defaults width and height when missing", () => {
    const [aside] = imagesToAsides(
      [makeImage({ width: null, height: null })],
      "en"
    );

    expect(aside.image).toMatchObject({ width: 1920, height: 1080 });
  });

  it("filters out images without a newsfeature format", () => {
    expect(imagesToAsides([makeImage({ formats: {} })], "en")).toEqual([]);
  });

  it("filters out images in another language when current locale is the fallback", () => {
    expect(imagesToAsides([makeImage({ lang: "es" })], "en")).toEqual([]);
  });

  it("keeps images in another language when current locale is not the fallback", () => {
    expect(imagesToAsides([makeImage({ lang: "en" })], "es")).toHaveLength(1);
  });

  it("sets prefetch to null when locales match and false otherwise", () => {
    const [matching] = imagesToAsides([makeImage({ lang: "es" })], "es");
    const [mismatched] = imagesToAsides([makeImage({ lang: "en" })], "es");

    expect(matching).toMatchObject({ link: { prefetch: null } });
    expect(mismatched).toMatchObject({ link: { prefetch: false } });
  });
});

describe("videosToAsides", () => {
  it("maps videos to aside props with default dimensions", () => {
    expect(videosToAsides([makeVideo({ lang: "en" })], "en")).toEqual([
      {
        title: "Rubin timelapse",
        image: {
          src: newsfeature,
          alt: "Rubin timelapse",
          width: 1920,
          height: 1080,
        },
        link: {
          href: "https://rubinobservatory.org/gallery/collections/news-videos/noirlab2301a",
          prefetch: null,
        },
      },
    ]);
  });

  it("filters out videos without a newsfeature format", () => {
    expect(videosToAsides([makeVideo({ formats: {} })], "en")).toEqual([]);
  });
});
