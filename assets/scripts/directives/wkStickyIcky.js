define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkStickyIcky', function() {
    return {
      restrict: 'A',
      link: function( $scope, $elem ) {
        var $elemOffset = $elem.offset().top;
        $( window ).on( 'scroll', function() {
          var scrollHeight = $( this ).scrollTop();

          if ( scrollHeight > $elemOffset ) {
            var articleBottom = $('article').offset().top + $('article').height();

            if (scrollHeight + $elem.height() >= articleBottom ) {
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
      }
    };
  });
});