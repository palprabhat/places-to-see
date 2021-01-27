module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cfd1d4",
          200: "#a0a3a9",
          300: "#70747d",
          400: "#414652",
          500: "#111827",
          600: "#0e131f",
          700: "#0a0e17",
          800: "#070a10",
          900: "#030508",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
