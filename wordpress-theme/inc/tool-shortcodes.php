<?php
/**
 * Tool Shortcodes
 *
 * @package ToolsHub
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Generic tool shortcode
 * Usage: [toolshub_tool slug="click-speed-test"]
 */
function toolshub_tool_shortcode($atts)
{
    $atts = shortcode_atts(array(
        'slug' => '',
    ), $atts);

    if (empty($atts['slug'])) {
        return '<p>Please specify a tool slug.</p>';
    }

    $tool = toolshub_get_tool_by_slug($atts['slug']);

    if (!$tool) {
        return '<p>Tool not found.</p>';
    }

    ob_start();
    ?>
    <div class="toolshub-tool-container" data-tool="<?php echo esc_attr($atts['slug']); ?>">
        <div class="tool-header">
            <h2>
                <?php echo esc_html($tool['title']); ?>
            </h2>
            <p>
                <?php echo esc_html($tool['description']); ?>
            </p>
        </div>
        <div id="tool-<?php echo esc_attr($atts['slug']); ?>" class="tool-content">
            <!-- Tool will be mounted here by React/JavaScript -->
        </div>
    </div>
    <script>
        // Initialize tool when DOM is ready
        document.addEventListener('DOMContentLoaded', function () {
            if (typeof window.ToolsHub !== 'undefined') {
                window.ToolsHub.mountTool('<?php echo esc_js($atts['slug']); ?>');
            }
        });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('toolshub_tool', 'toolshub_tool_shortcode');

/**
 * CPS Test Shortcode
 * Usage: [cps_test]
 */
function toolshub_cps_test_shortcode($atts)
{
    return toolshub_tool_shortcode(array('slug' => 'click-speed-test'));
}
add_shortcode('cps_test', 'toolshub_cps_test_shortcode');

/**
 * Aim Trainer Shortcode
 * Usage: [aim_trainer]
 */
function toolshub_aim_trainer_shortcode($atts)
{
    return toolshub_tool_shortcode(array('slug' => 'aim-trainer'));
}
add_shortcode('aim_trainer', 'toolshub_aim_trainer_shortcode');

/**
 * Word Counter Shortcode
 * Usage: [word_counter]
 */
function toolshub_word_counter_shortcode($atts)
{
    return toolshub_tool_shortcode(array('slug' => 'word-counter'));
}
add_shortcode('word_counter', 'toolshub_word_counter_shortcode');

/**
 * JSON Formatter Shortcode
 * Usage: [json_formatter]
 */
function toolshub_json_formatter_shortcode($atts)
{
    return toolshub_tool_shortcode(array('slug' => 'json-formatter'));
}
add_shortcode('json_formatter', 'toolshub_json_formatter_shortcode');

/**
 * Meta Tag Generator Shortcode
 * Usage: [meta_tag_generator]
 */
function toolshub_meta_tag_generator_shortcode($atts)
{
    return toolshub_tool_shortcode(array('slug' => 'meta-tag-generator'));
}
add_shortcode('meta_tag_generator', 'toolshub_meta_tag_generator_shortcode');
