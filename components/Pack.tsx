import { CAT_COLOR } from "./Story";
import { CUTS } from "@/lib/data";

/** A cut shown as a vacuum-sealed pack: the photo under a glossy film with an Aqvo label. */
export default function Pack({ id, alt = "", className = "" }: { id: string; alt?: string; className?: string }) {
  const cat = CUTS.find((c) => c.id === id)?.cat ?? "stew";
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0 rounded-[18px] bg-white/10 shadow-[0_18px_30px_-16px_rgba(60,5,8,.55)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/cuts/${id}.webp`} alt={alt} draggable={false} className="absolute inset-[8%] h-[84%] w-[84%] object-contain" />
      <div className="absolute inset-0 rounded-[18px] bg-[linear-gradient(130deg,rgba(255,255,255,.5)_0%,rgba(255,255,255,.08)_38%,rgba(255,255,255,0)_50%,rgba(255,255,255,.22)_62%,rgba(255,255,255,.04)_100%)] ring-1 ring-inset ring-white/70" />
      <div className="absolute left-[7%] top-[7%] h-[30%] w-[18%] -skew-x-12 rounded-full bg-white/25 blur-[2px]" />
      <span className="absolute bottom-[7%] right-[7%] flex items-center overflow-hidden rounded-[5px] bg-white text-[9px] font-black leading-none text-[#120607] shadow">
        <span className="px-1 py-[3px] text-white" style={{ background: CAT_COLOR[cat] }}>{id}</span>
        <span className="px-1.5 py-[3px] tracking-wider">AQVO</span>
      </span>
    </div>
  );
}
