/**
 * wkTableOfContents.js
 * @description Directive for article table of contents
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkTableOfContents', [ '$rootScope',
    function( $rootScope ) {
      return {
        /**
         * @param {Object} scope refers to the BodyController, or whatever controller is in scope
         * @param {jQuery Object} $elem is a jQuery object of the element you are
         * returning, for instance, <wk-hero-image>
         * @param {Object} attrs are the attributes on the custom element
         */
        restrict: 'E',
        templateUrl: 'table-of-contents.html',
        link: function( scope, $elem, attrs ) {
          var $elemOffset = $elem.offset().top;
          $( window ).on( 'scroll', function() {
            var scrollHeight;

            scrollHeight = $( this ).scrollTop();

            if ( scrollHeight > $elemOffset ) {
              var articleBottom = $('article').offset().top + $('article').height();

              if (scrollHeight + $elem.height() >= articleBottom) {
                $elem.css('top', articleBottom - $elem.height());
                $elem.css('position', 'absolute');
                $elem.removeClass('sticky');
              } else {
                $elem.css('top', '');
                $elem.css('position', '');
                $elem.addClass('sticky');
              }
            } else {
              $elem.css('top', '');
              $elem.css('position', '');
              $elem.removeClass( 'sticky' );
            }

          });

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
              $elem.find( 'a' ).on( 'click', function( evt ) {
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
  }]);
});
