/**
 * wkArticle.js
 * @description Directive for displaying Wikia article content
 */
define([
  'directives/module',
  'scrollSpy'
], function( exports ) {
  'use strict';
  exports.directive( 'wkArticle', [ '$routeParams', '$location', '$rootScope', 'imageCdnPath', '$compile',
    function( $routeParams, $location, $rootScope, imageCdnPath, $compile ) {
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
                return window.open( href, '_blank' );
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

          function contentInjector() {
            var current = 1,
                // Total height of the article
                articleHeight = $elem.height(),
                // Height of the viewport ("visible page")
                visibleHeight = $( window ).height(),
                // Show content every N page heights
                frequency = 2,
                // The percentage inside an injection range to cover before trying to place content
                threshold = 0.8,
                // The range (in pixels) until another content injection will happen
                range = Math.floor( visibleHeight * frequency ),
                // Approximately how many injections we should have for an article
                injections = articleHeight / range,
                $mock = $('<div>')
                  .addClass('poo')
                  .css({
                    'background': 'black',
                    'color': 'white',
                    'line-height': '100px',
                    'margin-bottom': '1.25rem',
                    'text-align': 'center',
                    'vertical-align': 'middle'
                  })
                  .text('Content');

            $elem.children().each(function() {
              var insert,
                $current = $( this );

              // we have met our threshold requirement for injecting content
              if ( $current.is( 'p' ) && $current.offset().top >= ( current * range * threshold ) ) {
                if ( $current.next( 'p, :header' ).length ) {
                  insert = 'after';

                } else if ( $current.prev( 'p' ).length || ( $current = $current.prev( ':header' ) ).length ) {
                  insert = 'before';
                }

                if ( insert ) {
                  $current[ insert ]( $mock.clone() );
                  current++;
                }
              }

              if ( current > injections ) {
                return false;
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
              contentInjector();
            }
          });
        }
      };
    }]);
  });
