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
        $rootScope.articleLoaded = false;
      });


      $scope.wikiBaseHref = 'http://' + $routeParams.wiki + '.wikia.com/';
      if ($rootScope.wiki != $routeParams.wiki) {
        $rootScope.$emit('article:wikiChanging', $routeParams.wiki);
        $rootScope.wiki = $routeParams.wiki;   
      }


      wikiApi = $scope.wikiBaseHref + 'api.php';
      $scope.article = null;
      $rootScope.headings = [];

      Article.get( wikiApi, $routeParams.name, function( data ) {
        if ( typeof data.content === 'object') {
          if ( data.content.redirect) {
            return $location.path( '/article/' + $routeParams.wiki + '/' + data.content.html );
          }
          $scope.article = data;
          $rootScope.$emit( 'article:changing' );
        } else {
          $scope.article = errorObj;
        }
      });

      $scope.$watch( 'article', function( newVal, oldVal ) {
        if ( newVal ) {
          var title = newVal.content.title;
          $scope.articleContent = newVal.content.html;
          $rootScope.$emit( 'article:newTitle', title );
          if ( title && title !== 'Error' ) $rootScope.articleLoaded = true;
        }
      });
  }]);
});
