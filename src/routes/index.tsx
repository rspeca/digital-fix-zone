import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Instagram, Facebook } from "lucide-react";
import heroImage from "@/assets/hero-workbench.jpg";
import { WHATSAPP_URL, INSTAGRAM_URL, FACEBOOK_URL } from "./__root";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TecnoFix — Manutenção de Computadores" },
      {
        name: "description",
        content:
          "Seu computador voltando ao ritmo: manutenção completa, troca de peças, limpeza interna e formatação. Diagnóstico honesto e entrega no prazo.",
      },
      { property: "og:title", content: "TecnoFix — Manutenção de Computadores" },
      {
        property: "og:description",
        content:
          "Manutenção completa, troca de peças, limpeza interna e formatação. Diagnóstico honesto e entrega no prazo.",
      },
    ],
  }),
  component: HomePage,
});

const SERVICES = [
  {
    num: "01",
    color: "bg-primary/10 text-primary",
    title: "Manutenção preventiva",
    text: "Limpeza interna, troca de pasta térmica e revisão de componentes para prolongar a vida útil.",
  },
  {
    num: "02",
    color: "bg-cyan-accent/10 text-cyan-accent",
    title: "Upgrade de hardware",
    text: "Instalação de SSD, expansão de memória RAM e troca de fontes com garantia de funcionamento.",
  },
  {
    num: "03",
    color: "bg-sky-accent/10 text-sky-accent",
    title: "Formatação e backup",
    text: "Reinstalação do sistema, recuperação de arquivos e cópia de segurança dos seus dados.",
  },
];

const STATS = [
  { value: "12+", label: "anos de bancada" },
  { value: "4.9★", label: "avaliação Google" },
  { value: "24h", label: "prazo médio" },
];

function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-10 items-center pt-14 pb-8">
        <div>
          <span className="chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-primary">
            ● Atendimento rápido em Campinas
          </span>
          <h1 className="mt-5 text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.03] text-foreground">
            Seu computador <span className="text-primary">voltando</span> ao
            ritmo.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-md">
            Manutenção completa, troca de peças, limpeza interna e formatação.
            Diagnóstico honesto e entrega no prazo — sem enrolação.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/25 hover:bg-primary/90 transition"
            >
              <MessageCircle className="size-5" /> Falar no WhatsApp
            </a>
            <Link
              to="/servicos"
              className="inline-flex items-center px-6 py-3.5 rounded-2xl frost font-semibold text-foreground hover:bg-white/80 transition"
            >
              Ver serviços
            </Link>
          </div>
          <div className="mt-8 flex gap-8 text-sm">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-foreground">
                  {s.value}
                </div>
                <div className="text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="frost rounded-3xl p-4">
          <img
            src={heroImage}
            alt="Bancada de manutenção de computadores com ferramentas e memórias RAM"
            className="w-full aspect-[4/5] object-cover rounded-2xl"
            width={1024}
            height={1280}
          />
        </div>
      </section>

      {/* Serviços */}
      <section className="pt-6 pb-4">
        <div className="flex items-end justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Serviços
          </h2>
          <Link
            to="/servicos"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-4">
          {SERVICES.map((s) => (
            <div key={s.num} className="frost rounded-2xl p-6">
              <div
                className={`size-11 rounded-xl grid place-items-center font-extrabold ${s.color}`}
              >
                {s.num}
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Downloads */}
      <section className="py-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Downloads
        </h2>
        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <div className="frost-strong rounded-2xl p-6 flex items-start gap-4">
            <div className="size-12 rounded-xl bg-primary text-primary-foreground grid place-items-center font-extrabold shrink-0">
              DR
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">Drivers</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Pacote de drivers para áudio, vídeo, rede e chipset —
                compatível com Windows 10 e 11.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground">
                  Áudio Realtek
                </span>
                <span className="chip rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground">
                  Vídeo Intel/AMD
                </span>
                <span className="chip rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground">
                  Rede Wi-Fi
                </span>
              </div>
              <Link
                to="/drivers"
                className="inline-block mt-4 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-primary transition"
              >
                Baixar drivers
              </Link>
            </div>
          </div>
          <div className="frost-strong rounded-2xl p-6 flex items-start gap-4">
            <div className="size-12 rounded-xl bg-cyan-accent text-primary-foreground grid place-items-center font-extrabold shrink-0">
              OS
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">Sistemas</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Imagens de instalação otimizadas e leves, prontas para gravar
                em pendrive de forma segura.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground">
                  Windows 11
                </span>
                <span className="chip rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground">
                  Windows 10
                </span>
                <span className="chip rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground">
                  Linux Mint
                </span>
              </div>
              <Link
                to="/sistemas"
                className="inline-block mt-4 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-primary transition"
              >
                Baixar sistemas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-8">
        <div className="frost-strong rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-primary">
              ● Fale conosco
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
              Vamos resolver seu problema.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-sm">
              Chame no WhatsApp para um diagnóstico rápido ou siga a TecnoFix
              para dicas de manutenção e ofertas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition"
              >
                <MessageCircle className="size-4" /> WhatsApp 19 98249-7244
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl frost font-semibold text-foreground hover:bg-white/80 transition"
              >
                <Instagram className="size-4" /> Instagram
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl frost font-semibold text-foreground hover:bg-white/80 transition"
              >
                <Facebook className="size-4" /> Facebook
              </a>
            </div>
          </div>
          <div className="frost rounded-2xl p-6">
            <div className="text-sm font-semibold text-muted-foreground">
              Atendimento
            </div>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Seg – Sex</span>
                <span className="font-semibold text-foreground">
                  08h – 18h
                </span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Sábado</span>
                <span className="font-semibold text-foreground">
                  09h – 13h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Retirada e entrega
                </span>
                <span className="font-semibold text-primary">Disponível</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
