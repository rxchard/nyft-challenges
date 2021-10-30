module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['babel-plugin-macros', { twin: { preset: 'styled-components' } }],
    ['styled-components', { ssr: true }],
  ],
}
