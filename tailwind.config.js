/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F3F3F3",
        "secondary-color": "#839F9F",
        "base-color": "#CBD8D8",
        "highlight-color": "#FDFDFD",
        "input-color": "#0C0C0C",
      },
    },
  },
  plugins: [],
};
