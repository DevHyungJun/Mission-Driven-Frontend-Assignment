import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      pc: "1100px",
    },
    extend: {
      fontFamily: { sans: ["var(--font-pretendard)", "Inter", "sans-serif"] },
    },
  },
};

export default config;
