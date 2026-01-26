<?php
/**
 * The template for displaying single posts
 *
 * @package ToolsHub
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container">
        <?php
        while (have_posts()):
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <?php
                    if (has_post_thumbnail()) {
                        ?>
                        <div class="post-thumbnail">
                            <?php the_post_thumbnail('toolshub-featured'); ?>
                        </div>
                        <?php
                    }
                    ?>

                    <h1 class="entry-title">
                        <?php the_title(); ?>
                    </h1>

                    <div class="entry-meta">
                        <span class="posted-on">
                            <?php echo get_the_date(); ?>
                        </span>
                        <span class="author">
                            by
                            <?php the_author(); ?>
                        </span>
                        <?php
                        $categories = get_the_category();
                        if (!empty($categories)) {
                            ?>
                            <span class="category">
                                in
                                <?php echo esc_html($categories[0]->name); ?>
                            </span>
                            <?php
                        }
                        ?>
                    </div>
                </header>

                <div class="entry-content">
                    <?php
                    the_content();

                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Pages:', 'toolshub'),
                        'after' => '</div>',
                    ));
                    ?>
                </div>

                <footer class="entry-footer">
                    <?php
                    the_tags('<span class="tags-links">', ', ', '</span>');
                    ?>
                </footer>
            </article>

            <?php
            // Comments
            if (comments_open() || get_comments_number()):
                comments_template();
            endif;

        endwhile;
        ?>
    </div>
</main>

<?php
get_footer();
