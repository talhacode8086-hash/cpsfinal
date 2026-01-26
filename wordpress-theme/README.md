# ToolsHub WordPress Theme

A premium WordPress theme with **full Elementor support** for ToolsHub - featuring 70+ interactive tools for gaming, productivity, SEO, and development.

## Features

✨ **Full Elementor Integration**
- Drag & drop page building
- Custom ToolsHub widgets
- Visual editing for all pages
- Live preview support

🎮 **70+ Interactive Tools**
- Gaming tools (CPS test, aim trainer, etc.)
- Productivity tools (word counter, calculators, etc.)
- SEO tools (meta tags, robots.txt, etc.)
- Developer tools (JSON formatter, etc.)

🎨 **Premium Design**
- Dark mode optimized
- Responsive layouts
- Smooth animations
- Modern UI components

## Installation

### Prerequisites
- WordPress 6.0 or higher
- PHP 7.4 or higher
- Elementor plugin (Free or Pro)

### Steps

1. **Upload Theme**
   - Copy the `wordpress-theme` folder to your WordPress installation
   - Rename it to `toolshub-theme`
   - Place it in `wp-content/themes/toolshub-theme`

2. **Activate Theme**
   - Go to WordPress Admin Dashboard
   - Navigate to `Appearance → Themes`
   - Find "ToolsHub Pro" and click "Activate"

3. **Install Elementor**
   ```
   Plugins → Add New → Search "Elementor"
   Install and Activate
   ```

4. **Configure Permalinks**
   - Go to `Settings → Permalinks`
   - Select "Post name" structure
   - Click "Save Changes"

5. **Import Blog Posts** (Optional)
   - The theme includes 2 sample blog posts (first post removed as requested)
   - You can manually create posts or import them

## Using Elementor with ToolsHub

### Editing Pages

1. Open any page in WordPress
2. Click "Edit with Elementor" button
3. Full visual editor opens
4. Drag and drop elements

### Custom ToolsHub Widgets

The theme adds custom widgets to Elementor:

#### 1. **ToolsHub Tool Widget**
- **Location**: Elementor → ToolsHub Widgets
- **Purpose**: Embed any tool into a page
- **Controls**:
  - Select Tool (dropdown)
  - Show/Hide Title
  - Show/Hide Description
  - Background Color
  - Title Color

**Usage**:
1. Drag "ToolsHub Tool" widget to page
2. Select desired tool from dropdown
3. Customize appearance
4. Save and preview

#### 2. **Tools Category Grid Widget**
- **Purpose**: Display multiple tools in a grid
- **Controls**:
  - Category filter (All, Gaming, Productivity, etc.)
  - Column count (2, 3, or 4)
  - Number of tools to show

**Usage**:
1. Drag "Tools Category Grid" widget
2. Select category
3. Choose layout
4. Save

#### 3. **Tool Search Widget**
- **Purpose**: Add search functionality
- **Controls**:
  - Placeholder text
  - Show/hide category filter

## Theme Structure

```
wordpress-theme/
├── style.css                 # Theme header & basic styles
├── functions.php             # Theme setup & functionality
├── header.php               # Header template
├── footer.php               # Footer template  
├── index.php                # Blog listing
├── single.php               # Single post
├── page.php                 # Page template
│
├── inc/                     # PHP includes
│   ├── tools-config.php    # Tools configuration
│   └── tool-shortcodes.php # Shortcode definitions
│
├── elementor/               # Elementor integration
│   ├── widgets-loader.php  # Widget registration
│   └── widgets/
│       ├── tool-widget.php
│       ├── category-grid.php
│       └── tool-search.php
│
├── assets/                  # Assets
│   ├── css/
│   │   ├── main.css        # Main styles
│   │   └── tools.css       # Tool-specific styles
│   └── js/
│       ├── main.js          # Main JavaScript
│       └── tools-bundle.js  # Tools functionality
│
└── README.md               # This file
```

## Shortcodes

You can also use shortcodes in posts/pages:

```php
[toolshub_tool slug="click-speed-test"]
[cps_test]
[aim_trainer]
[word_counter]
[json_formatter]
[meta_tag_generator]
```

## Customization

### Adding New Tools

1. **Add to tools-config.php**:
```php
array(
    'slug' => 'my-new-tool',
    'title' => 'My New Tool',
    'description' => 'Tool description',
    'category' => 'Gaming',
    'icon' => 'IconName',
)
```

2. **Create tool implementation in tools-bundle.js**:
```javascript
window.ToolsHub.tools['my-new-tool'] = {
    init: function(container) {
        // Tool logic here
    }
};
```

3. **Add shortcode in tool-shortcodes.php** (optional):
```php
function my_new_tool_shortcode($atts) {
    return toolshub_tool_shortcode(array('slug' => 'my-new-tool'));
}
add_shortcode('my_new_tool', 'my_new_tool_shortcode');
```

### Styling

- **Main styles**: `assets/css/main.css`
- **Tool styles**: `assets/css/tools.css`
- Uses CSS custom properties (variables) for easy theming

### Menus

1. **Create Menus**:
   - Go to `Appearance → Menus`
   - Create "Primary Menu" and "Footer Menu"
   - Assign to locations

2. **Add Pages**:
   - Add Home, Explore, Tools, Blog, etc.

## Blog Configuration

The theme includes blog functionality with:
- 2 blog posts (first post removed as per request)
- Custom blog templates
- Category support
- Featured images

### Remaining Blog Posts:
1. "Understanding Keyboard Ghosting and Why It Matters for Gaming"
2. "Speed Up Your Workflow Using Simple Online Tools"

## Tools Categories

- **Gaming**: CPS test, aim trainer, sensitivity converter, etc.
- **Productivity**: Word counter, calculators, timers, etc.
- **SEO**: Meta tags, robots.txt generators
- **Developer**: JSON formatter, base64 encoder, etc.

## Elementor Pro Features (Optional)

If using Elementor Pro, you also get:
- Theme Builder (custom headers/footers)
- Custom post type templates
- Popup builder
- Form builder
- Advanced widgets

## Troubleshooting

### Tools Not Loading
- Check if `tools-bundle.js` is enqueued
- Open browser console for JavaScript errors
- Ensure React/ReactDOM are loaded

### Elementor Widgets Not Showing
- Deactivate and reactivate theme
- Clear Elementor cache: `Elementor → Tools → Regenerate CSS`
- Check if Elementor is active

### Styling Issues
- Clear WordPress cache
- Clear browser cache
- Regenerate Elementor CSS

## Development

### Building Assets

For production, you should:

1. **Compile Tailwind CSS**:
```bash
npx tailwindcss -i ./src/input.css -o ./assets/css/main.css --minify
```

2. **Bundle React Components**:
```bash
webpack --config webpack.config.js
```

3. **Minify JavaScript**:
```bash
terser assets/js/main.js -o assets/js/main.min.js
```

## Support

For issues or questions:
- Check WordPress and Elementor documentation
- Review theme files and comments
- Check browser console for errors

## License

GNU General Public License v2 or later

## Credits

- **WordPress**: Content Management System
- **Elementor**: Page Builder
- **React**: UI Components (for tools)
- **Tailwind CSS**: Utility-first CSS framework

---

**Developed by ToolsHub Team**  
Version: 1.0.0
