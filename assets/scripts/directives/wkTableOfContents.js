/**
 * wkTableOfContents.js
 * @description Directive for article table of contents
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkTableOfContents', [
    function() {
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
              $elem.addClass( 'sticky' );
            } else {
              $elem.removeClass( 'sticky' );
            }
          });

          scope.$watch( 'headings', function( newVal ) {
            console.log( newVal, 'yeah' );
            if ( newVal ) {
              $elem.find( 'a' ).on( 'click', function( evt ) {
                $( 'body, html' ).animate({
                  scrollTop: $( this.hash ).offset().top
                }, 200 );
                return false;
              });
            }
          });
        }
      };
  }]);
});
