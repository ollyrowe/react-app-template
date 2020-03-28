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
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'core'
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'icons'
    ]
  ]
};
