<?php
/**
 * Elementor Widgets Loader
 *
 * @package ToolsHub
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Main Elementor Widgets Class
 */
class ToolsHub_Elementor_Widgets
{

    private static $_instance = null;

    public static function instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct()
    {
        add_action('elementor/widgets/register', [$this, 'register_widgets']);
        add_action('elementor/elements/categories_registered', [$this, 'add_elementor_widget_categories']);
    }

    /**
     * Register custom Elementor categories
     */
    public function add_elementor_widget_categories($elements_manager)
    {
        $elements_manager->add_category(
            'toolshub-widgets',
            [
                'title' => __('ToolsHub Widgets', 'toolshub'),
                'icon' => 'fa fa-plug',
            ]
        );
    }

    /**
     * Register Widgets
     */
    public function register_widgets($widgets_manager)
    {
        // Include widget files
        require_once TOOLSHUB_THEME_DIR . '/elementor/widgets/tool-widget.php';
        require_once TOOLSHUB_THEME_DIR . '/elementor/widgets/category-grid.php';
        require_once TOOLSHUB_THEME_DIR . '/elementor/widgets/tool-search.php';

        // Register widgets
        $widgets_manager->register(new \ToolsHub_Tool_Widget());
        $widgets_manager->register(new \ToolsHub_Category_Grid());
        $widgets_manager->register(new \ToolsHub_Tool_Search());
    }
}

ToolsHub_Elementor_Widgets::instance();
