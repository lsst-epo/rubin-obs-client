import { beforeEach, describe, expect, it, vi } from "vitest";

// Hoisted so the same spies survive `vi.resetModules()`; otherwise each reload
// would build fresh mocks that the assertions below can't see
const { revalidatePath, indexNow, additionalRevalidations, getPathname } =
  vi.hoisted(() => ({
    revalidatePath: vi.fn(),
    indexNow: vi.fn(),
    additionalRevalidations: vi.fn(),
    // Stand-in for next-intl's `getPathname` with `localePrefix: "as-needed"`
    getPathname: vi.fn(
      ({
        href,
        locale,
        forcePrefix,
      }: {
        href: string;
        locale: string;
        forcePrefix: boolean;
      }) => {
        if (!forcePrefix) return href;
        // The prefixed root is `/es`, not `/es/`
        if (href === "/") return `/${locale}`;

        return `/${locale}${href}`;
      }
    ),
  }));

vi.mock("next/cache", () => ({ revalidatePath }));

// The real `getPathname` can't load under Vitest: next-intl imports
// `next/navigation` without a file extension, which Node's ESM resolution
// rejects. The path tests below therefore cover what `index.ts` passes to it
// and how it builds `href`, not next-intl's own prefixing
vi.mock("@/lib/i18n/navigation", () => ({ getPathname }));
vi.mock("@/services/revalidation/indexNow", () => ({ default: indexNow }));
vi.mock("@/services/revalidation/additional", () => ({
  default: additionalRevalidations,
}));

// `.env` is gitignored and `createEnv` throws on missing variables in CI.
// `CLOUD_ENV` is read into a module-level constant, so the module has to be
// re-imported after changing the mocked env for the new value to apply
const importRevalidateWithEnv = async (
  env: { CLOUD_ENV: string } = { CLOUD_ENV: "DEV" }
) => {
  vi.doMock("@/env", () => ({ env }));
  vi.resetModules();

  return (await import("./index")).default;
};

describe("revalidate", () => {
  beforeEach(() => {
    // `clearMocks` only clears call history, so implementations set in one test
    // would otherwise leak into the next
    additionalRevalidations.mockReset();
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  it("generates a path for each locale", async () => {
    const revalidate = await importRevalidateWithEnv();

    const { paths } = revalidate("news");

    expect(paths).toHaveLength(2);
  });

  it("includes a leading slash on every path", async () => {
    const revalidate = await importRevalidateWithEnv();

    const { paths } = revalidate("news/some-article");

    paths.forEach((path) => {
      expect(path.startsWith("/")).toBe(true);
    });
  });

  it("prefixes non-default locales and leaves the default locale unprefixed", async () => {
    const revalidate = await importRevalidateWithEnv();

    const { paths } = revalidate("news");

    expect(paths).toEqual(["/news", "/es/news"]);
  });

  it("asks getPathname to force the prefix only for non-default locales", async () => {
    const revalidate = await importRevalidateWithEnv();

    revalidate("news");

    expect(getPathname).toHaveBeenCalledWith({
      href: "/news",
      locale: "en",
      forcePrefix: false,
    });
    expect(getPathname).toHaveBeenCalledWith({
      href: "/news",
      locale: "es",
      forcePrefix: true,
    });
  });

  it("does not produce double slashes for a multi-segment uri", async () => {
    const revalidate = await importRevalidateWithEnv();

    const { paths } = revalidate("news/some-article");

    expect(paths).toEqual(["/news/some-article", "/es/news/some-article"]);
    paths.forEach((path) => {
      expect(path).not.toContain("//");
    });
  });

  it("generates root paths for the homepage uri", async () => {
    const revalidate = await importRevalidateWithEnv();

    const { paths } = revalidate("__home__");

    expect(paths).toEqual(["/", "/es"]);
  });

  it("revalidates each generated path", async () => {
    const revalidate = await importRevalidateWithEnv();

    revalidate("news");

    expect(revalidatePath).toHaveBeenCalledTimes(2);
    expect(revalidatePath).toHaveBeenCalledWith("/news");
    expect(revalidatePath).toHaveBeenCalledWith("/es/news");
  });

  it("runs additional revalidations per locale with the uri parts", async () => {
    const revalidate = await importRevalidateWithEnv();

    revalidate("news/some-article");

    expect(additionalRevalidations).toHaveBeenCalledTimes(2);
    expect(additionalRevalidations).toHaveBeenCalledWith({
      parts: ["news", "some-article"],
      tagCollection: expect.any(Set),
    });
  });

  it("passes empty parts to additional revalidations for the homepage uri", async () => {
    const revalidate = await importRevalidateWithEnv();

    revalidate("__home__");

    expect(additionalRevalidations).toHaveBeenCalledWith({
      parts: [],
      tagCollection: expect.any(Set),
    });
  });

  it("passes a fresh parts array for each locale", async () => {
    const seen: Array<Array<string>> = [];

    // Copies the parts before mutating them, like the gallery revalidator's
    // `pop()`, since the mock records a reference that would show the mutation
    additionalRevalidations.mockImplementation(({ parts }) => {
      seen.push([...parts]);
      parts.pop();
    });
    const revalidate = await importRevalidateWithEnv();

    revalidate("gallery/some-slug");

    expect(seen).toEqual([
      ["gallery", "some-slug"],
      ["gallery", "some-slug"],
    ]);
  });

  it("calls indexNow with the uri in production", async () => {
    const revalidate = await importRevalidateWithEnv({ CLOUD_ENV: "PROD" });

    revalidate("news");

    expect(indexNow).toHaveBeenCalledWith("news");
  });

  it("does not call indexNow outside production", async () => {
    const revalidate = await importRevalidateWithEnv({ CLOUD_ENV: "DEV" });

    revalidate("news");

    expect(indexNow).not.toHaveBeenCalled();
  });
});
