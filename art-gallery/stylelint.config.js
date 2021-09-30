module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recommended-scss',
  ],
  plugins: ['stylelint-order', 'stylelint-scss'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'order/properties-alphabetical-order': true,
    'scss/at-rule-no-unknown': null,
    'scss/at-import-no-partial-leading-underscore': null,
  },
}
