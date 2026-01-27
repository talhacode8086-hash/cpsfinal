document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Sticky Header
    const header = document.createElement('header');
    header.className = 'main-header';
    header.innerHTML = `
        <div class="header-left">
            <button id="sidebar-toggle-header" class="header-toggle-btn">
                <i data-lucide="menu"></i>
            </button>
            <a href="index.html" class="header-logo">
                <div class="logo-icon">A</div>
                <div class="logo-text">Assets Tools Hub <span>PREMIUM</span></div>
            </a>
        </div>
        <nav class="header-nav">
            <a href="index.html">GAMING</a>
            <a href="#">PRODUCTIVITY</a>
            <a href="#">DEV</a>
            <a href="#">BLOG</a>
        </nav>
        <div class="header-right">
            <div class="header-search">
                <i data-lucide="search"></i>
                <input type="text" placeholder="Search tools...">
                <span class="search-kbd">⌘ K</span>
            </div>
            <button class="theme-toggle">
                <i data-lucide="sun"></i>
            </button>
            <button class="join-pro-btn">
                <i data-lucide="zap"></i>
                JOIN PRO
            </button>
        </div>
    `;
    document.body.prepend(header);

    // 2. Create Sidebar HTML
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
        sidebar.classList.add('collapsed');
        document.body.classList.add('sidebar-collapsed');
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    sidebar.innerHTML = `
        <div class="sidebar-content">
            <div class="sidebar-section">
                <div class="section-title">QUICK ACCESS</div>
                <a href="index.html" class="nav-item ${currentPage === 'index.html' ? 'active' : ''}">
                    <i data-lucide="home"></i> <span>Home</span>
                </a>
            </div>

            <div class="sidebar-section">
                <div class="section-title">GAMING UTILITIES</div>
                <div class="sidebar-scroll-container">
                    <a href="cm-360.html" class="nav-item ${currentPage === 'cm-360.html' ? 'active' : ''}">
                        <i data-lucide="calculator"></i> <span>CM per 360° Calc</span>
                    </a>
                    <a href="crosshair-gen.html" class="nav-item ${currentPage === 'crosshair-gen.html' ? 'active' : ''}">
                        <i data-lucide="crosshair"></i> <span>Crosshair Generator</span>
                    </a>
                    <a href="crosshair-overlay.html" class="nav-item ${currentPage === 'crosshair-overlay.html' ? 'active' : ''}">
                        <i data-lucide="layers"></i> <span>Crosshair Overlay</span>
                    </a>
                    <a href="dpi-analyzer.html" class="nav-item ${currentPage === 'dpi-analyzer.html' ? 'active' : ''}">
                        <i data-lucide="mouse"></i> <span>DPI Analyzer</span>
                    </a>
                    <a href="dpi-edpi.html" class="nav-item ${currentPage === 'dpi-edpi.html' ? 'active' : ''}">
                        <i data-lucide="hash"></i> <span>DPI to eDPI</span>
                    </a>
                    <a href="esports-warmup.html" class="nav-item ${currentPage === 'esports-warmup.html' ? 'active' : ''}">
                        <i data-lucide="flame"></i> <span>Esports Warm-Up</span>
                    </a>
                    <a href="fov-calc.html" class="nav-item ${currentPage === 'fov-calc.html' ? 'active' : ''}">
                        <i data-lucide="expand"></i> <span>FOV Calculator</span>
                    </a>
                    <a href="fps-refresh.html" class="nav-item ${currentPage === 'fps-refresh.html' ? 'active' : ''}">
                        <i data-lucide="gauge"></i> <span>FPS & Refresh Rate</span>
                    </a>
                    <a href="desk-height.html" class="nav-item ${currentPage === 'desk-height.html' ? 'active' : ''}">
                        <i data-lucide="monitor"></i> <span>Desk Height Calc</span>
                    </a>
                    <a href="grenade-tray.html" class="nav-item ${currentPage === 'grenade-tray.html' ? 'active' : ''}">
                        <i data-lucide="bomb"></i> <span>Grenade Trajectory</span>
                    </a>
                    <a href="input-lag.html" class="nav-item ${currentPage === 'input-lag.html' ? 'active' : ''}">
                        <i data-lucide="zap-off"></i> <span>Input Lag Estimator</span>
                    </a>
                    <a href="monitor-dist.html" class="nav-item ${currentPage === 'monitor-dist.html' ? 'active' : ''}">
                        <i data-lucide="move"></i> <span>Monitor Dist Match</span>
                    </a>
                    <a href="monitor-ppi.html" class="nav-item ${currentPage === 'monitor-ppi.html' ? 'active' : ''}">
                        <i data-lucide="grid-3x3"></i> <span>Monitor PPI Calc</span>
                    </a>
                    <a href="motion-blur.html" class="nav-item ${currentPage === 'motion-blur.html' ? 'active' : ''}">
                        <i data-lucide="wind"></i> <span>Motion Blur Test</span>
                    </a>
                    <a href="mouse-accel.html" class="nav-item ${currentPage === 'mouse-accel.html' ? 'active' : ''}">
                        <i data-lucide="chevrons-up"></i> <span>Mouse Accel Check</span>
                    </a>
                    <a href="polling-rate.html" class="nav-item ${currentPage === 'polling-rate.html' ? 'active' : ''}">
                        <i data-lucide="activity"></i> <span>Mouse Polling Rate</span>
                    </a>
                    <a href="sens-converter.html" class="nav-item ${currentPage === 'sens-converter.html' ? 'active' : ''}">
                        <i data-lucide="refresh-cw"></i> <span>Sensitivity Conv</span>
                    </a>
                    <a href="network-jitter.html" class="nav-item ${currentPage === 'network-jitter.html' ? 'active' : ''}">
                        <i data-lucide="signal"></i> <span>Network Jitter</span>
                    </a>
                    <a href="res-scaler.html" class="nav-item ${currentPage === 'res-scaler.html' ? 'active' : ''}">
                        <i data-lucide="maximize"></i> <span>Resolution Scaler</span>
                    </a>
                    <a href="sens-match.html" class="nav-item ${currentPage === 'sens-match.html' ? 'active' : ''}">
                        <i data-lucide="git-compare"></i> <span>Sens Match Analysis</span>
                    </a>
                    <a href="sens-random.html" class="nav-item ${currentPage === 'sens-random.html' ? 'active' : ''}">
                        <i data-lucide="shuffle"></i> <span>Sens Randomizer</span>
                    </a>
                </div>
            </div>

            <div class="sidebar-section">
                <div class="section-title">MOUSE SKILLS</div>
                <div class="sidebar-scroll-container">
                    <a href="butterfly-click.html" class="nav-item ${currentPage === 'butterfly-click.html' ? 'active' : ''}">
                        <i data-lucide="zap"></i> <span>Butterfly Click Test</span>
                    </a>
                    <a href="circle-click.html" class="nav-item ${currentPage === 'circle-click.html' ? 'active' : ''}">
                        <i data-lucide="circle-dot"></i> <span>Circle Click Test</span>
                    </a>
                    <a href="click-speed.html" class="nav-item ${currentPage === 'click-speed.html' ? 'active' : ''}">
                        <i data-lucide="mouse-pointer-2"></i> <span>Click Speed Test</span>
                    </a>
                    <a href="cursor-precision.html" class="nav-item ${currentPage === 'cursor-precision.html' ? 'active' : ''}">
                        <i data-lucide="target"></i> <span>Cursor Precision</span>
                    </a>
                    <a href="drag-click.html" class="nav-item ${currentPage === 'drag-click.html' ? 'active' : ''}">
                        <i data-lucide="grip-horizontal"></i> <span>Drag Click Test</span>
                    </a>
                    <a href="jitter-click.html" class="nav-item ${currentPage === 'jitter-click.html' ? 'active' : ''}">
                        <i data-lucide="zap"></i> <span>Jitter Click Test</span>
                    </a>
                    <a href="kohi-click.html" class="nav-item ${currentPage === 'kohi-click.html' ? 'active' : ''}">
                        <i data-lucide="mouse"></i> <span>Kohi Click Test</span>
                    </a>
                    <a href="l-vs-r-click.html" class="nav-item ${currentPage === 'l-vs-r-click.html' ? 'active' : ''}">
                        <i data-lucide="arrow-left-right"></i> <span>Left vs Right Click</span>
                    </a>
                    <a href="lod-test.html" class="nav-item ${currentPage === 'lod-test.html' ? 'active' : ''}">
                        <i data-lucide="arrow-up-circle"></i> <span>LOD Test</span>
                    </a>
                    <a href="double-click.html" class="nav-item ${currentPage === 'double-click.html' ? 'active' : ''}">
                        <i data-lucide="copy"></i> <span>Double Click Test</span>
                    </a>
                    <a href="durability-test.html" class="nav-item ${currentPage === 'durability-test.html' ? 'active' : ''}">
                        <i data-lucide="shield-check"></i> <span>Durability Test</span>
                    </a>
                    <a href="glide-test.html" class="nav-item ${currentPage === 'glide-test.html' ? 'active' : ''}">
                        <i data-lucide="move"></i> <span>Mouse Glide Test</span>
                    </a>
                    <a href="input-latency.html" class="nav-item ${currentPage === 'input-latency.html' ? 'active' : ''}">
                        <i data-lucide="clock"></i> <span>Input Latency</span>
                    </a>
                    <a href="movement-tracker.html" class="nav-item ${currentPage === 'movement-tracker.html' ? 'active' : ''}">
                        <i data-lucide="map"></i> <span>Movement Tracker</span>
                    </a>
                    <a href="trail-visualizer.html" class="nav-item ${currentPage === 'trail-visualizer.html' ? 'active' : ''}">
                        <i data-lucide="sparkles"></i> <span>Trail Visualizer</span>
                    </a>
                    <a href="pixel-skip.html" class="nav-item ${currentPage === 'pixel-skip.html' ? 'active' : ''}">
                        <i data-lucide="grid"></i> <span>Pixel Skipping</span>
                    </a>
                    <a href="right-click-speed.html" class="nav-item ${currentPage === 'right-click-speed.html' ? 'active' : ''}">
                        <i data-lucide="mouse-pointer-click"></i> <span>Right Click Speed</span>
                    </a>
                    <a href="scroll-speed.html" class="nav-item ${currentPage === 'scroll-speed.html' ? 'active' : ''}">
                        <i data-lucide="mouse-pointer-2"></i> <span>Scroll Speed Test</span>
                    </a>
                    <a href="sensor-jitter.html" class="nav-item ${currentPage === 'sensor-jitter.html' ? 'active' : ''}">
                        <i data-lucide="activity"></i> <span>Sensor Jitter</span>
                    </a>
                </div>
            </div>

            <div class="sidebar-section">
                <div class="section-title">KEYBOARD SKILLS</div>
                <div class="sidebar-scroll-container">
                    <a href="actuator-force.html" class="nav-item ${currentPage === 'actuator-force.html' ? 'active' : ''}">
                        <i data-lucide="weight"></i> <span>Actuator Force</span>
                    </a>
                    <a href="blind-typing.html" class="nav-item ${currentPage === 'blind-typing.html' ? 'active' : ''}">
                        <i data-lucide="eye-off"></i> <span>Blind Typing</span>
                    </a>
                    <a href="code-speed.html" class="nav-item ${currentPage === 'code-speed.html' ? 'active' : ''}">
                        <i data-lucide="code"></i> <span>Code Speed Test</span>
                    </a>
                    <a href="keyboard-check.html" class="nav-item ${currentPage === 'keyboard-check.html' ? 'active' : ''}">
                        <i data-lucide="keyboard"></i> <span>Keyboard Check</span>
                    </a>
                    <a href="key-ghosting.html" class="nav-item ${currentPage === 'key-ghosting.html' ? 'active' : ''}">
                        <i data-lucide="ghost"></i> <span>Key Ghosting</span>
                    </a>
                    <a href="repeat-rate.html" class="nav-item ${currentPage === 'repeat-rate.html' ? 'active' : ''}">
                        <i data-lucide="repeat"></i> <span>Key Repeat Rate</span>
                    </a>
                    <a href="rollover-test.html" class="nav-item ${currentPage === 'rollover-test.html' ? 'active' : ''}">
                        <i data-lucide="layers"></i> <span>Key Rollover</span>
                    </a>
                    <a href="key-wobble.html" class="nav-item ${currentPage === 'key-wobble.html' ? 'active' : ''}">
                        <i data-lucide="move-horizontal"></i> <span>Key Wobble Test</span>
                    </a>
                    <a href="audio-latency.html" class="nav-item ${currentPage === 'audio-latency.html' ? 'active' : ''}">
                        <i data-lucide="volume-2"></i> <span>Audio Latency</span>
                    </a>
                    <a href="debounce-test.html" class="nav-item ${currentPage === 'debounce-test.html' ? 'active' : ''}">
                        <i data-lucide="buffer"></i> <span>Debounce Test</span>
                    </a>
                    <a href="keyboard-heatmap.html" class="nav-item ${currentPage === 'keyboard-heatmap.html' ? 'active' : ''}">
                        <i data-lucide="flame"></i> <span>Keyboard Heatmap</span>
                    </a>
                    <a href="keyboard-latency.html" class="nav-item ${currentPage === 'keyboard-latency.html' ? 'active' : ''}">
                        <i data-lucide="zap"></i> <span>Keyboard Latency</span>
                    </a>
                    <a href="nkro-test.html" class="nav-item ${currentPage === 'nkro-test.html' ? 'active' : ''}">
                        <i data-lucide="command"></i> <span>NKRO Tester</span>
                    </a>
                    <a href="keyboard-polling.html" class="nav-item ${currentPage === 'keyboard-polling.html' ? 'active' : ''}">
                        <i data-lucide="activity"></i> <span>Polling Rate</span>
                    </a>
                    <a href="macro-delay.html" class="nav-item ${currentPage === 'macro-delay.html' ? 'active' : ''}">
                        <i data-lucide="clock"></i> <span>Macro Delay</span>
                    </a>
                    <a href="nkro-visualizer.html" class="nav-item ${currentPage === 'nkro-visualizer.html' ? 'active' : ''}">
                        <i data-lucide="eye"></i> <span>NKRO Visualizer</span>
                    </a>
                    <a href="numpad-speed.html" class="nav-item ${currentPage === 'numpad-speed.html' ? 'active' : ''}">
                        <i data-lucide="grid-3x3"></i> <span>Numpad Speed</span>
                    </a>
                    <a href="spacebar-counter.html" class="nav-item ${currentPage === 'spacebar-counter.html' ? 'active' : ''}">
                        <i data-lucide="space"></i> <span>Spacebar Counter</span>
                    </a>
                    <a href="switch-sound.html" class="nav-item ${currentPage === 'switch-sound.html' ? 'active' : ''}">
                        <i data-lucide="music"></i> <span>Switch Sound</span>
                    </a>
                    <a href="typing-speed.html" class="nav-item ${currentPage === 'typing-speed.html' ? 'active' : ''}">
                        <i data-lucide="type"></i> <span>Typing Speed</span>
                    </a>
                </div>
            </div>

            <div class="sidebar-section">
                <div class="section-title">TEXT TOOLS</div>
                <div class="sidebar-scroll-container">
                    <a href="case-converter.html" class="nav-item ${currentPage === 'case-converter.html' ? 'active' : ''}">
                        <i data-lucide="type"></i> <span>Case Converter</span>
                    </a>
                    <a href="duplicate-line-finder.html" class="nav-item ${currentPage === 'duplicate-line-finder.html' ? 'active' : ''}">
                        <i data-lucide="copy"></i> <span>Duplicate Line Finder</span>
                    </a>
                    <a href="emoji-remover.html" class="nav-item ${currentPage === 'emoji-remover.html' ? 'active' : ''}">
                        <i data-lucide="smile"></i> <span>Emoji Remover</span>
                    </a>
                    <a href="find-replace.html" class="nav-item ${currentPage === 'find-replace.html' ? 'active' : ''}">
                        <i data-lucide="search"></i> <span>Find and Replace</span>
                    </a>
                    <a href="html-encoder.html" class="nav-item ${currentPage === 'html-encoder.html' ? 'active' : ''}">
                        <i data-lucide="code"></i> <span>HTML Encoder</span>
                    </a>
                    <a href="line-alphabetizer.html" class="nav-item ${currentPage === 'line-alphabetizer.html' ? 'active' : ''}">
                        <i data-lucide="sort-asc"></i> <span>Line Alphabetizer</span>
                    </a>
                    <a href="line-numberer.html" class="nav-item ${currentPage === 'line-numberer.html' ? 'active' : ''}">
                        <i data-lucide="list-ordered"></i> <span>Line Numberer</span>
                    </a>
                    <a href="list-to-csv.html" class="nav-item ${currentPage === 'list-to-csv.html' ? 'active' : ''}">
                        <i data-lucide="table"></i> <span>List to CSV</span>
                    </a>
                    <a href="lorem-ipsum.html" class="nav-item ${currentPage === 'lorem-ipsum.html' ? 'active' : ''}">
                        <i data-lucide="file-text"></i> <span>Lorem Ipsum</span>
                    </a>
                    <a href="markdown-to-text.html" class="nav-item ${currentPage === 'markdown-to-text.html' ? 'active' : ''}">
                        <i data-lucide="file"></i> <span>Markdown to Text</span>
                    </a>
                    <a href="morse-code.html" class="nav-item ${currentPage === 'morse-code.html' ? 'active' : ''}">
                        <i data-lucide="radio"></i> <span>Morse Code</span>
                    </a>
                    <a href="prefix-suffix.html" class="nav-item ${currentPage === 'prefix-suffix.html' ? 'active' : ''}">
                        <i data-lucide="plus-square"></i> <span>Prefix & Suffix</span>
                    </a>
                    <a href="random-string.html" class="nav-item ${currentPage === 'random-string.html' ? 'active' : ''}">
                        <i data-lucide="shuffle"></i> <span>Random String</span>
                    </a>
                    <a href="remove-duplicate-lines.html" class="nav-item ${currentPage === 'remove-duplicate-lines.html' ? 'active' : ''}">
                        <i data-lucide="trash-2"></i> <span>Remove Duplicates</span>
                    </a>
                    <a href="reverse-text.html" class="nav-item ${currentPage === 'reverse-text.html' ? 'active' : ''}">
                        <i data-lucide="repeat"></i> <span>Reverse Text</span>
                    </a>
                    <a href="rot13-cipher.html" class="nav-item ${currentPage === 'rot13-cipher.html' ? 'active' : ''}">
                        <i data-lucide="lock"></i> <span>ROT13 Cipher</span>
                    </a>
                    <a href="sentence-counter.html" class="nav-item ${currentPage === 'sentence-counter.html' ? 'active' : ''}">
                        <i data-lucide="align-justify"></i> <span>Sentence Counter</span>
                    </a>
                    <a href="small-text.html" class="nav-item ${currentPage === 'small-text.html' ? 'active' : ''}">
                        <i data-lucide="minimize-2"></i> <span>Small Text</span>
                    </a>
                    <a href="strip-html.html" class="nav-item ${currentPage === 'strip-html.html' ? 'active' : ''}">
                        <i data-lucide="code"></i> <span>Strip HTML</span>
                    </a>
                    <a href="text-diff.html" class="nav-item ${currentPage === 'text-diff.html' ? 'active' : ''}">
                        <i data-lucide="git-compare"></i> <span>Text Diff Checker</span>
                    </a>
                    <a href="text-mirror.html" class="nav-item ${currentPage === 'text-mirror.html' ? 'active' : ''}">
                        <i data-lucide="move"></i> <span>Text Mirror</span>
                    </a>
                    <a href="text-to-binary.html" class="nav-item ${currentPage === 'text-to-binary.html' ? 'active' : ''}">
                        <i data-lucide="cpu"></i> <span>Text to Binary</span>
                    </a>
                    <a href="text-handwriting.html" class="nav-item ${currentPage === 'text-handwriting.html' ? 'active' : ''}">
                        <i data-lucide="pen-tool"></i> <span>Text Handwriting</span>
                    </a>
                    <a href="text-to-hex.html" class="nav-item ${currentPage === 'text-to-hex.html' ? 'active' : ''}">
                        <i data-lucide="hash"></i> <span>Text to Hex</span>
                    </a>
                    <a href="slug-converter.html" class="nav-item ${currentPage === 'slug-converter.html' ? 'active' : ''}">
                        <i data-lucide="link"></i> <span>Text to Slug</span>
                    </a>
                    <a href="upside-down.html" class="nav-item ${currentPage === 'upside-down.html' ? 'active' : ''}">
                        <i data-lucide="refresh-ccw"></i> <span>Upside Down</span>
                    </a>
                    <a href="whitespace-remover.html" class="nav-item ${currentPage === 'whitespace-remover.html' ? 'active' : ''}">
                        <i data-lucide="maximize-2"></i> <span>Whitespace Remover</span>
                    </a>
                    <a href="word-counter.html" class="nav-item ${currentPage === 'word-counter.html' ? 'active' : ''}">
                        <i data-lucide="align-left"></i> <span>Word Counter</span>
                    </a>
                    <a href="word-frequency.html" class="nav-item ${currentPage === 'word-frequency.html' ? 'active' : ''}">
                        <i data-lucide="bar-chart-2"></i> <span>Word Frequency</span>
                    </a>
                    <a href="zalgo-text.html" class="nav-item ${currentPage === 'zalgo-text.html' ? 'active' : ''}">
                        <i data-lucide="zap"></i> <span>Zalgo Text</span>
                    </a>
                </div>
            </div>

            <!-- Aim & Reflex Section Removed as per User Request -->
            
            <div class="sidebar-section">
                <div class="section-title">DEVELOPMENT TOOLS</div>
                <div class="sidebar-scroll-container">
                    <a href="base64.html" class="nav-item ${currentPage === 'base64.html' ? 'active' : ''}">
                        <i data-lucide="lock"></i> <span>Base64 Encoder</span>
                    </a>
                    <a href="bash-validator.html" class="nav-item ${currentPage === 'bash-validator.html' ? 'active' : ''}">
                        <i data-lucide="terminal"></i> <span>Bash Validator</span>
                    </a>
                    <a href="cron-generator.html" class="nav-item ${currentPage === 'cron-generator.html' ? 'active' : ''}">
                        <i data-lucide="clock"></i> <span>Cron Generator</span>
                    </a>
                    <a href="csv-json.html" class="nav-item ${currentPage === 'csv-json.html' ? 'active' : ''}">
                        <i data-lucide="arrow-right"></i> <span>CSV to JSON</span>
                    </a>
                    <a href="html-minifier.html" class="nav-item ${currentPage === 'html-minifier.html' ? 'active' : ''}">
                        <i data-lucide="package"></i> <span>HTML Minifier</span>
                    </a>
                    <a href="http-status.html" class="nav-item ${currentPage === 'http-status.html' ? 'active' : ''}">
                        <i data-lucide="info"></i> <span>HTTP Status</span>
                    </a>
                    <a href="image-placeholder.html" class="nav-item ${currentPage === 'image-placeholder.html' ? 'active' : ''}">
                        <i data-lucide="image"></i> <span>Image Placeholder</span>
                    </a>
                    <a href="js-minifier.html" class="nav-item ${currentPage === 'js-minifier.html' ? 'active' : ''}">
                        <i data-lucide="zap"></i> <span>JS Minifier</span>
                    </a>
                    <a href="json-formatter.html" class="nav-item ${currentPage === 'json-formatter.html' ? 'active' : ''}">
                        <i data-lucide="code"></i> <span>JSON Formatter</span>
                    </a>
                    <a href="json-csv.html" class="nav-item ${currentPage === 'json-csv.html' ? 'active' : ''}">
                        <i data-lucide="arrow-right"></i> <span>JSON to CSV</span>
                    </a>
                    <a href="jwt-decoder.html" class="nav-item ${currentPage === 'jwt-decoder.html' ? 'active' : ''}">
                        <i data-lucide="key"></i> <span>JWT Decoder</span>
                    </a>
                    <a href="markdown-previewer.html" class="nav-item ${currentPage === 'markdown-previewer.html' ? 'active' : ''}">
                        <i data-lucide="eye"></i> <span>Markdown Previewer</span>
                    </a>
                    <a href="mime-lookup.html" class="nav-item ${currentPage === 'mime-lookup.html' ? 'active' : ''}">
                        <i data-lucide="file"></i> <span>MIME Lookup</span>
                    </a>
                    <a href="password-generator.html" class="nav-item ${currentPage === 'password-generator.html' ? 'active' : ''}">
                        <i data-lucide="shield"></i> <span>Password Generator</span>
                    </a>
                    <a href="qr-generator.html" class="nav-item ${currentPage === 'qr-generator.html' ? 'active' : ''}">
                        <i data-lucide="qr-code"></i> <span>QR Generator</span>
                    </a>
                    <a href="regex-tester.html" class="nav-item ${currentPage === 'regex-tester.html' ? 'active' : ''}">
                        <i data-lucide="search"></i> <span>Regex Tester</span>
                    </a>
                    <a href="sql-formatter.html" class="nav-item ${currentPage === 'sql-formatter.html' ? 'active' : ''}">
                        <i data-lucide="database"></i> <span>SQL Formatter</span>
                    </a>
                    <a href="url-encoder.html" class="nav-item ${currentPage === 'url-encoder.html' ? 'active' : ''}">
                        <i data-lucide="link"></i> <span>URL Encoder</span>
                    </a>
                    <a href="xml-json.html" class="nav-item ${currentPage === 'xml-json.html' ? 'active' : ''}">
                        <i data-lucide="repeat"></i> <span>XML to JSON</span>
                    </a>
                    <a href="yaml-json.html" class="nav-item ${currentPage === 'yaml-json.html' ? 'active' : ''}">
                        <i data-lucide="repeat"></i> <span>YAML ↔ JSON</span>
                    </a>
                </div>
            </div>
            
            <div class="sidebar-section">
                <div class="section-title">BLOG GUIDES</div>
                <a href="#" class="nav-item">
                    <i data-lucide="book-open"></i> <span>Gaming Tips</span>
                </a>
            </div>
        </div>
    `;

    document.body.insertBefore(sidebar, header.nextSibling);

    // 3. Sidebar toggle logic (from Header)
    const toggleBtn = document.getElementById('sidebar-toggle-header');
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);

        if (window.lucide) window.lucide.createIcons();
    });

    // 4. Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
