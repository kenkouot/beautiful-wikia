define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkStickyIcky', function() {
    return {
      restrict: 'A',
      link: function( $scope, $elem ) {
        var topBarHeight = $('.top-bar').height();
        var elemPaddingTop = parseInt($elem.css( 'padding-top' ).replace( /[^\d]+/g, '' ), 10);
        var elemOffsetTop = $elem.offset().top - topBarHeight;
        $( window ).on( 'scroll', function() {
          var scrollHeight = $( this ).scrollTop();
          if ( scrollHeight >= elemOffsetTop ) {
            var articleBottom = $('article').offset().top + $('article').height();
            if ( scrollHeight + $elem.height() >= articleBottom ) {
              $elem.css('top', articleBottom - $elem.height());
              $elem.css('position', 'absolute');
              $elem.removeClass('sticky');
            } else {
              $elem.css('top', topBarHeight);
              $elem.css('position', '');
              $elem.addClass('sticky');
            }
          } else {
            $elem.css('top', '');
            $elem.css('position', '');
            $elem.removeClass( 'sticky' );
          }
        });
      }
    };
  });
});