/**
 * contentInjector.js
 */
define([
  'services/module'
], function( exports ) {
  'use strict';
  exports.service( 'contentInjector', [ '$compile', function( $compile ) {
    this.inject = function( $scope, $elem ) {
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
          content = '<wk-injected-content></wk-injected-content>';

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
            $current[ insert ]( $compile( content )( $scope ) );
            current++;
          }
        }

        if ( current > injections ) {
          return false;
        }
      });
    };
  }]);
});
