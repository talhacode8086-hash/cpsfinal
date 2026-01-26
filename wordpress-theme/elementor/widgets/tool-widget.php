<?php
/**
 * Elementor Tool Widget
 *
 * @package ToolsHub
 */

if (!defined('ABSPATH')) {
    exit;
}

class ToolsHub_Tool_Widget extends \Elementor\Widget_Base
{

    public function get_name()
    {
        return 'toolshub_tool';
    }

    public function get_title()
    {
        return __('ToolsHub Tool', 'toolshub');
    }

    public function get_icon()
    {
        return 'eicon-code';
    }

    public function get_categories()
    {
        return ['toolshub-widgets'];
    }

    protected function register_controls()
    {
        // Content Section
        $this->start_controls_section(
            'content_section',
            [
                'label' => __('Tool Settings', 'toolshub'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        // Tool Selection
        $tools = toolshub_get_all_tools();
        $tool_options = [];
        foreach ($tools as $tool) {
            $tool_options[$tool['slug']] = $tool['title'];
        }

        $this->add_control(
            'tool_slug',
            [
                'label' => __('Select Tool', 'toolshub'),
                'type' => \Elementor\Controls_Manager::SELECT,
                'options' => $tool_options,
                'default' => 'click-speed-test',
            ]
        );

        $this->add_control(
            'show_title',
            [
                'label' => __('Show Title', 'toolshub'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'label_on' => __('Show', 'toolshub'),
                'label_off' => __('Hide', 'toolshub'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'show_description',
            [
                'label' => __('Show Description', 'toolshub'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'label_on' => __('Show', 'toolshub'),
                'label_off' => __('Hide', 'toolshub'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->end_controls_section();

        // Style Section
        $this->start_controls_section(
            'style_section',
            [
                'label' => __('Style', 'toolshub'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label' => __('Title Color', 'toolshub'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .tool-header h2' => 'color: {{VALUE}}',
                ],
            ]
        );

        $this->add_control(
            'background_color',
            [
                'label' => __('Background Color', 'toolshub'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .toolshub-tool-container' => 'background-color: {{VALUE}}',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render()
    {
        $settings = $this->get_settings_for_display();
        $tool_slug = $settings['tool_slug'];
        $tool = toolshub_get_tool_by_slug($tool_slug);

        if (!$tool) {
            echo '<p>Tool not found.</p>';
            return;
        }
        ?>
        <div class="toolshub-tool-container elementor-tool" data-tool="<?php echo esc_attr($tool_slug); ?>">
            <?php if ($settings['show_title'] === 'yes' || $settings['show_description'] === 'yes'): ?>
                <div class="tool-header">
                    <?php if ($settings['show_title'] === 'yes'): ?>
                        <h2>
                            <?php echo esc_html($tool['title']); ?>
                        </h2>
                    <?php endif; ?>
                    <?php if ($settings['show_description'] === 'yes'): ?>
                        <p>
                            <?php echo esc_html($tool['description']); ?>
                        </p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            <div id="tool-<?php echo esc_attr($tool_slug); ?>" class="tool-content">
                <!-- Tool will be mounted here by React/JavaScript -->
            </div>
        </div>
        <script>
            (function () {
                if (typeof window.ToolsHub !== 'undefined') {
                    window.ToolsHub.mountTool('<?php echo esc_js($tool_slug); ?>');
                } else {
                    // Wait for ToolsHub to load
                    document.addEventListener('toolshub_ready', function () {
                        window.ToolsHub.mountTool('<?php echo esc_js($tool_slug); ?>');
                    });
                }
            })();
        </script>
        <?php
    }

    protected function content_template()
    {
        ?>
        <# var toolSlug=settings.tool_slug; #>
            <div class="toolshub-tool-container elementor-tool" data-tool="{{ toolSlug }}">
                <# if (settings.show_title==='yes' || settings.show_description==='yes' ) { #>
                    <div class="tool-header">
                        <# if (settings.show_title==='yes' ) { #>
                            <h2>
                                <?php _e('Tool Title', 'toolshub'); ?>
                            </h2>
                            <# } #>
                                <# if (settings.show_description==='yes' ) { #>
                                    <p>
                                        <?php _e('Tool description will appear here', 'toolshub'); ?>
                                    </p>
                                    <# } #>
                    </div>
                    <# } #>
                        <div id="tool-{{ toolSlug }}" class="tool-content">
                            <p style="text-align: center; padding: 40px;">
                                <?php _e('Tool preview - save and view on frontend', 'toolshub'); ?>
                            </p>
                        </div>
            </div>
            <?php
    }
}
