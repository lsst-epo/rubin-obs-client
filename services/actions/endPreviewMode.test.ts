import { describe, expect, it, vi } from "vitest";
import previewSession from "@/services/sessions/preview";
import endPreviewMode from "./endPreviewMode";

const end = vi.fn();

// The session behavior is covered in preview.test.ts, so this only checks that
// the action delegates to it
vi.mock("@/services/sessions/preview", () => ({
  default: vi.fn(() => ({ end })),
}));

describe("endPreviewMode", () => {
  it("ends the preview session", async () => {
    await endPreviewMode();

    expect(previewSession).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
  });
});
