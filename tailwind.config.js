/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      sm: [
        "26px",
        {
          lineHeight: "39px",
          fontWeight: "700",
        },
      ],
    },
    extend: {},
  },
  plugins: [],
};
