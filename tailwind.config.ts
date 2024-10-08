import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#fa5a2a",
        "light-pink": "#fdeaec",
        "light-red": "#f86f7f"
      },
    },
  },
  plugins: [],
};
export default config;
