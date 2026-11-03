"use client";
import { useState } from "react";
import { CATS, CUTS, type CatId } from "@/lib/data";
import Icon from "./Icon";
import Pack from "./Pack";
import { useLang } from "./LangProvider";
import { useCart } from "./Cart";
import { CAT_COLOR } from "./Story";

export default function Catalog() {
  const { t } = useLang();
  const cart = useCart();
  const [cat, setCat] = useState<CatId | "all">("all");
  const list = CUTS.filter((c) => cat === "all" || c.cat === cat);

  return (
    <section id="bolimlar" className="relative bg-paper py-24 text-ink lg:py-32">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="eyebrow reveal mb-4 !text-aqvo">{t.catalog.eyebrow}</div>
            <h2 className="h-section reveal">{t.catalog.title[0]}<span className="text-aqvo">{t.catalog.title[1]}</span>{t.catalog.title[2]}</h2>
          </div>
          <p className="reveal text-[17px] leading-relaxed text-[#6d5952]" data-delay=".1">{t.catalog.p}</p>
        </div>

        <div className="reveal -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {(["all", ...CATS] as const).map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${cat === c ? "border-ink bg-ink text-white" : "border-paper-line bg-white text-[#6d5952] hover:border-ink/40"}`}>
              {c !== "all" && <span className="h-2.5 w-2.5 rounded-full" style={{ background: CAT_COLOR[c] }} />}
              {c === "all" ? t.catalog.all : t.cats[c]}
              <span className="text-xs opacity-60">{c === "all" ? CUTS.length : CUTS.filter((x) => x.cat === c).length}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((c, i) => {
            const ct = t.cuts[c.id], on = cart.has(c.id);
            return (
              <article key={c.id} className="group relative flex flex-col overflow-hidden rounded-[26px] border border-paper-line bg-white p-5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(124,11,16,.45)]"
                style={{ animation: `fadeUp .5s ${i * 0.04}s ease-out both` }}>
                <div className="relative grid h-40 place-items-center rounded-2xl bg-[radial-gradient(70%_70%_at_50%_60%,#fde7e3,transparent_70%)]">
                  <div data-slot={c.id} className="h-[88%] w-[78%] transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-105">
                    <Pack id={c.id} alt={ct.name} />
                  </div>
                  <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full font-display text-sm font-black text-white" style={{ background: CAT_COLOR[c.cat] }}>{c.id}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em]" style={{ color: CAT_COLOR[c.cat] === "#d39a52" ? "#a46a26" : CAT_COLOR[c.cat] }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: CAT_COLOR[c.cat] }} /> {t.cats[c.cat]}
                </div>
                <h3 className="mt-1.5 font-display text-lg font-black leading-tight">{ct.name}</h3>
                <div className="text-[13px] text-[#9a827a]">{ct.alt}</div>
                <p className="mt-3 text-sm leading-relaxed text-[#5f4a43]">{ct.desc}</p>
                <p className="mt-2 flex-1 text-sm"><b className="text-ink">{t.catalog.bestFor}:</b> <span className="text-[#5f4a43]">{ct.use}</span></p>
                <button onClick={() => cart.toggle(c.id)}
                  className={`mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${on ? "bg-halal text-white" : "bg-ink text-white hover:bg-aqvo"}`}>
                  <Icon name={on ? "check" : "box"} className="h-4 w-4" /> {on ? t.catalog.added : t.catalog.add}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
