import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, MessageCircle, Instagram, Facebook, MonitorCog } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ExternalLink } from "@/components/external-link";
import { Toaster } from "@/components/ui/sonner";
import { useSiteSettings, whatsappHref } from "@/lib/site-settings";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/servicos", label: "Serviços" },
  { to: "/drivers", label: "Drivers" },
  { to: "/sistemas", label: "Sistemas" },
  { to: "/contato", label: "Contato" },
] as const;

function Logo() {
  const settings = useSiteSettings();
  return (
    <Link to="/" className="flex items-center" aria-label="Página inicial">
      {settings.logoUrl ? <img src={settings.logoUrl} alt={settings.siteName} className="h-10 max-w-40 object-contain" /> : <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><MonitorCog className="size-6" aria-hidden="true" /></span>}
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const settings = useSiteSettings();
  const number = settings.whatsapp || "19982497244";
  const whatsapp = whatsappHref(number);

  return (
    <header className="sticky top-4 z-50 max-w-6xl mx-auto px-6">
      <nav className="frost-strong rounded-2xl flex items-center justify-between px-5 py-3">
        <Logo />
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-primary font-semibold" }}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ExternalLink
            href={whatsapp} fallbackHint={`Adicione ${number} e chame no WhatsApp.`} copyOnBlock={number}
            className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-primary transition-colors"
          >
            Orçamento
          </ExternalLink>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-foreground"
            aria-label="Abrir menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden frost-strong rounded-2xl mt-2 p-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-primary font-semibold" }}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer() {
  const settings = useSiteSettings();
  const number = settings.whatsapp || "19982497244";
  const whatsapp = whatsappHref(number);
  return (
    <footer className="max-w-6xl mx-auto px-6 pb-10 mt-4">
      <div className="frost rounded-2xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>© 2026 {settings.siteName || "Digital Fix Zone"}</span>
        <div className="flex gap-5 font-medium">
          <ExternalLink
            href={whatsapp} fallbackHint={`Adicione ${number} e chame no WhatsApp.`} copyOnBlock={number}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </ExternalLink>
          <ExternalLink
            href={settings.instagram || "https://instagram.com/tecno.fix"}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Instagram className="size-4" /> Instagram
          </ExternalLink>
          <ExternalLink
            href={settings.facebook || "https://facebook.com/TecnoFix"}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Facebook className="size-4" /> Facebook
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Página não encontrada
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Tente atualizar ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "TecnoFix — Manutenção de Computadores" },
        {
          name: "description",
          content:
            "Assistência técnica de computadores: formatação, limpeza, upgrade, remoção de vírus, downloads de drivers e sistemas. Atendimento rápido pelo WhatsApp.",
        },
        { property: "og:title", content: "TecnoFix — Manutenção de Computadores" },
        {
          property: "og:description",
          content:
            "Manutenção completa, formatação, upgrades e downloads de drivers e sistemas operacionais.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  }
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen page-gradient antialiased relative overflow-x-clip">
        {/* Decorative blurred blobs */}
        <div className="absolute rounded-full blur-[70px] pointer-events-none bg-primary/25 w-[480px] h-[480px] -top-32 -left-24" />
        <div className="absolute rounded-full blur-[70px] pointer-events-none bg-cyan-accent/25 w-[420px] h-[420px] top-1/3 -right-28" />
        <div className="absolute rounded-full blur-[70px] pointer-events-none bg-sky-accent/30 w-[360px] h-[360px] bottom-0 left-1/4" />
        <Header />
        <main className="relative">
          <Outlet />
        </main>
        <Footer />
        <Toaster position="bottom-center" richColors />
      </div>
    </QueryClientProvider>
  );
}
