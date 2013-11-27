/**
 * Manually start initialize angular app on document
 */
define([
  'require',
  'angular',
  'app'
], function( require, angular, app ) {
  angular.element( document ).ready(function() {
    angular.bootstrap( document, [ app.name ]);
  });
});
