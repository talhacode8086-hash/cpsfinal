<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <div id="page" class="site">
        <header id="masthead" class="site-header">
            <nav class="main-navigation">
                <div class="container">
                    <div class="nav-wrapper">
                        <!-- Logo -->
                        <div class="site-branding">
                            <?php
                            if (has_custom_logo()) {
                                the_custom_logo();
                            } else {
                                ?>
                                <h1 class="site-title">
                                    <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                                        <?php bloginfo('name'); ?>
                                    </a>
                                </h1>
                                <?php
                            }
                            ?>
                        </div>

                        <!-- Primary Navigation -->
                        <div class="main-menu">
                            <?php
                            wp_nav_menu(array(
                                'theme_location' => 'primary',
                                'menu_id' => 'primary-menu',
                                'container' => 'ul',
                                'menu_class' => 'nav-menu',
                                'fallback_cb' => false,
                            ));
                            ?>
                        </div>

                        <!-- Search -->
                        <div class="header-search">
                            <?php get_search_form(); ?>
                        </div>

                        <!-- Mobile Menu Toggle -->
                        <button class="mobile-menu-toggle" aria-label="Menu">
                            <span class="menu-icon"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>

        <div id="content" class="site-content">