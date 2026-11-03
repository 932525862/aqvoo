"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CUTS } from "@/lib/data";
import Pack from "./Pack";

/**
 * After the story ring is vacuum-packed, each pack flies from its place in the ring
 * down into its own card in the catalogue as that card scrolls into view.
 */
export default function FlyPacks() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ease = gsap.parseEase("power2.inOut");
    const tick = () => {
      const vh = window.innerHeight;
      CUTS.forEach((c, i) => {
        const el = refs.current[i];
        const slot = document.querySelector<HTMLElement>(`[data-slot="${c.id}"]`);
        const src = document.querySelector<SVGGElement>(`.photo[data-id="${c.id}"]`);
        if (!el) return;
        if (!slot || !src) { el.style.opacity = "0"; return; }
        const t = slot.getBoundingClientRect();
        // starts when the card enters the bottom of the screen, lands when its top reaches ~38% of the screen
        const raw = gsap.utils.clamp(0, 1, (vh - t.top) / (vh * 0.62));
        const p = ease(raw);
        if (raw <= 0 || raw >= 1) {
          el.style.opacity = "0";
          slot.style.opacity = raw >= 1 ? "1" : "0";
          src.style.visibility = raw <= 0 ? "visible" : "hidden";
          return;
        }
        const s = src.getBoundingClientRect();
        const x = s.left + (t.left - s.left) * p, y = s.top + (t.top - s.top) * p;
        const w = s.width + (t.width - s.width) * p, h = s.height + (t.height - s.height) * p;
        const lift = Math.sin(p * Math.PI) * -40;
        el.style.opacity = "1";
        el.style.width = `${w}px`; el.style.height = `${h}px`;
        el.style.transform = `translate3d(${x}px, ${y + lift}px, 0) rotate(${(1 - p) * (i % 2 ? 10 : -10)}deg)`;
        slot.style.opacity = "0";
        src.style.visibility = "hidden";
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {CUTS.map((c, i) => (
        <div key={c.id} ref={(el) => { refs.current[i] = el; }} className="absolute left-0 top-0 opacity-0 will-change-transform">
          <Pack id={c.id} />
        </div>
      ))}
    </div>
  );
}
