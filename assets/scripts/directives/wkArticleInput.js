/**
 * wkArticleInput.js
 * @requires controllers/Body.js
 * @description Directive for the input that loads an initial article
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkArticleInput', function() {
    return {
      restrict: 'E',
      templateUrl: 'article-input.html',
      replace: true,
      transclude: true,
      link: function( scope, $elem, attrs ) {
        console.log( $elem );
        $elem.on( 'submit', function( evt ) {
          var val = $elem.find( 'input' ).val();
          scope.$apply(function( scope ) {
            var article = scope.setArticle( val );
          });
        });
      }
    };
  });
});
