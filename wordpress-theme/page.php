<?php
/**
 * Template Name: Elementor Full Width
 * Template Post Type: page, tool
 *
 * @package ToolsHub
 */

get_header();
?>

<main id="primary" class="site-main elementor-page">
    <?php
    while (have_posts()):
        the_post();
        the_content();
    endwhile;
    ?>
</main>

<?php
get_footer();
