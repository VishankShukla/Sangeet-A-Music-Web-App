/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#12100E",
          soft: "#181410",
        },
        surface: {
          DEFAULT: "#1E1914",
          hover: "#28221B",
          border: "#332B22",
        },
        amber: {
          DEFAULT: "#E8A33D",
          dim: "#C08635",
          glow: "#F4C266",
        },
        teal: {
          DEFAULT: "#4FBDBA",
          dim: "#3C918F",
        },
        ink: {
          DEFAULT: "#F5EFE6",
          muted: "#A79C8C",
          faint: "#6B6255",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        spin_slow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        vinyl: "spin_slow 4s linear infinite",
      },
    },
  },
  plugins: [],
}
