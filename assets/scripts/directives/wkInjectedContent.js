/**
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkInjectedContent', [ '$compile', function( $compile) {
    var adCount = 9;
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'injected-content.html',
      link: function( scope, $elem, attrs ) {
        var idx = $('.wk-injected-content').length;
        if ( idx % 3 === 0 ) {
          var el = $compile( '<wk-related-articles-inline />')( scope.$parent );
          $elem.html( el );
        } else {
          var id = Math.floor( Math.random() * adCount + 1 );
          $elem.find( 'img' ).attr( 'src', '/images/ads/ad' + id + '.png' );
        }
      }
    };
  }]);
});
