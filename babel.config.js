module.exports = {
  presets: [
    'razzle/babel',
    '@babel/react',
    [
      '@babel/env',
      {
        targets: [
          '> 1%',
          'last 3 versions',
          'ie >= 9',
          'ios >= 8',
          'android >= 4.2'
        ]
      }
    ]
  ],
  // Enable tree shaking of Material UI modules for smaller bundle size in development.
  // This allows for much shorter start up times when importing using top-level imports.
  // For more information, see: https://material-ui.com/guides/minimizing-bundle-size/
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'core'
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'icons'
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/lab',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'lab'
    ]
  ]
};
