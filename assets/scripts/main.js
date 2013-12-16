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
  path.jquery          = componentsPath + 'jquery/jquery';
  path.scrollSpy       = 'vendor/scrollSpy';

  if ( env === 'production' ) {
    // ship preminified versions in prod environment
    Array.prototype.forEach.call( path, function( path ) {
      path += '.min';
    });
  }

  require.config({
    urlArgs: 'bust=' +  ( new Date() ).getTime(),
    paths: {
      angularSrc      : path.angular,
      angularResource : path.angularResource,
      angularRoute    : path.angularRoute,
      jquery          : path.jquery,
      scrollSpy       : path.scrollSpy
    },
    shim: {
      angularSrc: {
        exports: 'angular',
        deps: [ 'jquery' ]
      },
      angularResource: {
        deps: [ 'angular' ]
      },
      angularRoute: {
        deps: [ 'angular' ]
      },
      jquery: {
        exports: 'jQuery'
      },
      scrollSpy: {
        deps: [ 'jquery' ]
      }
    }
  });
  require(['bootstrap']);
}( this ));
