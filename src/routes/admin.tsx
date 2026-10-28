import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Download, Eye, EyeOff, ImagePlus, Link2, LoaderCircle, LogOut, MonitorCog, Plus, Save, ShieldCheck, ShieldAlert, Trash2, Upload, UserRound } from "lucide-react";
import { DEFAULT_SITE_SETTINGS, getAdminSession, isDatabaseConfigured, loadSiteSettings, saveSiteSettings, signInAdmin, signOutAdmin, verifyAdmin, type SiteSettings } from "@/lib/site-settings";

export const Route = createFileRoute("/admin")({ head: () => ({ meta: [{ title: "Painel administrativo | Digital Fix Zone" }] }), component: AdminPage });
type Tab = "content" | "visual" | "contact" | "downloads";

function AdminPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [tab, setTab] = useState<Tab>("content");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadDescription, setDownloadDescription] = useState("");

  useEffect(() => {
    let active = true;
    const start = async () => {
      const session = getAdminSession();
      if (session) {
        try {
          const allowed = await verifyAdmin(session.access_token, session.user.id);
          if (active && allowed) { setAuthenticated(true); setSettings(await loadSiteSettings()); }
        } catch { if (active) setError("Não foi possível validar a sessão com o banco."); }
      }
      if (active) setChecking(false);
    };
    void start();
    return () => { active = false; };
  }, []);

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setMessage("");
  };
  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      await signInAdmin(email.trim(), password);
      setSettings(await loadSiteSettings()); setAuthenticated(true); setPassword("");
      setMessage("Acesso autorizado. Bem-vindo ao painel.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível entrar."); }
    finally { setBusy(false); }
  };
  const save = async () => {
    setBusy(true); setError(""); setMessage("");
    try { await saveSiteSettings(settings); setMessage("Tudo salvo no banco de dados. As páginas públicas serão atualizadas."); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Falha ao salvar as configurações."); }
    finally { setBusy(false); }
  };
  const logout = async () => { await signOutAdmin(); setAuthenticated(false); setSettings(DEFAULT_SITE_SETTINGS); setMessage(""); };
  const uploadImage = (key: "logoUrl" | "heroImageUrl", file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 1024 * 1024) { setError("Escolha uma imagem de até 1 MB para guardar no banco de dados."); return; }
    const reader = new FileReader();
    reader.onload = () => update(key, String(reader.result || ""));
    reader.onerror = () => setError("Não foi possível ler essa imagem.");
    reader.readAsDataURL(file);
  };
  const addDownload = () => {
    if (!downloadName.trim() || !/^https?:\/\//i.test(downloadUrl.trim())) { setError("Informe o nome e um endereço iniciado por http:// ou https://."); return; }
    update("isoLinks", [...settings.isoLinks, { name: downloadName.trim(), url: downloadUrl.trim(), description: downloadDescription.trim() }]);
    setDownloadName(""); setDownloadUrl(""); setDownloadDescription("");
    setMessage("Link incluído no rascunho. Clique em Salvar alterações.");
  };

  if (checking) return <div className="grid min-h-screen place-items-center bg-slate-950 text-white"><LoaderCircle className="animate-spin" size={28} /></div>;

  if (!authenticated) return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-950 px-4 py-12 text-slate-100">
      <div className="absolute -left-24 -top-24 size-80 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-cyan-500/15 blur-3xl" />
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-xl sm:p-9">
        <div className="mb-7 flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-emerald-400 text-slate-950"><MonitorCog size={25} /></span><div><p className="font-extrabold tracking-wide">DIGITAL FIX ZONE</p><p className="mt-1 text-xs text-slate-400">Central administrativa segura</p></div></div>
        <div className="mb-6"><span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200"><ShieldCheck size={14} /> Área restrita</span><h1 className="mt-4 text-3xl font-extrabold">Acesse seu painel</h1><p className="mt-2 text-sm leading-6 text-slate-400">Entre com o e-mail e a senha do administrador cadastrados no banco.</p></div>
        {!isDatabaseConfigured() && <div className="mb-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100"><ShieldAlert className="mb-2" size={18} /><b>Banco ainda não conectado.</b><br />Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no ambiente do site e execute o SQL de supabase/migrations no projeto Supabase. Veja o README.</div>}
        <form onSubmit={login} className="space-y-4">
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-200">E-mail de administrador</span><span className="relative block"><UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} /><input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3 pl-10 pr-3 text-sm outline-none focus:border-emerald-400" /></span></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-200">Senha</span><span className="relative block"><input type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3 pl-4 pr-12 text-sm outline-none focus:border-emerald-400" /><button type="button" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
          {error && <p role="alert" className="rounded-xl border border-red-300/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
          <button disabled={busy || !isDatabaseConfigured()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3.5 font-extrabold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40">{busy ? <LoaderCircle className="animate-spin" size={18} /> : <ShieldCheck size={18} />} Entrar no painel</button>
        </form>
        <a href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white">Voltar ao site <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );

  const tabs: { id: Tab; label: string; icon: typeof ImagePlus }[] = [
    { id: "content", label: "Textos do site", icon: MonitorCog }, { id: "visual", label: "Logo e fotos", icon: ImagePlus },
    { id: "contact", label: "Contato e redes", icon: Link2 }, { id: "downloads", label: "ISOs e downloads", icon: Download },
  ];
  const field = (label: string, key: keyof SiteSettings, hint?: string) => (
    <label key={key} className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span><input value={String(settings[key] ?? "")} onChange={(event) => update(key, event.target.value as never)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />{hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}</label>
  );
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-emerald-600 text-white"><MonitorCog size={24} /></span><div><b className="block">Digital Fix Zone</b><span className="text-xs text-slate-500">Painel de administração</span></div></div><div className="flex items-center gap-2"><a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold hover:bg-slate-50">Ver site <ArrowUpRight size={15} /></a><button onClick={() => void logout()} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white hover:bg-slate-700"><LogOut size={15} /><span className="hidden sm:inline">Sair</span></button></div></div></header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-extrabold tracking-[.22em] text-emerald-700">CENTRAL DE CONTROLE</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Seu site. Suas regras.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Edite textos, imagens, contatos e downloads. As mudanças são salvas no banco e compartilhadas com os visitantes.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800"><CheckCircle2 size={15} /> Conectado como administrador</span></div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[235px_1fr]">
          <nav className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">{tabs.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setTab(item.id)} className={"mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition " + (tab === item.id ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50")}><Icon size={18} />{item.label}</button>; })}<div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600"><ShieldCheck size={17} className="mb-2 text-emerald-700" /><b>Protegido por login e banco.</b><br />Somente usuários cadastrados na lista de administradores podem salvar.</div></nav>
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            {tab === "content" && <><h2 className="text-xl font-extrabold">Textos e apresentação</h2><p className="mb-6 mt-1 text-sm text-slate-500">Edite os textos principais exibidos na página inicial e no contato.</p><div className="grid gap-5 md:grid-cols-2">{field("Nome do site", "siteName")}{field("Selo acima do título", "heroBadge")}{field("Título principal da Home", "heroTitle")}{field("Área de atendimento", "serviceArea")}<label className="block md:col-span-2"><span className="mb-2 block text-sm font-bold text-slate-700">Descrição da página inicial</span><textarea rows={3} value={settings.heroSubtitle} onChange={(e) => update("heroSubtitle", e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" /></label>{field("Título da seção de contato", "contactTitle")}<label className="block md:col-span-2"><span className="mb-2 block text-sm font-bold text-slate-700">Texto da seção de contato</span><textarea rows={3} value={settings.contactText} onChange={(e) => update("contactText", e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" /></label></div></>}
            {tab === "visual" && <><h2 className="text-xl font-extrabold">Identidade visual</h2><p className="mb-6 mt-1 text-sm text-slate-500">Envie imagens de até 1 MB cada. Elas ficam guardadas no banco.</p><div className="grid gap-4 md:grid-cols-2">{([{ key: "logoUrl", label: "Logotipo" }, { key: "heroImageUrl", label: "Foto principal" }] as const).map((item) => <div key={item.key} className="rounded-2xl border border-slate-200 p-4"><b className="mb-3 block">{item.label}</b>{settings[item.key] ? <img src={settings[item.key]} alt={item.label} className="mb-3 h-32 w-full rounded-xl bg-slate-50 object-contain" /> : <div className="mb-3 grid h-32 place-items-center rounded-xl bg-slate-50 text-sm text-slate-400">Nenhuma imagem selecionada</div>}<label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold hover:bg-slate-50"><Upload size={16} /> Escolher imagem<input type="file" accept="image/*" className="hidden" onChange={(e) => uploadImage(item.key, e.target.files?.[0])} /></label>{settings[item.key] && <button onClick={() => update(item.key, "")} className="mt-3 text-xs font-bold text-red-600">Remover imagem</button>}</div>)}</div></>}
            {tab === "contact" && <><h2 className="text-xl font-extrabold">Contato e redes sociais</h2><p className="mb-6 mt-1 text-sm text-slate-500">Atualize os canais do cabeçalho, rodapé e página de contato.</p><div className="space-y-5">{field("WhatsApp (DDD + número, somente dígitos)", "whatsapp", "Exemplo: 19982497244")}{field("Link do Instagram", "instagram", "Use o endereço completo do perfil")}{field("Link do Facebook", "facebook", "Use o endereço completo da página")}</div></>}
            {tab === "downloads" && <><h2 className="text-xl font-extrabold">ISOs e downloads</h2><p className="mb-5 mt-1 text-sm text-slate-500">Adicione links que serão exibidos na página Sistemas.</p><div className="grid gap-3 rounded-2xl bg-slate-50 p-4"><input value={downloadName} onChange={(e) => setDownloadName(e.target.value)} placeholder="Nome do sistema" className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm" /><input value={downloadUrl} onChange={(e) => setDownloadUrl(e.target.value)} placeholder="Link oficial https://..." className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm" /><input value={downloadDescription} onChange={(e) => setDownloadDescription(e.target.value)} placeholder="Descrição opcional" className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm" /><button onClick={addDownload} className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"><Plus size={16} /> Adicionar link</button></div><div className="mt-5 space-y-2">{settings.isoLinks.map((item, index) => <div key={item.url + index} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"><div className="min-w-0 flex-1"><b className="block text-sm">{item.name}</b><span className="block truncate text-xs text-slate-500">{item.url}</span>{item.description && <span className="block text-xs text-slate-500">{item.description}</span>}</div><button aria-label="Remover download" onClick={() => update("isoLinks", settings.isoLinks.filter((_, i) => i !== index))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={17} /></button></div>)}{!settings.isoLinks.length && <p className="rounded-xl border border-dashed border-slate-200 p-5 text-center text-sm text-slate-500">Nenhum link personalizado cadastrado.</p>}</div></>}
            <div className="mt-8 border-t border-slate-200 pt-5"><button disabled={busy} onClick={() => void save()} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700 disabled:opacity-50">{busy ? <LoaderCircle className="animate-spin" size={17} /> : <Save size={17} />} Salvar alterações</button>{message && <p role="status" className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-700"><CheckCircle2 size={16} />{message}</p>}{error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
