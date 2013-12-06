/**
 * ParsoidController
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

var restler = require( 'restler' );

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ParsoidController)
   */
  _config: {
    rest: false
  },
  index: function( req, res ) {
    var apiEndpoint,
        article,
        errors,
        client;

    apiEndpoint = req.query.api;
    article = req.query.article;
    errors = [];

    if ( !apiEndpoint ) errors.push( 'api' );
    if ( !article ) errors.push( 'article' );

    if ( errors.length ) {
      return res.send( 500, {
        message: 'Error: insufficient arguments supplied',
        invalidParams: errors
      });
    }

    // make external request to custom parsoid fork
    client = restler.get( 'http://localhost:8000/' + apiEndpoint + '/' + article );
    client.once( 'complete', function( response ) {
      client.removeAllListeners( 'error' );

      res.json({
        api: apiEndpoint,
        article: article,
        contentType: 'html',
        content: response
      });
    });
  },
};
