type Props = { name: string; className?: string };

const P: Record<string, JSX.Element> = {
  flame: <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2.2-4.8.2 1.6 1 2.6 2 3.1C10.6 8.8 11.2 5.8 12 3Z" />,
  meat: <><path d="M15.5 4.5c3 1.5 4.6 5 3.3 8.2-1.4 3.6-5.9 5.4-9.6 4.3L6 20l-2-2 3-3.2c-1.1-3.7.7-8.2 4.3-9.6 1.4-.6 2.9-.8 4.2-.7Z" /><circle cx="14" cy="10" r="1.6" /></>,
  box: <><path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" /><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></>,
  truck: <><path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7" /><circle cx="6.5" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" /></>,
  mosque: <><path d="M12 3c2 1.6 4.5 2.8 4.5 6H7.5c0-3.2 2.5-4.4 4.5-6ZM5 21V11h14v10M9.5 21v-4a2.5 2.5 0 0 1 5 0v4M3 21h18" /></>,
  shield: <><path d="M12 3 4.5 6v6c0 4.4 3.2 7.9 7.5 9 4.3-1.1 7.5-4.6 7.5-9V6L12 3Z" /><path d="m8.8 12 2.2 2.2 4.4-4.4" /></>,
  phone: <path d="M5 3.5h3.2l1.6 4.2-2 1.4a11 11 0 0 0 7.1 7.1l1.4-2 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5Z" />,
  send: <path d="m3 11 18-8-6.5 18-3-7.5L3 11Zm8.5 2.5L21 3" />,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  building: <><path d="M4 21V5l8-2v18M12 8h8v13M4 21h16" /><path d="M7.5 8h1M7.5 12h1M7.5 16h1M15.5 12h1M15.5 16h1" /></>,
  thermo: <><path d="M10 4a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0V4Z" /><path d="M12 10v6" /></>,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  doc: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M9.5 12h6M9.5 15.5h6" /></>,
  can: <><ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v8.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M8 17v3h8v-3" /></>,
};

export default function Icon({ name, className = "h-5 w-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {P[name] ?? P.box}
    </svg>
  );
}

export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M7 25 L19 11" /><path d="M17 7h7v6l-5 2" /><path d="M25 25 L13 11" /><path d="M15 7H8v6l5 2" />
    </svg>
  );
}
