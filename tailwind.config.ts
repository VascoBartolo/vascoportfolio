import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", xl: "3rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        "2xl": "1.5rem",
        xl: "1.125rem",
        lg: "0.875rem",
        md: "0.625rem",
        sm: "0.375rem",
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse":
          "marquee-reverse var(--marquee-duration, 40s) linear infinite",
        shine: "shine 3.5s linear infinite",
        aurora: "aurora 18s ease-in-out infinite alternate",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        aurora: {
          "0%": { transform: "translate3d(-8%, -4%, 0) rotate(0deg) scale(1)" },
          "50%": {
            transform: "translate3d(6%, 8%, 0) rotate(12deg) scale(1.12)",
          },
          "100%": {
            transform: "translate3d(-4%, 10%, 0) rotate(-8deg) scale(1.05)",
          },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.35)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
