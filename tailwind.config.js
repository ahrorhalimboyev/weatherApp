/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "hsl(177,61%,70%)",
        secondary: "blue",
      },
    },
    fontFamily: { Roboto: ["Roboto, sans-serif"] },
  },
  plugins: [],
};
