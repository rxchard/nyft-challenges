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
        // #0f0416
        secondary: {
          50: '#f9f7fb',
          100: '#f4eff8',
          200: '#e3d8ed',
          300: '#d2c1e3',
          400: '#b092cd',
          500: '#8e63b8',
          600: '#8059a6',
          700: '#6b4a8a',
          800: '#553b6e',
          900: '#46315a',
        },
        tertiary: {
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
