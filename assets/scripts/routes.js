define([
  'angular',
  'app'
], function( angular, app ) {
  'use strict';

  return app.config([ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {
    $routeProvider.when( '/', {
      templateUrl: 'index.html',
    });
    $routeProvider.when( '/article/:wiki/:name', {
      templateUrl: 'article.html',
      controller: 'ArticleCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
    // $locationProvider.html5Mode( true );
  }]);
});
