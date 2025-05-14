import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        primary: "#333333",
        accent: "#4682B4"
      },
      fontFamily: {
        leagueSpartan: ["League Spartan", "sans-serif"]
      },
    },
    plugins: [typography],
  }
};
export default config;
