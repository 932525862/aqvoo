"use client";
import { CITIES } from "@/lib/data";
import Icon from "./Icon";
import { useLang } from "./LangProvider";

// simple equirectangular projection of Uzbekistan (lon 55.5–73.8, lat 36.9–45.8)
const W = 800, H = 470;
const LON0 = 55.5, LON1 = 73.8, LAT0 = 36.9, LAT1 = 45.8;
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * H;
const ICONS = ["globe", "truck", "building", "box"];

export default function Delivery() {
  const { t } = useLang();
  const d = t.delivery;
  const hub = CITIES[0];
  const hx = px(hub.lon), hy = py(hub.lat);

  return (
    <section id="yetkazish" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_30%_50%,rgba(227,30,36,.18),transparent_70%)]" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div className="reveal relative order-2 lg:order-1">
          <svg viewBox={`-30 -20 ${W + 60} ${H + 60}`} className="w-full" role="img" aria-label={d.title.join("")}>
            <defs>
              <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#fff" opacity=".09" /></pattern>
            </defs>
            <rect x="-30" y="-20" width={W + 60} height={H + 60} rx="28" fill="url(#dots)" />
            {CITIES.slice(1).map((c, i) => {
              const x = px(c.lon), y = py(c.lat), mx = (hx + x) / 2, my = Math.min(hy, y) - 70 - (i % 3) * 14;
              return (
                <path key={c.key} d={`M${hx} ${hy} Q${mx} ${my} ${x} ${y}`} fill="none" stroke="#a10f17" strokeWidth="1.6" strokeDasharray="5 6" opacity=".75">
                  <animate attributeName="stroke-dashoffset" from="44" to="0" dur={`${1.4 + (i % 5) * 0.3}s`} repeatCount="indefinite" />
                </path>
              );
            })}
            {CITIES.map((c, i) => {
              const x = px(c.lon), y = py(c.lat), isHub = i === 0;
              const below = ["fergana", "termez", "qarshi", "guliston", "bukhara"].includes(c.key);
              return (
                <g key={c.key} transform={`translate(${x} ${y})`}>
                  {isHub && <circle r="9" fill="none" stroke="#e31e24" style={{ transformOrigin: "0 0", animation: "pulseDot 1.8s ease-out infinite" }} />}
                  <circle r={isHub ? 9 : 5.5} fill={isHub ? "#e31e24" : "#fff"} stroke={isHub ? "#fff" : "#e31e24"} strokeWidth={isHub ? 3 : 2.5} />
                  <text y={below ? 22 : -12} textAnchor="middle" fontSize={isHub ? 17 : 13} fontWeight={isHub ? 800 : 600} fill={isHub ? "#fff" : "#e7d3cc"} fontFamily="Manrope, sans-serif">
                    {d.cities[c.key]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="order-1 lg:order-2">
          <div className="eyebrow reveal mb-4">{d.eyebrow}</div>
          <h2 className="h-section reveal">{d.title[0]}<span className="text-aqvo-soft">{d.title[1]}</span>{d.title[2]}</h2>
          <p className="reveal mt-5 text-[17px] leading-relaxed text-cream-muted" data-delay=".1">{d.p}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {d.cards.map((c, i) => (
              <div key={i} className="reveal rounded-3xl border border-white/10 bg-ink-800 p-5 transition hover:border-aqvo/50" data-delay={String(i * 0.06)}>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-aqvo/15 text-aqvo-soft"><Icon name={ICONS[i]} /></div>
                <h3 className="mt-4 font-display text-[15px] font-bold">{c.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream-muted">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
