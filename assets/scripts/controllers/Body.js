define([
  'controllers/module'
], function( exports ) {
  exports.controller( 'BodyCtrl', [ '$scope', '$rootScope', function( $scope, $rootScope ) {
    $scope.headerText = 'Hello World!';

    $scope.modals = {
      articleInput: false
    };

    $scope.handleKeyup = function( evt ) {
      if ( evt.which === 191 ) {
        evt.preventDefault();
        $scope.modals.articleInput = !$scope.modals.articleInput;
      }
      if ( evt.which === 27 ) {
        $rootScope.$emit( 'modal:closeAll' );
      }
    };

  }]);
});
