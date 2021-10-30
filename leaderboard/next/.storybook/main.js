const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/stories/**/*.story.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.(scss|css)$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    })

    config.resolve.alias['@'] = path.resolve(__dirname, '../src')

    // Return the altered config
    return config
  },
}
