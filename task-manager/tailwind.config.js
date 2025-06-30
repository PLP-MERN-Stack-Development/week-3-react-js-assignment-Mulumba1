    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      darkMode: 'class', 
      theme: {
        extend: {
          fontFamily: {
            inter: ['Inter', 'sans-serif'], 
          },
          keyframes: {
            'fade-in-down': {
              '0%': {
                opacity: '0',
                transform: 'translateY(-20px)'
              },
              '100%': {
                opacity: '1',
                transform: 'translateY(0)'
              },
            },
            'fade-in': {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            'bounce-in': {
              '0%': { transform: 'scale(0.9)', opacity: '0' },
              '50%': { transform: 'scale(1.05)', opacity: '0.8' },
              '100%': { transform: 'scale(1)', opacity: '1' },
            }
          },
          animation: {
            'fade-in-down': 'fade-in-down 0.6s ease-out',
            'fade-in': 'fade-in 0.8s ease-out forwards',
            'bounce-in': 'bounce-in 0.5s ease-out forwards',
          }
        },
      },
      plugins: [],
    }
    