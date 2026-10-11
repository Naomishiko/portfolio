/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FBF6E9",
          100: "#F7EFD9",
          200: "#EFDBA6",
          300: "#E3C46F",
          400: "#D4AF37",
          500: "#C29A2C",
          600: "#A07C22",
          700: "#7A5F1B",
          800: "#524013",
          900: "#2C2309",
        },
        beige: {
          50: "#FDFBF6",
          100: "#FAF5EC",
          200: "#F1E7D3",
          300: "#E6D8BA",
          400: "#D8C39C",
          500: "#C4A97B",
          600: "#A68B5D",
          700: "#806A45",
          800: "#57482F",
          900: "#33291B",
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
        gold: "0 18px 40px -18px rgba(212, 175, 55, 0.55)",
        soft: "0 22px 50px -24px rgba(51, 41, 27, 0.4)",
      },
    },
  },
  plugins: [],
}
