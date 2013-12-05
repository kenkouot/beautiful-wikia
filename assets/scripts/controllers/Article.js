define([
  'controllers/module'
], function( exports ) {
  'use strict';
  exports.controller( 'ArticleCtrl', [ '$scope', '$rootScope', '$routeParams', 'article',
    function( $scope, $rootScope, $routeParams, Article ) {
      var wikiApi,
          errorObj;

      errorObj = {
        content: {
          html: 'Sorry, there was an error retrieving your article',
          title: 'Error'
        }
      };

      $scope.wikiBaseHref = 'http://' + $routeParams.wiki + '.wikia.com/';
      wikiApi = $scope.wikiBaseHref + 'api.php';
      $scope.article = null;

      Article.get( wikiApi, $routeParams.name, function( data ) {
        if ( typeof data.content === 'object') {
          $scope.article = data;
        } else {
          $scope.article = errorObj;
        }
      });

      $scope.$watch( 'article', function( newVal, oldVal ) {
        if ( newVal ) {
          $scope.articleContent = newVal.content.html;
          $rootScope.$emit( 'article:newTitle', newVal.content.title );
        }
      });
  }]);
});
