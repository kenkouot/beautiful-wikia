/**
 * wkHeroImage.js
 * @description Directive for article hero image
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkSaveDialogue', function() {
    return {
      /**
       * @param {Object} scope refers to the BodyController, or whatever controller is in scope
       * @param {jQuery Object} $elem is a jQuery object of the element you are returning, for instance, <wk-hero-image>
       * @param {Object} attrs are the attributes on the custom element
       */
      restrict: 'E',
      templateUrl: 'save-dialogue.html',
      link: function( scope, $elem, attrs ) {
        // * do stuff here *
        console.log( $elem );
      }
    };
  });
});
