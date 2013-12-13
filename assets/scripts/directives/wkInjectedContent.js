/**
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkInjectedContent', function() {
    return {
      restrict: 'E',
      //templateUrl: 'injected-content-ad.html',
      link: function( scope, $elem, attrs ) {
        $elem
          .text( 'content' )
          .css({
            'background-color': 'black',
            'color': 'white',
            'display': 'block',
            'line-height': '100px',
            'text-align': 'center',
            'vertical-align': 'middle'
          });
      }
    };
  });
});
