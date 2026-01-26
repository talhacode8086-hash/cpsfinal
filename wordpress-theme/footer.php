</div><!-- #content -->

<footer id="colophon" class="site-footer">
    <div class="container">
        <div class="footer-widgets">
            <?php
            if (is_active_sidebar('footer-1')) {
                ?>
                <div class="footer-widget-area">
                    <?php dynamic_sidebar('footer-1'); ?>
                </div>
                <?php
            }
            ?>
        </div>

        <div class="footer-bottom">
            <div class="footer-info">
                <p>&copy;
                    <?php echo date('Y'); ?>
                    <?php bloginfo('name'); ?>. All rights reserved.
                </p>
            </div>

            <?php
            wp_nav_menu(array(
                'theme_location' => 'footer',
                'menu_id' => 'footer-menu',
                'container' => 'nav',
                'container_class' => 'footer-navigation',
                'fallback_cb' => false,
            ));
            ?>
        </div>
    </div>
</footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>