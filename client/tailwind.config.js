/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themify: {
          bg: "var(--themify-bg)",
          bgSoft: "var(--themify-bg-soft)",
          textColor: "var(--themify-text)",
          textColorSoft: "var(--themify-text-soft)",
          border: "var(--themify-border)",
        },
        light: {
          textColor: '#000',
          bg: '#fff',
          logo: '#00008b', // Dark blue
          bgSoft: '#f6f3f3',
          textColorSoft: '#555',
          border: '#d3d3d3', // Light gray
        },
        dark: {
          textColor: '#f5f5f5', // White smoke
          bg: '#222',
          logo: '#fff',
          bgSoft: '#333',
          textColorSoft: '#d3d3d3', // Light gray
          border: '#444',
        },
      },
    },
  },
  plugins: [],
};
