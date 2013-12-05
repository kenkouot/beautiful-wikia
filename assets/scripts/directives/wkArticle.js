/**
 * wkArticle.js
 * @description Directive for displaying Wikia article content
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkArticle', [ '$routeParams', '$location', function( $routeParams, $location ) {
    return {
      // restricts this directive to just tag elements eg. <wk-article>
      restrict: 'E',
      template: '<article ng-class="{ invisible: changing }"></article>',
      link: function( scope, $elem, attrs ) {

        function bindLinks() {
          var $links = $elem.find( 'a' );
          if ( !$links.length ) return false;
          $links.on( 'click', function( evt ) {
            var $link,
                route,
                isImageLink,
                href;

            evt.preventDefault();
            $link = $( this );
            href = $link.attr( 'href' );
            route = [ '/article', $routeParams.wiki, href.slice( 2 ) ].join( '/' );
            isImageLink = !!$link.find( 'img' ).length;

            if ( !isImageLink ) {
              $( 'body' ).animate({
                scrollTop: 0
              }, 200, function() {
                $location.path( route );
                scope.$apply();
              });
            } else {
              window.open( scope.wikiBaseHref + href.slice( 2 ), '_blank' );
            }
          });
        }

        scope.$watch( 'article', function( newVal, oldVal ) {
          if ( newVal ) {
            // replace container contents when new article content arrives
            $elem.html( newVal.content.html );
            bindLinks();
          }
        });
      }
    };
  }]);
});
