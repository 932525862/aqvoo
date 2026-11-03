"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fades in every `.reveal` element, counts up `[data-count]`, draws `[data-line]` progress bars. */
export default function Reveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count), o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%" },
          onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
      });
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        const vertical = el.dataset.line === "y";
        gsap.fromTo(el, vertical ? { scaleY: 0 } : { scaleX: 0 }, {
          ...(vertical ? { scaleY: 1 } : { scaleX: 1 }), ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 60%", scrub: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(el, { yPercent: Number(el.dataset.parallax) }, { yPercent: -Number(el.dataset.parallax), ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });
    // pinned sections above change layout once images load
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); ctx.revert(); };
  }, []);
  return null;
}
