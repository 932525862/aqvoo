"use client";
import { useState } from "react";
import { CONTACT, CUTS } from "@/lib/data";
import Icon from "./Icon";
import { useLang } from "./LangProvider";
import { useCart } from "./Cart";
import { Logo } from "./Logo";
import { CAT_COLOR } from "./Story";

export function Order() {
  const { t, lang } = useLang();
  const o = t.order;
  const cart = useCart();
  const [type, setType] = useState<"retail" | "wholesale">("retail");
  const [sent, setSent] = useState(false);
  const total = cart.items.reduce((s, i) => s + i.kg, 0);
  const fmt = (n: number) => (lang === "en" ? String(n) : String(n).replace(".", ","));
  const notIn = CUTS.filter((c) => !cart.has(c.id));

  if (sent) {
    return (
      <section id="buyurtma" className="bg-paper py-24 text-ink lg:py-32">
        <div className="container-x grid min-h-[50vh] place-items-center text-center">
          <div className="animate-[pop_.5s_ease-out_both]">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-halal text-white"><Icon name="check" className="h-10 w-10" /></div>
            <h2 className="mt-6 font-display text-3xl font-black">{o.sentT}</h2>
            <p className="mx-auto mt-3 max-w-[46ch] text-[#6d5952]">{o.sentP}</p>
            <button onClick={() => { setSent(false); cart.clear(); }} className="btn-primary mt-8">{o.again}</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="buyurtma" className="relative bg-paper py-24 text-ink lg:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <div className="eyebrow reveal mb-4 !text-aqvo">{o.eyebrow}</div>
          <h2 className="h-section reveal">{o.title[0]}<span className="text-aqvo">{o.title[1]}</span>{o.title[2]}</h2>
          <p className="reveal mt-5 text-[17px] leading-relaxed text-[#6d5952]" data-delay=".1">{o.p}</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="reveal mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]" data-delay=".15">
          {/* selected cuts */}
          <div className="rounded-[30px] border border-paper-line bg-white p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-lg font-black">{o.cutsTitle}</h3>
              <div className="flex rounded-full bg-paper-2 p-1 text-sm font-bold">
                {(["retail", "wholesale"] as const).map((k) => (
                  <button type="button" key={k} onClick={() => setType(k)} className={`rounded-full px-4 py-2 transition ${type === k ? "bg-ink text-white" : "text-[#6d5952]"}`}>
                    {o[k]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {cart.items.length === 0 && <p className="rounded-2xl border border-dashed border-paper-line p-5 text-sm text-[#8d736c]">{o.empty}</p>}
              {cart.items.map((it) => {
                const c = CUTS.find((x) => x.id === it.id)!;
                const step = type === "wholesale" ? 5 : 0.5;
                return (
                  <div key={it.id} className="flex items-center gap-3 rounded-2xl border border-paper-line p-2.5 pr-3 animate-[fadeUp_.35s_ease-out_both]">
                    <div className="relative grid h-14 w-16 shrink-0 place-items-center rounded-xl bg-paper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/cuts/${c.id}.webp`} alt="" className="max-h-[80%] max-w-[85%] object-contain" />
                      <span className="absolute -left-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full text-[10px] font-black text-white" style={{ background: CAT_COLOR[c.cat] }}>{c.id}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-bold">{t.cuts[c.id].name}</div>
                      <div className="truncate text-xs text-[#9a827a]">{t.cats[c.cat]}</div>
                    </div>
                    <div className="flex items-center rounded-full border border-paper-line">
                      <button type="button" aria-label="-" onClick={() => cart.setKg(it.id, it.kg - step)} className="grid h-9 w-9 place-items-center text-lg font-bold">−</button>
                      <span className="w-16 text-center text-sm font-bold">{fmt(it.kg)} {o.kg}</span>
                      <button type="button" aria-label="+" onClick={() => cart.setKg(it.id, it.kg + step)} className="grid h-9 w-9 place-items-center text-lg font-bold">+</button>
                    </div>
                    <button type="button" onClick={() => cart.remove(it.id)} aria-label={o.remove} className="grid h-9 w-9 place-items-center rounded-full text-[#9a827a] hover:bg-paper hover:text-aqvo">
                      <Icon name="close" className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {notIn.length > 0 && (
              <div className="mt-5">
                <div className="mb-2.5 text-xs font-bold uppercase tracking-[.14em] text-[#9a827a]">{o.addMore}</div>
                <div className="flex flex-wrap gap-2">
                  {notIn.map((c) => (
                    <button type="button" key={c.id} onClick={() => cart.add(c.id)}
                      className="flex items-center gap-1.5 rounded-full border border-paper-line bg-paper px-3 py-1.5 text-xs font-semibold transition hover:border-aqvo hover:text-aqvo">
                      <span className="font-black" style={{ color: CAT_COLOR[c.cat] === "#d39a52" ? "#a46a26" : CAT_COLOR[c.cat] }}>{c.id}</span> {t.cuts[c.id].name}
                      <span className="text-base leading-none">+</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-paper-line pt-4">
              <span className="font-bold text-[#6d5952]">{o.total}</span>
              <span className="font-display text-2xl font-black">{fmt(total)} {o.kg}</span>
            </div>
          </div>

          {/* contact details */}
          <div className="rounded-[30px] bg-ink p-5 text-cream sm:p-7">
            <div className="grid gap-3">
              {type === "wholesale" && <input className="field" placeholder={o.f.company} />}
              <input required className="field" placeholder={o.f.name} />
              <input required type="tel" className="field" placeholder={o.f.phone} />
              <select required defaultValue="" className="field">
                <option value="" disabled>{o.f.region}</option>
                {o.regions.map((r) => <option key={r}>{r}</option>)}
              </select>
              <input className="field" placeholder={o.f.address} />
              <textarea rows={3} className="field" placeholder={o.f.note} />
              <button disabled={cart.items.length === 0} className="btn-primary mt-1 w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-50">
                {o.submit} <Icon name="send" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-ink pt-16">
      <div className="container-x grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-cream-muted">{t.footer.tagline}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-halal-light/30 px-3 py-1.5 text-xs text-halal-light">
            <Icon name="shield" className="h-3.5 w-3.5" /> {t.footer.halal}
          </span>
        </div>
        <div>
          <h4 className="eyebrow mb-5">{t.footer.navTitle}</h4>
          <ul className="space-y-2.5 text-[15px] text-cream-muted">
            {t.nav.items.map((n) => <li key={n.href}><a href={n.href} className="hover:text-white">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-5">{t.footer.contactTitle}</h4>
          <div className="space-y-3 text-[15px]">
            {CONTACT.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-2.5 font-semibold hover:text-aqvo-soft"><Icon name="phone" className="h-4 w-4 text-aqvo-soft" /> {p}</a>
            ))}
            <a href={CONTACT.instagram.url} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-aqvo-soft">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-aqvo-soft" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
              Instagram {CONTACT.instagram.handle}
            </a>
            {CONTACT.telegram && (
              <a href={CONTACT.telegram.url} className="flex items-center gap-2.5 hover:text-aqvo-soft"><Icon name="send" className="h-4 w-4 text-aqvo-soft" /> {CONTACT.telegram.handle}</a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-[13px] text-cream-dim">{t.footer.rights}</div>
      </div>
    </footer>
  );
}
