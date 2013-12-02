define([
  'directives/module'
], function( exports ) {
  exports.directive( 'wkArticleInput', function() {
    return {
      restrict: 'E',
      templateUrl: 'article-input.html',
      transclude: true,
      link: function( scope, $elem, attrs ) {
        $elem.on( 'submit', function( evt ) {
          var val = $elem.find( 'input' ).val();
          scope.$apply(function( scope ) {
            var article = scope.setArticle( val );
            console.log( article.status );
          });
        });
      }
    };
  });
});
