"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATS, CUTS, EXTRA_REGIONS, type CatId } from "@/lib/data";
import { useLang } from "./LangProvider";

gsap.registerPlugin(ScrollTrigger);

const CX = 110, CY = 150, S = 0.76; // cow placement in the 1000×760 viewBox
const COW_W = 1021, COW_H = 679;
export const CAT_COLOR: Record<CatId, string> = { steak: "#e31e24", roast: "#ff7a2f", stew: "#d39a52", mince: "#ff5fa2" };

const REGIONS = [...CUTS.map((c) => ({ id: c.id, poly: c.poly, pin: c.pin })), ...EXTRA_REGIONS];
const catOf = (id: string) => CUTS.find((c) => c.id === id)!.cat;
const vb = (p: [number, number]) => ({ x: CX + p[0] * S, y: CY + p[1] * S });
const ring = (i: number) => {
  const a = (-90 + (i * 360) / CUTS.length) * (Math.PI / 180);
  return { x: 500 + 405 * Math.cos(a), y: 392 + 278 * Math.sin(a) };
};

export default function Story() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const caps = gsap.utils.toArray<HTMLElement>(".cap", el);
      const outlines = gsap.utils.toArray<SVGPolygonElement>(".cutline", el);
      const fills = gsap.utils.toArray<SVGPolygonElement>(".fill", el);
      const pins = gsap.utils.toArray<SVGGElement>(".pin", el);
      const pieces = gsap.utils.toArray<SVGGElement>(".piece", el);
      const photos = gsap.utils.toArray<SVGGElement>(".photo", el);

      // perimeter incl. the closing edge (getTotalLength skips it for <polygon> in some browsers)
      const perim = (o: SVGPolygonElement) => { const pts = (o.getAttribute("points") || "").trim().split(/\s+/).map((p) => p.split(",").map(Number));
        return pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + Math.hypot(q[0] - p[0], q[1] - p[1]); }, 0) + 2; };
      outlines.forEach((o) => { const L = perim(o); gsap.set(o, { attr: { "stroke-dasharray": `${L} ${L}`, "stroke-dashoffset": L } }); });
      photos.forEach((p, i) => { const s = vb(CUTS[i].pin); gsap.set(p, { x: s.x, y: s.y, scale: 0, opacity: 0, transformOrigin: "50% 50%" }); });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: el, start: "top top", end: "+=6400", scrub: 1, pin: true, anticipatePin: 1 },
      });

      tl.to(".hero-copy", { opacity: 0, y: -60, duration: 0.6 }, 0)
        .to(".scroll-hint", { opacity: 0, duration: 0.3 }, 0)
        .fromTo(".cow-wrap", { x: window.innerWidth > 1024 ? 140 : 0 }, { x: 0, duration: 1, ease: "power1.out" }, 0)
        .fromTo(caps[0], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5);

      // 1 — the butcher map is drawn
      tl.to(outlines, { attr: { "stroke-dashoffset": 0 }, duration: 0.7, stagger: 0.07, ease: "none" }, 1.2)
        .to(fills, { opacity: 0.55, duration: 0.4, stagger: 0.07 }, 1.5)
        .fromTo(".cow-img", { filter: "saturate(1) brightness(1)" }, { filter: "saturate(0.35) brightness(0.75)", duration: 1 }, 1.2)
        .fromTo(pins, { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.35, stagger: 0.06, ease: "back.out(2.2)" }, 1.9)
        .to(caps[0], { opacity: 0, y: -40, duration: 0.4 }, 1.6)
        .fromTo(caps[1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 1.9);

      // 2 — the carcass separates into pieces
      tl.set(".pieces", { opacity: 1 }, 3.3)
        .to([".cow-base", ".fills", ".cutlines"], { opacity: 0, duration: 0.3 }, 3.3);
      pieces.forEach((p, i) => {
        const r = REGIONS[i], dx = r.pin[0] - 510, dy = r.pin[1] - 300, d = Math.hypot(dx, dy) || 1;
        tl.to(p, { x: (dx / d) * 70, y: (dy / d) * 55, rotation: (i % 2 ? 1 : -1) * 4, svgOrigin: `${r.pin[0]} ${r.pin[1]}`, duration: 0.8, ease: "power3.out" }, 3.35);
      });
      tl.to(pins, { opacity: 0, scale: 0.6, duration: 0.3, stagger: 0.02 }, 3.6);

      // 3 — each piece becomes the real cut and takes its place in the ring
      tl.to(pieces, { opacity: 0, scale: 0.4, duration: 0.5, stagger: 0.03, transformOrigin: "50% 50%" }, 4.3)
        .to(caps[1], { opacity: 0, y: -40, duration: 0.4 }, 4.3)
        .fromTo(caps[2], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 4.7);
      photos.forEach((p, i) => {
        const r = ring(i);
        tl.to(p, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, 4.35 + i * 0.03)
          .to(p, { x: r.x, y: r.y, duration: 1, ease: "power3.inOut" }, 4.8 + i * 0.03);
      });
      tl.fromTo(".ring-center", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)" }, 5.6)
        .fromTo(".legend", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 5.8);

      // 4 — every cut is vacuum-sealed, one by one
      const films = gsap.utils.toArray<SVGGElement>(".film", el);
      tl.to(caps[2], { opacity: 0, y: -40, duration: 0.4 }, 6.5)
        .fromTo(caps[3], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 6.8)
        .fromTo(films, { opacity: 0, scale: 1.45, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.09, ease: "power3.out" }, 6.6)
        .to({}, { duration: 0.7 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_70%_100%,#4a0d10_0%,#200a0b_45%,#120607_75%)]" />
      <div className="absolute inset-0 opacity-[.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* hero copy */}
      <div className="hero-copy absolute inset-x-4 top-24 z-[6] sm:left-[6vw] lg:inset-y-0 lg:top-0 lg:flex lg:w-[42%] lg:flex-col lg:justify-center">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-halal-light/35 bg-halal/25 px-3.5 py-1.5 text-[13px] text-halal-light">
          <span className="h-1.5 w-1.5 rounded-full bg-halal-light" /> {t.hero.tag}
        </span>
        <h1 className="font-display text-[36px] font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-[clamp(46px,4.8vw,74px)]">
          {t.hero.h1a} <span className="block text-aqvo-soft">{t.hero.h1b}</span>
        </h1>
        <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-cream-muted lg:text-lg">{t.hero.p}</p>
      </div>

      {/* captions */}
      <div className="pointer-events-none absolute inset-x-4 top-24 z-[5] grid sm:left-[6vw] lg:inset-y-0 lg:top-0 lg:w-[32%] lg:content-center">
        {t.story.caps.map((c, i) => (
          <div key={i} className="cap col-start-1 row-start-1 opacity-0">
            <div className="mb-4 flex items-center gap-3 font-display text-xs tracking-[.2em] text-aqvo-soft after:h-px after:w-14 after:bg-aqvo-soft/50">{c.n}</div>
            <h2 className="mb-4 font-display text-[28px] font-black leading-[1.15] sm:text-4xl lg:text-[clamp(30px,3.6vw,52px)]">
              {c.h[0]}<span className="text-aqvo-soft">{c.h[1]}</span>{c.h[2]}
            </h2>
            <p className="max-w-[36ch] text-sm leading-relaxed text-cream-muted lg:text-[17px]">{c.p}</p>
          </div>
        ))}
      </div>

      {/* stage */}
      <div className="absolute bottom-0 right-0 h-[58%] w-full lg:top-0 lg:h-full lg:w-[66%]">
        <svg viewBox="0 0 1000 760" preserveAspectRatio="xMidYMid meet" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <image id="cowImg" href="/cow.webp" width={COW_W} height={COW_H} />
            <filter id="sil"><feFlood floodColor="#fff" /><feComposite in2="SourceAlpha" operator="in" /></filter>
            <mask id="cowMask" maskUnits="userSpaceOnUse" x="-60" y="-60" width={COW_W + 120} height={COW_H + 120}>
              <use href="#cowImg" filter="url(#sil)" />
            </mask>
            {REGIONS.map((r, i) => <clipPath key={i} id={`rc${i}`}><polygon points={r.poly} /></clipPath>)}
            <linearGradient id="rfilm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".5" /><stop offset=".4" stopColor="#fff" stopOpacity=".07" /><stop offset=".55" stopColor="#fff" stopOpacity=".02" /><stop offset=".65" stopColor="#fff" stopOpacity=".24" /><stop offset="1" stopColor="#fff" stopOpacity=".05" /></linearGradient>
            <radialGradient id="shadow"><stop offset="0" stopColor="#000" stopOpacity=".55" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
          </defs>

          <ellipse cx="505" cy="668" rx="350" ry="26" fill="url(#shadow)" className="cow-base" />
          <g className="cow-wrap">
            <g transform={`translate(${CX} ${CY}) scale(${S})`}>
              <g className="cow-base"><use href="#cowImg" className="cow-img" /></g>
              <g className="fills" mask="url(#cowMask)">
                {REGIONS.map((r, i) => <polygon key={i} className="fill" points={r.poly} fill={CAT_COLOR[catOf(r.id)]} opacity="0" style={{ mixBlendMode: "multiply" }} />)}
              </g>
              <g className="cutlines" mask="url(#cowMask)" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round">
                {REGIONS.map((r, i) => <polygon key={i} className="cutline" points={r.poly} />)}
              </g>
              <g className="pieces" opacity="0">
                {REGIONS.map((r, i) => (
                  <g key={i} className="piece">
                    <g clipPath={`url(#rc${i})`}>
                      <use href="#cowImg" style={{ filter: "saturate(.35) brightness(.75)" }} />
                      <g mask="url(#cowMask)"><polygon points={r.poly} fill={CAT_COLOR[catOf(r.id)]} opacity=".55" style={{ mixBlendMode: "multiply" }} /></g>
                    </g>
                    <g mask="url(#cowMask)"><polygon points={r.poly} fill="none" stroke="#fff" strokeWidth="3" /></g>
                  </g>
                ))}
              </g>
            </g>
            {/* numbered pins (outside the scaled group so they keep their size) */}
            {REGIONS.map((r, i) => {
              const p = vb(r.pin);
              return (
                <g key={i} className="pin" transform={`translate(${p.x} ${p.y})`}>
                  <circle r="17" fill="#fff" />
                  <circle r="13.5" fill={CAT_COLOR[catOf(r.id)]} />
                  <text y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="Manrope, sans-serif">{r.id}</text>
                </g>
              );
            })}
          </g>

          {/* the ring of real cuts */}
          {CUTS.map((c) => {
            const w = 118, h = (w * c.h) / c.w;
            return (
              <g key={c.id} className="photo" data-id={c.id}>
                <image href={`/cuts/${c.id}.webp`} x={-w / 2} y={-h / 2} width={w} height={h} style={{ filter: "drop-shadow(0 10px 14px rgba(0,0,0,.5))" }} />
                <g className="film" opacity="0">
                  <rect x={-w / 2 - 10} y={-h / 2 - 10} width={w + 20} height={h + 20} rx="13" fill="url(#rfilm)" stroke="#fff" strokeOpacity=".75" strokeWidth="1.6" />
                  <path d={`M${-w / 2 - 2} ${-h / 2 + 18} L${-w / 2 + 14} ${-h / 2 - 4} L${-w / 2 + 24} ${-h / 2 - 4} L${-w / 2 - 2} ${-h / 2 + 32}Z`} fill="#fff" opacity=".35" />
                  <g transform={`translate(${w / 2 - 22} ${h / 2 + 2})`}>
                    <rect x="-22" y="-8" width="44" height="15" rx="3" fill="#fff" />
                    <rect x="-22" y="-8" width="14" height="15" rx="3" fill={CAT_COLOR[c.cat]} />
                    <text x="5" y="3.2" textAnchor="middle" fontSize="8" fontWeight="900" fill="#120607" fontFamily="Manrope, sans-serif">AQVO</text>
                  </g>
                </g>
                <g transform={`translate(${-w / 2 + 6} ${-h / 2 - 2})`}>
                  <circle r="13" fill={CAT_COLOR[c.cat]} stroke="#fff" strokeWidth="2.5" />
                  <text y="4.5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="Manrope, sans-serif">{c.id}</text>
                </g>
                <text y={h / 2 + 18} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff6f1" fontFamily="Manrope, sans-serif" className="max-lg:hidden">
                  {t.cuts[c.id].name}
                </text>
              </g>
            );
          })}
          <g className="ring-center" opacity="0">
            <text x="500" y="400" textAnchor="middle" fontSize="120" fontWeight="900" fill="#fff" fontFamily="Unbounded, Manrope, sans-serif">14</text>
            <text x="500" y="440" textAnchor="middle" fontSize="20" fontWeight="700" letterSpacing="5" fill="#a10f17" fontFamily="Manrope, sans-serif">{t.story.pieces.toUpperCase()}</text>
          </g>
        </svg>
      </div>

      {/* category legend */}
      <div className="legend absolute bottom-8 right-8 z-[6] hidden flex-wrap justify-end gap-2 opacity-0 lg:flex">
        {CATS.map((c) => (
          <span key={c} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/12 bg-ink/60 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: CAT_COLOR[c] }} /> {t.cats[c]}
          </span>
        ))}
      </div>

      <div className="scroll-hint absolute bottom-6 left-1/2 z-[6] flex -translate-x-1/2 flex-col items-center gap-2.5 text-[11px] tracking-[.25em] text-cream-muted">
        <i className="relative h-9 w-[22px] rounded-xl border-[1.5px] border-cream-muted after:absolute after:left-1/2 after:top-[7px] after:h-[7px] after:w-[3px] after:animate-wheel after:rounded-sm after:bg-aqvo after:content-['']" />
        {t.hero.hint}
      </div>
    </section>
  );
}
