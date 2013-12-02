define([
  'services/module'
], function( exports ) {
  'use strict';
  exports.factory( 'article', [ '$resource', function( $resource ) {
    console.log( $resource );
  }]);

});
