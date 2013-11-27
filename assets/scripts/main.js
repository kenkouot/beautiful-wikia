var angularPath,
    angularResourcePath,
    componentsPath,
    env;

env = window.wikia.env;
componentsPath = '../components/'
angularPath = componentsPath + 'angular/angular';
angularResourcePath = componentsPath + 'angular-resource/angular-resource';

if ( env === 'production' ) {
  angularPath += '.min';
  angularResourcePath += '.min';
}

require.config({
  paths: {
    angular: angularPath,
    angularResource: angularResourcePath
    // angularMocks: '../components/angular-mocks/angular-mocks',
    // text: '../components/requirejs-text/text'
  },
    shim: {
      angular: {
        exports : 'angular',
      },
      angularResource: {
        deps: [ 'angular' ]
      }
      // angularRoute: [ 'angular' ],
      // angularMocks: {
      //   deps:[ 'angular' ],
      //   exports: 'angular.mock'
      // }
    },
    priority: [
      'angular'
    ],
    deps: [
      // manually initialize angular app on Require is ready
      'bootstrap'
    ]
  });
