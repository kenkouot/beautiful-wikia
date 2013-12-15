/**
 * localNav.js
 * @requires $resource
 * @description Pulls wiki nav for current wiki
 */
define([
  'services/module'
], function( exports ) {
  'use strict';
  // Services created with .service are persistant singletons (as opposed to services created with .factory or .provide)
  exports.service( 'localNav', [ '$resource', function( $resource ) {

    /**
     * @method
     * @requires $resource
     * @param { String } api URI in the format of http://batman.wikia.com/
     * @param { String } then A callback function to handle $promise resolution
     */
    this.getLocalNav = function( api, then ) {
      var res = $resource('/ApiProxy');
      return res.get({
        url: api + 'api/v1/Navigation/Data'
      }, then );
    };
  }]);

});
