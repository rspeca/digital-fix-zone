import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { openExternal } from "../lib/open-external";

type ExternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  /** Shown when the browser refuses to open a new tab, e.g. "Adicione (19) ... e chame no WhatsApp." */
  fallbackHint?: string;
  /** Text copied to the clipboard when the new tab is refused (e.g. a phone number). */
  copyOnBlock?: string;
  children: ReactNode;
};

function hostOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return "este link";
  }
}

/**
 * An external link that still works when the app runs inside the preview iframe,
 * where a plain `target="_blank"` click is silently swallowed by the browser.
 */
export function ExternalLink({
  href,
  fallbackHint,
  copyOnBlock,
  onClick,
  children,
  ...anchorProps
}: ExternalLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    // Let modified clicks (middle click, cmd/ctrl) through so the browser's own
    // "open in new tab" behaviour keeps working.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();

    if (openExternal(href, window) !== "blocked") return;

    if (copyOnBlock) {
      void navigator.clipboard?.writeText(copyOnBlock).catch(() => undefined);
    }
    const hint = fallbackHint ?? `Abra ${hostOf(href)} em outra aba.`;
    toast.warning("O navegador bloqueou a nova aba", {
      id: href,
      description: copyOnBlock ? `${hint} Número copiado.` : hint,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      {...anchorProps}
    >
      {children}
    </a>
  );
}
