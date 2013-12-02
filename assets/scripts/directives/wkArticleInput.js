define([
  'directives/module'
], function( exports ) {
  exports.directive( 'wkArticleInput', function() {
    return {
      restrict: 'E',
      templateUrl: 'article-input.html',
      transclude: true
    };
  });
  // exports.directive( 'wkArticleInputTrigger', [ '$document', function( $document ) {
  //   return {
  //     restrict: 'A',
  //     link: function( scope, $elem, attrs ) {
  //       var input = attrs.wkArticleInputTrigger;
  //       $document.on( 'keypress', function( evt ) {
  //         // user presses ? key
  //         if ( evt.which === input ) {
  //         }
  //       });
  //     }
  //   };
  // }]);
});
