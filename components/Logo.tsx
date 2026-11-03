import { ICON, WORD } from "@/lib/logo";

/** The bull mark in its red tab, as on the brand artwork. */
export function LogoMark({ className = "h-10 w-10", tab = true }: { className?: string; tab?: boolean }) {
  return (
    <span className={`relative inline-grid place-items-center ${tab ? "rounded-b-xl rounded-t-md bg-aqvo" : ""} ${className}`}>
      <svg viewBox={ICON.viewBox} className="h-[62%] w-[62%]" aria-hidden="true">
        <path d={ICON.d} fill="#fff" fillRule="evenodd" />
      </svg>
    </span>
  );
}

/** The “Aqvo” script wordmark. */
export function LogoWord({ className = "h-8 w-auto", color = "#fff" }: { className?: string; color?: string }) {
  return (
    <svg viewBox={WORD.viewBox} className={className} role="img" aria-label="Aqvo">
      <path d={WORD.d} fill={color} fillRule="evenodd" />
    </svg>
  );
}

export function Logo({ className = "", color = "#fff" }: { className?: string; color?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-9" />
      <LogoWord className="h-9 w-auto" color={color} />
    </span>
  );
}
