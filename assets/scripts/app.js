define([
  'angular',
  'ngTemplates',
  /* dependencies without exports */
  'jquery',
  'angularRoute',
  'angularResource',
  'directives/loader',
  'services/loader',
  'controllers/loader'
], function( angular, ngTemplates ) {
  'use strict';

  return angular.module( 'wikia', [
    'ngResource',
    'ngRoute',
    'wikia.directives',
    'wikia.services',
    'wikia.controllers'
  ]).run( ngTemplates );
});
