export type ExternalOutcome = "opened" | "top" | "same" | "blocked";

// Minimal structural view of a window so the fallback order can be tested without a browser.
export type ExternalWindow = {
  open: (url: string, target?: string, features?: string) => unknown;
  top: ExternalWindow | null;
  location: { href: string };
};

/**
 * Opens an external link as reliably as the host page allows.
 *
 * The app is previewed inside a sandboxed iframe, where `target="_blank"` popups are
 * silently swallowed and the provider's own frame-ancestors rule stops the link from
 * loading inside the frame. So try, in order: a new tab, then navigating the browser's
 * top-level page, then — only when this page already is the top-level page — the
 * current window. Returns "blocked" when nothing was possible, so the caller can show
 * the contact details instead of leaving the click with no feedback at all.
 */
export function openExternal(url: string, win: ExternalWindow): ExternalOutcome {
  let popup: unknown = null;
  try {
    popup = win.open(url, "_blank", "noopener,noreferrer");
  } catch {
    popup = null;
  }
  if (popup) return "opened";

  const top = win.top ?? win;
  if (top === win) {
    win.location.href = url;
    return "same";
  }

  try {
    top.location.href = url;
    return "top";
  } catch {
    return "blocked";
  }
}
