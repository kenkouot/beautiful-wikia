/**
 * main.js
 * @description Sets up app dependencies and exports various globals
 */
(function( window ) {
  'use strict';
  var path,
      componentsPath,
      env;

  // Get environment
  env                  = window.wikia.env;
  // Store paths
  path                 = {};
  componentsPath       = '../components/';
  // Path to Bower Components
  path.angular         = componentsPath + 'angular/angular';
  path.angularResource = componentsPath + 'angular-resource/angular-resource';
  path.angularRoute    = componentsPath + 'angular-route/angular-route';
  path.jQuery          = componentsPath + 'jquery/jquery';

  if ( env === 'production' ) {
    // ship preminified versions in prod environment
    path.forEach(function( path ) {
      path += '.min';
    });
  }

  require.config({
    urlArgs: 'bust=' +  ( new Date() ).getTime(),
    paths: {
      angular         : path.angular,
      angularResource : path.angularResource,
      angularRoute    : path.angularRoute,
      jQuery          : path.jQuery
    },
    shim: {
      angular: {
        exports: 'angular',
        deps: [ 'jQuery' ]
      },
      angularResource: {
        deps: [ 'angular' ]
      },
      angularRoute: {
        deps: [ 'angular' ]
      },
      jQuery: {
        exports: '$'
      }
    },
    priority: [
      'angular'
    ],
    deps: [
      // manually initialize angular app on Require is ready
      'bootstrap'
    ]
  });
}( this ));
