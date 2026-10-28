import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Instagram, Facebook, Clock, MapPin } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { useSiteSettings, whatsappHref } from "@/lib/site-settings";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Fale Conosco — TecnoFix" },
      {
        name: "description",
        content:
          "Fale conosco pelo WhatsApp, Instagram ou Facebook. Diagnóstico rápido e orçamento sem compromisso.",
      },
      { property: "og:title", content: "Fale Conosco — TecnoFix" },
      {
        property: "og:description",
        content:
          "WhatsApp, Instagram e Facebook. Diagnóstico rápido e orçamento sem compromisso.",
      },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const settings = useSiteSettings();
  const number = settings.whatsapp || "19982497244";
  const whatsapp = whatsappHref(number);
  return (
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
      <span className="chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-primary">
        ● Fale conosco
      </span>
      <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
        Vamos resolver <span className="text-primary">seu problema.</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Chame no WhatsApp para um diagnóstico rápido ou siga a TecnoFix nas
        redes sociais para dicas de manutenção e ofertas.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mt-10">
        <ExternalLink
          href={whatsapp} fallbackHint={`Adicione ${number} e chame no WhatsApp.`} copyOnBlock={number}
          className="frost-strong rounded-2xl p-6 hover:bg-white/90 transition group"
        >
          <div className="size-12 rounded-xl bg-primary text-primary-foreground grid place-items-center">
            <MessageCircle className="size-6" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-foreground">WhatsApp</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Atendimento direto com o técnico. Resposta rápida em horário
            comercial.
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
            {number} →
          </span>
        </ExternalLink>
        <ExternalLink
          href={settings.instagram || "https://instagram.com/tecno.fix"}
          className="frost-strong rounded-2xl p-6 hover:bg-white/90 transition group"
        >
          <div className="size-12 rounded-xl bg-cyan-accent text-primary-foreground grid place-items-center">
            <Instagram className="size-6" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-foreground">Instagram</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Dicas de manutenção, antes e depois de serviços e promoções.
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
            @tecno.fix →
          </span>
        </ExternalLink>
        <ExternalLink
          href={settings.facebook || "https://facebook.com/TecnoFix"}
          className="frost-strong rounded-2xl p-6 hover:bg-white/90 transition group"
        >
          <div className="size-12 rounded-xl bg-sky-accent text-primary-foreground grid place-items-center">
            <Facebook className="size-6" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-foreground">Facebook</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Novidades, avaliações de clientes e contato por mensagem.
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
            /TecnoFix →
          </span>
        </ExternalLink>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        <div className="frost rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="size-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Horário de atendimento
            </h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Segunda – Sexta</span>
              <span className="font-semibold text-foreground">08h – 18h</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Sábado</span>
              <span className="font-semibold text-foreground">09h – 13h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Domingo</span>
              <span className="font-semibold text-muted-foreground">
                Fechado
              </span>
            </div>
          </div>
        </div>
        <div className="frost rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="size-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Atendimento</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Região</span>
              <span className="font-semibold text-foreground">
                {settings.serviceArea}
              </span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Retirada e entrega</span>
              <span className="font-semibold text-primary">Disponível</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Diagnóstico</span>
              <span className="font-semibold text-primary">Gratuito</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
