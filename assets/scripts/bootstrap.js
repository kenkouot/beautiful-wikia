/**
 * Manually start initialize angular app on document
 */
define([
  'require',
  'angular',
  'app',
  'routes'
], function( require, angular, app ) {
  'use strict';
  angular.element( document ).ready(function() {
    angular.bootstrap( document, [ app.name ]);
  });
});
