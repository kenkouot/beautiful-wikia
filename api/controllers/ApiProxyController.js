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

var restler = require( 'restler' ),
    domino = require( 'domino' );

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ImageController)
   */
  _config: {},
  index: function( req, res ) {

  	var api = req.query.url;

  	console.log('Making API call' + api);

  	restler.get(api).once('complete', function(result) {
  		if (result instanceof Error) {
  			console.log('Error:', result.message);
  			res.send(500);
	    } else {
	    	res.send(result);
	    }
	});
  }
};
