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
        wave: {
          "0%": { transform: "translateY(0)" },
          "10%": { transform: "translateY([-100px])" },
          "20%": { transform: "translateY([-200px])" },
          "30%": { transform: "translateY([-300px])" },
          "40%": { transform: "translateY([-400px])" },
          "50%": { transform: "translateY([-500px])" },
          "60%": { transform: "translateY([-600px])" },
          "100%": { transform: "translateY([-700px])" },
        },
        marquee: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        "waving-hand": "wave 2s linear infinite",

        "marquee-infinite": "marquee 20s linear infinite",
      },
    },
  },
};
