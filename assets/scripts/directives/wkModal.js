/**
 * wkModal.js
 * @description A generic modal that allows for transclusion
 * @example
 * <wk-modal>
 *   <my-transcluded-element>Some text</my>
 * </wk-modal>
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkModal', [ '$rootScope', '$timeout', function( $rootScope, $timeout ) {
    var animSpeed = 200;

    return {
      templateUrl: 'modal.html',
      restrict: 'E',
      transclude: true,
      link: function( scope, $elem, attrs ) {
        var $modal = $elem.find( '.modal-bg' );

        function hide() {
          // blank input
          $modal.find( 'input' ).val( '' );
          // sets the scope variable to false, triggering the $watch below
          scope.$apply( attrs.showWhen + '=false' );
        }

        scope.$watch( attrs.showWhen, function( newVal ) {
          if ( newVal ) {
            $modal
              .fadeIn( animSpeed )
              .find( 'input' )
              .focus();
          } else {
            $modal.fadeOut( animSpeed );
          }
        });

        // hide on click
        $modal.on( 'click', function( evt ) {
          if ( angular.element( evt.target ).closest( '.modal' ).length ) {
            return false;
          }
          hide();
        });

        $rootScope.$on( 'modal:closeAll', function() {
          /*
           * Have to use the timeout to get around the incomplete $digest cycle
           * Don't know why the $digest cycle here is incomplete
           * Related documentation: http://docs.angularjs.org/error/$rootScope:inprog
           * Community solution:
           * http://stackoverflow.com/questions/12729122/prevent-error-digest-already-in-progress-when-calling-scope-apply
           */
          $timeout( hide );
        });
      }
    };
  }]);
});
