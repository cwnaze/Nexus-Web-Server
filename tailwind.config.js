/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      'yellow': {
        100: '#FFE6AE',
        200: '#F0A500',
      },
      'blue': {
        'placeholder': '#33475690',
        100: '#334756',
        200: '#293241',
      },
      'error': '#FF0000',
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
      spacing: {
        '128': '32rem',
      },
      dropShadow: {
        'dark': '0 3px 2px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        'type-title': {
          '0%': {width: '0'},
          '0.01%': {'border-right': '50px solid #FFE6AE'},
          '99.99%': {width: '9em', 'border-right': '50px solid #FFE6AE'},
          '100%': {width: 'auto'},
        },
        'type-register': {
          '0%': {width: '0'},
          '0.01%': {'border-right': '25px solid #FFE6AE'},
          '99.99%': {width: '5em', 'border-right': '25px solid #FFE6AE'},
          '100%': {width: 'auto'},
        },
        'type-login': {
          '0%': {width: '0'},
          '0.01%': {'border-right': '25px solid #FFE6AE'},
          '99.99%': {width: '3em', 'border-right': '25px solid #FFE6AE'},
          '100%': {width: 'auto'},
        },
      },
      animation: {
        'typewriter-title' : 'type-title 2s steps(16) 1 normal backwards',
        'typewriter-register' : 'type-register 1s steps(8) 2s 1 normal backwards',
        'typewriter-login' : 'type-login 800ms steps(5) 3s 1 normal backwards'
      },
    },
  },
  plugins: [],
}

