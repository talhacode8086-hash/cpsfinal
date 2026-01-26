<?php
/**
 * ToolsHub Theme Functions
 * 
 * @package ToolsHub
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Theme Version
define('TOOLSHUB_VERSION', '1.0.0');
define('TOOLSHUB_THEME_DIR', get_template_directory());
define('TOOLSHUB_THEME_URI', get_template_directory_uri());

/**
 * Theme Setup
 */
function toolshub_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    add_theme_support('customize-selective-refresh-widgets');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'toolshub'),
        'footer' => __('Footer Menu', 'toolshub'),
    ));
    
    // Elementor Support
    add_theme_support('elementor');
    
    // Add image sizes
    add_image_size('toolshub-featured', 800, 600, true);
    add_image_size('toolshub-thumbnail', 400, 300, true);
}
add_action('after_setup_theme', 'toolshub_setup');

/**
 * Enqueue Scripts and Styles
 */
function toolshub_enqueue_scripts() {
    // Main stylesheet
    wp_enqueue_style('toolshub-style', get_stylesheet_uri(), array(), TOOLSHUB_VERSION);
    
    // Tailwind CSS (compiled)
    wp_enqueue_style('toolshub-tailwind', TOOLSHUB_THEME_URI . '/assets/css/main.css', array(), TOOLSHUB_VERSION);
    
    // Tools specific styles
    wp_enqueue_style('toolshub-tools', TOOLSHUB_THEME_URI . '/assets/css/tools.css', array(), TOOLSHUB_VERSION);
    
    // React and ReactDOM (for tools)
    if (!is_admin()) {
        wp_enqueue_script('react', 'https://unpkg.com/react@18/umd/react.production.min.js', array(), '18.2.0', true);
        wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', array('react'), '18.2.0', true);
    }
    
    // Tools bundle
    wp_enqueue_script('toolshub-tools', TOOLSHUB_THEME_URI . '/assets/js/tools-bundle.js', array('jquery', 'react', 'react-dom'), TOOLSHUB_VERSION, true);
    
    // Main theme JS
    wp_enqueue_script('toolshub-main', TOOLSHUB_THEME_URI . '/assets/js/main.js', array('jquery'), TOOLSHUB_VERSION, true);
    
    // Localize script for AJAX
    wp_localize_script('toolshub-main', 'toolshubData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('toolshub-nonce'),
        'themeUrl' => TOOLSHUB_THEME_URI,
    ));
}
add_action('wp_enqueue_scripts', 'toolshub_enqueue_scripts');

/**
 * Register Custom Post Type: Tools
 */
function toolshub_register_tool_post_type() {
    $labels = array(
        'name' => _x('Tools', 'Post Type General Name', 'toolshub'),
        'singular_name' => _x('Tool', 'Post Type Singular Name', 'toolshub'),
        'menu_name' => __('Tools', 'toolshub'),
        'all_items' => __('All Tools', 'toolshub'),
        'add_new_item' => __('Add New Tool', 'toolshub'),
        'add_new' => __('Add New', 'toolshub'),
        'edit_item' => __('Edit Tool', 'toolshub'),
        'update_item' => __('Update Tool', 'toolshub'),
        'view_item' => __('View Tool', 'toolshub'),
        'search_items' => __('Search Tool', 'toolshub'),
    );
    
    $args = array(
        'label' => __('Tool', 'toolshub'),
        'description' => __('Interactive Tools', 'toolshub'),
        'labels' => $labels,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields', 'elementor'),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-admin-tools',
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => 'tools',
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'tools'),
    );
    
    register_post_type('tool', $args);
}
add_action('init', 'toolshub_register_tool_post_type');

/**
 * Register Tool Categories Taxonomy
 */
function toolshub_register_tool_categories() {
    $labels = array(
        'name' => _x('Tool Categories', 'Taxonomy General Name', 'toolshub'),
        'singular_name' => _x('Tool Category', 'Taxonomy Singular Name', 'toolshub'),
        'menu_name' => __('Categories', 'toolshub'),
        'all_items' => __('All Categories', 'toolshub'),
        'edit_item' => __('Edit Category', 'toolshub'),
        'update_item' => __('Update Category', 'toolshub'),
        'add_new_item' => __('Add New Category', 'toolshub'),
        'new_item_name' => __('New Category Name', 'toolshub'),
    );
    
    $args = array(
        'labels' => $labels,
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'category'),
    );
    
    register_taxonomy('tool_category', array('tool'), $args);
}
add_action('init', 'toolshub_register_tool_categories');

/**
 * Add Elementor Support for Custom Post Types
 */
function toolshub_elementor_support() {
    // Add Elementor support to Tool post type
    add_post_type_support('tool', 'elementor');
}
add_action('init', 'toolshub_elementor_support');

/**
 * Register Widget Areas
 */
function toolshub_widgets_init() {
    register_sidebar(array(
        'name' => __('Sidebar', 'toolshub'),
        'id' => 'sidebar-1',
        'description' => __('Add widgets here.', 'toolshub'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ));
    
    register_sidebar(array(
        'name' => __('Footer Widget Area', 'toolshub'),
        'id' => 'footer-1',
        'description' => __('Footer widget area', 'toolshub'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
}
add_action('widgets_init', 'toolshub_widgets_init');

/**
 * Include additional files
 */
require_once TOOLSHUB_THEME_DIR . '/inc/tools-config.php';
require_once TOOLSHUB_THEME_DIR . '/inc/tool-shortcodes.php';

// Include Elementor widgets if Elementor is active
if (did_action('elementor/loaded')) {
    require_once TOOLSHUB_THEME_DIR . '/elementor/widgets-loader.php';
}

/**
 * Add Elementor Custom Locations Support
 */
function toolshub_register_elementor_locations($elementor_theme_manager) {
    $elementor_theme_manager->register_all_core_location();
}
add_action('elementor/theme/register_locations', 'toolshub_register_elementor_locations');
