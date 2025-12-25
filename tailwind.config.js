/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F3F3F3",
        "secondary-color": "#075B5D",
        "base-color": "#ADD9DA",
        "highlight-color": "#FDFDFD",
        "input-color": "#0C0C0C",
      },
    },
  },

  plugins: [scrollbar],
};
