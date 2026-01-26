<article id="post-<?php the_ID(); ?>" <?php post_class('blog-post-card'); ?>>
    <?php if (has_post_thumbnail()): ?>
        <div class="post-thumbnail">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('toolshub-featured'); ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="post-content">
        <header class="entry-header">
            <?php
            $categories = get_the_category();
            if (!empty($categories)):
                ?>
                <span class="post-category">
                    <?php echo esc_html($categories[0]->name); ?>
                </span>
            <?php endif; ?>

            <?php
            if (is_singular()):
                the_title('<h1 class="entry-title">', '</h1>');
            else:
                the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
            endif;
            ?>

            <div class="entry-meta">
                <span class="posted-on">
                    <time datetime="<?php echo get_the_date('c'); ?>">
                        <?php echo get_the_date(); ?>
                    </time>
                </span>
                <span class="author">
                    <?php _e('by', 'toolshub'); ?>
                    <?php the_author(); ?>
                </span>
            </div>
        </header>

        <div class="entry-summary">
            <?php the_excerpt(); ?>
        </div>

        <footer class="entry-footer">
            <a href="<?php the_permalink(); ?>" class="read-more">
                <?php _e('Read More', 'toolshub'); ?> →
            </a>
        </footer>
    </div>
</article>