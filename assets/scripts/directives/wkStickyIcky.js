define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkStickyIcky', function() {
    return {
      restrict: 'A',
      link: function( $scope, $elem ) {
        var topBarHeight = $('.top-bar').height();
        var elemOffsetTop;

        $( window ).on( 'scroll', function() {
          var scrollHeight = $( this ).scrollTop();
          // deferred setting of elemOffsetTop to avoid getting position during
          // unstable DOM
          elemOffsetTop = elemOffsetTop || $elem.offset().top - topBarHeight;

          if ( scrollHeight >= elemOffsetTop ) {
            $elem.addClass('sticky');
            $scope.menuDocked = true;
          } else {
            $elem.removeClass( 'sticky' );
            $scope.menuDocked = false;
          }
        });
      }
    };
  });
});
