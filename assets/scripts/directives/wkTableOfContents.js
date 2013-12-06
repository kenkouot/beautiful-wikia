/**
 * wkTableOfContents.js
 * @description Directive for article table of contents
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkTableOfContents', [ '$anchorScroll', '$location', '$rootScope',
    function( $anchorScroll, $location, $rootScope ) {
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
          console.log( scope );
          scope.$watch( 'headings', function( newVal ) {
            if ( newVal ) {
              $elem.find( 'a' ).on( 'click', function( evt ) {
                evt.preventDefault();
                $( 'body' ).animate({
                  scrollTop: $( this.hash ).offset().top
                }, 200 );
              });
            }
          });
        }
      };
  }]);
});
