<?php
/**
 * Registers custom blocks.
 *
 * @package wsuwp-theme-ireo\blocks
 */

namespace WSU\Theme\IREO\Blocks;

require_once 'scrolling-sections/index.php'; // Include the scrolling sections block.

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_block_assets', 10 );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets', 10 );

/**
 * Enqueues assets for both the editor and front-end.
 */
function enqueue_block_assets() {
	wp_enqueue_style(
		'ireo-blocks',
		get_stylesheet_directory_uri() . '/blocks/style.css',
		array(),
		ireo_theme_version()
	);
}

/**
 * Enqueues assets for the editor.
 */
function enqueue_block_editor_assets() {
	wp_enqueue_script(
		'ireo-blocks',
		get_stylesheet_directory_uri() . '/blocks/index.js',
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		ireo_theme_version(),
		true
	);

	wp_enqueue_style(
		'ireo-blocks-editor',
		get_stylesheet_directory_uri() . '/blocks/editor.css',
		array(),
		ireo_theme_version()
	);
}