/**
 * ApiProxyController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var domino = require( 'domino' );
var http = require('http');

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ImageController)
   */
  _config: {},
  index: function( req, res ) {

    var str = '';
    var api = req.query.url;

    var client = http.get(api, function(htres) {
      htres.on('data', function(chunk) {
        str += chunk
      });

      htres.on('end', function(chunk) {
        res.send(JSON.parse(str));
        client.abort();
      });

    }).on('error', function(e) {
      res.send(500);
      client.abort();
    });
  }
};
