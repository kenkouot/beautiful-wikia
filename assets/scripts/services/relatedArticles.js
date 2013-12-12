/**
 * relatedArticles.js
 * @requires $resource
 * @description Grabs related articles
 */
define([
  'services/module'
], function( exports ) {
  'use strict';
  // Services created with .service are persistant singletons (as opposed to services created with .factory or .provide)
  exports.service( 'relatedArticles', [ '$resource', function( $resource ) {

    /**
     * @method
     * @requires $resource
     * @param { String } api URI in the format of http://batman.wikia.com/
     * @param { int } articleIds The article id
     * @param { int } limit
     * @param { String } then A callback function to handle $promise resolution
     */
    this.get = function( api, articleIds, limit, then ) {
      // keep track of what article we are on
      this.api = api;
      this.articleIds = articleIds;
      //var res = $resource(api + 'api/v1/RelatedPages/List/')
      var res = $resource('/ApiProxy');
      return res.get({
        url: api + 'api/v1/RelatedPages/List/?ids=' + articleIds +
         "&limit=" + limit
      }, then );
    };
  }]);

});
