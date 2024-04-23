module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/**/*.{js,jsx,ts,tsx}",

    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  plugins: [require("tw-elements/dist/plugin"), require("flowbite/plugin")],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['"Oswald"'],
        creepster: ['"Creepster"'],
        monospace: "monospace",
        Roboto: "Roboto",
      },
      backgroundImage: {
        "chevron-up": "url('/assets/icons/chevron-up.svg')",
        "chevron-down": "url('/assets/icons/chevron-down.svg')",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateY(30%)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "marquee-infinite": "marquee2 20s linear infinite",
      },
    },
  },
};
