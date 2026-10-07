import { createFileRoute } from "@tanstack/react-router";
import {
  Wrench,
  Cpu,
  HardDrive,
  ShieldCheck,
  Gauge,
  Wifi,
  MessageCircle,
} from "lucide-react";
import { WHATSAPP_URL } from "./__root";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — TecnoFix Manutenção de Computadores" },
      {
        name: "description",
        content:
          "Formatação, limpeza interna, upgrade de hardware, remoção de vírus e manutenção preventiva de computadores com garantia.",
      },
      { property: "og:title", content: "Serviços — TecnoFix" },
      {
        property: "og:description",
        content:
          "Formatação, limpeza interna, upgrade de hardware, remoção de vírus e manutenção preventiva.",
      },
    ],
  }),
  component: ServicosPage,
});

const SERVICES = [
  {
    icon: Wrench,
    color: "bg-primary/10 text-primary",
    title: "Manutenção preventiva",
    text: "Limpeza interna completa, troca de pasta térmica, revisão de ventoinhas e componentes para prolongar a vida útil da máquina.",
    items: ["Limpeza de poeira", "Pasta térmica nova", "Teste de temperatura"],
  },
  {
    icon: Cpu,
    color: "bg-cyan-accent/10 text-cyan-accent",
    title: "Upgrade de hardware",
    text: "Instalação de SSD, expansão de memória RAM, troca de fonte e placa de vídeo — tudo configurado e testado.",
    items: ["SSD e HD", "Memória RAM", "Placa de vídeo"],
  },
  {
    icon: HardDrive,
    color: "bg-sky-accent/10 text-sky-accent",
    title: "Formatação e backup",
    text: "Reinstalação limpa do sistema operacional com cópia de segurança dos seus arquivos, fotos e documentos.",
    items: ["Backup completo", "Sistema otimizado", "Programas essenciais"],
  },
  {
    icon: ShieldCheck,
    color: "bg-primary/10 text-primary",
    title: "Remoção de vírus",
    text: "Varredura profunda, eliminação de malwares, spywares e reinstalação da proteção do sistema.",
    items: ["Varredura completa", "Antivírus configurado", "Navegação segura"],
  },
  {
    icon: Gauge,
    color: "bg-cyan-accent/10 text-cyan-accent",
    title: "Otimização de desempenho",
    text: "Seu PC lento? Ajustamos inicialização, removemos programas desnecessários e deixamos tudo rápido de novo.",
    items: ["Boot mais rápido", "Limpeza de arquivos", "Ajuste fino"],
  },
  {
    icon: Wifi,
    color: "bg-sky-accent/10 text-sky-accent",
    title: "Rede e Wi-Fi",
    text: "Configuração de rede doméstica, melhoria de sinal Wi-Fi e compartilhamento de impressoras e arquivos.",
    items: ["Configuração de roteador", "Repetidor de sinal", "Rede segura"],
  },
];

function ServicosPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
      <span className="chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-primary">
        ● Nossos serviços
      </span>
      <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
        Tudo para o seu computador{" "}
        <span className="text-primary">funcionar bem.</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Diagnóstico gratuito, orçamento sem compromisso e garantia em todos os
        serviços. Cada máquina passa por verificação completa antes e depois.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {SERVICES.map((s) => (
          <div key={s.title} className="frost rounded-2xl p-6">
            <div
              className={`size-11 rounded-xl grid place-items-center ${s.color}`}
            >
              <s.icon className="size-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            <ul className="mt-4 space-y-1.5">
              {s.items.map((item) => (
                <li
                  key={item}
                  className="text-xs font-medium text-muted-foreground flex items-center gap-2"
                >
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="frost-strong rounded-3xl p-8 md:p-10 mt-10 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Não achou o que precisa?
        </h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          Chame no WhatsApp e descreva o problema — a gente encontra a solução.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/25 hover:bg-primary/90 transition"
        >
          <MessageCircle className="size-5" /> Pedir orçamento gratuito
        </a>
      </div>
    </div>
  );
}
