/**
 * wkHeroImage.js
 * @description Directive for article hero image
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkNav', function() {
    return {
      /**
       * @param {Object} scope refers to the BodyController, or whatever controller is in scope
       * @param {jQuery Object} $elem is a jQuery object of the element you are returning, for instance, <wk-hero-image>
       * @param {Object} attrs are the attributes on the custom element
       */
      restrict: 'E',
      templateUrl: 'nav.html',
      link: function( scope, $elem, attrs ) {
        // * do stuff here *
        $('#search-bar').keyup(function () { 
          var searchVal = $(this).val();
          if(searchVal){
            $('nav').addClass('full');
            $('.search-title span').text(searchVal);
            $('body').css({'overflow':'hidden'});
          } else {
            $('nav').removeClass('full');
            $('body').css({'overflow':'auto'});
          }
        });
        $('#close-search').click(function(e){
            $('#search-bar').val('');
            $('nav').removeClass('full');
            $('body').css({'overflow':'auto'});
            e.preventDefault();
        });
      }
    };
  });
});
