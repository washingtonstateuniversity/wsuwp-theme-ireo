<?php
/**
 * Custom functionality required by your child theme can go here. Use this
 * to override any defaults provided by the Spine parent theme through
 * the provided actions and filters.
 */

/* Add Google Font Montserrat */
wp_enqueue_style( 'montserrat', '//fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,900,900i&display=swap', true );

/**
 * Add toolbar markup to the spine_theme_template_after_main hook
 */
function ireo_toolbar( $template ) {
	if ( ! in_array( $template, array( 'index.php', 'page.php', 'single.php' ), true ) ) {
		return;
	}

	get_template_part( 'parts/content', 'toolbar' );
}

add_action( 'spine_theme_template_after_main', 'ireo_toolbar', 10 );

/**
 * Add align-wide and align-full support. 
 * 'align-wide' adds support for both.
 */
add_theme_support( 'align-wide' );