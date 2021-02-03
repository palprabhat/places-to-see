module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xxs: "320px",
        xs: "420px",
      },
      colors: {
        blueGray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#0D1219",
          900: "#090C11",
        },
        coolGray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        darkGray: {
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
        trueGray: {
          50: "#626262",
          100: "#5E5E5E",
          200: "#575757",
          300: "#4F4F4F",
          400: "#474747",
          500: "#404040",
          600: "#303030",
          700: "#212121",
          800: "#121212",
          900: "#030303",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "disabled"],
      cursor: ["disabled"],
      translate: ["active"],
    },
  },
  plugins: [],
};
