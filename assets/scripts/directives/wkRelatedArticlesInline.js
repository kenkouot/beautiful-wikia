/**
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkRelatedArticlesInline', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'injected-content-related.html',
      link: function( scope, $elem, attrs ) {
      }
    };
  });
});
