// 🌟 Configuration Babel pour Blunof
// Support des fonctionnalités JavaScript modernes

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.NODE_ENV === 'development',
      },
    ],
    '@babel/preset-typescript',
  ],
  
  plugins: [
    // 🔄 Support des fonctionnalités modernes
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    
    // 🎭 Support des décorateurs
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    
    // 📱 Support des modules
    '@babel/plugin-transform-modules-commonjs',
    
    // 🔄 Support des imports dynamiques
    '@babel/plugin-syntax-dynamic-import',
    
    // 🎯 Support des fonctions async
    '@babel/plugin-transform-async-to-generator',
    
    // 📊 Support des générateurs
    '@babel/plugin-transform-runtime',
  ],
  
  // 🔍 Configuration pour les tests
  env: {
    test: {
      plugins: [
        // 🧪 Support des tests
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
    development: {
      plugins: [
        // 🔄 Support du hot reload
        'react-refresh/babel',
      ],
    },
  },
  
  // 🎯 Ignorer certains fichiers
  ignore: [
    'node_modules',
    'dist',
    'build',
    'coverage',
    '*.test.js',
    '*.spec.js',
  ],
  
  // 📱 Configuration pour les composants React
  assumptions: {
    setPublicClassFields: true,
    privateFieldsAsProperties: true,
  },
};
