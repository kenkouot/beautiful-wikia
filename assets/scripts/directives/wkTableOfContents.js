/**
 * wkTableOfContents.js
 * @description Directive for article table of contents
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkTableOfContents', function() {
      return {
        /**
         * @param {Object} scope refers to the BodyController, or whatever controller is in scope
         * @param {jQuery Object} $elem is a jQuery object of the element you are
         * returning, for instance, <wk-hero-image>
         * @param {Object} attrs are the attributes on the custom element
         */
        restrict: 'E',
        templateUrl: 'table-of-contents.html',
        link: function( scope, $elem ) {
          scope.$watch( 'headingId', function(newVal) {
            var $navz = $elem.find( '#nav-' + newVal );
            if (!$navz.hasClass('active')) {
              $( 'ul.table-of-contents li' ).removeClass( 'active shown' );
              $navz.addClass('active');
              $navz.nextUntil('.indent-2').addClass('shown');
              $navz.prevUntil('.indent-2').addClass('shown');
            }
          });

          scope.$watch( 'headings', function( newVal ) {
            if ( newVal ) {
              $elem.find( 'a' ).on( 'click', function() {
                var $tar = $( this.hash );
                $( 'body, html' ).animate({
                  scrollTop: $tar.offset().top - ( $tar.height() - ( $tar.height() * 0.18 ) )
                }, 200 );

                return false;
              });
            }
          });
        }
      };
  });
});
