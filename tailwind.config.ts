import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#068932",
        secondary: "#097bbf",
        error: "#d32f2f",
      },
    },
    screens: {
      mobsm: "320px",
      mobmd: "375px",
      moblg: "425px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1440px",
    },
  },
  plugins: [],
  important: true,
};
export default config;
