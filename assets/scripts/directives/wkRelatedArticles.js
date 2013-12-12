/**
 * wkArticle.js
 * @description Directive for displaying Wikia article content
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkRelatedArticles', [ '$routeParams', '$location', '$rootScope', 'relatedArticles',
    function( $routeParams, $location, $rootScope, relatedArticles ) {
      return {
        // restricts this directive to just tag elements eg. <wk-related-articles>
        restrict: 'E',
        // abstract template to templateUrl if this gets any bigger
        // ng-class is for fading in and out on new articles
        templateUrl: 'related-articles.html',
        replace: true,
        link: function( scope, $elem, attrs ) {
          /*
           * Watches the scopes 'article' object for changes, loads new views on change
           */
           scope.$watch('relatedArticles', function( newVal, oldVal ) {
            if (newVal) {
              scope.articles = newVal;
            }
          });
        }
      };
    }]);
  });
