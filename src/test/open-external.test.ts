import { describe, expect, it, vi } from "vitest";

import { openExternal, type ExternalWindow } from "@/lib/open-external";

const LINK = "https://wa.me/5519982497244";

type FakeOptions = {
  popup: unknown;
  isTop?: boolean;
  topThrows?: boolean;
};

function fakeWindow({ popup, isTop = false, topThrows = false }: FakeOptions): {
  win: ExternalWindow;
  ownHref: () => string;
  topHref: () => string;
} {
  const own = { href: "http://localhost:8080/" };
  const topLoc = {
    href: "http://preview.example/",
    set href(_value: string) {
      if (topThrows) throw new Error("SecurityError: top navigation blocked");
      topLoc.href = LINK;
    },
    get href() {
      return own.href;
    },
  };
  const top: ExternalWindow = {
    open: () => null,
    top: null,
    location: topLoc,
  };
  const win: ExternalWindow = {
    open: vi.fn(() => popup),
    top: isTop ? null : top,
    location: own,
  };
  return {
    win,
    ownHref: () => own.href,
    topHref: () => (topThrows ? "blocked" : topLoc.href),
  };
}

describe("openExternal", () => {
  it("uses the new tab when the browser allows it", () => {
    const { win, ownHref } = fakeWindow({ popup: {} });

    expect(openExternal(LINK, win)).toBe("opened");
    expect(win.open).toHaveBeenCalledWith(LINK, "_blank", "noopener,noreferrer");
    expect(ownHref()).toBe("http://localhost:8080/");
  });

  it("navigates the top-level page when the popup is blocked inside a frame", () => {
    const { win, ownHref, topHref } = fakeWindow({ popup: null });

    expect(openExternal(LINK, win)).toBe("top");
    expect(topHref()).toBe(LINK);
    expect(ownHref()).toBe("http://localhost:8080/");
  });

  it("reports blocked instead of loading the link inside the frame", () => {
    const { win, ownHref } = fakeWindow({ popup: null, topThrows: true });

    expect(openExternal(LINK, win)).toBe("blocked");
    expect(ownHref()).toBe("http://localhost:8080/");
  });

  it("navigates the current window when it is already the top-level page", () => {
    const { win, ownHref } = fakeWindow({ popup: null, isTop: true });

    expect(openExternal(LINK, win)).toBe("same");
    expect(ownHref()).toBe(LINK);
  });
});
