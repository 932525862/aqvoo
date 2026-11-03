"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/data";
import { DICT, LANGS, type Dict } from "@/lib/i18n";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangCtx = createContext<Ctx>({ lang: "uz", t: DICT.uz, setLang: () => {} });

const KEY = "aqvo-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    const fromUrl = new URLSearchParams(location.search).get("lang");
    const pick = [fromUrl, saved].find((x): x is Lang => !!x && (LANGS as string[]).includes(x));
    if (pick) setLangState(pick);
  }, []);

  useEffect(() => {
    document.documentElement.lang = DICT[lang].meta.htmlLang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch {}
  };

  return <LangCtx.Provider value={{ lang, t: DICT[lang], setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

/** Compact language switcher (dropdown on desktop, pills in the mobile menu). */
export function LangSwitcher({ variant = "dropdown" }: { variant?: "dropdown" | "pills" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  if (variant === "pills") {
    return (
      <div className="flex gap-2">
        {LANGS.map((l) => (
          <button key={l} onClick={() => setLang(l)}
            className={`flex-1 rounded-2xl border px-3 py-3 text-sm font-bold transition ${l === lang ? "border-aqvo bg-aqvo text-white" : "border-white/15 text-cream-muted"}`}>
            {DICT[l].meta.flag} {DICT[l].meta.code}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-sm font-bold transition hover:border-white/35">
        <span>{DICT[lang].meta.flag}</span>{DICT[lang].meta.code}
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 top-[calc(100%+8px)] w-44 overflow-hidden rounded-2xl border border-white/10 bg-ink-800/95 p-1.5 shadow-2xl backdrop-blur-xl animate-[fadeUp_.2s_ease-out_both]">
          {LANGS.map((l) => (
            <li key={l}>
              <button role="option" aria-selected={l === lang} onClick={() => { setLang(l); setOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${l === lang ? "bg-aqvo text-white" : "text-cream hover:bg-white/[.06]"}`}>
                <span className="text-base">{DICT[l].meta.flag}</span>
                <span className="font-semibold">{DICT[l].meta.label}</span>
                <span className="ml-auto text-xs opacity-60">{DICT[l].meta.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
