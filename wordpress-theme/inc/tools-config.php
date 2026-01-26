<?php
/**
 * Tools Configuration
 *
 * @package ToolsHub
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get all tools
 */
function toolshub_get_all_tools()
{
    return array(
        array(
            'slug' => 'mouse-sensitivity-converter',
            'title' => 'Mouse Sensitivity Converter',
            'description' => 'Convert mouse sensitivity between different games instantly.',
            'category' => 'Gaming',
            'icon' => 'MousePointer2',
        ),
        array(
            'slug' => 'dpi-edpi-calculator',
            'title' => 'DPI to eDPI Calculator',
            'description' => 'Calculate your effective DPI (eDPI) to compare sensitivity across different setups.',
            'category' => 'Gaming',
            'icon' => 'Calculator',
        ),
        array(
            'slug' => 'click-speed-test',
            'title' => 'Click Speed Test (CPS)',
            'description' => 'Test your clicking speed in clicks per second (CPS) with different time modes.',
            'category' => 'Gaming',
            'icon' => 'MousePointer2',
        ),
        array(
            'slug' => 'aim-trainer',
            'title' => 'Aim Trainer',
            'description' => 'Improve your mouse accuracy and reaction time with our interactive aim trainer.',
            'category' => 'Gaming',
            'icon' => 'Target',
        ),
        array(
            'slug' => 'reaction-time-test',
            'title' => 'Reaction Time Test',
            'description' => 'Test your visual reflexes and track your best reaction speeds in milliseconds.',
            'category' => 'Gaming',
            'icon' => 'Zap',
        ),
        array(
            'slug' => 'word-counter',
            'title' => 'Word Counter & Text Analyzer',
            'description' => 'Count words, characters, sentences, and estimate reading time.',
            'category' => 'Productivity',
            'icon' => 'Type',
        ),
        array(
            'slug' => 'json-formatter',
            'title' => 'JSON Formatter',
            'description' => 'Validate, beautify, and minify JSON data.',
            'category' => 'Developer',
            'icon' => 'Braces',
        ),
        array(
            'slug' => 'password-generator',
            'title' => 'Password Generator',
            'description' => 'Generate strong, secure passwords with custom settings.',
            'category' => 'Productivity',
            'icon' => 'KeyRound',
        ),
        array(
            'slug' => 'meta-tag-generator',
            'title' => 'Meta Tag Generator',
            'description' => 'Generate SEO-friendly meta tags for your website.',
            'category' => 'SEO',
            'icon' => 'Sparkles',
        ),
        array(
            'slug' => 'robots-txt-generator',
            'title' => 'Robots.txt Generator',
            'description' => 'Create a robots.txt file to guide search engine crawlers.',
            'category' => 'SEO',
            'icon' => 'Bot',
        ),
        // Add more tools as needed
    );
}

/**
 * Get tool by slug
 */
function toolshub_get_tool_by_slug($slug)
{
    $tools = toolshub_get_all_tools();
    foreach ($tools as $tool) {
        if ($tool['slug'] === $slug) {
            return $tool;
        }
    }
    return null;
}

/**
 * Get tools by category
 */
function toolshub_get_tools_by_category($category)
{
    $tools = toolshub_get_all_tools();
    return array_filter($tools, function ($tool) use ($category) {
        return $tool['category'] === $category;
    });
}

/**
 * Get all tool categories
 */
function toolshub_get_tool_categories()
{
    return array('Gaming', 'Productivity', 'SEO', 'Developer', 'Fun');
}
