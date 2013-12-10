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

var restler = require( 'restler' ),
    domino = require( 'domino' );

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ImageController)
   */
  _config: {},
  index: function( req, res ) {
    var path, client, response;

    path = req.query.path.slice( 2 );
    client = restler.get( 'http://batman.wikia.com/wiki/' + path );

    response = {};

    client.once( 'complete', function( data ) {
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

      res.send( response );
    });
  }
};
