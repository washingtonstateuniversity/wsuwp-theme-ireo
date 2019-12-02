<?php
/**
 * Custom functionality required by your child theme can go here. Use this
 * to override any defaults provided by the Spine parent theme through
 * the provided actions and filters.
 */

add_action( 'spine_theme_template_after_main', 'ireo_toolbar', 10 );
/**
 * Add toolbar markup to the spine_theme_template_after_main hook
 */
function ireo_toolbar( $template ) {
	if ( ! in_array( $template, array( 'index.php', 'page.php', 'single.php' ), true ) ) {
		return;
	}

	get_template_part( 'parts/content', 'toolbar' );
}

add_action( 'after_setup_theme', 'ireo_setup_theme' );
/**
 * Setup the IREO theme.
 */
function ireo_setup_theme() {
	// Add align-wide and align-full support by passing 'align-wide'.
	add_theme_support( 'align-wide' );
}

add_action( 'wp_enqueue_scripts', 'ireo_enqueue_styles' );
/**
 * Enqueue styles specific to this child theme.
 */
function ireo_enqueue_styles() {
	// Add Google Font Montserrat.
	wp_enqueue_style( 'montserrat', '//fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,900,900i&display=swap', true );
}
