import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#090909",
        graphite: "#141414",
        "graphite-2": "#1c1a22",
        royal: "#35165D",
        pulse: "#FF4FA2",
        ion: "#00D9FF",
        ember: "#FF7B32",
        soft: "#F5F5F5"
      },
      boxShadow: {
        glow: "0 0 60px rgba(139, 92, 246, 0.28)",
        orange: "0 0 48px rgba(251, 146, 60, 0.24)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 20% 10%, rgba(255,79,162,.22), transparent 28%), radial-gradient(circle at 82% 6%, rgba(0,217,255,.18), transparent 24%), radial-gradient(circle at 55% 80%, rgba(255,123,50,.16), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
