/**
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkInjectedContent', function() {
    var adCount = 2;
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'injected-content-ad.html',
      link: function( scope, $elem, attrs ) {
        var id = Math.floor( Math.random() * adCount + 1 );
        $elem.find( 'img' ).attr( 'src', '/images/ads/ad' + id + '.png' );
      }
    };
  });
});
