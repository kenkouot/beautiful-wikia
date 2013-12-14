define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkEdit', function() {
    return {
      restrict: 'A',
      link: function( $scope, $elem ) {
        

        $elem.click(function(){
          $('.contribution-menu li').removeClass('active');

          if ( $('article').attr('contenteditable')){
            $('article').removeAttr('contenteditable');
            $('.contribution-menu li').each(function(){
              if(!$(this).hasClass('edit') || $(this).is(':first-child')){
                $(this).addClass('active');
              }
            });
            $('wk-save-dialogue').fadeToggle();
            $('nav').fadeToggle();
            $('.wk-injected-content').fadeToggle();
          } else {
            $('article').attr('contenteditable', 'true');
            $('.contribution-menu li').each(function(){
              if($(this).hasClass('edit')){
                $(this).addClass('active');
              }
            });
            $('wk-save-dialogue').fadeToggle();
            $('nav').fadeToggle();
            $('.wk-injected-content').fadeToggle();
          }
          
          return false;
        })
      }
    };
  });
});