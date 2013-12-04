define([
  'controllers/module'
], function( exports ) {
  'use strict';
  exports.controller( 'BodyCtrl', [ '$scope', '$rootScope', 'article', function( $scope, $rootScope, Article ) {

    $scope.article = null;
    $scope.pageHeader = 'No article loaded';

    $scope.$watch( 'article', function( newVal, oldVal ) {
      if ( newVal ) {
        console.log(newVal);
        $scope.articleContent = newVal.content.html;
        $scope.pageHeader = newVal.content.title;
      }
    });

    $scope.closeModals = function() {
      $rootScope.$emit( 'modal:closeAll' );
    };

    $scope.modals = {
      articleInput: false
    };

    $scope.handleKeyup = function( evt ) {
      // Check for '?' key (with shift modifier)
      if ( evt.which === 191 && evt.shiftKey ) {
        evt.preventDefault();
        $scope.modals.articleInput = !$scope.modals.articleInput;
      }
      if ( evt.which === 27 ) {
        this.closeModals();
      }
    };

    $scope.setArticle = function( uri ) {
      var parts,
          regex,
          errors;

      regex = /^(.*)(wiki\/)([^.]+)?$/;
      parts = uri.match( regex );

      errors = [];

      if ( parts ) {
        if ( !parts[ 1 ] ) errors.push( 'Invalid URL' );
        if ( !parts[ 3 ] ) errors.push( 'Invalid Article' );

        $scope.wikiApiUri = parts[ 1 ] + 'api.php';
        $scope.articleStringId = parts[ 3 ];

      } else {
        errors.push( 'Invalid URL' );
      }

      if ( errors.length ) {
        return {
          status: 'error',
          message: 'Sorry, your URL is not valid.',
          errors: errors
        };
      } else {
        Article.get( $scope.wikiApiUri, $scope.articleStringId, function( data ) {
          $scope.article = data;
        });
        this.closeModals();
        return {
          status: 'success'
        };
      }
    };

  }]);
});
