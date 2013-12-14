/**
 * wkLazyLoad.js
 * @description Directive for article hero image
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkImagePlacer', [ 'imageCdnPath', function( imageCdnPath ) {
    return {
      /**
       * @param {Object} scope refers to the BodyController, or whatever controller is in scope
       * @param {jQuery Object} $elem is a jQuery object of the element you are returning, for instance, <wk-hero-image>
       * @param {Object} attrs are the attributes on the custom element
       */
      restrict: 'A',
      link: function( scope, $elem, attrs ) {
        var src = imageCdnPath.get( $elem.data( 'src' ) );
        if ( !$elem.closest( '.infobox' ).length ) {
          $elem.removeAttr( 'height' );
          $elem.removeAttr( 'width' );

          var img = new Image();
          img.src = src;

          img.addEventListener( 'load', function() {
            var $figure,
                figureWidth;

            $figure = $elem.closest( 'figure' );
            figureWidth = $figure.width();


            if ( !$figure.length ) return;
            $figure.addClass( 'article-image' );
            if ( img.width > ( figureWidth / 1.3 ) ) {
              $figure.addClass( 'large-feature' );
            } else if ( img.width > ( figureWidth / 2 ) ) {
              $figure.addClass( 'feature' );
            } else {
              $figure.addClass( 'minor' );
            }
            $elem.replaceWith( img );
          });
        } else {
          $elem.attr( 'src', src );
        }
      }
    };
  }]);
});
