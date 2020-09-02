module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-recommended', 'stylelint-config-styled-components'],
  rules: {
    'color-no-invalid-hex': true,
    'font-family-no-missing-generic-family-keyword': [true, { ignoreFontFamilies: ['Rubik'] }],
    'unit-no-unknown': true,
    'block-no-empty': true,
    'color-no-hex': true
  }
};
