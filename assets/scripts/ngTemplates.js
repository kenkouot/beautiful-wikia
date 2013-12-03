/** This file is automatically compiled from a Grunt task **/
define([], function() {
return function( $templateCache ) {  'use strict';

  $templateCache.put('article-input.html',
    "<div class=\"article-input\">\n" +
    "\t<form>\n" +
    "\t\t<input name=\"url\" class=\"text-center\" type=\"url\" placeholder=\"Enter the URL of your article\">\n" +
    "\t</form>\n" +
    "</div>\n"
  );


  $templateCache.put('article.html',
    "<div>\n" +
    "</div>\n"
  );


  $templateCache.put('modal.html',
    "<div class=\"modal-bg\">\n" +
    "\t<div class=\"modal\">\n" +
    "\t\t<div ng-transclude></div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n"
  );
};
});