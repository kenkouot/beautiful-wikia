define([
  'controllers/module'
], function( exports ) {
  exports.controller( 'BodyCtrl', [ '$scope', function( $scope ) {
    $scope.headerText = 'Hello World!';
  }]);
});
