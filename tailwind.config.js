/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      'blue': {
        100: '#E0FBFC',
        200: '#98C1D9',
        300: '#3D5A80',
        400: '#293241'
      },
      'orange': '#EE6C4D',
    },
    borderWidth: {
      default: '1px',
        '0': '0',
        '2': '2px',
        '4': '4px',
        '8': '8px',
        'cursor': '25px'
    },
    fontFamily: {
      sans: ['Ubuntu Mono', 'sans-serif']
    },
    extend: {
      keyframes: {
        'type-title': {
          '0%': {width: '0'},
          '0.01%': {'border-right': '50px solid #E0FBFC'},
          '99.99%': {width: '10em', 'border-right': '50px solid #E0FBFC'},
          '100%': {width: 'auto'},
        },
        'type-register': {
          '0%': {width: '0'},
          '0.01%': {'border-right': '25px solid #E0FBFC'},
          '99.99%': {width: '5em', 'border-right': '25px solid #E0FBFC'},
          '100%': {width: 'auto'},
        },
        'type-login': {
          '0%': {width: '0'},
          '0.01%': {'border-right': '25px solid #E0FBFC'},
          '99.99%': {width: '3em', 'border-right': '25px solid #E0FBFC'},
          '100%': {width: 'auto'},
        },
      },
      animation: {
        'typewriter-title' : 'type-title 2s steps(20) 1 normal backwards',
        'typewriter-register' : 'type-register 1s steps(8) 2s 1 normal backwards',
        'typewriter-login' : 'type-login 800ms steps(5) 3s 1 normal backwards'
      },
    },
  },
  plugins: [],
}

