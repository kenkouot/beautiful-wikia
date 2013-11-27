var angularPath,
    env;

env = window.wikia.env;
angularPath = '../components/angular/angular';

if ( env === 'production' ) {
  angularPath += '.min';
}

require.config({
  paths: {
    angular: angularPath
    // angularRoute: '../components/angular-route/angular-route',
    // angularMocks: '../components/angular-mocks/angular-mocks',
    // text: '../components/requirejs-text/text'
  },
    shim: {
      angular : {
        exports : 'angular'
      },
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
