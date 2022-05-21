module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  features: {
    postcss: false,
  },
  framework: "@storybook/vue3",
  core: {
    builder: "webpack4",
  },
};
