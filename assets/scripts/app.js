define([
  'angular',
  'ngTemplates',

  /* dependencies without exports */
  'angularRoute',
  'angularResource',
  'directives/loader',
  'controllers/loader'
], function( angular, ngTemplates ) {
  'use strict';

  return angular.module( 'wikia', [
    'ngResource',
    'ngRoute',
    'wikia.directives',
    'wikia.controllers'
  ]).run( ngTemplates );
});
