<?php
/**
 * Handles the registration of the Scrolling Sections block.
 *
 * @package wsuwp-theme-ireo\blocks\scrolling-sections
 */

namespace WSU\Theme\IREO\Blocks\ScrollingSections;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_block_assets', 10 );

/**
 * Enqueues front-end JavaScript for posts with the scrolling sections block.
 *
 * @since 0.0.1
 */
function enqueue_block_assets() {
	if ( is_admin() && ! has_block( 'happyprime/scrolling-sections' ) ) {
		return;
	}

	wp_register_script(
		'wheel-indicator',
		get_stylesheet_directory_uri() . '/blocks/scrolling-sections/wheel-indicator.js',
		array(),
		ireo_theme_version(),
		true
	);

	wp_enqueue_script(
		'happyprime-scrolling-sections-front-end',
		get_stylesheet_directory_uri() . '/blocks/scrolling-sections/front-end.js',
		array( 'wheel-indicator' ),
		ireo_theme_version(),
		true
	);

	wp_add_inline_script(
		'happyprime-scrolling-sections-front-end',
		'sectionScroll.init();'
	);
}
