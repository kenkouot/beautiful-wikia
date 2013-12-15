/**
 * wkArticle.js
 * @description Directive for displaying Wikia article content
 */
define([
  'directives/module',
  'scrollSpy'
], function( exports ) {
  'use strict';
  exports.directive( 'wkArticle', [
    '$routeParams',
    '$location',
    '$rootScope',
    'imageCdnPath',
    '$compile',
    'contentInjector',
    function(
      $routeParams,
      $location,
      $rootScope,
      imageCdnPath,
      $compile,
      contentInjector
    ) {
      return {
        // restricts this directive to just tag elements eg. <wk-article>
        restrict: 'E',
        // abstract template to templateUrl if this gets any bigger
        // ng-class is for fading in and out on new articles
        template: '<article></article>',
        replace: true,
        link: function( scope, $elem, attrs ) {
          /**
           * @private
           * @description Called everytime a new article is set, binds handlers for all links in the article
           */
          function bindLinks() {
            var $links = $elem.find( 'a' );
            if ( !$links.length ) return false;
            $links.on( 'click', function( evt ) {
              var $link,
                  route,
                  isImageLink,
                  isExternalLink,
                  href;

              $link = $( this );
              href = $link.attr( 'href' );
              route = [ '/article', $routeParams.wiki, href.slice( 2 ) ].join( '/' );
              isImageLink = !!$link.find( 'img' ).length;
              isExternalLink = !!href.match( 'http' );

              /*
               * All interwiki links are relative, if a link starts with http, we open
               * it externally
               */
              if ( isExternalLink ) {
                window.open( href, '_blank' );
                return false;
              }

              if ( !isImageLink ) {
                evt.preventDefault();
                $( 'body' ).animate({
                  scrollTop: 0
                }, 200, function() {
                  // load a new article
                  $location.path( route );
                  // manually apply here because we are operating outside of Angular's acknowledgement
                  // source: http://stackoverflow.com/a/11932283
                  scope.$apply();
                });
              }

              if ( isImageLink ) {
                // opens an article that redirects to the Wikia file page
                var imgSrc = $link.find( 'img' ).attr( 'src' );
                $link.attr({
                  'href': imgSrc,
                  'target': '_blank'
                });
                return true;
              }
            });
          }

          /*
           * Watches the scopes 'article' object for changes, loads new views on change
           */
          scope.$watch( 'article', function( newVal, oldVal ) {
            var $headings,
                headings,
                heading,
                i;

            if ( newVal ) {
              // replace container contents when new article content arrives
              var el = $compile( newVal.content.html )( scope );
              $elem.html( el );
              bindLinks();

              var $wkArticleTitle = $( '#wk-article-title' );
              $headings = $wkArticleTitle.add( $elem.find( 'h1, h2, h3, h4, h5, h6' ) );

              headings = [];
              for ( i = 0; i < $headings.length; i++ ) {
                heading = $headings[ i ];
                headings.push({
                  id: heading.id,
                  text: heading.id === 'wk-article-title' ? 'Reading ' + newVal.content.title : heading.textContent,
                  level: parseInt( heading.nodeName.slice( 1 ), 10 )
                });
              }

              $headings.on('scrollSpy:enter', function() {
                $rootScope.$emit( 'article:scollDetected', $( this ).attr( 'id' ) );
              });

              $headings.scrollSpy();

              $rootScope.$emit( 'article:headings', headings );

              contentInjector.inject( scope, $elem );
            }
          });
        }
      };
    }]);
  });
