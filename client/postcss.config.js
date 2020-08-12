const tailwindcss = require('tailwindcss');
const purgeCSS = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    tailwindcss('./src/tailwind.config.js'),
    purgeCSS({
      content: ['./src/**/*.js'],
      css: ['./src/**/*.css']
    }),
    require('autoprefixer')
  ]
};
