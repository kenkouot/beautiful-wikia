define([
  'controllers/module'
], function( exports ) {
  'use strict';
  exports.controller( 'BodyCtrl', [ '$scope', '$rootScope', '$location', 'relatedArticles',
    function( $scope, $rootScope, $location, relatedArticles ) {
      $scope.pageHeader = '';
      $scope.hasScrollHeight = false;
      $rootScope.$on( 'article:newTitle', function( data, title ) {
        $scope.pageHeader = title.replace( /_|-/g, ' ' );
      });
      $rootScope.$on( 'article:changing', function() {
        $scope.changing = true;
        $scope.relatedArticles = {};
      });
      $rootScope.$on( 'article:changed', function( data, vals) {
        $scope.article = vals;
        $scope.fetchRelatedArticles(vals);
        $scope.fetchRelatedArticles(vals, {
          limit: 3,
          module: 'inline'
        });
        $scope.changing = false;
      });
      $rootScope.$on( 'article:headings', function( data, headings ) {
        $scope.headings = headings;
      });
      $rootScope.$on( 'article:scollDetected', function( data, headingId ) {
        $scope.headingId = headingId;
      });

      $scope.fetchRelatedArticles = function(articleVal, inlineCfg ) {
        var api,
            limit;
        // get base path
        api = articleVal.api.replace( 'api.php', '' );

        if ( !articleVal ) return;
        if ( inlineCfg && inlineCfg.module === 'inline' ) {
          limit = inlineCfg.limit;
          relatedArticles.get( api, articleVal.content.page.id, limit || 12, function( data ) {
            if ( typeof data.items === 'object' ) {
              $scope.relatedArticlesInline = data.items[ articleVal.content.page.id ];
            } else {
              $scope.relatedArticlesInline = {};
            }
          });
        } else {
          relatedArticles.get( api, articleVal.content.page.id, limit || 12, function( data ) {
            if ( typeof data.items === 'object' ) {
              $scope.relatedArticles = data.items[ articleVal.content.page.id ];
            } else {
              $scope.relatedArticles = {};
            }
          });
        }
      };

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

      $scope.setTheme = function( theme ) {
        var $b = $('body');
        var cur = $b.data('theme');
        if (cur) {
          $b.removeClass(cur + '-theme');
        }

        $b.addClass(theme + '-theme');
        $b.data('theme', theme);
      };

      $rootScope.$on('article:wikiChanging', function( data, wiki) {
        $scope.setTheme(wiki);
      });

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
