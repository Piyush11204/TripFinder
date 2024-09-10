module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // add more paths here if needed
  ],
  theme: {
    extend: {
      colors: {
        wheat: '#f5deb3',
        yellow: {
          100: '#fcf4e9',
        },
      },
      fontFamily: {
        ethnocentric: ['Ethnocentric', 'sans-serif'],
        'great-vibes': ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}
