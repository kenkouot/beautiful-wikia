define([
  'controllers/module'
], function( exports ) {
  exports.controller( 'SplashCtrl', [ '$rootScope', function( $rootScope ) {
    $rootScope.page = 'splash';
  }]);
});
