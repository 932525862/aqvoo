"use client";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/data";
import Icon from "./Icon";
import { Logo } from "./Logo";
import { LangSwitcher, useLang } from "./LangProvider";
import { useCart } from "./Cart";

export default function Navbar() {
  const { t } = useLang();
  const { items } = useCart();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.documentElement.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : ""}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <a href="#top" aria-label="Aqvo"><Logo /></a>
        <nav className="hidden items-center gap-8 text-sm text-cream-muted lg:flex">
          {t.nav.items.map((n) => <a key={n.href} href={n.href} className="transition hover:text-white">{n.label}</a>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitcher />
          <a href="#buyurtma" className="btn-primary relative">
            {t.nav.cta}
            {items.length > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-black text-aqvo">{items.length}</span>}
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitcher />
          <button className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15" onClick={() => setOpen((v) => !v)} aria-label={open ? t.nav.close : t.nav.open}>
            <Icon name={open ? "close" : "menu"} />
            {items.length > 0 && !open && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-aqvo px-1 text-[11px] font-black">{items.length}</span>}
          </button>
        </div>
      </div>
      {open && (
        <div className="container-x flex h-[calc(100svh-72px)] flex-col gap-2 pb-10 pt-6 lg:hidden">
          {t.nav.items.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 font-display text-2xl font-bold">{n.label}</a>)}
          <div className="mt-auto space-y-3">
            <LangSwitcher variant="pills" />
            <a href={CONTACT.instagram.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-lg text-cream-muted">
              <Icon name="send" className="h-5 w-5 text-aqvo-soft" /> Instagram {CONTACT.instagram.handle}
            </a>
            <a href="#buyurtma" onClick={() => setOpen(false)} className="btn-primary w-full">{t.nav.cta}</a>
          </div>
        </div>
      )}
    </header>
  );
}
