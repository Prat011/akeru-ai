/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(17, 24, 39)",
        foreground: "rgb(243, 244, 246)",
        card: "rgb(31, 41, 55)",
        "card-foreground": "rgb(243, 244, 246)",
        primary: "rgb(59, 130, 246)",
        "primary-foreground": "rgb(255, 255, 255)",
        ring: "rgb(59, 130, 246)",
        input: "rgb(55, 65, 81)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};