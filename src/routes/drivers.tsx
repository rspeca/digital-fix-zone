import { createFileRoute } from "@tanstack/react-router";
import { Download, MessageCircle, Info } from "lucide-react";
import { WHATSAPP_URL } from "./__root";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Baixar Drivers — TecnoFix" },
      {
        name: "description",
        content:
          "Baixe drivers de áudio, vídeo, rede e chipset para Windows 10 e 11. Links oficiais dos fabricantes.",
      },
      { property: "og:title", content: "Baixar Drivers — TecnoFix" },
      {
        property: "og:description",
        content:
          "Drivers de áudio, vídeo, rede e chipset — links oficiais dos fabricantes.",
      },
    ],
  }),
  component: DriversPage,
});

const DRIVER_GROUPS = [
  {
    brand: "Realtek",
    color: "bg-primary/10 text-primary",
    drivers: [
      {
        name: "Áudio HD (Windows 10/11)",
        size: "≈ 300 MB",
        url: "https://www.realtek.com/Download/List?cate_id=593&menu_id=298",
      },
      {
        name: "Placa de rede Ethernet",
        size: "≈ 10 MB",
        url: "https://www.realtek.com/Download/List?cate_id=584&menu_id=296",
      },
    ],
  },
  {
    brand: "NVIDIA",
    color: "bg-cyan-accent/10 text-cyan-accent",
    drivers: [
      {
        name: "GeForce (placa de vídeo)",
        size: "≈ 700 MB",
        url: "https://www.nvidia.com.br/drivers",
      },
    ],
  },
  {
    brand: "AMD",
    color: "bg-sky-accent/10 text-sky-accent",
    drivers: [
      {
        name: "Adrenalin (vídeo e chipset)",
        size: "≈ 600 MB",
        url: "https://www.amd.com/pt/support",
      },
    ],
  },
  {
    brand: "Intel",
    color: "bg-primary/10 text-primary",
    drivers: [
      {
        name: "Assistente de driver Intel",
        size: "≈ 3 MB",
        url: "https://www.intel.com.br/content/www/br/pt/download-center/detect.html",
      },
      {
        name: "Wi-Fi e Bluetooth",
        size: "≈ 50 MB",
        url: "https://www.intel.com.br/content/www/br/pt/download-center/wireless.html",
      },
    ],
  },
];

function DriversPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
      <span className="chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-primary">
        ● Downloads
      </span>
      <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
        Baixar <span className="text-primary">drivers</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Links oficiais dos fabricantes para baixar drivers com segurança.
        Identifique o modelo do seu equipamento e escolha o pacote correto.
      </p>

      <div className="frost rounded-2xl p-5 mt-8 flex items-start gap-3">
        <Info className="size-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Dica:</span> não sabe
          qual driver precisa? Chame no WhatsApp que a gente identifica para
          você e instala remotamente.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {DRIVER_GROUPS.map((group) => (
          <div key={group.brand} className="frost-strong rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`size-10 rounded-xl grid place-items-center font-extrabold text-sm ${group.color}`}
              >
                {group.brand.slice(0, 2).toUpperCase()}
              </div>
              <h2 className="text-lg font-bold text-foreground">
                {group.brand}
              </h2>
            </div>
            <div className="space-y-2">
              {group.drivers.map((d) => (
                <a
                  key={d.name}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 py-3 px-4 rounded-xl chip hover:bg-white/80 transition group"
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {d.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {d.size}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Download className="size-4" /> Baixar
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="frost-strong rounded-3xl p-8 mt-10 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          Precisa de ajuda com a instalação?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Instalamos e configuramos todos os drivers para você.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition"
        >
          <MessageCircle className="size-5" /> Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
