<?php

while ( have_posts() ) : the_post();

	get_template_part( 'articles/post', get_post_type() );

endwhile;
