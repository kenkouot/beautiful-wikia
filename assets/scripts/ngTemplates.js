/** This file is automatically compiled from a Grunt task **/
define([], function() {
return function( $templateCache ) {  'use strict';

  $templateCache.put('article-input.html',
    "<div class=\"article-input\">\n" +
    "\t<form>\n" +
    "\t\t<input name=\"url\" class=\"text-center\" type=\"url\" placeholder=\"Enter the URL of your article\">\n" +
    "\t</form>\n" +
    "\t<p>Press <kbd>Return</kbd> to view your article.</p>\n" +
    "\tPress <kbd>Esc</kbd> or click anywhere outside this box to return.\n" +
    "</div>\n"
  );


  $templateCache.put('article.html',
    "<wk-article ng-class=\"{ opaque: !changing }\"></wk-article>\n"
  );


  $templateCache.put('btn-back-to-top.html',
    "<a href=\"#top\" class=\"button\" ng-transclude></a>\n" +
    "\n"
  );


  $templateCache.put('hero-image.html',
    ""
  );


  $templateCache.put('index.html',
    "<h4>Welcome to our 2013 Winter Hackathon project</h4>\n" +
    "<p>To begin the experience, pick an article from Wikia and copy the URL from your browser's address bar. The URL should look something like this:</p>\n" +
    "<blockquote>http://batman.wikia.com/wiki/Batman</blockquote>\n" +
    "<p>Then, hit the <kbd>?</kbd> key on your keyboard. Paste your URL and hit <kbd>Return</kbd> and voila! From there, feel free the navigate the article links just like you normally would. Enjoy!</p>\n" +
    "\n"
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