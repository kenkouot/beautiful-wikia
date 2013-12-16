/**
 * wkArticle.js
 * @description Directive for displaying Wikia article content
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkRelatedArticles', [ '$routeParams', '$location', '$rootScope', 'relatedArticles', 'imageCdnPath',
    function( $routeParams, $location, $rootScope, relatedArticles, imageCdnPath ) {
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
            if (newVal && newVal.length) {
              newVal.forEach(function( item ) {
                item.imgUrl = imageCdnPath.get( decodeURIComponent( item.imgUrl ) );
              });
              scope.articles = newVal;
            }
          });
        }
      };
    }]);
  });
