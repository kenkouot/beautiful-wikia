define([
  'controllers/module'
], function( exports ) {
  'use strict';
  exports.controller( 'BodyCtrl', [ '$scope', '$rootScope', '$location',
    function( $scope, $rootScope, $location ) {
      $scope.pageHeader = 'Beautiful Wikia';
      $scope.hasScrollHeight = false;
      $rootScope.$on( 'article:newTitle', function( data, title ) {
        $scope.pageHeader = title.replace( /_|-/g, ' ' );
        $scope.changing = false;
      });
      $rootScope.$on( 'article:changing', function( data, title ) {
        $scope.changing = true;
      });
      $rootScope.$on( 'article:headings', function( data, headings ) {
        $scope.headings = headings;
      });
      $rootScope.$on( 'article:scollDetected', function( data, headingId ) {
        $scope.headingId = headingId;
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

        regex = /^(.*)(wiki)?(\/)([^.]+)?$/;
        parts = uri.match( regex );

        errors = [];

        if ( parts ) {
          if ( !parts[ 1 ] ) errors.push( 'Invalid URL' );
          if ( !parts[ parts.length - 1 ] ) errors.push( 'Invalid Article' );

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
          $location.path(
            '/article/' +
            parts[ 1 ].split('.')[ 0 ].slice(7) +
            '/' + parts[ parts.length - 1 ]
          );

          this.closeModals();
          return {
            status: 'success'
          };
        }
      };

  }]);
});
