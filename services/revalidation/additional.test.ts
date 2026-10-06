import { beforeEach, describe, expect, it, vi } from "vitest";
import { revalidateTag } from "next/cache";
import additionalRevalidations from "./additional";

vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));

describe("additionalRevalidations", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  it("does nothing when there are no parts", () => {
    const tagCollection = new Set<string>();

    additionalRevalidations({ parts: [], tagCollection });

    expect(revalidateTag).not.toHaveBeenCalled();
    expect(tagCollection.size).toBe(0);
  });

  it("does nothing when every part is empty", () => {
    const tagCollection = new Set<string>();

    additionalRevalidations({ parts: ["", ""], tagCollection });

    expect(revalidateTag).not.toHaveBeenCalled();
    expect(tagCollection.size).toBe(0);
  });

  it("revalidates only the globals tag for a section without its own tag", () => {
    const tagCollection = new Set<string>();

    additionalRevalidations({ parts: ["news", "some-article"], tagCollection });

    expect(revalidateTag).toHaveBeenCalledTimes(1);
    expect(revalidateTag).toHaveBeenCalledWith("globals");
    expect([...tagCollection]).toEqual(["globals"]);
  });

  it("revalidates the section tag and the globals tag for a section with a tag", () => {
    const tagCollection = new Set<string>();

    additionalRevalidations({ parts: ["gallery"], tagCollection });

    expect(revalidateTag).toHaveBeenCalledWith("gallery");
    expect(revalidateTag).toHaveBeenCalledWith("globals");
    expect([...tagCollection].sort()).toEqual(["gallery", "globals"]);
  });

  it("revalidates the gallery slug tag in addition when a slug is present", () => {
    const tagCollection = new Set<string>();

    additionalRevalidations({ parts: ["gallery", "some-slug"], tagCollection });

    expect(revalidateTag).toHaveBeenCalledWith("some-slug");
    expect([...tagCollection].sort()).toEqual([
      "gallery",
      "globals",
      "some-slug",
    ]);
  });

  it("uses the first non-empty part as the section", () => {
    const tagCollection = new Set<string>();

    additionalRevalidations({
      parts: ["", "gallery", "some-slug"],
      tagCollection,
    });

    expect([...tagCollection].sort()).toEqual([
      "gallery",
      "globals",
      "some-slug",
    ]);
  });

  it("adds every revalidated tag to the tag collection", () => {
    const tagCollection = new Set<string>();

    additionalRevalidations({ parts: ["gallery", "some-slug"], tagCollection });

    // Every tag handed to `revalidateTag` must also be reported back to the
    // caller, which returns them from the revalidation endpoint
    vi.mocked(revalidateTag).mock.calls.forEach(([tag]) => {
      expect(tagCollection.has(tag)).toBe(true);
    });
  });
});
