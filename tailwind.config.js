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
      },
      backgroundImage: {
        "chevron-up": "url('/assets/icons/chevron-up.svg')",
        "chevron-down": "url('/assets/icons/chevron-down.svg')",
      },
      keyframes: {
        scroll: {
          from: { top: 0, transform: "translateZ(0)" },
          to: { top: "[-100vh]", transform: "translateZ([-50vh])" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        starwars: "scroll 60s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "waving-hand": "wave 2s linear infinite",
      },
    },
  },
};
