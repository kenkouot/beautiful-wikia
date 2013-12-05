define([
  'controllers/module'
], function( exports ) {
  'use strict';
  exports.controller( 'ArticleCtrl', [ '$scope', '$rootScope', '$routeParams', 'article',
    function( $scope, $rootScope, $routeParams, Article ) {
      $scope.wikiBaseHref = 'http://' + $routeParams.wiki + '.wikia.com/';
      var wikiApi = $scope.wikiBaseHref + 'api.php';
      $scope.article = null;

      Article.get( wikiApi, $routeParams.name, function( data ) {
        $scope.article = data;
      });

      $scope.$watch( 'article', function( newVal, oldVal ) {
        if ( newVal ) {
          $scope.articleContent = newVal.content.html;
          $rootScope.$emit( 'article:newTitle', newVal.content.title );
        }
      });
  }]);
});
