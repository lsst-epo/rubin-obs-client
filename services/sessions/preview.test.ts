import { beforeEach, describe, expect, it, vi } from "vitest";
import { cookies, draftMode } from "next/headers";
import previewSession from "./preview";

// `cookies()` and `draftMode()` only work inside a Next request scope, which
// doesn't exist under Vitest
vi.mock("next/headers", () => ({
  cookies: vi.fn(),
  draftMode: vi.fn(),
}));

/**
 * Shared spies for the objects returned by the mocked `draftMode()` and
 * `cookies()`, so tests can assert on their calls. `Delete` is  renamed
 * `remove` rather than `delete` because `delete` is a reserved word;
 * it's mapped back to the `delete` key when the `cookies()` mock is built.
 * Vitest's `clearMocks` resets their call history between tests.
 */
const enable = vi.fn();
const disable = vi.fn();
const set = vi.fn();
const remove = vi.fn();
const get = vi.fn();

const mockDraftMode = (isEnabled: boolean) => {
  vi.mocked(draftMode).mockReturnValue({
    isEnabled,
    enable,
    disable,
  } as unknown as ReturnType<typeof draftMode>);
};

describe("previewSession", () => {
  beforeEach(() => {
    mockDraftMode(false);
    vi.mocked(cookies).mockReturnValue({
      set,
      delete: remove,
      get,
    } as unknown as ReturnType<typeof cookies>);
  });

  describe("start", () => {
    it("enables draft mode", () => {
      previewSession().start({});

      expect(enable).toHaveBeenCalledTimes(1);
    });

    it("sets the preview token cookie with secure settings when a token is given", () => {
      previewSession().start({ previewToken: "abc123" });

      expect(set).toHaveBeenCalledWith("previewToken", "abc123", {
        httpOnly: true,
        sameSite: true,
        secure: true,
      });
    });

    it("does not set a cookie when no token is given", () => {
      previewSession().start({});

      expect(set).not.toHaveBeenCalled();
    });
  });

  describe("end", () => {
    it("disables draft mode", () => {
      previewSession().end();

      expect(disable).toHaveBeenCalledTimes(1);
    });

    it("deletes the preview token cookie", () => {
      previewSession().end();

      expect(remove).toHaveBeenCalledWith("previewToken");
    });
  });

  describe("token", () => {
    it("returns the cookie value when draft mode is enabled", () => {
      mockDraftMode(true);
      get.mockReturnValue({ name: "previewToken", value: "abc123" });

      expect(previewSession().token()).toBe("abc123");
      expect(get).toHaveBeenCalledWith("previewToken");
    });

    it("returns undefined when draft mode is disabled", () => {
      get.mockReturnValue({ name: "previewToken", value: "abc123" });

      expect(previewSession().token()).toBeUndefined();
      expect(get).not.toHaveBeenCalled();
    });

    it("returns undefined when draft mode is enabled but the cookie is missing", () => {
      mockDraftMode(true);
      get.mockReturnValue(undefined);

      expect(previewSession().token()).toBeUndefined();
    });

    it("returns undefined when draftMode throws", () => {
      vi.mocked(draftMode).mockImplementation(() => {
        throw new Error("called outside a request scope");
      });

      expect(previewSession().token()).toBeUndefined();
    });
  });
});
