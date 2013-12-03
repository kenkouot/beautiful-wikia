/**
 * Parsoid
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var restler = require( 'restler' );

module.exports = {
  attributes: {
    /* e.g.
     nickname: 'string'
     */
  },
  retrieveHTML: function( api, article ) {
    return restler.get( 'http://localhost:8888/' + api + '/' + article );
  }
};
