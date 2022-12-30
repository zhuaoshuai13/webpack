module.exports = {
  globals: {
    window: true,
    $: true,
    ScrollMagic: true,
    TimelineMax: true,
    require: true,
    document: true,
    Swiper: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  extends: 'airbnb-base',
  rules: {
    'global-require': 0,
    'no-useless-return': 0,
    'no-plusplus': 0,
    'no-new': 0,
    'no-console': 1,
  },
};
