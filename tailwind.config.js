/** @type {import('tailwindcss').Config} */
export default {
  content: ["./.vitepress/**/*.{vue,js,ts}", "./content/**/*.md"],
  theme: {
    extend: {
      colors: {
        VPLight: "#3451b2",
        VPDark: "#a8b1ff",
      },
    },
  },
  plugins: [],
}
