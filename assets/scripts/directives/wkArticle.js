/**
 * wkArticle.js
 * @description Directive for displaying Wikia article content
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkArticle', function() {
    return {
      // restricts this directive to just tag elements eg. <wk-article>
      restrict: 'E',
      templateUrl: 'article.html',
      link: function( scope, $elem, attrs ) {
        scope.$watch( 'article', function( newVal, oldVal ) {
          if ( newVal ) {
            // replace container contents when new article content arrives
            $elem.html( newVal.content.html );
          }
        });
      }
    };
  });
});
