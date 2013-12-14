define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkEdit', function() {
    return {
      restrict: 'A',
      link: function( $scope, $elem ) {
        

        $elem.click(function(){
          
          $('article').attr('contenteditable', 'true');
          
          return false;
        })
      }
    };
  });
});