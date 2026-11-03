import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#120607", 800: "#1a0909", 700: "#240d0e", 600: "#2f1213" },
        aqvo: { DEFAULT: "#e31e24", dark: "#b3121a", deep: "#7c0b10", soft: "#a10f17" },
        cream: { DEFAULT: "#fff6f1", muted: "#c9b2ab", dim: "#8d736c" },
        paper: { DEFAULT: "#faf4ef", 2: "#f3e9e2", line: "#e8d9cf" },
        halal: { DEFAULT: "#1f7a4a", light: "#9fe0b9" },
      },
      fontFamily: {
        display: ["Unbounded", "Manrope", "system-ui", "sans-serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
        script: ["'Great Vibes'", "cursive"],
      },
      keyframes: {
        wheel: { "0%": { opacity: "0", transform: "translate(-50%,0)" }, "30%": { opacity: "1" }, "100%": { opacity: "0", transform: "translate(-50%,12px)" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { wheel: "wheel 1.6s infinite", floaty: "floaty 4.8s ease-in-out infinite", marquee: "marquee 45s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
