module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@app/config': './app/config',
          '@app/components': './app/components',
          '@app/constants': './app/constants',
          '@app/navigation': './app/navigation',
          '@app/screens': './app/screens',
          '@app/theme': './app/theme',
          '@app/utils': './app/utils',
          '@app/lib': './app/lib',
          '@app/redux': './app/redux',
          '@app/services': './app/services',
          '@app/assets': './app/assets',
        },
      },
    ],
  ],
};
