import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { redirect, RedirectType } from "next/navigation";
import revalidateUri from "@/services/revalidation";
import revalidate from "./revalidate";

const TOKEN = "super-secret-token";
const NOW = new Date("2026-01-15T12:00:00Z");

// `.env` is gitignored and `createEnv` throws on missing variables in CI
vi.mock("@/env", () => ({
  env: { CRAFT_REVALIDATE_SECRET_TOKEN: "super-secret-token" },
}));

vi.mock("@/services/revalidation", () => ({ default: vi.fn() }));

// The real `redirect` throws to halt execution, which would obscure the
// assertions, so it's replaced with a spy.
// `RedirectType` keeps its real values via the `importOriginal` typeof import
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: vi.fn(),
}));

const redirectedParams = () => {
  const [url] = vi.mocked(redirect).mock.calls[0];

  return new URLSearchParams(url.replace(/^\?/, ""));
};

describe("revalidate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
    vi.mocked(revalidateUri).mockReturnValue({
      paths: ["/news"],
      tags: ["news"],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("redirects with the revalidated paths and tags when the uri and token are valid", async () => {
    vi.mocked(revalidateUri).mockReturnValue({
      paths: ["/news"],
      tags: ["news-tag"],
    });

    await revalidate({ uri: "news", token: TOKEN });

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirectedParams().getAll("paths")).toEqual(["/news"]);
    expect(redirectedParams().getAll("tags")).toEqual(["news-tag"]);
  });

  it("passes the uri to revalidateUri", async () => {
    await revalidate({ uri: "news/some-article", token: TOKEN });

    expect(revalidateUri).toHaveBeenCalledWith("news/some-article");
  });

  it("includes a now timestamp param", async () => {
    await revalidate({ uri: "news", token: TOKEN });

    expect(redirectedParams().get("now")).toBe(NOW.getTime().toString());
  });

  it("appends one param per value when a key has multiple values", async () => {
    vi.mocked(revalidateUri).mockReturnValue({
      paths: ["/news", "/es/news"],
      tags: ["news", "pages"],
    });

    await revalidate({ uri: "news", token: TOKEN });

    expect(redirectedParams().getAll("paths")).toEqual(["/news", "/es/news"]);
    expect(redirectedParams().getAll("tags")).toEqual(["news", "pages"]);
  });

  it("uses a replace redirect", async () => {
    await revalidate({ uri: "news", token: TOKEN });

    expect(redirect).toHaveBeenCalledWith(
      expect.any(String),
      RedirectType.replace
    );
  });

  it("does not revalidate or redirect when the token is wrong", async () => {
    await revalidate({ uri: "news", token: "wrong-token" });

    expect(revalidateUri).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("does not revalidate or redirect when the uri is empty", async () => {
    await revalidate({ uri: "", token: TOKEN });

    expect(revalidateUri).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});
