module.exports = {
  mode: 'jit',
  purge: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#fdeb89',
          2: '#e36de4',
          3: '#21eccf',
          //
          4: '#f3a871',
          5: '#a957aa',
          6: '#21eccf',
        },
        secondary: {
          100: '#F9E0F9',
          200: '#E88CEA',
          300: '#c6bbcc',
          //
          700: '#2D2936',
          800: '#1D1A22',
          900: '#0B0A0D',
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
