/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  
    extend: {
      colors: {
        'custom-dark': '#505D6B',
        'custom-button-color': '#0BC279',
      },
      boxShadow: {
        'custom-light': '3px 4px 10px rgba(36, 50, 57, 0.03)',
      },
      // maxWidth: {
      //   '1088px': '1088px', 
      // },
        screens: {
          'lg': '1025px',
      },
      backgroundColor: {
        'custom-light-blue': '#f1f5f8',
      },
      fontFamily: {
        'aktiv-grotesk': ['"Aktiv Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
