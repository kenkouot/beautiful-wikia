/**
 * ImageController
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

var http = require( 'http' ),
    domino = require( 'domino' );

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ImageController)
   */
  _config: {},
  index: function( req, res ) {
    var path, response;

    path = req.query.path.slice( 2 );

    response = {};
  
    var str = '';
    var client = http.get('http://batman.wikia.com/wiki/' + path, function(htres) {

      htres.on('data', function(chunk) {
        str += chunk
      });

      htres.on('end', function(chunk) {
        data = JSON.parse(str);
        var window, document, href;
        window = domino.createWindow( data );
        document = window.document;
        href = document.querySelector( '.fullImageLink a' ).href;

        if ( href ) {
          response.status = 'success';
          response.href = href;
        } else {
          response.status = 'error';
        }
        client.abort();
        res.send( response );
      });

    }).on('error', function(e) {
      client.abort();
      res.send(500);
    });
  }
};
