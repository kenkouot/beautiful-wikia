define([
  'services/module'
], function( exports ) {
  'use strict';
  exports.factory( 'article', [ '$ngResource', function( $resource ) {
    console.log( $resource );
  }]);

});
