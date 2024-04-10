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
    fontFamily: {
      sans: ['Ubuntu Mono', 'sans-serif']
    },
    extend: {
      keyframes: {
        type: {
          from: {width: '0'},
          to: {width: '9em'},
        },
      },
      animation: {
        'typewriter-title' : 'type 2s steps(18) 1 normal both',
        'typewriter-register' : 'type 2s steps(18) 2s 1 normal both',
        'typewriter-login' : 'type 2s steps(18) 3s 1 normal both',

      },
    },
  },
  plugins: [],
}

