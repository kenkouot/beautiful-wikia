define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkEdit', function() {

    function onAnchorClick() {
      $( '.contribution-menu li' ).removeClass( 'active' );
      $( 'article' ).removeAttr( 'contenteditable' );
      $( '.contribution-menu li' ).each(function(){
        if( !$( this ).hasClass( 'edit' ) || $( this ).is( ':first-child' ) ){
          $( this ).addClass( 'active' );
        }
      });
      $( 'wk-save-dialogue' ).fadeOut();
      $( 'nav' ).fadeIn();
      $( '.wk-injected-content' ).fadeIn();
      $( 'article a, .related-articles-grid a' ).off( 'click', onAnchorClick );
    }

    return {
      restrict: 'A',
      link: function( $scope, $elem ) {
        $elem.click(function(){
          // hide contribution items
          $( '.contribution-menu li' ).removeClass( 'active' );

          if ( $( 'article' ).attr( 'contenteditable' ) ) {
            $( 'article' ).removeAttr( 'contenteditable' );

            $( '.contribution-menu li' ).each(function(){
              if( !$( this ).hasClass( 'edit' ) || $( this ).is( ':first-child' ) ) {
                $( this ).addClass( 'active' );
              }
            });
            // TODO: This should broadcast a scope event or something and the fade should be handled
            // in wkSaveDialogue
            $( 'wk-save-dialogue' ).fadeOut();
            $( 'nav' ).fadeIn();
            $( '.wk-injected-content' ).fadeIn();
            $( 'article a, .related-articles-grid a' ).off( 'click', onAnchorClick );
          } else {
            $( 'article' ).attr( 'contenteditable', 'true' );
            $( '.contribution-menu .edit' ).addClass( 'active' );

            $( 'wk-save-dialogue' ).fadeIn();
            $( 'nav' ).fadeOut();
            $( '.wk-injected-content' ).fadeOut();
            $( 'article a, .related-articles-grid a' ).on( 'click', onAnchorClick );
          }
          return false;
        });
      }
    };
  });
});
