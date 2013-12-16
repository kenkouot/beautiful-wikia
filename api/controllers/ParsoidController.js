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

var url = require('url');

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
        errors;


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

    /* option have callbacks:
     - redirect
     - success
     - error */
    function makeCall(getUrl, options) {
      var http = require('http');
      var str='';

      var client = http.get(getUrl, function(htres) {
        console.log("request started: ", getUrl);
        if (htres.statusCode < 300 || htres.statusCode > 399) {

          htres.on('data', function(chunk) {
            str += chunk
          });

          htres.on('end', function() {
            if (options.success) { options.success(str); }
            client.abort();
          });
        } else {
          if (options.redirect) {
            var redirectUrl = url.resolve(getUrl, htres.headers['location']);
            options.redirect(redirectUrl);
            client.abort();
          }
        }

      }).on('error', function(e) {
        console.log('Error with parsoid response: ' + e);
        if (options.error) { options.error(e); }
      });
    }

    var apiUrl = 'http://localhost:8000/' + apiEndpoint + '/' + article;
    var redirCount = 0;

    var options = {
      success: function(str) {
        try {
          res.json({
            api: apiEndpoint,
            article: article,
            contentType: 'html',
            content: JSON.parse(str)
          });
        } catch (e) {
          console.log("Bad json from Parsoid: " + e);
        }
      },
      redirect: function(newUrl) {
        if (redirCount < 5) {
          console.log("Redirecting to " + newUrl);
          makeCall(newUrl, options);
        } else {
          error("Too many redirects");
        }
        redirCount++;
      },
      error: function(error) {
        console.log("Error with parsoid: " + error);
        res.send(500);
      }
    }

    makeCall(apiUrl, options);
    
  }
};
