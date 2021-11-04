module.exports = {
  mode: 'jit',
  purge: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        darked: {
          300: '#c6bbcc',
          600: '#62506b',
          700: '#1b161d',
          800: '#18141a',
          900: '#0b090c',
        },
        mandy: {
          50: '#fdf6f7',
          100: '#fbedf0',
          200: '#f6d2d9',
          300: '#f1b7c3',
          400: '#e68195',
          500: '#DB4B68',
          600: '#c5445e',
          700: '#a4384e',
          800: '#832d3e',
          900: '#6b2533',
        },
      },
      fontFamily: {
        default: [
          'Signika',
          '-apple-system',
          'blinkmacsystemfont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'arial',
          'sans-serif',
        ],
        head: [
          'Grandstander',
          '-apple-system',
          'blinkmacsystemfont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'arial',
          'sans-serif',
        ],
      },
      zIndex: {
        '-1': -1,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      screens: {
        portrait: { raw: '(orientation: portrait)' },
        '3xl': '1842px',
      },
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      padding: ['first', 'last'],
    },
  },
  plugins: [],
  corePlugins: {
    inset: true,
  },
}
