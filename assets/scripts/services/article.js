/**
 * Article.js
 * @requires $resource
 * @description Slim wrapper for Article api service, handles retrieving articles from the server
 */
define([
  'services/module'
], function( exports ) {
  'use strict';
  // Services created with .service are persistant singletons (as opposed to services created with .factory or .provide)
  exports.service( 'article', [ '$resource', function( $resource ) {

    // $resource is a stock angular service built on $http for communicating with RESTful backends
    var Article = $resource( '/parsoid' );
    this.content = null;
    this.api = null;
    this.articleStringId = null;

    /**
     * @method
     * @requires $resource
     * @param { String } api URI in the format of http://batman.wikia.com/
     * @param { String } article The article slug IE: Batman
     * @param { String } then A callback function to handle $promise resolution
     */
    this.get = function( api, article, then ) {
      // keep track of what article we are on
      this.api = api;
      this.articleStringId = article;

      return Article.get({
        api: api || this.api,
        article: article || this.articleStringId
      }, then );
    };
  }]);

});
