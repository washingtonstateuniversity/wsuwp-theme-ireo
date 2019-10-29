<?php

get_header();

if ( is_home() ) {
	$main_class = 'spine-main-index';
} elseif ( is_author() ) {
	$main_class = 'spine-author-index';
} elseif ( is_category() ) {
	$main_class = 'spine-category-index';
} elseif ( is_tag() ) {
	$main_class = 'spine-tag-index';
} elseif ( is_tax() ) {
	$main_class = 'spine-tax-index';
} elseif ( is_archive() ) {
	$main_class = 'spine-archive-index';
} elseif ( is_search() ) {
	$main_class = 'spine-search-index';
} else {
	$main_class = '';
}

?>

<?php do_action( 'spine_theme_template_before_main', 'index.php' ); ?>

<main id="wsuwp-main" class="<?php echo $main_class; ?>">

<?php do_action( 'spine_theme_template_before_headers', 'index.php' ); ?>

<?php wsuwp_spine_get_template_part( 'index.php', 'parts/headers' ); ?>

<?php do_action( 'spine_theme_template_after_headers', 'index.php' ); ?>

<?php do_action( 'spine_theme_template_before_content', 'index.php' ); ?>

<?php

if ( function_exists( 'wsuwp_uc_get_object_type_slugs' ) && in_array( get_post_type(), wsuwp_uc_get_object_type_slugs() ) ) {
	wsuwp_spine_get_template_part( 'index.php', 'parts/archive-layout', 'university-center' );
} else {
	wsuwp_spine_get_template_part( 'index.php', 'parts/archive-layout', get_post_type() );
}; ?>

<?php do_action( 'spine_theme_template_after_content', 'index.php' ); ?>

<?php
/* @type WP_Query $wp_query */
global $wp_query;

$big = 99164;
$args = array(
	'base'         => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
	'format'       => 'page/%#%',
	'total'        => $wp_query->max_num_pages, // Provide the number of pages this query expects to fill.
	'current'      => max( 1, get_query_var( 'paged' ) ), // Provide either 1 or the page number we're on.
);
?>
	<footer class="main-footer archive-footer">
		<section class="row side-right pager prevnext gutter">
			<div class="column one">
				<?php echo paginate_links( $args ); ?>
			</div>
			<div class="column two">
				<!-- intentionally empty -->
			</div>
		</section><!--pager-->
	</footer>

	<?php do_action( 'spine_theme_template_before_footer', 'index.php' ); ?>
	<?php wsuwp_spine_get_template_part( 'index.php', 'parts/footers' ); ?>
	<?php do_action( 'spine_theme_template_after_footer', 'index.php' ); ?>

</main>

<?php get_template_part( 'parts/content', 'toolbar' ); ?>

<?php do_action( 'spine_theme_template_after_main', 'index.php' ); ?>
<?php

get_footer();
