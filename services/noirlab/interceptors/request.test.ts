// @vitest-environment node
// `isServer` is a module-level `typeof window` check and the global jsdom
// environment defines `window`, so the server branch is only reachable in node
import { afterEach, describe, expect, it, vi } from "vitest";
import type { RequestOptions } from "@hey-api/client-next";

const REVALIDATE = 3600;

// `isServer` and the env are read at module load, so the module has to be
// re-imported after changing the environment for the new values to apply
const importAddCachingWithEnv = async ({ browser = false } = {}) => {
  if (browser) vi.stubGlobal("window", {});
  // `.env` is gitignored and `createEnv` throws on missing variables in CI
  vi.doMock("@/env", () => ({ env: { NOIRLAB_REVALIDATE: REVALIDATE } }));
  vi.resetModules();

  const { default: interceptors } = await import("./request");

  return interceptors[0];
};

const options = (overrides: Record<string, unknown>) =>
  ({ ...overrides } as unknown as RequestOptions);

describe("addCaching", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sets revalidate from env for image urls on the server", async () => {
    const addCaching = await importAddCachingWithEnv();
    const requestOptions = options({ url: "/media/images/potw2401a/" });

    addCaching(requestOptions);

    expect(requestOptions.next).toEqual({ revalidate: REVALIDATE });
  });

  it("sets revalidate from env for video urls on the server", async () => {
    const addCaching = await importAddCachingWithEnv();
    const requestOptions = options({ url: "/media/videos/potw2401a/" });

    addCaching(requestOptions);

    expect(requestOptions.next).toEqual({ revalidate: REVALIDATE });
  });

  it("leaves non-media urls untouched", async () => {
    const addCaching = await importAddCachingWithEnv();
    const requestOptions = options({ url: "/news/some-article/" });

    addCaching(requestOptions);

    expect(requestOptions.next).toBeUndefined();
  });

  it("keeps a revalidate value the caller already set", async () => {
    const addCaching = await importAddCachingWithEnv();
    const requestOptions = options({
      url: "/media/images/potw2401a/",
      next: { revalidate: 60 },
    });

    addCaching(requestOptions);

    expect(requestOptions.next).toEqual({ revalidate: 60 });
  });

  it("keeps other next options when adding revalidate", async () => {
    const addCaching = await importAddCachingWithEnv();
    const requestOptions = options({
      url: "/media/images/potw2401a/",
      next: { tags: ["noirlab"] },
    });

    addCaching(requestOptions);

    expect(requestOptions.next).toEqual({
      revalidate: REVALIDATE,
      tags: ["noirlab"],
    });
  });

  it("does nothing in the browser", async () => {
    const addCaching = await importAddCachingWithEnv({ browser: true });
    const requestOptions = options({ url: "/media/images/potw2401a/" });

    addCaching(requestOptions);

    expect(requestOptions.next).toBeUndefined();
  });
});
