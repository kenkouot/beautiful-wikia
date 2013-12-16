({
  baseUrl: '.',
  name: 'main',
  out: 'main-built.js',
  paths: {
    'angularSrc': '../components/angular/angular',
    'angularRoute': '../components/angular-route/angular-route',
    'angularResource': '../components/angular-resource/angular-resource',
    'jquery': '../components/jquery/jquery',
    'scrollSpy': 'vendor/scrollSpy'
  },
  optimize: 'uglify2',
  uglify2: {
    warnings: false,
    mangle: false
  }
})
