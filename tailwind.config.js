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
    },
  },
};
