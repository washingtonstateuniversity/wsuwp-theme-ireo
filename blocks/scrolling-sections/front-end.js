( ( root, factory ) => {
	if ( typeof define === 'function' && define.amd ) {
		define( ['wheel-indicator'], factory );
	} else if ( typeof exports === 'object' ) {
		module.exports = factory( require( 'wheel-indicator' ) );
	} else {
		root.sectionScroll = factory( root.WheelIndicator );
	}
} )( typeof self !== 'undefined' ? self : this, ( WheelIndicator ) => {

	'use strict';

	// Object for public APIs.
	const sectionScroll = {};

	// Default settings.
	const defaults = {
		scrollableSection: document.querySelector( '.wp-block-happyprime-scrolling-sections' ),
		transitionDuration: '1s',
		transitionTimingFunction: 'ease'
	};

	// Object for keeping track of where the user is in a scrollable section.
	const state = {
		articles: null,
		container: null,
		index: 0,
		touchStartY: 0,
		wheelHandler: null
	};

	// Placeholder for defaults merged with user settings.
	let settings;

	/**
	 * Merges user options with the default settings.
	 * @private
	 * @param {Object} defaults Default settings.
	 * @param {Object} options  User settings.
	 */
	const extendDefaults = ( defaults, options ) => {

		let property;

		for ( property in options ) {
			if ( Object.prototype.hasOwnProperty.call( options, property ) ) {
				defaults[ property ] = options[ property ];
			}
		}

		return defaults;

	};

	/**
	 * Determines if the scrollable section is at the top of the viewport.
	 * @private
	 */
	const sectionInViewport = () => {

		const sectionBounds = settings.scrollableSection.getBoundingClientRect();

		return sectionBounds.top === 0;

	};

	/**
	 * Attempts to find full-height scrollable articles,
	 * and set inline styles required for the animation.
	 * @private
	 */
	const getArticles = () => {

		if ( !settings.scrollableSection ) return;

		const articles = settings.scrollableSection.querySelectorAll( 'article' );

		if ( !articles ) return;

		state.articles = articles;

	};

	/**
	 * Sets up classes and inline styles required for section scrolling.
	 * @private
	 */
	const setupSection = () => {

		settings.scrollableSection.classList.add( 'js-scrolling-sections' );

		state.container = settings.scrollableSection.querySelector( 'div' );

		if ( !sectionInViewport() ) {
			state.index = state.articles.length - 2;

			state.wheelHandler.turnOff();

			scrollSection( 'down' );
		}

		state.container.style.transitionTimingFunction = settings.transitionTimingFunction;

		state.container.style.transitionDuration = settings.transitionDuration;

	};

	/**
	 * Animates the section scrolling using `transform: translate3d()`,
	 * which leverages hardware acceleration for better performance.
	 * @private
	 * @param {String} direction
	 * @param {Object} event
	 */
	const scrollSection = ( direction, event = false ) => {

		// Return early if the scroll direction is not up or down.
		if ( ![ 'up', 'down' ].includes( direction ) ) return;

		// Return early if scrolling up and already on the first section.
		if ( 'up' === direction && state.index === 0 ) return;

		// Return early if scrolling down and already on the last section.
		if ( 'down' === direction && state.index + 1 === state.articles.length ) {

			// Return now if there is no content after the Scrolling Sections block.
			if ( !settings.scrollableSection.nextElementSibling ) return;

			// If there is content after the Scrolling Sections block,
			// disable WheelIndicator before returning.
			state.wheelHandler.turnOff();

			return;
		}

		// Prevent the default behavior.
		if ( event ) {
			event.preventDefault();
			event.stopPropagation();
		}

		// Increment the index.
		const index = ( 'down' === direction )
			? state.index + 1
			: state.index - 1;

		// Animate the scrolling sections using `transform: translate3d()` inline.
		state.container.style.transform = `translate3d(0px, -${ index * window.innerHeight }px, 0px)`;

		// Update the index property.
		state.index = index;

	};

	/**
	 * Reenables WheelIndicator if the top of the scrolling section
	 * hits the top of the viewport.
	 * @private
	 */
	const scrollHandler = () => {

		if ( !sectionInViewport() ) return;

		state.wheelHandler.turnOn();

	};

	/**
	 * Sets the value of a vh unit to 1% of the viewport height.
	 *
	 * This is for mobile browsers, where the address bar can
	 * introduce unexpected results when vh units are used.
	 * @private
	 */
	const setVhUnit = () => {

		const vh = window.innerHeight * 0.01;

		document.documentElement.style.setProperty( '--vh', `${vh}px` );

	}

	/**
	 * Handles scrolling via the up and down arrow and space keys.
	 * @private
	 * @param {Event} event The keydown event.
	 */
	const keyDownHandler = ( event ) => {

		const keys = [ 'ArrowDown', 'ArrowUp', 'Space' ];

		if ( !keys.includes( event.code ) || !sectionInViewport() ) return;

		const direction = ( 'ArrowUp' === event.code || ( event.shiftKey && 'Space' === event.code ) )
			? 'up'
			: 'down';

		scrollSection( direction, event );

	};

	/**
	 * Handles scrolling on touch devices.
	 * @private
	 * @param {Event} event The touch event.
	 */
	const touchHandler = ( event ) => {

		if ( !sectionInViewport() ) return;

		// Set the starting point for a swipe and return early.
		if ( 'touchstart' === event.type ) {
			state.touchStartY = event.changedTouches[0].screenY;

			return;
		}

		const direction = ( event.changedTouches[0].screenY > state.touchStartY )
			? 'up'
			: 'down';

		scrollSection( direction, event );

	};

	/**
	 * Handles touchmove scrolling on devices.
	 * @private
	 * @param {Event} event The touch event.
	 */
	const touchMoveHandler = ( event ) => {

		if ( !sectionInViewport() ) return;

		const direction = ( event.changedTouches[0].screenY > state.touchStartY )
			? 'up'
			: 'down';

		// Return early if scrolling up and already on the first section.
		if ( 'up' === direction && state.index === 0 ) return;

		// Return early if scrolling down and already on the last section.
		if ( 'down' === direction && state.index + 1 === state.articles.length ) return;

		event.preventDefault();

	};

	/**
	 * Destroys the current initialization.
	 * @public
	 */
	sectionScroll.destroy = () => {

		// If plugin isn't already initialized, stop.
		if ( !settings ) return;

		// Remove event listeners.
		state.wheelHandler.destroy();
		window.removeEventListener( 'scroll', scrollHandler, true );
		window.removeEventListener( 'resize', setVhUnit, true );
		window.removeEventListener( 'keydown', keyDownHandler, true );
		settings.scrollableSection.removeEventListener( 'touchstart', touchHandler, true );
		settings.scrollableSection.removeEventListener( 'touchend', touchHandler, true );
		settings.scrollableSection.removeEventListener( 'touchmove', touchMoveHandler, true );

		// Reset variables.
		settings = null;
		state.articles = null;
		state.index = 0;

	};

	/**
	 * Initializes the plugin.
	 *
	 * @public
	 * @param {Object} options                          User settings.
	 * @param {Object} options.scrollableSection        The scrollable section. Defaults to `document.querySelector( '.scrolling-sections' )`.
	 * @param {String} options.transitionDuration       The scroll animation duration. Defaults to `1s`.
	 * @param {String} options.transitionTimingFunction The scroll animation timing function. Defaults to `ease`.
	 */
	sectionScroll.init = ( options ) => {

		// Destroy any existing initializations.
		sectionScroll.destroy();

		// Merge user options with defaults.
		settings = extendDefaults( defaults, options || {} );

		// Set the value of a vh unit.
		setVhUnit();

		// Attempt to find articles in a scrollable section.
		getArticles();

		// Return early if no articles were found.
		if ( !state.articles ) return;

		// Use WheelIndicator to listen for wheel events.
		state.wheelHandler = new WheelIndicator( {
			elem: settings.scrollableSection,
			callback: ( event ) => scrollSection( event.direction, event )
		} );

		// Set up classes and styles to leverage for functionality.
		setupSection();

		// Set up event listeners.
		window.addEventListener( 'scroll', scrollHandler, true );
		window.addEventListener( 'resize', setVhUnit, true );
		window.addEventListener( 'keydown', keyDownHandler, true );
		settings.scrollableSection.addEventListener( 'touchstart', touchHandler, true );
		settings.scrollableSection.addEventListener( 'touchend', touchHandler, true );
		settings.scrollableSection.addEventListener( 'touchmove', touchMoveHandler, true );

	};

	return sectionScroll;

} );