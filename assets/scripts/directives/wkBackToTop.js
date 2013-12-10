/**
 * wkBackToTop.js
 * @requires controllers/Body.js
 * @description Directive for the input that loads an initial article
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkBackToTop', function() {
    return {
      restrict: 'E',
      templateUrl: 'btn-back-to-top.html',
      transclude: true,
      link: function( scope, $elem, attrs ) {
        var $window = $( window );
        $window.on( 'scroll', function() {
          scope.$apply(function( scope ) {
            scope.hasScrollHeight = $window.scrollTop() > 200;
          });
        });

        $elem.find( 'a' ).on( 'click', function( evt ) {
          evt.preventDefault();
          $( 'body, html' ).animate({
            scrollTop: 0
          }, 200 );
        });
      }
    };
  });
});
