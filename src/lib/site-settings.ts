import { useEffect, useState } from "react";

export type SiteSettings = {
  siteName: string; logoUrl: string; heroImageUrl: string; heroTitle: string;
  heroSubtitle: string; heroBadge: string; contactTitle: string; contactText: string;
  serviceArea: string; whatsapp: string; instagram: string; facebook: string;
  isoLinks: { name: string; url: string; description?: string }[];
};
export type AdminSession = {
  access_token: string; refresh_token?: string; expires_at?: number;
  user: { id: string; email?: string };
};
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "Digital Fix Zone", logoUrl: "", heroImageUrl: "",
  heroTitle: "Seu computador voltando ao ritmo.",
  heroSubtitle: "Manutenção completa, troca de peças, limpeza interna e formatação. Diagnóstico honesto e entrega no prazo — sem enrolação.",
  heroBadge: "Atendimento rápido", contactTitle: "Vamos resolver seu problema.",
  contactText: "Chame no WhatsApp para um diagnóstico rápido ou siga nossas redes sociais para dicas de manutenção e ofertas.",
  serviceArea: "Rio Claro e região", whatsapp: "19982497244",
  instagram: "https://instagram.com/tecno.fix", facebook: "https://facebook.com/TecnoFix", isoLinks: [],
};
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const SESSION_KEY = "dfz-admin-session";
const SETTINGS_EVENT = "dfz-site-settings-updated";
export function isDatabaseConfigured() { return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY); }
export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as AdminSession | null;
    if (!session?.access_token || !session?.user?.id) return null;
    if (session.expires_at && session.expires_at * 1000 < Date.now()) { localStorage.removeItem(SESSION_KEY); return null; }
    return session;
  } catch { return null; }
}
function apiHeaders(token?: string) {
  return { apikey: SUPABASE_ANON_KEY, Authorization: "Bearer " + (token || SUPABASE_ANON_KEY), "Content-Type": "application/json" };
}
async function responseError(response: Response) {
  try { const body = await response.json(); return body.msg || body.message || body.error_description || body.error || "Erro HTTP " + response.status; }
  catch { return "Erro HTTP " + response.status; }
}
export async function signInAdmin(email: string, password: string) {
  if (!isDatabaseConfigured()) throw new Error("Banco de dados não configurado. Siga o README para conectar o Supabase.");
  const response = await fetch(SUPABASE_URL + "/auth/v1/token?grant_type=password", { method: "POST", headers: apiHeaders(), body: JSON.stringify({ email, password }) });
  if (!response.ok) throw new Error(await responseError(response));
  const session = await response.json() as AdminSession & { expires_in?: number };
  if (!session.access_token || !session.user?.id) throw new Error("O provedor não retornou uma sessão válida.");
  session.expires_at = session.expires_at || Math.floor(Date.now() / 1000) + (session.expires_in || 3600);
  if (!(await verifyAdmin(session.access_token, session.user.id))) throw new Error("Este usuário não tem permissão de administrador.");
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}
export async function verifyAdmin(token?: string, userId?: string) {
  const session = getAdminSession(), accessToken = token || session?.access_token, id = userId || session?.user.id;
  if (!isDatabaseConfigured() || !accessToken || !id) return false;
  const response = await fetch(SUPABASE_URL + "/rest/v1/site_admins?user_id=eq." + encodeURIComponent(id) + "&select=user_id", { headers: apiHeaders(accessToken) });
  if (!response.ok) { if (response.status === 401 || response.status === 403) return false; throw new Error(await responseError(response)); }
  const rows = await response.json();
  return Array.isArray(rows) && rows.some((row: { user_id?: string }) => row.user_id === id);
}
export async function signOutAdmin() {
  const session = getAdminSession();
  if (session && isDatabaseConfigured()) { try { await fetch(SUPABASE_URL + "/auth/v1/logout", { method: "POST", headers: apiHeaders(session.access_token) }); } catch { /* Clear local session even offline. */ } }
  localStorage.removeItem(SESSION_KEY);
}
export async function loadSiteSettings(): Promise<SiteSettings> {
  if (!isDatabaseConfigured()) return DEFAULT_SITE_SETTINGS;
  try {
    const response = await fetch(SUPABASE_URL + "/rest/v1/site_settings?id=eq.1&select=settings", { headers: apiHeaders() });
    if (!response.ok) return DEFAULT_SITE_SETTINGS;
    const rows = await response.json();
    if (!Array.isArray(rows) || !rows[0]?.settings) return DEFAULT_SITE_SETTINGS;
    return { ...DEFAULT_SITE_SETTINGS, ...rows[0].settings, isoLinks: Array.isArray(rows[0].settings.isoLinks) ? rows[0].settings.isoLinks : [] };
  } catch { return DEFAULT_SITE_SETTINGS; }
}
export async function saveSiteSettings(settings: SiteSettings) {
  const session = getAdminSession();
  if (!session) throw new Error("Sua sessão expirou. Entre novamente.");
  if (!(await verifyAdmin(session.access_token, session.user.id))) throw new Error("Acesso administrativo não autorizado.");
  const response = await fetch(SUPABASE_URL + "/rest/v1/site_settings?on_conflict=id", {
    method: "POST", headers: { ...apiHeaders(session.access_token), Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ id: 1, settings, updated_at: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error(await responseError(response));
  if (typeof window !== "undefined") window.dispatchEvent(new Event(SETTINGS_EVENT));
}
export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  useEffect(() => {
    let active = true;
    const refresh = () => { void loadSiteSettings().then((value) => { if (active) setSettings(value); }); };
    refresh(); window.addEventListener("storage", refresh); window.addEventListener(SETTINGS_EVENT, refresh);
    return () => { active = false; window.removeEventListener("storage", refresh); window.removeEventListener(SETTINGS_EVENT, refresh); };
  }, []);
  return settings;
}
export function whatsappHref(number: string) {
  const digits = number.replace(/\D/g, "");
  return "https://wa.me/" + (digits.startsWith("55") ? digits : "55" + digits);
}
