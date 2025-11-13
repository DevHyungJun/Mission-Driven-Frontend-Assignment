import { noScrollbar } from "@/app/utils/customPlugins";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-pretendard)", "Inter", "sans-serif"] },
    },
  },
  // plugins: [noScrollbar],
};

export default config;
