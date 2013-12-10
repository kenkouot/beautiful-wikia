/**
 * wkArticle.js
 * @description Directive for displaying Wikia article content
 */
define([
  'directives/module'
], function( exports ) {
  'use strict';
  exports.directive( 'wkArticle', [ '$routeParams', '$location', '$rootScope', function( $routeParams, $location, $rootScope ) {
    return {
      // restricts this directive to just tag elements eg. <wk-article>
      restrict: 'E',
      // abstract template to templateUrl if this gets any bigger
      // ng-class is for fading in and out on new articles
      template: '<article class="column small-10"></article>',
      replace: true,
      link: function( scope, $elem, attrs ) {
        /**
         * @private
         * @description Called everytime a new article is set, binds handlers for all links in the article
         */
        function bindLinks() {
          var $links = $elem.find( 'a' );
          if ( !$links.length ) return false;
          $links.on( 'click', function( evt ) {
            var $link,
                route,
                isImageLink,
                isExternalLink,
                href;

            evt.preventDefault();
            $link = $( this );
            href = $link.attr( 'href' );
            route = [ '/article', $routeParams.wiki, href.slice( 2 ) ].join( '/' );
            isImageLink = !!$link.find( 'img' ).length;
            isExternalLink = !!href.match( 'http' );

            /*
             * All interwiki links are relative, if a link starts with http, we open
             * it externally
             */
            if ( isExternalLink ) {
              return window.open( href, '_blank' );
            }

            if ( !isImageLink ) {
              $( 'body' ).animate({
                scrollTop: 0
              }, 200, function() {
                // load a new article
                $location.path( route );
                // manually apply here because we are operating outside of Angular's acknowledgement
                // source: http://stackoverflow.com/a/11932283
                scope.$apply();
              });
            }

            if ( isImageLink ) {
              // opens an article that redirects to the Wikia file page
              window.open( scope.wikiBaseHref + href.slice( 2 ), '_blank' );
            }
          });
        }

/**
 * Extend jquery with a scrollspy plugin.
 * This watches the window scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2013 John Smart
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @see https://github.com/thesmart
 * @version 0.0.8
 */
(function($) {

  var jWindow = $(window);
  var elements = [];
  var elementsInView = [];
  var isSpying = false;
  var ticks = 0;

  /**
   * Find elements that are within the boundary
   * @param {number} top
   * @param {number} right
   * @param {number} bottom
   * @param {number} left
   * @return {jQuery}   A collection of elements
   */
  function findElements(top, right, bottom, left) {
    var hits = $();
    $.each(elements, function(i, element) {
      var elTop = element.offset().top,
        elLeft = element.offset().left,
        elRight = elLeft + element.width(),
        elBottom = elTop + element.height();

      var isIntersect = !(elLeft > right ||
        elRight < left ||
        elTop > bottom ||
        elBottom < top);

      if (isIntersect) {
        hits.push(element);
      }
    });

    return hits;
  }

  /**
   * Called when the user scrolls the window
   */
  function onScroll() {
    // unique tick id
    ++ticks;

    // viewport rectangle
    var top = jWindow.scrollTop(),
      left = jWindow.scrollLeft(),
      right = left + jWindow.width(),
      bottom = top + jWindow.height();

    // determine which elements are in view
    var intersections = findElements(top, right, bottom, left);
    $.each(intersections, function(i, element) {
      var lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick != 'number') {
        // entered into view
        element.triggerHandler('scrollSpy:enter');
      }

      // update tick id
      element.data('scrollSpy:ticks', ticks);
    });

    // determine which elements are no longer in view
    $.each(elementsInView, function(i, element) {
      var lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick == 'number' && lastTick !== ticks) {
        // exited from view
        element.triggerHandler('scrollSpy:exit');
        element.data('scrollSpy:ticks', null);
      }
    });

    // remember elements in view for next tick
    elementsInView = intersections;
  }

  /**
   * Get time in ms
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
   * @type {function}
   * @return {number}
   */
  var getTime = (Date.now || function () {
    return new Date().getTime();
  });

  /**
   * Returns a function, that, when invoked, will only be triggered at most once
   * during a given window of time. Normally, the throttled function will run
   * as much as it can, without ever going more than once per `wait` duration;
   * but if you'd like to disable the execution on the leading edge, pass
   * `{leading: false}`. To disable execution on the trailing edge, ditto.
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
   * @param {function} func
   * @param {number} wait
   * @param {Object=} options
   * @returns {Function}
   */
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function () {
      previous = options.leading === false ? 0 : getTime();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function () {
      var now = getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  /**
   * Enables ScrollSpy using a selector
   * @param {jQuery|string} selector    The elements collection, or a selector
   * @param {Object=} options           Optional. Set { throttle: number } to change scrollspy throttling. Default: 100 ms
   * @returns {jQuery}
   */
   $.scrollSpy = function(selector, options) {
    selector = $(selector);
    selector.each(function(i, element) {
      elements.push($(element));
    });
    options = options || {
      throttle: 100
    }

    if (!isSpying) {
      jWindow.on('scroll', throttle(onScroll, options.throttle || 100));
      jWindow.on('resize', throttle(onScroll, options.throttle || 100));
      isSpying = true;

      // perform a scan once, after current execution context, and after dom is ready
      setTimeout(function() {
        $(document).ready(onScroll);
      }, 0);
    }

    return selector;
  };

  /**
   * Enables ScrollSpy on a collection of elements
   * e.g. $('.scrollSpy').scrollSpy()
   * @param {Object=} options           Optional. Set { throttle: number } to change scrollspy throttling
   * @returns {jQuery}
   */
   $.fn.scrollSpy = function(options) {
    return $.scrollSpy($(this), options);
  };

  })(jQuery);
        /*
         * Watches the scopes 'article' object for changes, loads new views on change
         */
        scope.$watch( 'article', function( newVal, oldVal ) {
          var $headings,
              headings,
              heading,
              i;
          if ( newVal ) {
            // replace container contents when new article content arrives
            $elem.html( newVal.content.html );
            bindLinks();

            $headings = $elem.find( 'h1, h2, h3, h4, h5, h6' );

            headings = [];
            for ( i = 0; i < $headings.length; i++ ) {
              heading = $headings[ i ];
              headings.push({
                id: heading.id,
                text: heading.textContent,
                level: parseInt( heading.nodeName.slice( 1 ), 10 )
              });
            }

            $headings.on('scrollSpy:enter', function() {
              $rootScope.$emit( 'article:scollDetected', $(this).attr('id'));
            });
            $headings.scrollSpy();
            
            $rootScope.$emit( 'article:headings', headings );
          }
        });
      }
    };
  }]);
});
