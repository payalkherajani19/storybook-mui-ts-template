module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './fileTransformer.js',
  },
  moduleNameMapper: { '\\.(css|sass|scss)$': 'identity-obj-proxy' },
};
