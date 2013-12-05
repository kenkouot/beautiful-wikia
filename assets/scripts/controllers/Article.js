define([
  'controllers/module'
], function( exports ) {
  'use strict';
  exports.controller( 'ArticleCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'article',
    function( $scope, $rootScope, $routeParams, $location, Article ) {
      var wikiApi,
          errorObj;

      errorObj = {
        content: {
          html: 'Sorry, there was an error retrieving your article',
          title: 'Error'
        }
      };

      $scope.$on( '$locationChangeStart', function() {
        $rootScope.$emit( 'article:changing' );
      });

      $scope.wikiBaseHref = 'http://' + $routeParams.wiki + '.wikia.com/';
      wikiApi = $scope.wikiBaseHref + 'api.php';
      $scope.article = null;

      Article.get( wikiApi, $routeParams.name, function( data ) {
        if ( typeof data.content === 'object') {
          if ( data.content.redirect) {
            return $location.path( '/article/' + $routeParams.wiki + '/' + data.content.html );
          }
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
