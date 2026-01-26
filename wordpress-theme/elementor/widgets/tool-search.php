<?php
/**
 * Elementor Tool Search Widget
 *
 * @package ToolsHub
 */

if (!defined('ABSPATH')) {
    exit;
}

class ToolsHub_Tool_Search extends \Elementor\Widget_Base
{

    public function get_name()
    {
        return 'toolshub_search';
    }

    public function get_title()
    {
        return __('Tool Search', 'toolshub');
    }

    public function get_icon()
    {
        return 'eicon-search';
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
                'label' => __('Search Settings', 'toolshub'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'placeholder',
            [
                'label' => __('Placeholder Text', 'toolshub'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __('Search tools...', 'toolshub'),
            ]
        );

        $this->add_control(
            'show_categories',
            [
                'label' => __('Show Category Filter', 'toolshub'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'label_on' => __('Show', 'toolshub'),
                'label_off' => __('Hide', 'toolshub'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->end_controls_section();
    }

    protected function render()
    {
        $settings = $this->get_settings_for_display();
        $placeholder = $settings['placeholder'];
        $show_categories = $settings['show_categories'];
        $categories = toolshub_get_tool_categories();
        ?>
        <div class="toolshub-search-widget">
            <div class="search-input-wrapper">
                <input type="text" id="toolshub-search-input" class="toolshub-search-input"
                    placeholder="<?php echo esc_attr($placeholder); ?>" autocomplete="off" />
                <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </span>
            </div>

            <?php if ($show_categories === 'yes'): ?>
                <div class="search-categories">
                    <button class="category-btn active" data-category="all">
                        <?php _e('All', 'toolshub'); ?>
                    </button>
                    <?php foreach ($categories as $category): ?>
                        <button class="category-btn" data-category="<?php echo esc_attr($category); ?>">
                            <?php echo esc_html($category); ?>
                        </button>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <div id="search-results" class="search-results"></div>
        </div>

        <script>
            (function () {
                const searchInput = document.getElementById('toolshub-search-input');
                const resultsContainer = document.getElementById('search-results');
                const categoryBtns = document.querySelectorAll('.category-btn');

                let currentCategory = 'all';

                // Category filter
                categoryBtns.forEach(btn => {
                    btn.addEventListener('click', function () {
                        categoryBtns.forEach(b => b.classList.remove('active'));
                        this.classList.add('active');
                        currentCategory = this.dataset.category;
                        performSearch(searchInput.value);
                    });
                });

                // Search functionality
                searchInput.addEventListener('input', function () {
                    performSearch(this.value);
                });

                function performSearch(query) {
                    // This would be implemented with AJAX in production
                    if (typeof window.ToolsHub !== 'undefined' && typeof window.ToolsHub.search === 'function') {
                        window.ToolsHub.search(query, currentCategory, resultsContainer);
                    }
                }
            })();
        </script>
        <?php
    }

    protected function content_template()
    {
        ?>
        <div class="toolshub-search-widget">
            <div class="search-input-wrapper">
                <input type="text" class="toolshub-search-input" placeholder="{{ settings.placeholder }}" />
                <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </span>
            </div>
            <# if (settings.show_categories==='yes' ) { #>
                <div class="search-categories">
                    <button class="category-btn active">All</button>
                    <button class="category-btn">Gaming</button>
                    <button class="category-btn">Productivity</button>
                </div>
                <# } #>
        </div>
        <?php
    }
}
