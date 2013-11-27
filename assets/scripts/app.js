define([
  'angular',
  'angularRoute',
  'angularResource',
  'controllers/loader'
], function( angular ) {
  'use strict';

  return angular.module( 'wikia', [
    'ngResource',
    'ngRoute',
    'wikia.controllers'
  ]);
});
