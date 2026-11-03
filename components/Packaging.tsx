"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CUTS } from "@/lib/data";
import { ICON, WORD } from "@/lib/logo";
import { useLang } from "./LangProvider";

gsap.registerPlugin(ScrollTrigger);

const PACKS = ["46", "41", "61"];
const START = [{ x: 230, y: 250 }, { x: 500, y: 215 }, { x: 770, y: 250 }];
const INTO = [{ x: 430, y: 372 }, { x: 525, y: 362 }, { x: 615, y: 372 }];

// box geometry (front 3/4 view)
const FLAP_L = { open: "330,420 385,350 300,290 245,360", closed: "330,420 385,350 555,350 500,420" };
const FLAP_R = { open: "670,420 725,350 815,300 760,370", closed: "670,420 725,350 555,350 500,420" };

export default function Packaging() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const caps = gsap.utils.toArray<HTMLElement>(".pcap", el);
      const packs = gsap.utils.toArray<SVGGElement>(".pack", el);
      const films = gsap.utils.toArray<SVGGElement>(".film", el);
      const stickers = gsap.utils.toArray<SVGGElement>(".sticker", el);
      packs.forEach((p, i) => gsap.set(p, { x: START[i].x, y: START[i].y, scale: 1, transformOrigin: "50% 50%" }));

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: el, start: "top top", end: "+=2800", scrub: 1, pin: true, anticipatePin: 1 },
      });
      // 1 — vacuum film shrinks onto each cut, labels stick on
      tl.fromTo(caps[0], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .fromTo(packs, { opacity: 0, y: (i) => START[i].y + 80 }, { opacity: 1, y: (i) => START[i].y, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 0)
        .fromTo(films, { opacity: 0, scale: 1.35, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12 }, 0.5)
        .fromTo(stickers, { opacity: 0, scale: 0.4, rotation: -12, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: (i) => [-4, 3, -2][i], duration: 0.4, stagger: 0.1, ease: "back.out(2)" }, 1.1);

      // 2 — the box arrives and the packs go in
      tl.to(caps[0], { opacity: 0, y: -40, duration: 0.4 }, 1.6)
        .fromTo(caps[1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 1.9)
        .fromTo([".box-back", ".box-front"], { opacity: 0, y: 260 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.7);
      packs.forEach((p, i) => {
        tl.to(p, { keyframes: [
          { x: INTO[i].x, y: INTO[i].y - 150, scale: 0.5, rotation: [-8, 4, 9][i], duration: 0.5 },
          { y: INTO[i].y, duration: 0.35, ease: "power2.in" },
        ] }, 2.5 + i * 0.25);
      });

      // 3 — flaps close, tape, stamp
      tl.to(caps[1], { opacity: 0, y: -40, duration: 0.4 }, 3.6)
        .fromTo(caps[2], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 3.9)
        .to(".flap-l", { attr: { points: FLAP_L.closed }, duration: 0.5 }, 3.6)
        .to(".flap-r", { attr: { points: FLAP_R.closed }, duration: 0.5 }, 3.85)
        .set(packs, { opacity: 0 }, 4.4)
        .fromTo(".tape", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.45 }, 4.3)
        .fromTo(".stamp", { opacity: 0, scale: 2, rotation: -25, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: -12, duration: 0.4, ease: "back.out(2)" }, 4.7)
        .to(".box", { y: -12, duration: 0.3, yoyo: true, repeat: 1 }, 4.7)
        .fromTo(".route", { attr: { "stroke-dashoffset": 400 } }, { attr: { "stroke-dashoffset": 0 }, duration: 1, ease: "none" }, 5.0)
        .fromTo(".route-pin", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, 5.8)
        .to({}, { duration: 0.6 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="qadoqlash" className="relative h-[100svh] overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_65%_55%,rgba(227,30,36,.28),transparent_70%)]" />
      <div className="absolute inset-0 opacity-[.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="pointer-events-none absolute inset-x-4 top-24 z-[5] grid sm:left-[6vw] lg:inset-y-0 lg:top-0 lg:w-[32%] lg:content-center">
        {t.pack.caps.map((c, i) => (
          <div key={i} className="pcap col-start-1 row-start-1 opacity-0">
            <div className="mb-4 flex items-center gap-3 font-display text-xs tracking-[.2em] text-aqvo-soft after:h-px after:w-14 after:bg-aqvo-soft/50">{t.pack.eyebrow} · {c.n}</div>
            <h2 className="mb-4 font-display text-[28px] font-black leading-[1.15] sm:text-4xl lg:text-[clamp(30px,3.6vw,52px)]">
              {c.h[0]}<span className="text-aqvo-soft">{c.h[1]}</span>{c.h[2]}
            </h2>
            <p className="max-w-[36ch] text-sm leading-relaxed text-cream-muted lg:text-[17px]">{c.p}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 h-[60%] w-full lg:top-0 lg:h-full lg:w-[66%]">
        <svg viewBox="0 0 1000 720" preserveAspectRatio="xMidYMid meet" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="boxFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e8262c" /><stop offset="1" stopColor="#a8131a" /></linearGradient>
            <linearGradient id="boxSide" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9c1117" /><stop offset="1" stopColor="#6d0b10" /></linearGradient>
            <linearGradient id="flapG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f0353a" /><stop offset="1" stopColor="#c0161d" /></linearGradient>
            <linearGradient id="filmG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".45" stopColor="#fff" stopOpacity=".06" /><stop offset=".55" stopColor="#fff" stopOpacity=".22" /><stop offset="1" stopColor="#fff" stopOpacity=".04" /></linearGradient>
            <radialGradient id="pShadow"><stop offset="0" stopColor="#000" stopOpacity=".55" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
          </defs>

          {/* route to the customer */}
          <mask id="routeMask" maskUnits="userSpaceOnUse" x="600" y="380" width="400" height="260">
            <path className="route" d="M700 600 C 820 600, 860 520, 930 470" fill="none" stroke="#fff" strokeWidth="8" strokeDasharray="400 400" strokeDashoffset="400" />
          </mask>
          <path d="M700 600 C 820 600, 860 520, 930 470" fill="none" stroke="#a10f17" strokeWidth="3" strokeDasharray="10 9" opacity=".9" mask="url(#routeMask)" />
          <g transform="translate(930 440)">
            <g className="route-pin" opacity="0">
              <path d="M0 30 C -18 8 -18 -12 0 -12 C 18 -12 18 8 0 30Z" fill="#e31e24" stroke="#fff" strokeWidth="3" />
              <circle cy="-2" r="5" fill="#fff" />
            </g>
          </g>

          <ellipse cx="520" cy="640" rx="260" ry="24" fill="url(#pShadow)" />
          <g className="box">
            {/* back of the box */}
            <g className="box-back" opacity="0">
              <polygon points="330,420 670,420 725,350 385,350" fill="#3a0507" />
              <polygon points="385,350 725,350 725,372 385,372" fill="#5a090d" />
            </g>

            {/* the packs */}
            {PACKS.map((id, i) => {
              const c = CUTS.find((x) => x.id === id)!, w = 190, h = (w * c.h) / c.w, fw = w + 34, fh = h + 46;
              return (
                <g key={id} className="pack" opacity="0">
                  <image href={`/cuts/${id}.webp`} x={-w / 2} y={-h / 2} width={w} height={h} />
                  <g className="film">
                    <rect x={-fw / 2} y={-fh / 2} width={fw} height={fh} rx="22" fill="url(#filmG)" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
                    <path d={`M${-fw / 2 + 18} ${-fh / 2 + 8} L${-fw / 2 + 60} ${-fh / 2 + 8} L${-fw / 2 + 8} ${fh / 2 - 30}`} fill="#fff" opacity=".18" />
                  </g>
                  <g className="sticker" transform={`translate(${fw / 2 - 74} ${fh / 2 - 26})`}>
                    <rect x="-62" y="-20" width="124" height="40" rx="8" fill="#fff" />
                    <rect x="-62" y="-20" width="30" height="40" rx="8" fill="#e31e24" />
                    <rect x="-40" y="-20" width="8" height="40" fill="#e31e24" />
                    <text x="-47" y="6" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff" fontFamily="Manrope, sans-serif">{id}</text>
                    <text x="-24" y="-3" fontSize="11" fontWeight="800" fill="#120607" fontFamily="Manrope, sans-serif">AQVO</text>
                    <text x="-24" y="12" fontSize="10" fontWeight="600" fill="#7a5e57" fontFamily="Manrope, sans-serif">{t.pack.weight} · {t.pack.label.split(" ")[0]}</text>
                  </g>
                </g>
              );
            })}

            {/* front of the box */}
            <g className="box-front" opacity="0">
              <polygon points="670,420 725,350 725,560 670,630" fill="url(#boxSide)" />
              <rect x="330" y="420" width="340" height="210" fill="url(#boxFront)" />
              <rect x="330" y="420" width="340" height="10" fill="#000" opacity=".12" />
              {/* logo on the box */}
              <svg x="372" y="450" width="70" height="66" viewBox={ICON.viewBox}><path d={ICON.d} fill="#fff" fillRule="evenodd" /></svg>
              <svg x="452" y="455" width="170" height="80" viewBox={WORD.viewBox}><path d={WORD.d} fill="#fff" fillRule="evenodd" /></svg>
              <text x="500" y="585" textAnchor="middle" fontSize="15" fontWeight="800" letterSpacing="5" fill="#fff" opacity=".85" fontFamily="Manrope, sans-serif">HALAL BEEF · UZBEKISTAN</text>
              <polygon className="flap-l" points={FLAP_L.open} fill="url(#flapG)" stroke="#8d0f15" strokeWidth="1.5" />
              <polygon className="flap-r" points={FLAP_R.open} fill="url(#flapG)" stroke="#8d0f15" strokeWidth="1.5" />
              <g className="tape">
                <polygon points="486,420 514,420 569,350 541,350" fill="#f6e7d6" opacity=".92" />
                <rect x="486" y="420" width="28" height="70" fill="#f6e7d6" opacity=".92" />
              </g>
              <g className="stamp" opacity="0" transform="translate(620 540)">
                <circle r="38" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 3" />
                <circle r="31" fill="#1f7a4a" />
                <text y="-2" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff" fontFamily="Manrope, sans-serif">100%</text>
                <text y="14" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="Manrope, sans-serif">HALAL</text>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </section>
  );
}
