/**
 * ImageCdnPath.js
 * @requires
 * @description Returns true CDN image path
 */
define([
  'services/module'
], function( exports ) {
  'use strict';
  // Services created with .service are persistant singletons (as opposed to services created with .factory or .provide)
  exports.service( 'imageCdnPath', [function() {

    /**
     * @method
     * @param { String } uri
     */
    this.get = function( uri ) {
      var parts;
      uri = uri.replace( 'thumb/', '' );
      parts = uri.split( '/' );
      // there is some weird stuff going on with wikia cdn paths here
      if ( parts[ parts.length - 1 ].match( parts[ parts.length - 2 ] ) ) {
        parts = parts.slice( 0, parts.length - 1 );
      }
      return parts.join( '/' );
    };
  }]);

});
