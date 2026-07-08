import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        stadium: {
          950: "#06111e",
          900: "#0a1930",
          800: "#10294a"
        },
        turf: {
          500: "#1e8f53",
          700: "#10693c"
        },
        gold: "#f6c34a",
        neon: "#63f4cf"
      },
      boxShadow: {
        panel: "0 20px 45px rgba(0, 0, 0, 0.28)",
        glow: "0 0 0 1px rgba(99, 244, 207, 0.2), 0 0 32px rgba(99, 244, 207, 0.12)"
      },
      backgroundImage: {
        field:
          "linear-gradient(180deg, rgba(10, 25, 48, 0.98), rgba(6, 17, 30, 0.98)), radial-gradient(circle at top, rgba(246, 195, 74, 0.16), transparent 34%), linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 10%)",
        yardLines:
          "repeating-linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 2px, transparent 2px, transparent 80px)"
      },
      fontFamily: {
        display: ["'Trebuchet MS'", "'Avenir Next'", "sans-serif"],
        body: ["'Segoe UI'", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
