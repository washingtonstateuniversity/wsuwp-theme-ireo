<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php if ( true === spine_get_option( 'articletitle_show' ) && apply_filters( 'wsuwp_spine_themes_show_title', true, 'article.php' ) ) : ?>
	<div class="header-wrap">
		<header class="article-header">
			<hgroup>
				<h1 class="article-title"><?php the_title(); ?></h1>
			</hgroup>
		</header>
		<?php wsuwp_spine_get_template_part( 'single.php', 'parts/featured-images' ); ?>
	</div>
	<?php endif; ?>
	<div class="entry-content">
		<?php the_content(); ?>
	</div>
</article>
