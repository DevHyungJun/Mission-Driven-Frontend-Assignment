import plugin from "tailwindcss/plugin";

export const noScrollbar = plugin(function ({ addUtilities }) {
  addUtilities({
    ".no-scrollbar": {
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  });
});
