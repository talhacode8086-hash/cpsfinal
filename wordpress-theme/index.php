<?php
/**
 * The main template file
 *
 * @package ToolsHub
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container">
        <?php
        if (have_posts()):
            ?>
            <div class="posts-grid">
                <?php
                while (have_posts()):
                    the_post();
                    get_template_part('template-parts/content', get_post_type());
                endwhile;
                ?>
            </div>

            <?php
            the_posts_navigation();

        else:
            get_template_part('template-parts/content', 'none');
        endif;
        ?>
    </div>
</main>

<?php
get_footer();
