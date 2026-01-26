<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <label>
        <span class="screen-reader-text">
            <?php _e('Search for:', 'toolshub'); ?>
        </span>
        <input type="search" class="search-field"
            placeholder="<?php echo esc_attr_x('Search tools...', 'placeholder', 'toolshub'); ?>"
            value="<?php echo get_search_query(); ?>" name="s" />
    </label>
    <button type="submit" class="search-submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
        </svg>
        <span class="screen-reader-text">
            <?php _e('Search', 'toolshub'); ?>
        </span>
    </button>
</form>