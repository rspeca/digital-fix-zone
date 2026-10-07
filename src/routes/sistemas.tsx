import { createFileRoute } from "@tanstack/react-router";
import { Download, MessageCircle, Info } from "lucide-react";
import { WHATSAPP_URL } from "./__root";

export const Route = createFileRoute("/sistemas")({
  head: () => ({
    meta: [
      { title: "Baixar Sistemas — TecnoFix" },
      {
        name: "description",
        content:
          "Baixe Windows 10, Windows 11 e distribuições Linux oficiais para instalação em pendrive bootável.",
      },
      { property: "og:title", content: "Baixar Sistemas — TecnoFix" },
      {
        property: "og:description",
        content:
          "Windows 10, Windows 11 e Linux — imagens oficiais prontas para pendrive bootável.",
      },
    ],
  }),
  component: SistemasPage,
});

const SYSTEMS = [
  {
    name: "Windows 11",
    badge: "64-bit",
    color: "bg-primary text-primary-foreground",
    text: "Versão mais recente do Windows. Requer TPM 2.0 e processador compatível.",
    url: "https://www.microsoft.com/pt-br/software-download/windows11",
    size: "≈ 5,5 GB",
  },
  {
    name: "Windows 10",
    badge: "64-bit",
    color: "bg-cyan-accent text-primary-foreground",
    text: "Estável e compatível com a maioria dos computadores. Ideal para máquinas mais antigas.",
    url: "https://www.microsoft.com/pt-br/software-download/windows10",
    size: "≈ 5 GB",
  },
  {
    name: "Linux Mint",
    badge: "Gratuito",
    color: "bg-sky-accent text-primary-foreground",
    text: "Sistema leve e gratuito, perfeito para dar vida nova a computadores antigos.",
    url: "https://linuxmint.com/download.php",
    size: "≈ 2,5 GB",
  },
  {
    name: "Ubuntu",
    badge: "Gratuito",
    color: "bg-primary text-primary-foreground",
    text: "Distribuição Linux popular, com visual moderno e grande suporte da comunidade.",
    url: "https://ubuntu.com/download/desktop",
    size: "≈ 5 GB",
  },
];

function SistemasPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
      <span className="chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-primary">
        ● Downloads
      </span>
      <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
        Baixar <span className="text-primary">sistemas</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Imagens oficiais de instalação, prontas para gravar em um pendrive
        bootável de forma segura.
      </p>

      <div className="frost rounded-2xl p-5 mt-8 flex items-start gap-3">
        <Info className="size-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Como instalar:
          </span>{" "}
          baixe a imagem, grave em um pendrive de 8 GB ou mais com a ferramenta
          oficial e inicie o computador pelo pendrive. Se preferir, a gente faz
          tudo para você.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {SYSTEMS.map((s) => (
          <div key={s.name} className="frost-strong rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`size-11 rounded-xl grid place-items-center font-extrabold text-xs ${s.color}`}
              >
                {s.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{s.name}</h2>
                <span className="text-xs font-semibold text-muted-foreground">
                  {s.badge} · {s.size}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{s.text}</p>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-primary transition"
            >
              <Download className="size-4" /> Baixar {s.name}
            </a>
          </div>
        ))}
      </div>

      <div className="frost-strong rounded-3xl p-8 mt-10 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          Formatação completa com backup
        </h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          Instalamos o sistema, salvamos seus arquivos e deixamos tudo pronto
          para usar.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition"
        >
          <MessageCircle className="size-5" /> Agendar formatação
        </a>
      </div>
    </div>
  );
}
