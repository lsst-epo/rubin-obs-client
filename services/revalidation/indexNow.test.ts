import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const HOST = "https://rubinobservatory.org";
const KEY = "test-key";

type Env = { NEXT_PUBLIC_BASE_URL?: string; BING_INDEXNOW_KEY?: string };

const fetchMock = vi.fn();

// `.env` is gitignored and `createEnv` throws on missing variables in CI.
// The host and key are read into module-level constants, so the module has to
// be re-imported after changing the mocked env for the new values to apply
const load = async (
  env: Env = { NEXT_PUBLIC_BASE_URL: HOST, BING_INDEXNOW_KEY: KEY }
) => {
  vi.doMock("@/env", () => ({ env }));
  vi.resetModules();

  return (await import("./indexNow")).default;
};

const requestBody = () => JSON.parse(fetchMock.mock.calls[0][1].body);

describe("indexNow", () => {
  beforeEach(() => {
    fetchMock.mockResolvedValue({ status: 200, ok: true });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does nothing when the host is missing", async () => {
    const indexNow = await load({ BING_INDEXNOW_KEY: KEY });

    await indexNow("news");

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does nothing when the key is missing", async () => {
    const indexNow = await load({ NEXT_PUBLIC_BASE_URL: HOST });

    await indexNow("news");

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts to the Bing IndexNow endpoint with a JSON content type", async () => {
    const indexNow = await load();

    await indexNow("news");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.bing.com/indexnow",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
    );
  });

  it("sends the host, key, and key location in the body", async () => {
    const indexNow = await load();

    await indexNow("news");

    expect(requestBody()).toMatchObject({
      host: HOST,
      key: KEY,
      keyLocation: `${HOST}/api/indexnow/${KEY}.txt`,
    });
  });

  it("sends one url per locale, prefixing only non-default locales", async () => {
    const indexNow = await load();

    await indexNow("news");

    expect(requestBody().urlList).toEqual([`${HOST}/news`, `${HOST}/es/news`]);
  });

  it("sends the host root and locale root for the homepage uri", async () => {
    const indexNow = await load();

    await indexNow("__home__");

    expect(requestBody().urlList).toEqual([`${HOST}/`, `${HOST}/es`]);
  });

  it("logs the status text for a successful response", async () => {
    const indexNow = await load();

    await indexNow("news");

    expect(console.info).toHaveBeenCalledWith(
      "200: OK, URL submitted successfully"
    );
  });

  it("logs the request body when the response is not ok", async () => {
    fetchMock.mockResolvedValue({ status: 403, ok: false });
    const indexNow = await load();

    await indexNow("news");

    expect(console.info).toHaveBeenCalledWith({
      body: expect.objectContaining({ host: HOST, key: KEY }),
    });
  });
});
