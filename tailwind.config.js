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
    },
  },
};
