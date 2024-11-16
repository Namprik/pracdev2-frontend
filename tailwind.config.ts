import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dp-border": "#B9B9B9",
        "dp-blue": "#5B90E8",
        "dp-blue-hover": "#133E87",
        "dp-blue-dark": "#4172C6",
        "dp-red": "#D66262",
        "dp-red-hover": "#A33B3B",
        "dp-red-error": "#F25858",
        "dp-navbar": "#133E87",
        "dp-gray": "#757070",
        "dp-gray-light": "#F8F8F8",
      },
      boxShadow: {
        "dp-shadow": "0 4px 4px 0 rgba(185, 185, 185, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
