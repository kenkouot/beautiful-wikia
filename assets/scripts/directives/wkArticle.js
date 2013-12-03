define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkArticle', function() {
    return {
      restrict: 'E',
      templateUrl: 'article.html',
      transclude: true,
      link: function( scope, $elem, attrs ) {
        scope.$watch( 'article', function( newVal, oldVal ) {
          if ( newVal ) {
            $elem.html( newVal.content.html );
          }
        });
      }
    };
  });
});
