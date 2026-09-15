import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatRelativeTime } from "./formatRelativeTime";

const NOW = new Date("2026-01-15T12:00:00Z").getTime();

describe("formatRelativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("says 'Just now' for anything under a minute", () => {
    expect(formatRelativeTime(NOW - 30 * 1000)).toBe("Just now");
  });

  it("uses singular/plural minutes correctly", () => {
    expect(formatRelativeTime(NOW - 1 * 60 * 1000)).toBe("1 minute ago");
    expect(formatRelativeTime(NOW - 5 * 60 * 1000)).toBe("5 minutes ago");
  });

  it("uses singular/plural hours correctly", () => {
    expect(formatRelativeTime(NOW - 1 * 60 * 60 * 1000)).toBe("1 hour ago");
    expect(formatRelativeTime(NOW - 3 * 60 * 60 * 1000)).toBe("3 hours ago");
  });

  it("uses singular/plural days correctly", () => {
    expect(formatRelativeTime(NOW - 1 * 24 * 60 * 60 * 1000)).toBe("1 day ago");
    expect(formatRelativeTime(NOW - 4 * 24 * 60 * 60 * 1000)).toBe("4 days ago");
  });

  it("switches to weeks after 7 days", () => {
    expect(formatRelativeTime(NOW - 8 * 24 * 60 * 60 * 1000)).toBe("1 week ago");
    expect(formatRelativeTime(NOW - 20 * 24 * 60 * 60 * 1000)).toBe("2 weeks ago");
  });

  it("switches to months after 4 weeks", () => {
    expect(formatRelativeTime(NOW - 40 * 24 * 60 * 60 * 1000)).toBe("1 month ago");
    expect(formatRelativeTime(NOW - 70 * 24 * 60 * 60 * 1000)).toBe("2 months ago");
  });
});
