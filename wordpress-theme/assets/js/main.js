/**
 * ToolsHub Main JavaScript
 *
 * @package ToolsHub
 */

(function ($) {
    'use strict';

    // Global ToolsHub object
    window.ToolsHub = {
        tools: {},

        /**
         * Initialize a tool
         */
        mountTool: function (slug) {
            const container = document.querySelector(`#tool-${slug}`);
            if (!container) {
                console.warn(`Tool container not found for: ${slug}`);
                return;
            }

            // Check if tool component exists
            if (this.tools[slug] && typeof this.tools[slug].init === 'function') {
                this.tools[slug].init(container);
            } else {
                container.innerHTML = '<p style="padding: 20px; text-align: center;">Tool component loading...</p>';
            }
        },

        /**
         * Search tools
         */
        search: function (query, category, resultsContainer) {
            if (!resultsContainer) return;

            const data = new FormData();
            data.append('action', 'toolshub_search');
            data.append('query', query);
            data.append('category', category);
            data.append('nonce', toolshubData.nonce);

            fetch(toolshubData.ajaxUrl, {
                method: 'POST',
                body: data
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        resultsContainer.innerHTML = data.data.html;
                    } else {
                        resultsContainer.innerHTML = '<p>No results found.</p>';
                    }
                })
                .catch(error => {
                    console.error('Search error:', error);
                    resultsContainer.innerHTML = '<p>Error performing search.</p>';
                });
        }
    };

    // Mobile menu toggle
    $('.mobile-menu-toggle').on('click', function () {
        $('.nav-menu').slideToggle();
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Trigger event when ToolsHub is ready
    $(document).ready(function () {
        const event = new Event('toolshub_ready');
        document.dispatchEvent(event);
    });

    // Handle Elementor preview mode
    if (typeof elementorFrontend !== 'undefined') {
        elementorFrontend.hooks.addAction('frontend/element_ready/widget', function ($scope) {
            const toolWidget = $scope.find('[data-tool]');
            if (toolWidget.length) {
                const slug = toolWidget.data('tool');
                window.ToolsHub.mountTool(slug);
            }
        });
    }

})(jQuery);
