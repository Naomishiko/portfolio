/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FDF6F2",
          100: "#FBE9E1",
          200: "#F4D3C4",
          300: "#EBB79F",
          400: "#DE9B7E",
          500: "#C97F60",
          600: "#A96349",
          700: "#834B37",
          800: "#573125",
          900: "#301B14",
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
          50: "#FDF4F7",
          100: "#FBE8EE",
          200: "#F6CFDC",
          300: "#EFAABF",
          400: "#E2809C",
          500: "#CE5C7C",
          600: "#AE4562",
          700: "#8A354C",
          800: "#5D2333",
          900: "#33141D",
        },
        ink: "#1A1512",
        espresso: "#241D17",
      },
      fontFamily: {
        signature: ["'Great Vibes'", "cursive"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Raleway'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 18px 40px -18px rgba(222, 155, 126, 0.55)",
        blush: "0 18px 40px -18px rgba(226, 128, 156, 0.55)",
        soft: "0 22px 50px -24px rgba(51, 41, 27, 0.4)",
      },
    },
  },
  plugins: [],
}
