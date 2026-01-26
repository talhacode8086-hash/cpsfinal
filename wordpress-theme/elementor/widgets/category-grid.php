<?php
/**
 * Elementor Category Grid Widget
 *
 * @package ToolsHub
 */

if (!defined('ABSPATH')) {
    exit;
}

class ToolsHub_Category_Grid extends \Elementor\Widget_Base
{

    public function get_name()
    {
        return 'toolshub_category_grid';
    }

    public function get_title()
    {
        return __('Tools Category Grid', 'toolshub');
    }

    public function get_icon()
    {
        return 'eicon-gallery-grid';
    }

    public function get_categories()
    {
        return ['toolshub-widgets'];
    }

    protected function register_controls()
    {
        $this->start_controls_section(
            'content_section',
            [
                'label' => __('Grid Settings', 'toolshub'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'category',
            [
                'label' => __('Category', 'toolshub'),
                'type' => \Elementor\Controls_Manager::SELECT,
                'options' => [
                    'all' => __('All Categories', 'toolshub'),
                    'Gaming' => __('Gaming', 'toolshub'),
                    'Productivity' => __('Productivity', 'toolshub'),
                    'SEO' => __('SEO', 'toolshub'),
                    'Developer' => __('Developer', 'toolshub'),
                ],
                'default' => 'all',
            ]
        );

        $this->add_control(
            'columns',
            [
                'label' => __('Columns', 'toolshub'),
                'type' => \Elementor\Controls_Manager::SELECT,
                'options' => [
                    '2' => __('2 Columns', 'toolshub'),
                    '3' => __('3 Columns', 'toolshub'),
                    '4' => __('4 Columns', 'toolshub'),
                ],
                'default' => '3',
            ]
        );

        $this->add_control(
            'limit',
            [
                'label' => __('Number of Tools', 'toolshub'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 12,
                'min' => 1,
                'max' => 100,
            ]
        );

        $this->end_controls_section();
    }

    protected function render()
    {
        $settings = $this->get_settings_for_display();
        $category = $settings['category'];
        $columns = $settings['columns'];
        $limit = $settings['limit'];

        if ($category === 'all') {
            $tools = toolshub_get_all_tools();
        } else {
            $tools = toolshub_get_tools_by_category($category);
        }

        $tools = array_slice($tools, 0, $limit);
        ?>
        <div class="toolshub-category-grid grid-columns-<?php echo esc_attr($columns); ?>">
            <?php foreach ($tools as $tool): ?>
                <div class="tool-card">
                    <div class="tool-card-inner">
                        <div class="tool-icon">
                            <i class="tool-icon-<?php echo esc_attr($tool['icon']); ?>"></i>
                        </div>
                        <h3 class="tool-title">
                            <a href="<?php echo esc_url(home_url('/tools/' . $tool['slug'])); ?>">
                                <?php echo esc_html($tool['title']); ?>
                            </a>
                        </h3>
                        <p class="tool-description">
                            <?php echo esc_html($tool['description']); ?>
                        </p>
                        <span class="tool-category">
                            <?php echo esc_html($tool['category']); ?>
                        </span>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
    }

    protected function content_template()
    {
        ?>
        <div class="toolshub-category-grid grid-columns-{{ settings.columns }}">
            <div class="tool-card">
                <div class="tool-card-inner">
                    <div class="tool-icon">
                        <i class="eicon-tools"></i>
                    </div>
                    <h3 class="tool-title">
                        <a href="#">
                            <?php _e('Example Tool', 'toolshub'); ?>
                        </a>
                    </h3>
                    <p class="tool-description">
                        <?php _e('Tool description preview', 'toolshub'); ?>
                    </p>
                    <span class="tool-category">{{ settings.category }}</span>
                </div>
            </div>
        </div>
        <?php
    }
}
