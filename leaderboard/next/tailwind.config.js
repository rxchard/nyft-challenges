module.exports = {
  mode: 'jit',
  purge: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        portrait: { raw: '(orientation: portrait)' },
        '3xl': '1842px',
      },
      colors: {
        orchid: {
          50: '#fdf8fe',
          100: '#fbf1fc',
          200: '#f4dcf9',
          300: '#edc7f5',
          400: '#e09ded',
          500: '#d373e5',
          600: '#be68ce',
          700: '#9e56ac',
          800: '#7f4589',
          900: '#673870',
        },
        ronchi: {
          50: '#fefcf6',
          100: '#fef9ec',
          200: '#fcf0d0',
          300: '#fae7b4',
          400: '#f6d67b',
          500: '#f2c443',
          600: '#dab03c',
          700: '#b69332',
          800: '#917628',
          900: '#776021',
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
