/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        olympic: {
          gold: "#FFD700",
          silver: "#C0C0C0",
          bronze: "#CD7F32",
          blue: "#0081C8",
          yellow: "#FCB131",
          black: "#000000",
          green: "#00A651",
          red: "#EE334E",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
