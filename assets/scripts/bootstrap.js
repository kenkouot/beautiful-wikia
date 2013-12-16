/**
 * Manually start initialize angular app on document
 */
define([
  'jquery',
  'angular',
  'app',
  'routes'
], function( $, angular, app ) {
  'use strict';
  angular.element( document ).ready(function() {
    angular.bootstrap( document, [ app.name ]);
  });
});
