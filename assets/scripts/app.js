define([
  'angular',
  'angularResource',
  'controllers/loader'
], function( angular ) {
  'use strict';

  return angular.module( 'wikia', [
    'ngResource',
    'wikia.controllers'
  ]);
});
