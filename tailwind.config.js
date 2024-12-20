/** @type {import('tailwindcss').Config} */
export default {
  content: ["./docs/.vitepress/**/*.{vue,js,ts}", "./docs/**/*.md"],
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

