/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FDF8E7",
          100: "#FAEFC6",
          200: "#F2DE96",
          300: "#E9C868",
          400: "#D4AF37",
          500: "#C09A2C",
          600: "#9C7C20",
          700: "#7A5F18",
          800: "#573F0F",
          900: "#301F0A",
        },
        beige: {
          50: "#FEFBF7",
          100: "#FBF4EA",
          200: "#F3E7D6",
          300: "#E9D8BE",
          400: "#DBC4A2",
          500: "#C7AB82",
          600: "#A98D64",
          700: "#836C4A",
          800: "#594A32",
          900: "#342B1D",
        },
        blush: {
          50: "#FDF3F7",
          100: "#FBE4EE",
          200: "#F7C8DC",
          300: "#F0A3C2",
          400: "#E67BA3",
          500: "#D65C88",
          600: "#B8426C",
          700: "#933353",
          800: "#5F2236",
          900: "#33131E",
        },
        rose: {
          300: "#E6A9B5",
          400: "#D28798",
          500: "#B76E79",
          600: "#9B5560",
          700: "#7B3F49",
        },
        ink: "#1C0710",
        espresso: "#2E0B1A",
        crimson: "#4A0F26",
      },
      fontFamily: {
        signature: ["'Great Vibes'", "cursive"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Raleway'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 18px 40px -18px rgba(212, 175, 55, 0.6)",
        blush: "0 18px 40px -18px rgba(214, 92, 136, 0.6)",
        rose: "0 18px 40px -18px rgba(183, 110, 121, 0.55)",
        soft: "0 22px 50px -24px rgba(51, 41, 27, 0.4)",
      },
    },
  },
  plugins: [],
}
