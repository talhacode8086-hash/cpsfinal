export interface Tool {
    slug: string;
    title: string;
    description: string;
    category: 'Mouse Skills' | 'Keyboard Skills' | 'Aim & Reflex' | 'Gaming Utilities' | 'Text Tools' | 'Unit Converters' | 'Development Tools' | 'SEO & Web' | 'Design & UI' | 'Finance' | 'Daily Tools' | 'Image Tools' | 'Education';
    iconName: string; // key for Lucide icons
    keywords?: string[];
    longDescription?: string;
    requires?: ('mouse' | 'keyboard')[];
}

export const tools: Tool[] = [
    {
        slug: 'mouse-sensitivity-converter',
        title: 'Mouse Sensitivity Converter',
        description: 'Convert mouse sensitivity between different games instantly.',
        category: 'Gaming Utilities',
        iconName: 'MousePointer2',
        keywords: ['mouse sensitivity converter', 'fps sensitivity calculator', 'game sensitivity match', 'csgo to valorant sensitivity'],
        longDescription: `
Converting sensitivity between games is crucial for maintaining consistent aim and muscle memory across different First-Person Shooters (FPS). Our Mouse Sensitivity Converter is a professional-grade tool designed to help you transfer your exact 360-degree rotation distance from one game to another without any loss of precision.

### How to Use the Sensitivity Converter
1.  **Select Input Game**: Choose the game you are currently playing (e.g., CS:GO, Apex Legends).
2.  **Enter Sensitivity**: Input your current in-game sensitivity value.
3.  **Select Output Game**: Choose the game you want to convert your sensitivity to (e.g., Valorant).
4.  **Enter DPI (Optional)**: If you are changing mouse DPI, enter both old and new DPI values for a perfect match.
5.  **Get Result**: The tool will instantly calculate the exact sensitivity setting you need.

### Why Use a Sensitivity Converter?
Competitive gamers know that "muscle memory" is built through repetition. If you play CS:GO at a certain sensitivity and switch to Overwatch 2 with a different effective sensitivity, your brain has to relearn how far to move the mouse to aim at a target. By matching your "cm/360" (centimeters per 360-degree turn), you ensure that a 5cm mouse movement results in the exact same on-screen rotation in every game.

### Supported Games
We support all major competitive titles including:
*   Counter-Strike 2 (CS2) / CS:GO
*   Valorant
*   Overwatch 2
*   Apex Legends
*   Call of Duty: Warzone / Modern Warfare
*   Rainbow Six Siege
*   Fortnite
*   Rust
*   Battlefield 2042

### FAQs
**Q: Does DPI affect sensitivity conversion?**
A: Yes! If you keep the same DPI, you only need to match the game multipliers. If you change your mouse DPI, our tool calculates the compensated sensitivity to keep your eDPI consistent.

**Q: Is this calculator 100% accurate?**
A: Yes, we use the exact yaw/pitch values from each game engine to ensure mathematical precision down to 5 decimal places.
        `
    },
    {
        slug: 'dpi-edpi-calculator',
        title: 'DPI to eDPI Calculator',
        description: 'Calculate your effective DPI (eDPI) to compare sensitivity across different setups.',
        category: 'Gaming Utilities',
        iconName: 'Calculator',
        keywords: ['edpi calculator', 'effective dpi', 'gaming mouse sensitivity', 'dpi converter'],
        longDescription: `
The eDPI (Effective Dots Per Inch) Calculator is an essential utility for competitive gamers looking to standardize their sensitivity. eDPI is the "true" sensitivity of your setup, calculated by multiplying your mouse DPI by your in-game sensitivity. It allows you to accurate compare your settings with pro players, regardless of what hardware they use.

### How to Calculate eDPI
1.  **Identify Mouse DPI**: Find your mouse's current DPI setting (usually 400, 800, or 1600) in your mouse software.
2.  **Find In-Game Sensitivity**: Open your game settings and look for the mouse sensitivity value.
3.  **Input Data**: Enter both values into our calculator.
4.  **View Results**: Your Effective DPI will be displayed instantly.

### Why eDPI Matters
Pro players often share their settings, but copying just the "sensitivity" value is useless if you don't know their DPI.
*   **Player A** uses 400 DPI and 2.0 Sensitivity = 800 eDPI.
*   **Player B** uses 800 DPI and 1.0 Sensitivity = 800 eDPI.
*   Even though their settings look different, their **actual** mouse speed is identical.

### Common eDPI Ranges (CS2 / Valorant)
*   **Low Sensitivity (Instructional)**: 600 - 800 eDPI (Great for precision holding)
*   **Medium Sensitivity (Versatile)**: 800 - 1000 eDPI (Balance of turn speed and aim)
*   **High Sensitivity (Wrist Aiming)**: 1000+ eDPI (Fast reactions, harder micro-adjustments)

Use this tool to find where you fit in the spectrum of professional players.
        `
    },
    {
        slug: 'click-speed-test',
        title: 'Click Speed Test (CPS)',
        description: 'Test your clicking speed in clicks per second (CPS) with different time modes.',
        category: 'Mouse Skills',
        iconName: 'MousePointer2',
        keywords: ['cps test', 'clicks per second', 'click speed test', 'jitter clicking', 'butterfly clicking', 'minecraft clicking test', 'mouse speed test', 'fast clicking tool', 'kohiclick test', 'click speed challenge'],
        longDescription: `
Test and improve your finger speed with our professional-grade Click Speed Test (CPS Test). Whether you are a Minecraft pro mastering "Jitter Clicking" or a competitive gamer practicing "Butterfly Clicking," our tool provides the accuracy and visual feedback you need to reach peak performance.

### How to Take the CPS Test
1.  **Select Duration**: Choose a time mode (1s, 5s, 10s, 30s, 60s, or 100s). The standard is usually 5 or 10 seconds.
2.  **Start Clicking**: Click the large clicking area as fast as you can. The timer starts on your first click.
3.  **Maintain Pace**: Keep clicking until the timer hits zero.
4.  **Analyze Results**: View your final CPS score, total clicks, and rank status (e.g., Turtle, Rabbit, Cheetah).

### What is a Good CPS Score?
*   **Average**: 6-7 CPS (Most office workers and casual users)
*   **Gamer**: 8-10 CPS (Competitive FPS/MOBA players)
*   **Pro**: 12+ CPS (Minecraft PvPers using special techniques)

### Clicking Techniques Explained
*   **Normal Clicking**: Standard single-finger clicking. Safe and consistent (5-7 CPS).
*   **Jitter Clicking**: Tensing the forearm muscles to vibrate the finger on the mouse button. High speed but tiring (10-14 CPS).
*   **Butterfly Clicking**: Using two fingers (index and middle) to alternate taps on the left mouse button. Requires a mouse that allows double-clicking (15-20+ CPS).
*   **Drag Clicking**: Dragging a finger across the button to create friction bounches. Used for bridging in Minecraft (20+ CPS).

### Features
*   **Anti-Cheat**: Measures raw inputs to filter out autoclickers.
*   **Real-time Graphs**: Visualize your clicking consistency over time.
*   **History**: Tracks your last 10 attempts to show improvement.
        `,
        requires: ['mouse']
    },
    {
        slug: 'keyboard-latency-tester',
        title: 'Keyboard Latency Tester',
        description: 'Measure the delay between your keypress and the system response in milliseconds.',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['keyboard latency test', 'input lag tester', 'keyboard delay check', 'mechanical keyboard response', 'scan rate tester'],
        longDescription: `
In fast-paced gaming, every millisecond counts. Our Keyboard Latency Tester measures the input lag of your keyboard—specifically, the time it takes for a browser to register a keypress event. While this isn't a hardware-level probe, it provides an excellent comparative benchmark to see if your system or keyboard is introducing unnecessary delay.

### How to Test Keyboard Latency
1.  **Close Background Apps**: For accurate results, close heavy applications that might slow down your browser.
2.  **Start Tool**: Click the "Start Test" button.
3.  **Press Keys**: Rapidly tap different keys on your keyboard.
4.  **Review Stats**: Look at the "Shortest Event Interval" and "Average Estimation".

### Understanding the Results
*   **Polling Rate**: Gaming keyboards usually poll at 1000Hz (1ms). Standard office keyboards might poll at 125Hz (8ms).
*   **Scan Rate**: The internal speed at which the keyboard checks the matrix for key presses.
*   **Debounce Time**: A delay added by firmware to prevent one keypress from registering as two (chatter). High debounce settings (e.g., 20ms) can make a keyboard feel sluggish.

### Tips for Lower Latency
*   Use a keyboard with a **1000Hz (1ms)** or higher polling rate.
*   Connect directly to the motherboard USB port, not a hub.
*   Use "Game Mode" on your OS to prioritize input processing.
*   For mechanical keyboards, optical switches often have lower debounce times than traditional mechanical contacts.
        `,
        requires: ['keyboard']
    },
    {
        slug: 'aim-trainer',
        title: 'Aim Trainer',
        description: 'Improve your mouse accuracy and reaction time with our interactive aim trainer.',
        category: 'Aim & Reflex',
        iconName: 'Target',
        keywords: ['aim trainer', 'fps practice', 'aiming drills', 'valorant aim practice', 'csgo aim trainer', 'mouse accuracy', 'flick shots', 'tracking trainer', 'aim trainer online'],
        longDescription: `
Sharpen your reflexes and master mouse precision with our Pro Aim Trainer. Designed for fans of FPS games like Valorant, CS2, Fortnite, and Apex Legends, this tool helps you build the muscle memory required for perfect headshots and consistent tracking. It runs directly in your browser with zero latency.

### How to Use the Aim Trainer
1.  **Select Mode**: Choose between "Standard", "Precision" (small targets), or "Time Attack".
2.  **Configure Settings**: Adjust target size, duration, and spawn rate if available.
3.  **Start**: Click "Start" to begin the session.
4.  **Aim & Click**: Click the targets as quickly and accurately as possible before they disappear.
5.  **Review Stats**: At the end, check your Accuracy %, Average Time to Kill (TTK), and Score.

### Training Modes
*   **Flick Practice**: React to targets appearing in random locations. Great for AWPing or holding angles.
*   **Precision Drills**: Targets get smaller over time, forcing you to be micro-precise. ideal for tactical shooters like Valorant.
*   **Speed/Reflex**: Targets disappear quickly, testing your raw reaction time.

### Why Train Your Aim?
In high-stakes competitive play, mechanical skill is the baseline. 
*   **Consistency**: Aims trainers help you hit shots even on "bad days" by building robust neural pathways.
*   **Warm-up**: 10 minutes of aim training before queuing ranked can significantly improve your performance in the first match.
*   **Measurement**: Quantify your improvement over weeks and months.

### Tips for Improvement
*   **Focus on Accuracy First**: Speed comes naturally with confidence. Don't rush and miss.
*   **Find Your Sensitivity**: Use our sensitivity converter to ensure your training transfers to your game.
*   **Relax Your Hand**: Tension ruins fine motor control. Grip the mouse lightly.
        `,
        requires: ['mouse']
    },
    {
        slug: 'mouse-polling-rate-checker',
        title: 'Mouse Polling Rate Checker',
        description: 'Measure your mouse reporting frequency in Hz and check for consistency.',
        category: 'Gaming Utilities',
        iconName: 'Activity',
        keywords: ['mouse polling rate test', 'mouse hz check', 'mouse frequency tester', 'monitor polling rate'],
        longDescription: `
The Polling Rate of a mouse determines how often it reports its position to your computer. A higher polling rate means smoother and more responsive cursor movement, which is critical for gaming. Our tool allows you to test if your mouse is actually achieving its advertised speed (e.g., 1000Hz, 4000Hz, or 8000Hz).

### How to Check Your Polling Rate
1.  **Move Your Mouse**: Start moving your mouse continuously in circles or back and forth within the browser window.
2.  **Maintain Speed**: For accurate readings, move the mouse quickly and consistently. Slow movements may result in lower readings.
3.  **Analyze Data**: Watch the real-time "Current Hz" and "Average Hz" display.
4.  **Check Consistency**: Look at the graph to see if the rate is stable or fluctuating wildy.

### Common Polling Rates
*   **125 Hz**: Standard office mouse (8ms latency).
*   **500 Hz**: Older gaming mice or wireless power-saving mode (2ms latency).
*   **1000 Hz**: The standard for competitive gaming (1ms latency).
*   **4000/8000 Hz**: Enthusiast-grade high-performance mice (<0.25ms latency).

### FAQs
**Q: Why is my polling rate lower than 1000Hz?**
A: If you stop moving the mouse, the rate drops to 0. You must move it fast enough to saturate the USB report rate. Also, check if you have a "Low Power Mode" enabled in your mouse driver.
        `
    },
    {
        slug: 'cm-360-calculator',
        title: 'CM per 360° Calculator',
        description: 'Calculate the physical distance required to perform a full 360° turn in-game.',
        category: 'Gaming Utilities',
        iconName: 'Ruler',
        keywords: ['cm 360 calculator', 'mouse sensitivity distance', 'gaming mouse pad space', 'physical sensitivity'],
        longDescription: `
"CM/360" refers to the centimeters of physical mouse movement required to turn your character 360 degrees in-game. It is the universal language of sensitivity, allowing you to perfectly match your settings regardless of DPI, FoV, or game engine differences.

### How to Use
1.  **Select Game**: Choose your game from the supported list (e.g., Overwatch, Quake, Apex).
2.  **Enter DPI**: Input your mouse DPI.
3.  **Enter Sensitivity**: Input your in-game sensitivity.
4.  **Calculate**: The tool will show your cm/360.

### Why use cm/360?
*   **Mousepad Planning**: If your cm/360 is 50cm but your mousepad is only 30cm wide, you physically cannot turn around without lifting your mouse.
*   **Comparing Players**: A player with 20cm/360 (High Sens) plays very differently from someone with 60cm/360 (Low Sens).

### Typical Ranges
*   **Wait Aimers (High Sens)**: 10cm - 25cm / 360
*   **Hybrid (Mid Sens)**: 25cm - 45cm / 360
*   **Arm Aimers (Low Sens)**: 45cm - 80cm / 360
        `
    },
    {
        slug: 'fps-refresh-rate-calc',
        title: 'FPS & Refresh Rate Calculator',
        description: 'Analyze frame times and smoothness based on your monitor Hz and game FPS.',
        category: 'Gaming Utilities',
        iconName: 'Monitor',
        keywords: ['fps calculator', 'refresh rate check', 'frame time calculator', 'motion blur check'],
        longDescription: `
Understanding the relationship between your game's FPS (Frames Per Second) and your monitor's Refresh Rate (Hz) is key to a smooth experience. This calculator helps you visualize frame times, potential tearing, and input lag implications.

### How It Works
1.  **Enter Monitor Hz**: The refresh rate of your screen (e.g., 60, 144, 240).
2.  **Enter Game FPS**: Your average in-game frame rate.
3.  **Analyze**: We calculate the "Frame Time" (ms) and tell you if you are CPU/GPU bound or monitor bound.

### Key Concepts
*   **Bottleneck**: If FPS > Hz, your monitor is the bottleneck (wasted frames, but lower latency). If FPS < Hz, your PC is the bottleneck (stuttering visual).
*   **Screen Tearing**: Occurs when the GPU sends a frame while the monitor is currently drawing one.
*   **Frame Time**: The time it takes to render a single frame. 60 FPS = 16.6ms, 144 FPS = 6.9ms.
        `
    },
    {
        slug: 'reaction-time-test',
        title: 'Reaction Time Test',
        description: 'Test your visual reflexes and track your best reaction speeds in milliseconds.',
        category: 'Aim & Reflex',
        iconName: 'Zap',
        keywords: ['reaction time test', 'reflex test', 'benchmarking reflexes', 'human benchmark', 'response time', 'gaming reflexes', 'input lag test', 'visual reaction speed'],
        longDescription: `
How fast can your brain process a visual signal and send a command to your hand? Our Reaction Time Test is the gold standard for measuring your raw neurological speed. Used by F1 drivers and eSports athletes, this simple red-light/green-light test provides a baseline for your cognitive readiness.

### How to Take the Test
1.  **Wait for Green**: The screen will be red. Wait for it to turn green.
2.  **Click Instantly**: As soon as it turns green, click the screen (or press any key).
3.  **Repeat**: Do this 5 times to get an accurate average.
4.  **Avoid Anticipation**: If you click too early, the attempt is voided.

### Analyzing Your Score
*   **< 150ms**: Superhuman / Cheater
*   **150 - 200ms**: Pro Gamer (Elite)
*   **200 - 250ms**: Average Gamer (Good)
*   **250 - 350ms**: Average Human
*   **> 400ms**: Tired / Distracted

### Tips to Improve
*   **Sleep**: Fatigue is the #1 killer of reaction time.
*   **Hydration**: Stay hydrated to keep neural pathways efficient.
*   **Warm-up**: Do a few practice runs to wake up your hands.
        `
    },
    {
        slug: 'double-click-test',
        title: 'Mouse Double Click Test',
        description: 'Detect if your mouse is suffering from unintended double-clicking issues.',
        category: 'Mouse Skills',
        iconName: 'MousePointer2',
        keywords: ['mouse double click test', 'mouse chatter test', 'logitech double click fix', 'mouse button tester'],
        longDescription: `
"Double-clicking" or "Switch Chatter" is a common failure mode in gaming mice where a single physical press registers as two or more clicks in the computer. This can be disastrous in games (accidentally un-scoping) or work (opening files twice).

### How to Detect Issues
1.  **Click the Box**: Click the designated testing area 50-100 times.
2.  **Watch the Counter**: We count exactly how many 'mousedown' and 'mouseup' events occur.
3.  **Check Status**: If the count increments by 2 for a single click, it will flash RED, indicating a double-click fault.

### Why does this happen?
Mechanical switches use metal contacts. Over time, these contacts corrode or bend, causing them to signal "on-off-on" rapidly when pressed. This is common in Omron switches used in many popular mice.

### How to Fix
*   **Software**: Increase "Debounce Time" in your mouse driver.
*   **Hardware**: Replace the switches (soldering required) or blow compressed air under the button.
        `
    },
    {
        slug: 'keyboard-rollover-tester',
        title: 'Keyboard NKRO Tester',
        description: 'Test how many keys your keyboard can register simultaneously (N-Key Rollover).',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['nkro test', 'keyboard rollover test', 'key ghosting tester', 'gaming keyboard check'],
        longDescription: `
N-Key Rollover (NKRO) refers to the ability of a keyboard to correctly register every single key press, even if you smash accurate 10 keys (or all of them) at once. Standard office keyboards often have "2-Key Rollover" or "6-Key Rollover", meaning they fail if you press too many keys.

### How to Test NKRO
1.  **Focus the Window**: Click on the testing area.
2.  **Press Keys**: Press as many keys as possible simultaneously (you can use your palms).
3.  **Check Display**: Valid keys will light up green. Ghosted keys will not show up.
4.  **Count**: Look at the "Max Detected" counter.

### Terminology
*   **6KRO**: Can only register 6 keys + modifiers (USB Limit on old protocols).
*   **NKRO**: Can register unlimited keys (Standard for gaming mechanical keyboards).
*   **Ghosting**: Only registers some checks and blocks others based on internal wiring matrix.
        `,
        requires: ['keyboard']
    },
    {
        slug: 'mouse-acceleration-checker',
        title: 'Mouse Acceleration Checker',
        description: 'Detect if mouse acceleration is affecting your aiming consistency.',
        category: 'Gaming Utilities',
        iconName: 'TrendingUp',
        keywords: ['mouse acceleration test', 'windows mouse accel check', 'raw input tester', 'gaming aim consistency'],
        longDescription: `
Mouse acceleration causes your cursor to move further if you move the mouse *faster*. While useful for touchpads, it is terrible for muscle memory in shooters. You want 1:1 movement—if you move your mouse 1 inch, the cursor should move X pixels, regardless of how fast you did it.

### How to Check for Acceleration
1.  **Place Mouse**: Put your mouse against the left edge of your keyboard.
2.  **Move Cursor**: Move the cursor to a specific point on the screen (e.g., the center crosshair) slowly.
3.  **Return**: Move the mouse back to the keyboard edge quickly.
4.  **Evaluate**: If the cursor ends up in a different spot than where it started, you have acceleration.

### How to Disable Acceleration
*   **Windows**: Go to "Mouse Settings" > "Additional Arguments" > "Pointer Options" and uncheck "Enhance Pointer Precision".
*   **In-Game**: Turn on "Raw Input" whenever available.
        `
    },
    {
        slug: 'sensitivity-randomizer',
        title: 'Sensitivity Randomizer',
        description: 'Variation-based aim practice tool to improve mouse control and adaptability.',
        category: 'Gaming Utilities',
        iconName: 'Shuffle',
        keywords: ['sensitivity randomizer', 'aim training variety', 'mouse control practice', 'fps training tool'],
        longDescription: `
The Sensitivity Randomizer is an advanced training technique popularized by aim coaches. The idea is to slightly change your sensitivity multiplier randomly every few seconds or minutes during training. This prevents your brain from relying on lazy muscle memory and forces it to actively track and correct hand movements.

### How to Use
1.  **Set Base Sens**: Enter your normal sensitivity.
2.  **Set Range**: Define the min/max variation (e.g., +/- 10%).
3.  **Set Interval**: How often should it change? (e.g., every 30 seconds).
4.  **Train**: Play your aim training benchmarks while the randomizer runs.

### Benefits
*   **Smoother Tracking**: Forces you to be reactive rather than predictive.
*   **Plateau Breaking**: Shocks the nervous system to adapt to new conditions.
*   **Adaptability**: Makes you comfortable with any mouse or pad.
        `
    },
    {
        slug: 'aim-consistency-tracker',
        title: 'Aim Consistency Tracker',
        description: 'Track your hits vs misses over time to analyze your aiming performance.',
        category: 'Aim & Reflex',
        iconName: 'LineChart',
        longDescription: `
Consistency is more important than peak performance. This simple tracker allows you to log your daily aim training scores (from Kovaaks, AimLab, or our own Aim Trainer) and visualize your progress trend line.

### How to Use
1.  **Input Data**: After a session, enter your Score and Accuracy %.
2.  **Add Tags**: Label the session (e.g., "Warmup", "GridShot", "Tracking").
3.  **Visualize**: See your 7-day and 30-day moving averages.

### Why Track Data?
You cannot improve what you do not measure. Seeing a visual graph helps you identify burnout (scores dropping) or improvement (scores rising), allowing you to adjust your training schedule smartly.
        `
    },
    {
        slug: 'crosshair-generator',
        title: 'Crosshair Generator',
        description: 'Design and customize your perfect crosshair with real-time preview.',
        category: 'Gaming Utilities',
        iconName: 'Crosshair',
        keywords: ['crosshair generator', 'custom crosshair maker', 'fps crosshair preview', 'valorant crosshair tool'],
        longDescription: `
Your crosshair is your primary interface with the game. Our Crosshair Generator allows you to build a custom reticle from scratch, adjusting every parameter to find the perfect balance of visibility and precision.

### Customization Options
*   **Style**: Choose between Cross, Dot, Circle, or shape.
*   **Color**: Full RGB picker to contrast against game backgrounds.
*   **Dimensions**: Adjust length, thickness, gap, and outline.
*   **Dynamic**: Preview how it looks when moving or firing (bloom).

### Copy & Paste
Once you are happy with your design, you can generate the "Crosshair Code" compatible with games like Valorant or Counter-Strike 2 (CS2) to import it directly into your game settings.
        `
    },
    {
        slug: 'sensitivity-match-analyzer',
        title: 'Sensitivity Match Analyzer',
        description: 'Compare two sensitivity profiles and see the exact percentage difference.',
        category: 'Gaming Utilities',
        iconName: 'Scale',
        keywords: ['sensitivity comparison', 'aim matching tool', 'mouse setup analyzer', 'precision sensitivity check'],
        longDescription: `
Switching mice or changing pads? The Sensitivity Match Analyzer helps you compare two different setups to see exactly how much faster or slower the new one is.

### How It Works
1.  **Setup A**: Enter DPI and Sens.
2.  **Setup B**: Enter new DPI and Sens.
3.  **Compare**: We calculate the eDPI delta and show you the % difference.

### Example
*   Old: 400 DPI * 2.5 = 1000 eDPI
*   New: 800 DPI * 1.2 = 960 eDPI
*   Result: Your new setup is **4% Slower**.
        `
    },
    {
        slug: 'input-lag-estimator',
        title: 'Input Lag Estimator',
        description: 'Estimate your total system input lag based on hardware and software factors.',
        category: 'Gaming Utilities',
        iconName: 'Timer',
        keywords: ['input lag calculator', 'system latency estimator', 'gaming delay check', 'monitor input lag'],
        longDescription: `
Input lag (or latency) is the delay between pressing a button and seeing the action happen on screen. In competitive gaming, lower input lag means you see enemies sooner and your shots register faster. Our estimator breaks down the latency pipeline of your PC to give you a theoretical minimum input lag.

### Components of Input Lag
1.  **Peripheral Lag**: The time for your mouse/keyboard to send data (Polling Rate).
2.  **PC Processing**: The time for the CPU/GPU to calculate the frame (Frame Time).
3.  **Display Lag**: The time for the monitor to receive and draw the frame (Refresh Rate + Pixel Response).
4.  **V-Sync**: If enabled, V-Sync adds significant queuing delay.

### How to Use
1.  **Hardware Stats**: Enter your mouse polling rate and monitor refresh rate.
2.  **Game FPS**: Enter your average FPS.
3.  **Settings**: Toggle V-Sync, G-Sync, or Reflex/Low Latency Mode.
4.  **Calculate**: See your "Total System Latency" estimate.

### Optimizing for Speed
*   **Disable V-Sync**: This is the single biggest reduction in lag.
*   **Maximize FPS**: Higher FPS lowers frame times, even beyond your monitor's refresh rate.
*   **Fullscreen Mode**: Always play in Exclusive Fullscreen for direct hardware access.
        `
    },
    {
        slug: 'motion-blur-test',
        title: 'Motion Blur Test',
        description: 'Visual test to detect ghosting and motion blur on your gaming monitor.',
        category: 'Gaming Utilities',
        iconName: 'Eye',
        keywords: ['motion blur test', 'monitor ghosting check', 'ufo test alternative', 'screen response time test'],
        longDescription: `
Motion blur and ghosting occur when your monitor's pixels cannot change colors fast enough to keep up with moving objects. This results in trails or smearing behind enemies, making them hard to track.

### How to Use This Test
1.  **Set Speed**: Use the slider to increase the speed of the moving UFO/object.
2.  **Track with Eyes**: Follow the object across the screen with your eyes.
3.  **Analyze**: Look at the trailing edge. Is it sharp? Or is there a faint "ghost" image following it?
4.  **Check Overdrive**: Go to your monitor's OSD menu and adjust "Overdrive" or "Response Time" settings. The trail should disappear or change.

### Understanding Ghosting vs Inverse Ghosting
*   **Ghosting**: A blur trail behind the object. (Response time too slow).
*   **Inverse Ghosting (Coronas)**: A bright halo behind the object. (Overdrive set too high, overshooting the voltage).

### Ideal Result
You want a moving image that looks almost as sharp as a static one, with no visible trails or halos. This ensures clarity in fast-paced flick shots.
        `
    },
    {
        slug: 'esports-warmup',
        title: 'Esports Warm-Up Tool',
        description: 'A 5-minute optimized drill combo to get you ready for competitive matches.',
        category: 'Gaming Utilities',
        iconName: 'Flame',
        keywords: ['gaming warmup', 'esports drills', 'valorant warmup', 'csgo hand warmup', 'reflex preparation'],
        longDescription: `
Going into a competitive match cold is a recipe for inconsistency. Our Esports Warm-Up Tool is a guided browser-based routine designed to wake up your hand-eye coordination, reaction time, and micro-adjustments in just 5 minutes.

### The Warm-Up Routine
1.  **Phase 1: Grid Clicking (1 min)**: Rapidly click static targets to wake up hand muscles.
2.  **Phase 2: Tracking (1 min)**: smooth following of a moving target to activate focus.
3.  **Phase 3: Reaction (1 min)**: Reacting to color changes to prime your neural pathways.
4.  **Phase 4: Flicking (1 min)**: Fast, large movements to stretch your wrist/arm range of motion.
5.  **Phase 5: Cool Down (1 min)**: Precision clicking to stabilize your grip.

### Why Warm Up?
*   **Blood Flow**: Increases temperature in hand muscles, reducing stiffness.
*   **Mental Prep**: Shifts your brain from "browsing mode" to "focus mode".
*   **Confidence**: Hitting targets before the game starts boosts your confidence in your aim.
        `
    },
    // PDF Tools
    {
        slug: 'word-counter',
        title: 'Word Counter & Text Analyzer',
        description: 'Count words, characters, sentences, and estimate reading time.',
        category: 'Text Tools',
        iconName: 'Type',
        keywords: ['word counter', 'character count', 'reading time calculator', 'text analyzer', 'online word count'],
        longDescription: `
Whether you are writing a blog post, an essay, or a tweet, hitting the right length is crucial. Our Word Counter is a privacy-focused text analyzer that provides real-time statistics on your writing.

### Features
*   **Words & Characters**: Instant count of words, characters (with/without spaces).
*   **Sentence & Paragraph**: Counts standard sentences and paragraph blocks.
*   **Reading Time**: Estimates how long it takes to read your text (avg. 200 wpm) and speak it (avg. 130 wpm).
*   **Keyword Density**: Shows the most frequent words to help with SEO or repetition checking.

### How to Use
1.  **Type or Paste**: Enter your text into the main text area.
2.  **Live Updates**: Statistics update instantly as you type.
3.  **Copy Stats**: Click to copy the full report if needed.

### Privacy First
Unlike many other online tools, our Word Counter processes all text locally in your browser. Your confidential documents, essays, or code snippets are **never** sent to our servers.
        `
    },
    // Placeholders for other tools mentioned in plan
    {
        slug: 'json-formatter',
        title: 'JSON Formatter',
        description: 'Validate, beautify, and minify JSON data.',
        category: 'Development Tools',
        iconName: 'Braces',
        keywords: ['json formatter', 'json beautifier', 'json validator', 'minify json', 'pretty print json'],
        longDescription: `
JSON (JavaScript Object Notation) is the backbone of modern data exchange. Our JSON Formatter is a powerful developer tool that instantly validates, formats, and minifies your JSON code.

### Features
*   **Validation**: Detects syntax errors, missing commas, or unclosed braces instantly.
*   **Beautify**: Indents messy "one-line" JSON into a readable, tree-like structure.
*   **Minify**: Removes all unnecessary whitespace to reduce file size for production.
*   **Privacy**: All processing happens in your browser. Your sensitive API keys or data are never uploaded to our servers.

### How to Use
1.  **Paste Data**: Paste your raw JSON string into the input box.
2.  **View Result**: The tool automatically formats it.
3.  **Copy**: Click the copy button to use the cleaned code.
        `
    },
    {
        slug: 'password-generator',
        title: 'Password Generator',
        description: 'Generate strong, secure passwords with custom settings.',
        category: 'Development Tools',
        iconName: 'KeyRound',
        keywords: ['password generator', 'secure password maker', 'strong password creator', 'offline password gen'],
        longDescription: `
Security starts with a strong password. Our specialized Password Generator creates cryptographically secure strings that are impossible to guess.

### Why Use a Random Generator?
Humans are predictable. We use birthdays, names, or simple patterns like "Password123". Hackers know this. A focused random generator creates high-entropy passwords that can take centuries to crack.

### Customization Options
*   **Length**: From 8 to 128 characters.
*   **Complexity**: include Uppercase, Lowercase, Numbers, and Symbols.
*   **Readability**: Option to exclude ambiguous characters like I, l, 1, O, 0.

### Security Note
This tool runs 100% client-side. The passwords you generate are created by your own browser and are never transmitted over the internet.
        `
    },
    {
        slug: 'jitter-click-test',
        title: 'Jitter Click Test',
        description: 'Test your clicking speed using the jitter clicking technique.',
        category: 'Mouse Skills',
        iconName: 'Zap',
        keywords: ['jitter click test', 'minecraft jitter clicking', 'click speed tester', 'pvp clicking speed'],
        longDescription: `
"Jitter Clicking" is a technique where a player tenses their forearm muscles to create a high-frequency vibration in their hand, allowing them to click the mouse button 10 to 14 times per second. This tool allows you to practice and measure this specific skill.

### How to Jitter Click safely
1.  **Grip**: Use a claw or fingertip grip.
2.  **Tension**: Flex your forearm (not your wrist) until your hand starts to shake.
3.  **Aim**: The hard part is aiming while vibrating. Use this tool to practice keeping the cursor steady.

### Health Warning
Jitter clicking can put strain on your arm muscles and tendons. Take frequent breaks and stop immediately if you feel pain. Do not practice for more than 5 minutes at a time.
        `,
        requires: ['mouse']
    },
    {
        slug: 'kohi-click-test',
        title: 'Kohi Click Test',
        description: 'Classic Minecraft-style click speed test.',
        category: 'Mouse Skills',
        iconName: 'MousePointer2',
        keywords: ['kohi click test', 'minecraft click test', 'kohi cps', 'minecraft pvp speed', 'classic cps test'],
        longDescription: `
The "Kohi Click Test" is a legendary benchmark in the Minecraft PvP community, originally hosted on the Kohi server. It is known for its strict click registration that mimics actual server conditions.

### Why plays Kohi Test?
*   **Validation**: It's the standard for proving you aren't using an autoclicker.
*   **Technique Practice**: Perfect for practicing "W-tapping" or strafing while clicking.
*   **Competitive Comparison**: Compare your raw CPS with thousands of other PvP players.

### Tips to Score Higher
*   Use a gaming mouse with light switches.
*   Try "Butterfly Clicking" (alternating two fingers) if your server allows it.
*   Keep your hand relaxed between bursts.
        `,
        requires: ['mouse']
    },
    {
        slug: 'spacebar-counter',
        title: 'Spacebar Counter',
        description: 'Test how fast you can hit your spacebar.',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['spacebar counter', 'spacebar speed test', 'how many spacebars in a second', 'keyboard speed test'],
        longDescription: `
Your thumb is your strongest finger, but how fast is it? The Spacebar Speed Test measures how many times you can press the Space key within a set time limit.

### Uses for this test
*   **Rhythm Games**: Games like OSU! or Friday Night Funkin' often require rapid spacebar mashing.
*   **Jump Mechanics**: In movement games (Bunny Hopping), precise and fast spacebar usage is key.
*   **Stress Relief**: Sometimes you just need to smash a big button.

### Challenge
The world record for spacebar hits in 5 seconds is over 58. Can you beat it?
        `,
        requires: ['keyboard']
    },
    {
        slug: 'butterfly-click-test',
        title: 'Butterfly Click Test',
        description: 'Measure your CPS using the butterfly clicking method.',
        category: 'Mouse Skills',
        iconName: 'UnfoldHorizontal',
        keywords: ['butterfly click test', 'butterfly clicking cps', 'double click mouse test', 'minecraft clicking method'],
        longDescription: `
Butterfly Clicking involves using two fingers (usually index and middle) to alternately tap the left mouse button. Because you are using two fingers, you can technically double your click speed compared to normal clicking.

### Requirements
*   **Mouse Width**: You need a mouse wide enough to fit two fingers on one button (e.g., Glorious Model O, Logitech G Pro).
*   **Switch Type**: Works best on mechanical switches that don't have aggressive debounce delay.

### Pros and Cons
*   **Pro**: Extremely high CPS (15 - 25+).
*   **Pro**: Less tiring than jitter clicking.
*   **Con**: Hard to aim while doing it.
*   **Con**: Can be flagged as cheating by some anti-cheat systems if your CPS is too consistent.
        `,
        requires: ['mouse']
    },
    // New Mouse Tools
    {
        slug: 'mouse-movement-tracker',
        title: 'Mouse Movement Tracker',
        description: 'Real-time visualization and measurement of your mouse path and total distance.',
        category: 'Mouse Skills',
        iconName: 'MousePointer2',
        keywords: ['mouse movement tracker', 'mouse path visualizer', 'total mouse distance', 'cursor movement check'],
        longDescription: `
Have you ever wondered how far your mouse travels in a day? Our Mouse Movement Tracker visualizes your cursor's journey and calculates the total physical distance you've scrolled and moved.

### Features
*   **Heatmap Visualization**: See which parts of the screen you use the most.
*   **Distance Calculation**: Tracks pixels moved and converts them to meters/feet based on your screen size (PPI).
*   **Real-time Path**: Draws a line following your cursor to show micro-movements.

### Use Cases
*   **Art & Design**: Analyze your stroke patterns.
*   **Gaming**: See if you favor looking left or right.
*   **Ergonomics**: Understand how much arm movement you are actually doing to prevent RSI.
        `
    },
    {
        slug: 'drag-click-test',
        title: 'Drag Click Test',
        description: 'Specialized test to measure speed and consistency using the drag clicking technique.',
        category: 'Mouse Skills',
        iconName: 'Zap',
        keywords: ['drag click test', 'minecraft drag clicking', 'roccat kain drag click', 'bloody a70 test', 'cps record'],
        longDescription: `
Drag Clicking is a specialized technique used primarily by Minecraft bridge-builders (Godbridging). It involves dragging a finger across the mouse button to create friction, causing the switch to bounce and register dozens of clicks in a single motion.

### How to use this Tool
1.  **Prepare your Mouse**: You need a mouse with a matte/grippy surface (or electrical tape).
2.  **Technique**: Slide your finger lightly but firmly from the back of the button to the front.
3.  **Measure**: Watch the "Max Short Burst CPS" to see your peak speed during the drag.

### Requirements
*   **Hardware**: Mice like Roccat Kain, Bloody A70, or Glorious Model O are famous for this.
*   **Software**: You MUST lower the "Debounce Time" to 0ms or 4ms in your mouse software, otherwise the clicks will be blocked.
        `
    },
    {
        slug: 'mouse-durability-test',
        title: 'Mouse Durability Test',
        description: 'Stress test your mouse buttons to check for registration issues or wear.',
        category: 'Mouse Skills',
        iconName: 'Activity',
        keywords: ['mouse durability test', 'mouse click life test', 'switch failure checker', 'mouse button stress test'],
        longDescription: `
Gaming mice take a beating. Use this Durability Test to check if your switches are starting to fail. This tool is designed to catch "missed clicks" or "release failures" where the mouse stops dragging even though you are still holding the button.

### How to Test
1.  **Rapid Fire**: Click as fast as you can. We count every 'mousedown' and 'mouseup'. If the numbers don't match, a click was dropped.
2.  **Hold Test**: Click and hold the button for 10 seconds. If the box turns red or flashes, your switch has a "contact release" issue.
3.  **Drag Test**: Drag the box around the screen. If it drops without you letting go, your switch is faulty.
        `
    },
    {
        slug: 'left-right-click-test',
        title: 'Left vs Right Click Test',
        description: 'Compare the speed and reaction time of your left and right mouse buttons.',
        category: 'Mouse Skills',
        iconName: 'Mouse',
        keywords: ['left right click test', 'mouse button comparison', 'dual click speed', 'dexterity test'],
        longDescription: `
In many games (like MOBAs), you use the Right Mouse Button (RMB) just as much as the Left (LMB). However, most people have a weaker middle finger. This test benchmarks the speed difference between your two fingers.

### The Challenge
1.  **Phase 1 (LMB)**: Click the left box as fast as possible for 10 seconds.
2.  **Phase 2 (RMB)**: Click the right box as fast as possible for 10 seconds.
3.  **Result**: See the % difference in speed. 

### Training Tip
If your RMB is significantly slower (>15%), try practicing "Butterfly Clicking" or specific finger isolation exercises to balance your hand dexterity.
        `
    },
    {
        slug: 'mouse-accuracy-trainer',
        title: 'Mouse Accuracy Trainer',
        description: 'Improve your precision by clicking targets that appear and disappear.',
        category: 'Aim & Reflex',
        iconName: 'Target',
        keywords: ['mouse accuracy trainer', 'precision clicking test', 'mouse control game', 'aim training online'],
        longDescription: `
Speed is nothing without accuracy. Our Mouse Accuracy Trainer forces you to slow down and hit small targets precisely. This is the best warm-up for tactical shooters like CS2 or Valorant where headshots are the only thing that matters.

### Settings
*   **Target Size**: "Tiny" (Headshot), "Small", "Medium" (Body).
*   **Duration**: How long targets stay on screen.
*   **Penalty**: Deduct points for missing a click? (Hard mode).

### Goal
Aim for >95% accuracy. It is better to click slowly and hit the target than to click fast and miss.
        `
    },
    {
        slug: 'flick-shot-trainer',
        title: 'Flick Shot Trainer',
        description: 'Practice fast target snapping (flicking) to improve your muscle memory.',
        category: 'Aim & Reflex',
        iconName: 'Zap',
        keywords: ['flick shot trainer', 'target snapping practice', 'fps flick training', 'valorant aim practice', 'mouse muscle memory'],
        longDescription: `
"Flicking" is the act of snapping your crosshair from a neutral position to a target instantly. It relies entirely on muscle memory. This trainer resets your cursor to the center after every shot, forcing you to practice the flick motion repeatedly.

### How to Train Flicks
1.  **Keep Cursor Centered**: Always return to the middle.
2.  **Eyes First**: Look at the target with your eyes before moving your hand.
3.  **One Motion**: Try to hit the target in a single, smooth swipe. Do not micro-adjust at the end.
4.  **Reset**: The faster you can flick and reset, the better your multi-kill potential becomes.
        `
    },
    {
        slug: 'tracking-trainer',
        title: 'Tracking Trainer',
        description: 'Practice keeping your crosshair on a moving target for sustained periods.',
        category: 'Aim & Reflex',
        iconName: 'Target',
        keywords: ['mouse tracking trainer', 'fps tracking practice', 'smooth aim training', 'moving target practice'],
        longDescription: `
"Tracking" is the ability to keep your crosshair stuck to a moving target. It is essential in games with high Time-to-Kill (TTK) like Apex Legends, Overwatch 2, or Quake. Our Tracking Trainer helps you develop smooth, continuous mouse control.

### Training Drills
*   **Smooth Pursuit**: A target moving at constant speed. Great for learning basic mouse feel.
*   **Direction Changes**: The target changes direction unpredictably. Tests your reactivity.
*   **Strafing Sim**: Mimics an enemy AD-AD strafing pattern, the hardest movement to track.

### Tips for Better Tracking
*   **Eye Focus**: Look at the target, not your crosshair.
*   **Smoothness > Speed**: Avoid jittery movements. Try to make your mouse movement flow like water.
*   **Predictive vs Reactive**: Learn when to predict a path (like a jump arc) versus reacting to a strafe.
        `
    },
    {
        slug: 'circle-click-test',
        title: 'Circle Click Test',
        description: 'A variation of CPS test where targets appear in a circular pattern.',
        category: 'Mouse Skills',
        iconName: 'MousePointer2',
        keywords: ['circle click test', 'mouse dexterity test', 'circular cps check', 'aim coordination test'],
        longDescription: `
Combine raw clicking speed with circular motion control. In the Circle Click Test, you must click targets that appear in a rotating pattern (or static circle). This mimics the motion of checking corners in FPS games or selecting units in RTS games.

### Why Practice This?
Most people can click fast in a straight line. Clicking fast while moving your mouse in an arc requires much finer wrist control. This test highlights "dead zones" in your range of motion where your clicking speed might drop due to awkward wrist angles.
        `
    },
    {
        slug: 'mouse-trail-visualizer',
        title: 'Mouse Trail Visualizer',
        description: 'Visualize your mouse cursor path with customizable trail effects.',
        category: 'Mouse Skills',
        iconName: 'Mouse',
        keywords: ['mouse trail visualizer', 'cursor path effect', 'mouse path generator', 'cursor art tool'],
        longDescription: `
Turn your mouse movement into digital art. The Mouse Trail Visualizer draws a persistent line following your cursor, allowing you to see the "shape" of your movement.

### Features
*   **Trail Length**: Short tail or infinite canvas?
*   **Color Dynamics**: Rainbow mode, velocity-based color (red = fast, blue = slow), or solid.
*   **Smoothing**: See raw input vs smoothed input.

### Analysis Use
Gamers use this to check for "angle snapping" or "prediction" in their mouse sensor. If you try to draw a circle and it looks like a square or has perfectly straight lines, your mouse might have software correction enabled (which is bad for aiming).
        `
    },
    {
        slug: 'dpi-analyzer',
        title: 'DPI Analyzer',
        description: 'Measure your actual hardware DPI by moving your mouse a fixed distance.',
        category: 'Gaming Utilities',
        iconName: 'Activity',
        keywords: ['dpi analyzer', 'mouse dpi test', 'hardware dpi measure', 'true dpi calculator'],
        longDescription: `
Manufacturers claim a mouse has "800 DPI", but in reality, it might be 780 or 820. This "DPI Deviation" affects your sensitivity. Our Analyzer helps you find the *true* DPI of your unit.

### How to Measure
1.  **Mark a Distance**: Put a ruler on your mousepad. Mark a start point and end point (e.g., 10cm).
2.  **Input Target**: Enter the distance (10cm) into the tool.
3.  **Move**: Click the red target and move your mouse *physically* exactly 10cm.
4.  **Result**: We count the pixels moved and calculate the real DPI.

### Why it matters?
If you copy a pro player's config but your mouse has +10% DPI deviation, your sensitivity will be 10% faster than theirs, making the copy useless.
        `
    },
    // New Keyboard Tools
    {
        slug: 'typing-speed-test',
        title: 'Typing Speed Test',
        description: 'Measure your Words Per Minute (WPM) and typing accuracy.',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['typing speed test', 'wpm test', 'typing accuracy check', 'online typing tutor', 'keyboard speed'],
        longDescription: `
Type faster and with fewer errors. Our Typing Speed Test provides a clean, distraction-free environment to benchmark your WPM (Words Per Minute).

### Metrics Tracked
*   **WPM**: Standard calculation (1 word = 5 characters).
*   **Raw WPM**: Speed without penalty for errors.
*   **Accuracy**: Percentage of correct keystrokes.
*   **Consistency**: Variance in your typing rhythm.

### Improving WPM
*   **Touch Typing**: Use all 10 fingers. Do not look at the keyboard.
*   **Rhythm**: It is better to type at a constant steady pace than to burst and pause.
*   **Accuracy First**: Backspacing kills speed. Slow down to type correctly, and speed will follow.
        `
    },
    {
        slug: 'key-ghosting-test',
        title: 'Key Ghosting Test',
        description: 'Check if your keyboard can register multiple keys without interference.',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['key ghosting test', 'keyboard ghosting checker', 'multiple key press test', 'gaming keyboard ghosting'],
        longDescription: `
"Ghosting" happens when you press two keys (e.g., 'W' and 'A') and a 3rd key you didn't press gets registered, or a 3rd key you *did* press gets ignored. This is a limitation of cheaper membrane keyboards wiring.

### The Test
Press common gaming combinations like:
*   **W + A + Space** (Jump strafe left)
*   **W + Shift + R** (Running reload)
*   **Ctrl + Shift + Esc** (Task manager)

If any key doesn't light up on screen, your keyboard has ghosting issues on that "matrix cluster".
        `
    },
    {
        slug: 'key-rollover-test',
        title: 'Key Rollover Test',
        description: 'Test the maximum number of simultaneous key presses your keyboard supports.',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['key rollover test', 'keyboard rollover check', '6key rollover', 'nkro tester'],
        longDescription: `
Similar to ghosting, "Rollover" is the *limit* of keys you can press at once.
*   **2KRO**: Only 2 keys guaranteed.
*   **6KRO**: 6 keys (Common USB limit).
*   **NKRO**: Unlimited keys.

### How to use
Smash both your palms on the keyboard. If you see less than 6 keys light up, you likely have a basic office keyboard that will hinder you in complex games like Fortnite or WoW.
        `
    },
    {
        slug: 'keyboard-heatmap',
        title: 'Keyboard Heatmap',
        description: 'Visualize which keys you press most frequently during a session.',
        category: 'Keyboard Skills',
        iconName: 'BarChart3',
        keywords: ['keyboard heatmap', 'key press visualizer', 'typing pattern analysis', 'key usage tracker'],
        longDescription: `
This tool runs in the background while you type or game on this page. It builds a visual "Heatmap" showing your most used keys. Hotter colors (Red) = More presses.

### Use Cases
*   **Layout Optimization**: Moving your most used spell/skill to a closer key.
*   **Ergonomics**: Seeing if you over-use your pinky finger (Shift/Ctrl).
*   **Fun**: Just seeing what your "interaction fingerprint" looks like.
        `
    },
    {
        slug: 'switch-sound-test',
        title: 'Switch Sound Test',
        description: 'Compare different mechanical switch sound profiles (Blue, Brown, Red, etc.).',
        category: 'Keyboard Skills',
        iconName: 'Activity',
        keywords: ['mechanical keyboard sound test', 'keyboard switch sounds', 'cherry mx blue vs red', 'keyboard clicks'],
        longDescription: `
Building a custom keyboard? The sound is the most subjective part. We have recorded high-quality audio samples of the most popular mechanical switches so you can hear the difference before you buy.

### Switch Types
*   **Clicky (Blue/Green)**: Loud, tactile "click" sound. Great for typing, loud for roommates.
*   **Tactile (Brown/Clear)**: A bump you can feel, but no loud click. A quiet middle ground.
*   **Linear (Red/Yellow/Black)**: Smooth travel with no bump. Silent and fast. Best for gaming.
*   **Silent Switches**: Dampened stems for near-silent operation in offices.
        `
    },
    {
        slug: 'actuator-force-test',
        title: 'Actuator Force Test',
        description: 'Educational tool explaining key actuation force and feeling.',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['actuation force test', 'keyboard switch weight', 'gateron yellow force', 'cherry mx actuation'],
        longDescription: `
"Actuation Force" is how hard you have to press a key for it to register. It is measured in grams (g) or centinewtons (cN).

### Common Weights
*   **Light (35g - 45g)**: Cherry MX Red, Speed Silver. Fast, but potential for accidental presses. Good for gaming.
*   **Medium (55g - 65g)**: Cherry MX Blue, Brown. Good balance for typing accuracy.
*   **Heavy (70g - 80g+)**: Cherry MX Black, Green. Requires intentional force. Reduces typos but can fatigue fingers.

Use this guide to understand what "60g Actuation" actually feels like compared to common household items (like pressing a coin).
        `
    },
    {
        slug: 'key-wobble-test',
        title: 'Key Wobble Test',
        description: 'Visual guide to help you check the stem stability of your keycaps.',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['key wobble test', 'switch stem stability', 'keyboard build quality', 'custom keyboard check'],
        longDescription: `
High-end keyboards feel "solid". Cheap ones feel "rattly". This is often due to Key Wobble—the side-to-side movement of the keycap while pressing it.

### How to Check
1.  **Rest Finger**: Place your finger lightly on a key without pressing it.
2.  **Wiggle**: Try to move the keycap North/South and East/West.
3.  **Visual Grade**: Compare your movement to our reference animations (Minimal, Average, Poor).

Box Switches (like Kailh Box) usually have much less wobble than standard cross-stem switches.
        `
    },
    {
        slug: 'macro-delay-tester',
        title: 'Macro Delay Tester',
        description: 'Measure the precise time delay between consecutive key presses.',
        category: 'Keyboard Skills',
        iconName: 'Clock',
        keywords: ['macro delay test', 'keyboard input speed', 'macro timing checker', 'gaming macro latency'],
        longDescription: `
When creating macros for games (e.g., a "super-jump" script), timing is everything. If the delay between "Jump" and "Crouch" is too fast, the game ignores it. If too slow, the trick fails.

### Function
This tool logs every key release and key press with millisecond precision.
1.  **Press Combo**: Perform your macro or combo.
2.  **Analyze Log**: See the exact "Delta Time" (ms) between actions.
3.  **Adjust**: Tweak your software macro to match the required timing.
        `
    },
    // New Advanced Gaming Tools
    {
        slug: 'crosshair-overlay',
        title: 'Crosshair Overlay',
        description: 'Preview and design custom crosshair shapes with advanced options.',
        category: 'Gaming Utilities',
        iconName: 'Crosshair',
        keywords: ['crosshair overlay', 'custom gaming crosshair', 'static crosshair maker', 'external crosshair tool'],
        longDescription: `
Sometimes games have terrible crosshair options, or no crosshair at all (like in Hardcore modes). A Crosshair Overlay allows you to design a static PNG or CSS overlay to stick on the center of your monitor.

### Features
*   **Import Images**: Use funny custom images or pro-designed reticles.
*   **Opacity Control**: Make it see-through to not block vision.
*   **Position Tweak**: Pixel-perfect centering adjustment (X/Y axis) for monitors with odd resolutions.
        `
    },
    {
        slug: 'recoil-pattern-trainer',
        title: 'Recoil Pattern Trainer',
        description: 'Interactive trainer for learning and countering game-specific recoil patterns.',
        category: 'Aim & Reflex',
        iconName: 'Target',
        keywords: ['recoil trainer', 'csgo recoil practice', 'valorant recoil pattern', 'rust recoil trainer', 'spray control tool'],
        longDescription: `
In tactical shooters like CS:GO or Rust, bullets don't go straight—they follow a fixed "Recoil Pattern". Meaning, to shoot straight, you must move your mouse in the *opposite* pattern (Recoil Control).

### How to use
1.  **Select Weapon**: Choose a gun profile (e.g., AK-47, M4A1).
2.  **Toggle Ghost**: Turn on the "Ghost Mouse" to see the perfect path you should take.
3.  **Practice**: Click and hold to shoot. Try to keep your cursor on the center target while counter-acting the gun's kick.
4.  **Score**: We calculate how closely your mouse path counteracted the recoil pattern.
        `
    },
    {
        slug: 'grenade-calculator',
        title: 'Grenade Trajectory Calc',
        description: 'Visualize physics-based grenade trajectories for tactical shooters.',
        category: 'Gaming Utilities',
        iconName: 'Gamepad2',
        keywords: ['grenade trajectory calculator', 'csgo nade lineups', 'valorant lineup maker', 'physics arc calculator'],
        longDescription: 'Never miss a lineup again. Our Grenade Trajectory Calculator uses realistic physics to simulate how throwables move through the air. Visualize different angles and speeds to find the perfect arc for your tactical equipment.'
    },
    {
        slug: 'peekers-advantage-simulator',
        title: 'Peekers Advantage Sim',
        description: 'Interactive simulation of how latency affects peeking in tactical games.',
        category: 'Aim & Reflex',
        iconName: 'MonitorPlay',
        keywords: ['peekers advantage', 'latency simulation', 'ping advantage checker', 'tactical shooter netcode'],
        longDescription: 'Understand the math behind the "peek". Our simulator shows you how pings and server tick rates affect who sees who first. Use this interactive tool to learn when to hold an angle and when to be the one pushing based on network conditions.'
    },
    {
        slug: 'sound-direction-test',
        title: 'Sound Direction Test',
        description: 'Test your ability to identify 3D audio cues and positional sound.',
        category: 'Aim & Reflex',
        iconName: 'Activity',
        keywords: ['3d audio test', 'positional sound test', 'gaming audio check', 'hifi sound direction'],
        longDescription: 'Positional awareness is just as important as aim. Our Sound Direction Test plays 3D audio cues at different angles to help you calibrate your headset and train your brain to identify the exact location of enemy footsteps and gunshots.'
    },
    // New SEO Tools
    {
        slug: 'meta-tag-generator',
        title: 'Meta Tag Generator',
        description: 'Generate SEO-friendly meta tags for your website to improve social sharing and search ranking.',
        category: 'SEO & Web',
        iconName: 'Sparkles',
        keywords: ['meta tag generator', 'seo meta tags', 'html meta generator', 'og tag creator', 'website seo tool', 'google search meta tags', 'social media tags maker'],
        longDescription: 'Boost your search engine visibility and social media presence with our comprehensive Meta Tag Generator. This tool allows you to create perfectly formatted title tags, meta descriptions, and Open Graph (OG) tags that control how your content appears on search engines and social platforms like Facebook and LinkedIn.\n\n### Why use our Meta Tag Generator?\n- **SEO Optimization**: Well-crafted meta tags are the first thing search engines look at. Our tool ensures your tags follow length recommendations to avoid truncation.\n- **Higher CTR**: Beautifully presented search results attract more clicks. Preview exactly how your snippet will look.\n- **Social Engagement**: Don\'t let platforms guess your social image. Set custom OG tags for maximum impact.\n\n### How it works:\nSimply enter your page title, description, and keywords. Choose your preferred social image and let the tool generate the exact HTML code you need to copy-paste into your website\'s <head> section.'
    },
    {
        slug: 'robots-txt-generator',
        title: 'Robots.txt Generator',
        description: 'Create a robots.txt file to guide search engine crawlers on your site.',
        category: 'SEO & Web',
        iconName: 'Bot',
        keywords: ['robots.txt generator', 'robots.txt creator', 'search crawler guide', 'website robots file', 'crawl control tool', 'googlebot disallow'],
        longDescription: 'Control the indexing behavior of search engine crawlers with our advanced Robots.txt Generator. This tool helps you manage your website\'s "crawl budget" by directing bots like Googlebot, Bingbot, and others to exactly where you want them to go—and more importantly, where you don\'t.\n\n### Key Features:\n- **Individual Bot Control**: Set custom rules for specific user-agents.\n- **Sitemap Integration**: Automatically include your sitemap URL for better discovery.\n- **Disallow Paths**: Easily block sensitive folders like /admin/ or /private/ from being indexed.\n- **Crawl Delay Support**: Prevent small servers from being overwhelmed by aggressive crawlers.\n\n### Is Robots.txt required for SEO?\nWhile not strictly required, it is a best practice for complex sites. It prevents duplicates and ensures search engines spend time on your most valuable pages rather than internal system files.'
    },
    // Unit Converters
    {
        slug: 'length-converter',
        title: 'Length Converter',
        description: 'Convert between different units of length including pixels, inches, cm, and meters.',
        category: 'Unit Converters',
        iconName: 'Ruler',
        keywords: ['length converter', 'inches to cm', 'px to inches', 'meter conversion', 'online ruler tool'],
        longDescription: `
Working across different measurement systems? Our Length Converter instantly converts between metric, imperial, and digital units.

### Supported Units
*   **Metric**: Millimeters, Centimeters, Meters, Kilometers
*   **Imperial**: Inches, Feet, Yards, Miles
*   **Digital**: Pixels (requires DPI/PPI input)

### Common Use Cases
*   **Web Design**: Convert px to inches for print layouts.
*   **Engineering**: Switch between metric and imperial blueprints.
*   **Fitness**: Convert running distances (km to miles).
        `
    },
    {
        slug: 'weight-converter',
        title: 'Weight Converter',
        description: 'Convert between kg, grams, pounds, and ounces instantly.',
        category: 'Unit Converters',
        iconName: 'Scale',
        keywords: ['weight converter', 'kg to lbs', 'grams to ounces', 'lbs to kg converter', 'mass converter'],
        longDescription: `
Quick and accurate weight conversions for cooking, shipping, or fitness tracking.

### Supported Units
*   **Metric**: Milligrams, Grams, Kilograms, Metric Tons
*   **Imperial**: Ounces, Pounds, Stones

### How to Use
1.  Enter the value in the "From" field.
2.  Select the source unit.
3.  Select the target unit.
4.  Result is shown instantly.
        `
    },
    {
        slug: 'case-converter',
        title: 'Case Converter',
        description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, and more.',
        category: 'Text Tools',
        iconName: 'Type',
        keywords: ['case converter', 'uppercase to lowercase', 'camelcase generator', 'title case converter', 'text formatter'],
        longDescription: `
Transform text casing instantly for any purpose—from coding to copywriting.

### Available Formats
*   **UPPERCASE**: ALL CAPS FOR EMPHASIS
*   **lowercase**: no caps, minimalist style
*   **Title Case**: Every Word Capitalized
*   **Sentence case**: Only first letter capitalized.
*   **camelCase**: usedInJavaScript
*   **PascalCase**: UsedInCSharp
*   **snake_case**: used_in_python
*   **kebab-case**: used-in-urls

### Use Cases
*   **Developers**: Convert variable names between conventions.
*   **Writers**: Fix accidental caps-lock text.
*   **SEO**: Create URL-friendly slugs.
        `
    },
    {
        slug: 'qr-code-generator',
        title: 'QR Code Generator',
        description: 'Generate custom QR codes for URLs, text, or WiFi network settings.',
        category: 'Development Tools',
        iconName: 'QrCode',
        keywords: ['qr code generator', 'make qr code', 'free qr creator', 'wifi qr code', 'url to qr'],
        longDescription: `
Create scannable QR codes in seconds for any purpose.

### What Can You Encode?
*   **URLs**: Direct users to your website or social media.
*   **Plain Text**: Messages, contact info, or product details.
*   **WiFi Credentials**: Auto-connect guests to your network (SSID + Password).
*   **vCards**: Share your business card digitally.

### Customization
*   **Size**: From thumbnail to poster-sized.
*   **Error Correction**: Low to High (high allows logos in center).
*   **Download**: PNG, SVG, or PDF formats.

### Use Cases
* Restaurant menus, Event tickets, Product packaging, Business cards.
        `
    },
    {
        slug: 'base64-encoder-decoder',
        title: 'Base64 Encoder/Decoder',
        description: 'Easily encode text to Base64 or decode it back to plain text.',
        category: 'Development Tools',
        iconName: 'Braces',
        keywords: ['base64 encoder', 'base64 decoder', 'b64 converter', 'online base64 tool', 'decode base64 string'],
        longDescription: `
Base64 is a binary-to-text encoding scheme used to transmit data safely over text-only channels (like JSON or XML).

### How to Use
*   **Encode**: Paste plain text, click "Encode" to get Base64 string.
*   **Decode**: Paste Base64, click "Decode" to reveal original text.

### Common Uses
*   **Email Attachments**: MIME encoding.
*   **Data URLs**: Embedding images in CSS/HTML.
*   **API Tokens**: Many APIs use Base64 for auth headers.

### Privacy Note
Base64 is NOT encryption. It is just encoding. Anyone can decode it. Do not use it to hide secrets—use proper encryption instead.
        `
    },
    {
        slug: 'markdown-previewer',
        title: 'Markdown Previewer',
        description: 'Write Markdown and see the rendered HTML preview in real-time.',
        category: 'Development Tools',
        iconName: 'Eye',
        keywords: ['markdown previewer', 'online markdown editor', 'md to html preview', 'live markdown editor'],
        longDescription: `
Write clean Markdown and see it rendered as HTML in real-time. Perfect for GitHub README files, documentation, or blog drafts.

### Supported Syntax
*   **Headers**: # H1,  ## H2, ### H3
*   **Bold/Italic**: **bold**, *italic*, ***both***
*   **Lists**: Bullet points and numbered lists
*   **Links**: [text](url)
*   **Images**: ![alt](url)
*   **Code Blocks**: Inline \`code\` and fenced blocks
*   **Tables**: GitHub-flavored tables

### Export
Copy rendered HTML or download as .md file.
        `
    },
    {
        slug: 'gst-tax-calculator',
        title: 'GST/Tax Calculator',
        description: 'Calculate Goods and Services Tax with customizable percentage rates.',
        category: 'Finance',
        iconName: 'Calculator',
        keywords: ['gst calculator', 'tax calculator online', 'calculate gst percentage', 'sales tax tool', 'finance calculator'],
        longDescription: `
Calculate taxes quickly for business or personal use.

### Features
*   **Add Tax**: Enter price before tax, get total price.
*   **Remove Tax**: Enter price with tax, find original price.
*   **Custom Rate**: Set any tax % (GST, VAT, Sales Tax).

### Example
Product costs $100. Tax is 18%.
*   **Price with Tax**: $100 + 18% = $118
*   **Reverse**: $118 includes tax. Original = $100.
        `
    },
    {
        slug: 'loan-emi-calculator',
        title: 'Loan/EMI Calculator',
        description: 'Calculate your Equated Monthly Installment with beautiful amortisation charts.',
        category: 'Finance',
        iconName: 'Calculator',
        keywords: ['emi calculator', 'loan calculator', 'home loan emi', 'car loan calculator', 'mortgage payment tool'],
        longDescription: `
Plan your loan repayment with precision.

### Inputs
*   **Loan Amount**: Principal (e.g., $50,000)
*   **Interest Rate**: Annual % (e.g., 7.5%)
*   **Tenure**: Months or years (e.g., 5 years)

### Output
*   **Monthly EMI**: Exact payment amount.
*   **Total Interest**: How much extra you pay.
*   **Amortization Table**: Month-by-month breakdown of principal vs interest.

### Tip
Increasing tenure lowers EMI but increases total interest. Use the chart to find the sweet spot.
        `
    },
    {
        slug: 'age-calculator',
        title: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days based on your DOB.',
        category: 'Finance',
        iconName: 'Calendar',
        keywords: ['age calculator', 'calculate age from dob', 'how old am i', 'exact age finder', 'birthday calculator'],
        longDescription: `
Find your exact age in multiple formats.

### What You Get
*   **Years, Months, Days**: Precise age calculation.
*   **Total Days Lived**: Fun stat!
*   **Hours & Minutes**: How many hours old are you?
*   **Next Birthday**: Countdown timer.

### Use Cases
*   **Forms**: Quickly check if you meet age requirements.
*   **Fun**: Celebrate non-traditional milestones (e.g., 10,000 days old).
        `
    },
    {
        slug: 'pomodoro-timer',
        title: 'Pomodoro Timer',
        description: 'A premium, animated focus timer to boost your productivity using Pomodoro blocks.',
        category: 'Daily Tools',
        iconName: 'Clock',
        keywords: ['pomodoro timer online', 'focus timer', 'productivity tool', 'study timer', 'work sessions timer'],
        longDescription: `
The Pomodoro Technique is a time management system that uses a timer to break work into focused intervals (traditionally 25 minutes) separated by short breaks.

### How It Works
1.  **Work Session (25 min)**: Focus on a single task without distractions.
2.  **Short Break (5 min)**: Rest, stretch, or grab water.
3.  **After 4 Pomodoros**: Take a longer break (15-30 minutes).

### Why Use Pomodoro?
*   **Prevents Burnout**: Frequent breaks keep your mind fresh.
*   **Increases Focus**: Knowing you only need to focus for 25 minutes makes it easier to avoid procrastination.
*   **Tracks Productivity**: Count how many Pomodoros you complete per day.

### Our Features
*   **Custom Durations**: Change work/break lengths to suit your workflow.
*   **Notifications**: Audio alerts when sessions end.
*   **Stats**: See your daily/weekly Pomodoro count.
        `
    },
    {
        slug: 'time-zone-converter',
        title: 'Time Zone Converter',
        description: 'Compare time across different cities and time zones instantly.',
        category: 'Unit Converters',
        iconName: 'Clock',
        keywords: ['time zone converter', 'timezone calculator', 'world clock compare', 'est to ist', 'utc converter'],
        longDescription: `
Scheduling across time zones? Our converter makes it painless.

### Features
*   **Multi-Zone Comparison**: See multiple cities at once.
*   **DST Aware**: Automatically accounts for daylight saving time.
*   **Meeting Planner**: Find the best time to schedule calls with international teams.

### Common Conversions
*   **EST to IST**: Eastern US to India (usually +10.5 hours)
*   **PST to GMT**: Pacific US to London (usually +8 hours)
*   **AEST to CET**: Sydney to Central Europe (usually -8 hours)

### Pro Tip
Use this before scheduling international meetings to avoid waking someone up at 3 AM!
        `
    },
    {
        slug: 'color-palette-generator',
        title: 'Color Palette Generator',
        description: 'Create and export beautiful, harmonious color schemes for your projects.',
        category: 'Design & UI',
        iconName: 'Sparkles',
        keywords: ['color palette generator', 'color scheme maker', 'ui design colors', 'palette creator', 'brand color tool'],
        longDescription: 'Generate stunning color palettes with a single click. Our generator uses color theory to create harmonious schemes (Monochromatic, Analogous, Complementary) that you can export for use in CSS, SCSS, or design software like Figma and Photoshop.'
    },
    {
        slug: 'image-placeholder-generator',
        title: 'Image Placeholder Generator',
        description: 'Generate custom placeholder images for web development and design.',
        category: 'Development Tools',
        iconName: 'Monitor',
        keywords: ['image placeholder generator', 'dummy image maker', 'placeholder img creator', 'web design assets'],
        longDescription: 'Need a quick image for your wireframe? Our Placeholder Generator creates custom-sized images with your choice of text and background colors. Perfect for testing layouts before your final assets are ready.'
    },
    {
        slug: 'lorem-ipsum-generator',
        title: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text for your layouts and designs with custom lengths.',
        category: 'Text Tools',
        iconName: 'Type',
        keywords: ['lorem ipsum generator', 'placeholder text maker', 'dummy content creator', 'filler text tool'],
        longDescription: 'Generate professional-grade filler text. Whether you need a single paragraph or ten pages of text, our Lorem Ipsum generator provides clean, customizable placeholder content for your web and print designs.'
    },
    {
        slug: 'text-diff-checker',
        title: 'Text Diff Checker',
        description: 'Compare two pieces of text and highlight the differences between them.',
        category: 'Text Tools',
        iconName: 'Shuffle',
        keywords: ['text diff checker', 'compare text online', 'diff tool', 'text difference finder', 'compare two files'],
        longDescription: 'Identify every change between two versions of text. Our Diff Checker highlights additions, deletions, and modifications with color-coded side-by-side or unified views. Ideal for developers comparing code snippets or writers tracking draft changes.'
    },
    {
        slug: 'remove-duplicate-lines',
        title: 'Remove Duplicate Lines',
        description: 'Clean up your list by removing all duplicate lines instantly.',
        category: 'Text Tools',
        iconName: 'Trash2',
        keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines extractor', 'text cleaner online'],
        longDescription: 'De-clutter your data. This tool scans your input and removes every redundant line, leaving you with a clean, unique list. Whether you are managing email lists, CSV data, or code, our deduplicator handles large datasets instantly in your browser.'
    },
    {
        slug: 'tip-calculator',
        title: 'Tip Calculator',
        description: 'Quickly calculate tips and split the bill among multiple people.',
        category: 'Finance',
        iconName: 'Calculator',
        keywords: ['tip calculator', 'split the bill', 'calculate tip amount', 'restaurant tip tool', 'meal planner tool'],
        longDescription: 'Take the math out of your meal. Our Tip Calculator helps you quickly determine the appropriate gratuity and split the total cost among multiple people. Adjust percentages and see the breakdown per person in real-time.'
    },
    {
        slug: 'discount-calculator',
        title: 'Discount Calculator',
        description: 'Calculate the final price after applying discounts and taxes.',
        category: 'Finance',
        iconName: 'Tag',
        keywords: ['discount calculator', 'sale price calculator', 'percentage off tool', 'shopping tax calculator'],
        longDescription: 'Know exactly how much you are saving. Enter the original price and discount percentage to see the final sale price and the total amount saved. You can even add sales tax to get the final checkout total instantly.'
    },
    {
        slug: 'percentage-calculator',
        title: 'Percentage Calculator',
        description: 'Solve common percentage problems easily with this interactive tool.',
        category: 'Finance',
        iconName: 'Percent',
        keywords: ['percentage calculator', 'calculate increase decrease', 'percentage of a number', 'math tools online'],
        longDescription: 'Solve any percentage problem. Our calculator handles "percentage of", "what percent is X of Y", and "percentage increase/decrease" scenarios. A versatile tool for financial planning, academic research, and daily math requirements.'
    },
    {
        slug: 'stopwatch',
        title: 'Stopwatch & Lap Timer',
        description: 'Simple and accurate stopwatch for timing your tasks and activities.',
        category: 'Daily Tools',
        iconName: 'Timer',
        keywords: ['stopwatch online', 'lap timer', 'accurate timer', 'web stopwatch', 'track time online'],
        longDescription: 'A professional-grade stopwatch for all your timing needs. Features include lap tracking, split times, and a high-precision millisecond display. Ideal for workouts, cooking, studying, or measuring task durations with perfect accuracy.'
    },
    {
        slug: 'css-gradient-generator',
        title: 'CSS Gradient Generator',
        description: 'Create beautiful CSS gradients and copy the code for your projects.',
        category: 'Design & UI',
        iconName: 'Sparkles',
        keywords: ['css gradient generator', 'linear gradient maker', 'radial gradient tool', 'ui design gradients', 'copy css code'],
        longDescription: 'Design smooth CSS gradients with ease. Our interactive generator allows you to create linear and radial gradients with multiple color stops. Get instant CSS code that is cross-browser compatible for your web design projects.'
    },
    {
        slug: 'aspect-ratio-calculator',
        title: 'Aspect Ratio Calculator',
        description: 'Calculate the dimensions for different aspect ratios easily.',
        category: 'Design & UI',
        iconName: 'Monitor',
        keywords: ['aspect ratio calculator', 'screen ratio tool', 'image dimension calculator', '16:9 ratio finder', 'video scaling tool'],
        longDescription: 'Maintain perfect proportions for your images and videos. Our Aspect Ratio Calculator helps you determine the correct width or height for any given ratio like 16:9, 4:3, or custom dimensions. Essential for web designers and video editors.'
    },
    {
        slug: 'find-and-replace',
        title: 'Find and Replace',
        description: 'Search for specific text patterns and replace them with new content instantly.',
        category: 'Text Tools',
        iconName: 'Search',
        keywords: ['find and replace text', 'text replacer', 'search and replace online', 'batch text editor'],
        longDescription: 'Our Find and Replace tool allows you to quickly update large blocks of text. With support for case sensitivity and global replacement, you can efficiently fix typos, update variables, or refactor text content directly in your browser. All processing is local, ensuring your data never leaves your device.'
    },
    {
        slug: 'reverse-text',
        title: 'Reverse Text',
        description: 'Reverse the order of characters, words, or lines in your text.',
        category: 'Text Tools',
        iconName: 'Shuffle',
        keywords: ['reverse text', 'backwards text generator', 'reverse words', 'mirror text tool'],
        longDescription: 'Flip your text with our versatile Reverse Text tool. Whether you need to reverse every single character, reorder words in a sentence, or flip the sequence of lines in a list, this tool handles it all instantly. Perfect for creative writing, simple encryption, or data reformatting.'
    },
    {
        slug: 'whitespace-remover',
        title: 'Whitespace Remover',
        description: 'Clean up your text by removing extra spaces, tabs, and blank lines.',
        category: 'Text Tools',
        iconName: 'Type',
        keywords: ['remove extra spaces', 'whitespace cleaner', 'trim text online', 'remove blank lines'],
        longDescription: 'Clean up messy text formatting with our Whitespace Remover. This tool helps you eliminate leading and trailing spaces, reduce multiple spaces into a single space, and remove empty lines. It is an essential utility for developers and writers who need to sanitize data before use.'
    },
    {
        slug: 'text-to-binary',
        title: 'Text to Binary Converter',
        description: 'Convert plain text into binary code and vice versa.',
        category: 'Text Tools',
        iconName: 'Braces',
        keywords: ['text to binary', 'binary translator', 'binary to text', 'ascii to binary converter'],
        longDescription: 'Translate between human-readable text and machine binary code (base-2). Our converter uses standard ASCII/UTF-8 encoding to turn characters into 8-bit binary strings. Ideal for educational purposes, basic encoding, or understanding computer data representation.'
    },
    {
        slug: 'random-string-generator',
        title: 'Random String Generator',
        description: 'Generate secure, random text strings with customizable character sets.',
        category: 'Text Tools',
        iconName: 'Sparkles',
        keywords: ['random string generator', 'random text maker', 'generate random characters', 'string generator for testing'],
        longDescription: 'Create unpredictable, random hair-strings for testing, identifiers, or temporary passwords. Customize the length and include uppercase letters, lowercase letters, numbers, and special symbols. Our generator uses cryptographically secure methods in your browser for maximum safety.'
    },
    {
        slug: 'text-to-slug',
        title: 'Text to Slug Converter',
        description: 'Convert any text into a URL-friendly slug.',
        category: 'Text Tools',
        iconName: 'Link',
        keywords: ['text to slug', 'url slug generator', 'permalink creator', 'seo friendly url generator'],
        longDescription: 'Create clean, SEO-friendly URLs from your titles or text. This tool removes special characters, converts spaces to hyphens, and maintains a lowercase format, ensuring your links are professional and compatible across all web platforms.'
    },
    {
        slug: 'morse-code-translator',
        title: 'Morse Code Translator',
        description: 'Translate text to Morse code and decode Morse back to text.',
        category: 'Text Tools',
        iconName: 'Activity',
        keywords: ['morse code translator', 'text to morse', 'morse code decoder', 'international morse code'],
        longDescription: 'Communicate in the timeless language of dots and dashes. Our translator supports standard International Morse Code, allowing you to encode messages for signaling or decode incoming signals back into readable text instantly.'
    },
    {
        slug: 'zalgo-text-generator',
        title: 'Zalgo Text Generator',
        description: 'Generate "glitchy" or "corrupted" text for creative effects.',
        category: 'Text Tools',
        iconName: 'Zap',
        keywords: ['zalgo text', 'glitch text generator', 'corrupted text maker', 'distorted text generator'],
        longDescription: 'Create the iconic "void" or "glitch" text effect using Zalgo characters. This tool stacks diacritical marks above, below, and across your text to create a chaotic, visually striking appearance often used in social media and digital art.'
    },
    {
        slug: 'upside-down-text',
        title: 'Upside Down Text',
        description: 'Flip your text 180 degrees for a funny upside-down look.',
        category: 'Text Tools',
        iconName: 'RefreshCw',
        keywords: ['upside down text', 'flip text generator', 'backwards text maker', 'inverted text tool'],
        longDescription: 'Rotate your messages 180 degrees. This tool uses specialized Unicode characters to simulate an upside-down appearance, making it perfect for creative social media posts, fun messages, or hidden notes.'
    },
    {
        slug: 'small-text-generator',
        title: 'Small Text Generator',
        description: 'Convert text into tiny caps, superscript, or subscript formats.',
        category: 'Text Tools',
        iconName: 'Type',
        keywords: ['small text generator', 'tiny caps maker', 'superscript generator', 'subscript text tool'],
        longDescription: 'Make your text tiny. Whether you want sá´ á´€ÊŸÊŸ á´„á´€á´˜sá´ , Ê¹áµ˜áµ–áµ‰Ê³Ë¢áµ–Ë³áµ¦áµ‰Ê¸áµ—, or â‚›â‚¦â‚•â‚›â‚‘â‚™â‚²â‚—, our generator uses Unicode to provide stylized small formats suitable for bio headers or scientific notation.'
    },
    {
        slug: 'html-entity-encoder',
        title: 'HTML Entity Encoder/Decoder',
        description: 'Encode special characters to HTML entities or decode them back.',
        category: 'Text Tools',
        iconName: 'Code',
        keywords: ['html entity encoder', 'html character codes', 'encode special characters', 'decode html entities'],
        longDescription: 'Safely display special characters in your HTML. This tool converts characters like <, >, and & into their entity equivalents (&lt;, &gt;, &amp;), ensuring your code is valid and your content displays correctly in all browsers.'
    },
    {
        slug: 'text-to-hex-converter',
        title: 'Text to Hex Converter',
        description: 'Convert plain text into its Hexadecimal (Hex) representation.',
        category: 'Text Tools',
        iconName: 'Braces',
        keywords: ['text to hex', 'hexadecimal converter', 'string to hex online', 'hex to string decoder'],
        longDescription: 'Convert your text into raw hexadecimal values. Each character is transformed into its UTF-8 hex code, providing a clear view of how data is stored at a low level. Useful for debugging, protocol analysis, or data encoding tasks.'
    },
    {
        slug: 'strip-html-tags',
        title: 'Strip HTML Tags',
        description: 'Remove all HTML tags from your code to get clean, plain text.',
        category: 'Text Tools',
        iconName: 'Eraser',
        keywords: ['strip html tags', 'remove html from text', 'clean plain text converter', 'html to text stripper'],
        longDescription: 'Extract pure content from your HTML code. This tool instantly identifies and removes all tags, attributes, and script blocks, leaving you with the original readable text. Perfect for cleaning up web scrapes or email content.'
    },
    {
        slug: 'markdown-to-text',
        title: 'Markdown to Text',
        description: 'Convert Markdown formatting into clean, plain text.',
        category: 'Text Tools',
        iconName: 'AlignLeft',
        keywords: ['markdown to plain text', 'remove markdown formatting', 'md to txt converter', 'markdown stripper'],
        longDescription: 'Convert your formatted Markdown into simple plain text. This tool removes bolding, italics, headers, links, and code block syntax while preserving your original content, making it easy to repurpose documentation for other platforms.'
    },
    {
        slug: 'line-alphabetizer',
        title: 'Line Alphabetizer',
        description: 'Sort your list of lines in alphabetical or reverse order.',
        category: 'Text Tools',
        iconName: 'SortAsc',
        keywords: ['line alphabetizer', 'sort list a-z', 'alphabetical sorter', 'line sorter tool'],
        longDescription: 'Organize your lists instantly. Whether you have a list of names, products, or keywords, this tool sorts every line into perfect alphabetical order (A-Z) or descending order (Z-A) with a single click.'
    },
    {
        slug: 'word-frequency-counter',
        title: 'Word Frequency Counter',
        description: 'Analyze your text to see which words appear most frequently.',
        category: 'Text Tools',
        iconName: 'BarChart3',
        keywords: ['word frequency counter', 'keyword density tool', 'word count statistics', 'analyze text frequency'],
        longDescription: 'Get deep insights into your writing or SEO content. Our frequency counter lists every unique word used in your text and calculates exactly how many times it appears, helping you identify overused words or optimize keyword density.'
    },
    {
        slug: 'prefix-suffix-adder',
        title: 'Prefix and Suffix Adder',
        description: 'Add a specific prefix or suffix to every line in your text.',
        category: 'Text Tools',
        iconName: 'PlusSquare',
        keywords: ['add prefix to lines', 'add suffix to text', 'batch text adder', 'line modifier tool'],
        longDescription: 'Automate repetitive text tasks. This tool allows you to specify a string to be added to the beginning (prefix) or the end (suffix) of every single line in your block of text. Ideal for formatting CSV data, sql queries, or code lists.'
    },
    {
        slug: 'line-numberer',
        title: 'Line Numberer',
        description: 'Add sequential numbers to every line of your text.',
        category: 'Text Tools',
        iconName: 'Hash',
        keywords: ['add line numbers', 'number sentences', 'list numberer', 'batch line numbering'],
        longDescription: 'Turn any block of text into a numbered list. You can customize the starting number and formatting (e.g., "1. ", "1)", or "#1: "). Perfect for creating checklists, numbering document sections, or following step-by-step guides.'
    },
    {
        slug: 'duplicate-line-finder',
        title: 'Duplicate Line Finder',
        description: 'Identify and highlight repeated lines in your text.',
        category: 'Text Tools',
        iconName: 'Copy',
        keywords: ['find duplicate lines', 'highlight duplicates', 'repeated text finder', 'check for duplicates'],
        longDescription: 'Find redundancies in your data. This tool scans your input for consecutive or non-consecutive duplicate lines and highlights them, helping you identify accidental repetitions in large datasets, lists, or log files.'
    },
    {
        slug: 'rot13-cipher',
        title: 'ROT13 Cipher',
        description: 'Encode or decode text using the classic ROT13 rotation cipher.',
        category: 'Text Tools',
        iconName: 'Shield',
        keywords: ['rot13 cipher', 'caeser cipher converter', 'simple encryption tool', 'decode rot13 text'],
        longDescription: 'Use the classic Caesar cipher variation. ROT13 replaces a letter with the 13th letter after it in the alphabet. Because there are 26 letters, the same algorithm is used to both encrypt and decrypt, providing a fun way to hide spoilers or simple messages.'
    },
    {
        slug: 'emoji-remover',
        title: 'Emoji Remover',
        description: 'Clean up your text by removing all emojis and special icons.',
        category: 'Text Tools',
        iconName: 'Smile',
        keywords: ['remove emojis from text', 'strip icons', 'clean social media text', 'emoji cleaner tool'],
        longDescription: 'Clean up your social media copies or data exports. This tool identifies and removes all Unicode emoji characters, leaving you with purely alphanumeric and standard punctuation text. Great for preparing text for formal reports or data analysis.'
    },
    {
        slug: 'text-to-handwriting',
        title: 'Text to Handwriting',
        description: 'Convert your text into a beautiful handwriting-style preview.',
        category: 'Text Tools',
        iconName: 'PenTool',
        keywords: ['text to handwriting', 'digital handwriting maker', 'handwritten note generator', 'cursive text preview'],
        longDescription: 'Give your digital text a personal touch. This tool renders your input using specialized handwriting fonts, simulating the look of a physical note. Perfect for creating unique creative assets or personalized digital messages.'
    },
    {
        slug: 'sentence-counter-pro',
        title: 'Sentence Counter Pro',
        description: 'Get a detailed breakdown of sentences, paragraphs, and reading level.',
        category: 'Text Tools',
        iconName: 'Activity',
        keywords: ['sentence counter', 'paragraph count', 'text analysis tool', 'reading level checker'],
        longDescription: 'Go beyond simple word counting. Our Pro analyzer identifies complex sentence structures, counts paragraphs, and estimates readability scores. A vital tool for students and editors aiming for clear and concise communication.'
    },
    {
        slug: 'text-mirror-tool',
        title: 'Text Mirror Tool',
        description: 'Reflect your text as if it were seen in a mirror.',
        category: 'Text Tools',
        iconName: 'ArrowLeftRight',
        keywords: ['text mirror', 'mirror writing generator', 'reflected text maker', 'backwards writing tool'],
        longDescription: 'Create mirror-image text. This tool doesn\'t just reverse characters; it uses mirrored Unicode symbols where possible to create a reflection effect that looks like real mirror writing. Perfect for creative designs and unique visual messages.'
    },
    {
        slug: 'list-to-csv-converter',
        title: 'List to CSV Converter',
        description: 'Convert a bulleted or line-separated list into a CSV format.',
        category: 'Text Tools',
        iconName: 'FileSpreadsheet',
        keywords: ['list to csv', 'line to comma separator', 'text to spreadsheet converter', 'data formatter'],
        longDescription: 'Transform your simple lists into structured data. This tool takes every line from your input and joins them with commas (or your custom delimiter), creating a CSV string ready for import into Excel, Google Sheets, or databases.'
    },
    // New Developer Tools
    {
        slug: 'url-encoder-decoder',
        title: 'URL Encoder/Decoder',
        description: 'Safely encode and decode URL components and strings.',
        category: 'Development Tools',
        iconName: 'Link',
        keywords: ['url encoder', 'url decoder', 'percent encoding tool', 'encode url string', 'web developer tools'],
        longDescription: 'Convert strings into a safe format for URLs. Our Encoder/Decoder handles special characters using percent-encoding, ensuring your parameters are properly formatted for web requests. All operations are done offline in your browser.'
    },
    {
        slug: 'html-minifier',
        title: 'HTML Minifier',
        description: 'Compress and optimize your HTML code for faster loading.',
        category: 'Development Tools',
        iconName: 'Minimize2',
        keywords: ['html minifier', 'compress html online', 'html optimizer', 'minify html code', 'performance tools'],
        longDescription: 'Optimize your website s performance by minifying your HTML code. This tool removes unnecessary whitespace, comments, and line breaks, reducing your file size and improving page load times for your users.'
    },
    {
        slug: 'regex-tester',
        title: 'Regex Tester',
        description: 'Test and debug your Regular Expressions with live match highlighting.',
        category: 'Development Tools',
        iconName: 'Search',
        keywords: ['regex tester', 'regular expression debugger', 'online regex check', 'javascript regex tool'],
        longDescription: 'Debug your complex regular expressions with ease. Our tester provides real-time highlighting of matches and allows you to test patterns against multiple sample strings. A vital tool for developers writing search, validation, or parsing logic.'
    },
    // New SEO Tools
    {
        slug: 'xml-sitemap-generator',
        title: 'XML Sitemap Generator',
        description: 'Generate SEO-friendly XML sitemaps for your website.',
        category: 'SEO & Web',
        iconName: 'FileCode',
        keywords: ['xml sitemap generator', 'create sitemap online', 'seo sitemap tool', 'google sitemap maker', 'website indexer'],
        longDescription: 'Ensure all your pages are indexed by Google. Our Sitemap Generator scans your specified structure and creates a perfectly formatted XML file that you can submit to Google Search Console and Bing Webmaster Tools for better visibility.'
    },
    {
        slug: 'schema-markup-generator',
        title: 'Schema Markup Maker',
        description: 'Create JSON-LD Schema markup for better search results.',
        category: 'SEO & Web',
        iconName: 'Code',
        keywords: ['schema markup generator', 'json-ld creator', 'structured data tool', 'rich snippets generator', 'schema.org maker'],
        longDescription: 'Get rich snippets in search results. Our Schema Generator creates JSON-LD code for articles, products, organizations, and events, helping search engines understand your content and display enhanced listings.'
    },
    {
        slug: 'og-preview-tool',
        title: 'OG Preview Tool',
        description: 'See how your website looks when shared on social media.',
        category: 'SEO & Web',
        iconName: 'Share2',
        keywords: ['og preview tool', 'open graph checker', 'social share preview', 'twitter card preview', 'website share tester'],
        longDescription: 'Preview your presence on social media. Our tool simulates how your URL will look on Facebook, Twitter, and LinkedIn, allowing you to optimize your Open Graph images, titles, and descriptions for maximum engagement.'
    },
    // New Design Tools
    {
        slug: 'color-contrast-checker',
        title: 'Color Contrast Checker',
        description: 'Check accessibility standards for your color combinations.',
        category: 'Design & UI',
        iconName: 'Palette',
        keywords: ['color contrast checker', 'wcag accessibility tool', 'color contrast test', 'ui accessibility check', 'web contrast ratio'],
        longDescription: 'Ensure your design is accessible to everyone. Our checker evaluates color pairs against WCAG AA and AAA standards, providing a contrast ratio and pass/fail indicators to help you maintain legibility and inclusivity.'
    },
    {
        slug: 'glassmorphism-generator',
        title: 'Glassmorphism Generator',
        description: 'Design modern glass-style UI elements with CSS.',
        category: 'Design & UI',
        iconName: 'Layers',
        keywords: ['glassmorphism generator', 'frosted glass css', 'ui design generator', 'glass ui creator', 'modern css effects'],
        longDescription: 'Create the popular frosted glass effect for your UI. Our generator allows you to adjust blur, transparency, and borders in real-time, providing you with clean, optimized CSS code that brings a modern, premium look to your web applications.'
    },
    {
        slug: 'svg-to-data-uri',
        title: 'SVG to Data URI',
        description: 'Convert SVG code to Base64/Encoded Data URIs for CSS.',
        category: 'Design & UI',
        iconName: 'Code2',
        keywords: ['svg to data uri', 'svg to base64', 'inline svg css', 'base64 image converter', 'svg optimizer'],
        longDescription: 'Inline your graphics for better performance. Our SVG converter transforms your vector code into a Data URI that you can use directly in your CSS background-image or HTML img tags, reducing the number of HTTP requests and speeding up your site.'
    },
    // New Finance Tools
    {
        slug: 'compound-interest-calculator',
        title: 'Compound Interest Calculator',
        description: 'Visualize how your investments grow exponentially over time.',
        category: 'Finance',
        iconName: 'TrendingUp',
        keywords: ['compound interest calculator', 'investment growth tool', 'calculate savings growth', 'wealth projection calculator', 'finance tools'],
        longDescription: 'Witness the power of compounding. Our calculator allows you to project the future value of your investments based on initial principal, monthly contributions, and interest rates. Visualize your wealth growth over decades with interactive charts.'
    },
    {
        slug: 'salary-tax-calculator',
        title: 'Salary Tax Calculator',
        description: 'Estimate your monthly take-home pay after taxes.',
        category: 'Finance',
        iconName: 'CircleDollarSign',
        keywords: ['salary tax calculator', 'take home pay calculator', 'income tax estimate', 'monthly salary check', 'payroll calculator'],
        longDescription: 'Find out exactly what stays in your pocket. Enter your annual or monthly salary to get a detailed breakdown of tax deductions and your final take-home pay. A simple and effective tool for financial planning and budgeting.'
    },
    // New Image Tools
    {
        slug: 'image-resizer',
        title: 'Image Resizer',
        description: 'Resize your images to specific dimensions or percentages with high quality.',
        category: 'Image Tools',
        iconName: 'Maximize',
        keywords: ['image resizer', 'resize images online', 'bulk image resizer', 'optimize image size', 'photo resizer tool'],
        longDescription: 'Change image dimensions without losing quality. Our professional resizer allows you to scale images by pixels or percentage, maintaining aspect ratios for perfect social media or web assets. Process everything locally for maximum privacy.'
    },
    {
        slug: 'image-cropper',
        title: 'Image Cropper',
        description: 'Crop your images to any size or aspect ratio with our interactive editor.',
        category: 'Image Tools',
        iconName: 'Crop',
        keywords: ['image cropper', 'crop photos online', 'aspect ratio cropper', 'square crop tool', 'photo editor'],
        longDescription: 'Focus on what matters in your photos. Use our interactive cropper to precisely select the area you want to keep. Supports preset aspect ratios for Instagram, Facebook, and Twitter to ensure your content looks perfect across all platforms.'
    },
    {
        slug: 'jpg-to-png',
        title: 'JPG to PNG Converter',
        description: 'Instantly convert your JPG/JPEG images to PNG format with transparency support.',
        category: 'Image Tools',
        iconName: 'RefreshCw',
        keywords: ['jpg to png converter', 'convert jpeg to png', 'online image converter', 'transparent png maker'],
        longDescription: 'Change image formats in an instant. Convert standard JPG images to PNG format, ideal for when you need better compression for graphics or want to prepare assets for further editing with transparency support.'
    },
    {
        slug: 'png-to-jpg',
        title: 'PNG to JPG Converter',
        description: 'Convert PNG images to JPG format and reduce file size easily.',
        category: 'Image Tools',
        iconName: 'RefreshCw',
        keywords: ['png to jpg converter', 'convert png to jpeg', 'reduce image size', 'online photo converter'],
        longDescription: 'Save storage space by converting PNGs to JPG. This tool is perfect for web optimization, transforming large PNG files into web-friendly JPEGs with adjustable quality settings to balance file size and visual clarity.'
    },
    {
        slug: 'csv-to-json',
        title: 'CSV to JSON Converter',
        description: 'Convert CSV data to JSON format instantly with auto-detection.',
        category: 'Development Tools',
        iconName: 'BarChart3',
        keywords: ['csv to json', 'convert csv to json', 'excel to json converter', 'online csv tool', 'data formatting'],
        longDescription: 'Seamlessly transform your spreadsheets into developer-friendly JSON. Our converter automatically detects headers and data types, providing a clean, nested or flat JSON output from any standard CSV file.'
    },
    {
        slug: 'json-to-csv',
        title: 'JSON to CSV Converter',
        description: 'Convert JSON data to JSON format instantly for spreadsheet use.',
        category: 'Development Tools',
        iconName: 'Type',
        keywords: ['json to csv', 'convert json to csv', 'json to excel converter', 'online data tool', 'json export'],
        longDescription: 'Turn your API responses and JSON data into readable CSV files. Perfect for data analysis, reporting, or importing into Excel and Google Sheets. Our tool handles complex nested structures by flattening them into a clean tabular format.'
    },
    {
        slug: 'file-size-converter',
        title: 'File Size Converter',
        description: 'Convert bytes to KB, MB, GB, and TB with precision.',
        category: 'Daily Tools',
        iconName: 'Scale',
        keywords: ['file size converter', 'bytes to mb', 'gb to mb converter', 'data storage calculator', 'bit byte converter'],
        longDescription: 'Understand your storage space. Convert between bits, bytes, kilobytes, megabytes, gigabytes, and terabytes with high precision. Essential for managing cloud storage, hardware limits, and web asset optimization.'
    },
    {
        slug: 'mime-type-lookup',
        title: 'MIME Type Lookup',
        description: 'Find MIME types for file extensions and vice versa.',
        category: 'Development Tools',
        iconName: 'Search',
        keywords: ['mime type lookup', 'file extension search', 'content-type check', 'web development lookup', 'mime database'],
        longDescription: 'Find the correct Content-Type for any file. Search by extension (e.g., .png) to find the MIME type (e.g., image/png), or search by type to see its common extensions. An invaluable resource for web developers and server administrators.'
    },
    {
        slug: 'xml-to-json',
        title: 'XML to JSON Converter',
        description: 'Convert XML data to JSON format for easier integration.',
        category: 'Development Tools',
        iconName: 'Braces',
        keywords: ['xml to json', 'convert xml to json', 'xml parser online', 'data conversion tool', 'developer utilities'],
        longDescription: 'Modernize your data integration. Our XML to JSON converter parses complex XML trees and transforms them into easy-to-use JSON objects, handling attributes and nested elements with precision for any modern web application.'
    },
    // Gaming Utilities Expansion
    {
        slug: 'fov-calculator',
        title: 'FOV Calculator',
        description: 'Compare and convert Field of View (FOV) across different games.',
        category: 'Gaming Utilities',
        iconName: 'Maximize',
        keywords: ['fov calculator', 'field of view converter', 'vertical to horizontal fov', 'gaming fov tool'],
        longDescription: 'Ensure your visual perspective is consistent across all titles. Our FOV Calculator converts between Vertical, Horizontal, and Resolution-based FOVs, helping you match your view in Valorant, CS2, Overwatch, and Apex Legends.'
    },
    {
        slug: 'resolution-scaler',
        title: 'Resolution Scaler',
        description: 'Calculate render resolution and aspect ratio scaling for performance.',
        category: 'Gaming Utilities',
        iconName: 'Monitor',
        keywords: ['resolution scaler', 'render scale calculator', 'gaming resolution tool', 'aspect ratio scaler'],
        longDescription: 'Optimize your FPS without sacrificing clarity. This tool calculates the exact pixel dimensions for different render scales (e.g., 75%, 90%) and helps you find the best resolution for your monitor aspect ratio.'
    },
    {
        slug: 'gaming-desk-height',
        title: 'Gaming Desk Height Calculator',
        description: 'Find the ideal desk and chair height based on your body measurements.',
        category: 'Gaming Utilities',
        iconName: 'Maximize2',
        keywords: ['gaming desk height', 'ergonomics calculator', 'posture guide', 'gaming chair setup'],
        longDescription: 'Prevent fatigue and RSI with proper ergonomics. Our calculator uses your height to determine the optimal gaming desk and chair positions, ensuring your arms are at the perfect angle for maximum aiming precision and long-term health.'
    },
    {
        slug: 'ping-jitter-analyzer',
        title: 'Network Jitter Analyzer',
        description: 'Test your connection stability and measure ping variance.',
        category: 'Gaming Utilities',
        iconName: 'Activity',
        keywords: ['ping jitter test', 'line stability check', 'network variance test', 'gaming ping analyzer'],
        longDescription: 'High ping is bad, but jitter is worse. Our analyzer measures the variance in your connection speed to identify "lag spikes" that can ruin high-stakes competitive matches. Essential for diagnosing WiFi or ISP stability issues.'
    },
    {
        slug: 'monitor-ppi-calculator',
        title: 'Monitor PPI Calculator',
        description: 'Calculate Pixels Per Inch (PPI) for any screen size and resolution.',
        category: 'Gaming Utilities',
        iconName: 'Monitor',
        keywords: ['ppi calculator', 'pixels per inch', 'screen density tool', 'monitor clarity checker'],
        longDescription: 'Measure your display crystal-clarity. By inputting your resolution and diagonal screen size, this tool calculates the pixel density, helping you compare different monitors and understand the impact on visual sharpness.'
    },
    {
        slug: 'sensitivity-monitor-match',
        title: 'Monitor Distance Matcher',
        description: 'Match your mouse feeling across different monitor sizes and resolutions.',
        category: 'Gaming Utilities',
        iconName: 'Scale',
        keywords: ['monitor distance match', 'coefficient calculator', 'fov sensitivity match', 'consistent aim'],
        longDescription: 'Keep your mouse feel identical even if you change monitors. This advanced tool uses Focal Length scaling and Monitor Distance coefficients to ensure your "flicks" feel consistent across different aspect ratios and resolutions.'
    },
    // Aim & Reflex Expansion
    {
        slug: 'sound-reaction-test',
        title: 'Sound Reaction Test',
        description: 'Test your auditory reflexes by reacting to audio cues.',
        category: 'Aim & Reflex',
        iconName: 'Volume2',
        keywords: ['sound reaction test', 'audio reflex check', 'audio reaction time', 'gaming sounds'],
        longDescription: 'Reflexes are not just visual. Many pro players rely on audio cues to react to enemies. Our Sound Reaction Test measures your millisecond response time to auditory triggers, helping you sharpen your overall awareness.'
    },
    {
        slug: 'peripheral-vision-test',
        title: 'Peripheral Vision Trainer',
        description: 'Improve your awareness by clicking targets in your peripheral view.',
        category: 'Aim & Reflex',
        iconName: 'Eye',
        keywords: ['peripheral vision test', 'awareness trainer', 'gaming vision test', 'field of view skills'],
        longDescription: 'Stop tunnel-visioning! Our trainer flashes targets at the edges of your screen, forcing you to maintain focus on the center while reacting to movement in your side view. Essential for high-chaos games like Apex Legends or Quake.'
    },
    {
        slug: 'target-tracking-pro',
        title: 'Target Tracking Pro',
        description: 'Advanced smooth tracking trainer with intelligent movement patterns.',
        category: 'Aim & Reflex',
        iconName: 'Target',
        keywords: ['tracking trainer', 'smooth aim practice', 'mouse tracking pro', 'fps tracking drills'],
        longDescription: 'Master the hardest skill in aiming. Unlike flicking, tracking requires consistent mouse speed. This tool features targets that change directions and speeds unpredictably, simulating real enemy movement patterns.'
    },
    {
        slug: 'micro-flick-drills',
        title: 'Micro-Flick Drills',
        description: 'Practice small, precise mouse adjustments for headshot consistency.',
        category: 'Aim & Reflex',
        iconName: 'Zap',
        keywords: ['micro flicking', 'precision aim', 'headshot trainer', 'small adjustments test'],
        longDescription: 'Level up your crosshair placement. These drills focus on tiny "micro-corrections" within a tight radius, helping you snap onto heads with surgical precision instead of over-aiming.'
    },
    {
        slug: 'burst-control-trainer',
        title: 'Burst Timing Trainer',
        description: 'Learn the clicking rhythm for perfect recoil and burst resets.',
        category: 'Aim & Reflex',
        iconName: 'Target',
        keywords: ['burst control', 'clicking rhythm', 'fps fire rate test', 'weapon reset timing'],
        longDescription: 'Every weapon has a rhythm. Our Burst Trainer flashes cues that match the optimal reset times for competitive rifles, helping you develop a "feel" for when to stop and start your bursts for maximum accuracy.'
    },
    {
        slug: 'spatial-memory-test',
        title: 'Spatial Memory Bench',
        description: 'Test and improve your ability to remember target positions in sequence.',
        category: 'Aim & Reflex',
        iconName: 'Brain',
        keywords: ['spatial memory', 'gaming memory test', 'target recall', 'positional awareness'],
        longDescription: 'Boost your "Gamesense". This tool hide targets after showing them briefly, requiring you to remember their exact positions and order. Excellent for improving your ability to track multiple threats simultaneously.'
    },
    {
        slug: 'click-timing-trainer',
        title: 'Click Timing Trainer',
        description: 'Practice clicking perfectly when a target enters your crosshair.',
        category: 'Aim & Reflex',
        iconName: 'Crosshair',
        keywords: ['click timing', 'reflex clicking', 'sniper trainer', 'shotgun timing test'],
        longDescription: 'Essential for snipers and shotgun users. Instead of moving your mouse, you wait for the target to cross a specific point and click with millisecond precision. Master the "wait and click" technique used by elite players.'
    },
    {
        slug: 'grid-shot-mini',
        title: 'Grid Shot Mini',
        description: 'High-speed grid clicking exercise for raw speed and efficiency.',
        category: 'Aim & Reflex',
        iconName: 'LayoutGrid',
        keywords: ['gridshot', 'speed aim', 'warmup grid', 'aimlab alternative', 'high speed clicking'],
        longDescription: 'A compact version of the famous gridwarmup. Targets appear in a tight 3x3 or 5x5 grid, pushing your arm and wrist speed to their absolute limits. Perfect for a quick 30-second intensive warmup before a match.'
    },
    {
        slug: 'pressure-test-reflex',
        title: 'Pressure Reflex Test',
        description: 'Aiming targets that shrink and disappear under a strict time limit.',
        category: 'Aim & Reflex',
        iconName: 'Timer',
        keywords: ['pressure test', 'speed aim trainer', 'aim under pressure', 'vanishing targets'],
        longDescription: 'Can you aim under stress? Targets start large and shrink rapidly. You must hit them before they disappear. As you progress, the timer gets shorter, forcing your brain to process visual information faster.'
    },
    {
        slug: 'reflex-pattern-match',
        title: 'Reflex Pattern Match',
        description: 'Quickly identify and match a specific target color or shape.',
        category: 'Aim & Reflex',
        iconName: 'Shapes',
        keywords: ['pattern match', 'cognitive reflex', 'shape identification', 'fast reaction'],
        longDescription: 'A brain-reflex combo. Don\'t just click everything—only click the target that matches the specified pattern or color. This improves your target identification speed, preventing friendly fire or wasted shots in-game.'
    },
    {
        slug: 'strafe-aiming-sim',
        title: 'Strafe Aiming Sim',
        description: 'Practice tracking targets while your own "character" is moving side-to-side.',
        category: 'Aim & Reflex',
        iconName: 'Move',
        keywords: ['strafe aiming', 'moving while shooting', 'fps movement trainer', 'counter strafing practice'],
        longDescription: 'Master the strafe. Static aiming is easy, but in a real fight, you are also moving. This tool simulates character strafing (left/right motion), forcing you to compensate for your own movement while staying on target.'
    },
    // Mouse Skills Expansion
    {
        slug: 'mouse-glide-test',
        title: 'Mouse Glide Test',
        description: 'Measure the friction and smoothness of your mouse and mousepad combo.',
        category: 'Mouse Skills',
        iconName: 'Zap',
        keywords: ['mouse glide test', 'mousepad friction', 'ptfe feet check', 'mouse motion smoothness'],
        longDescription: 'How smooth is your flick? Our Glide Test measures the consistency of your mouse movement across the pad, helping you identify worn-out PTFE feet or a "muddy" mousepad surface that might be hindering your micro-adjustments.',
        requires: ['mouse']
    },
    {
        slug: 'lod-test-guide',
        title: 'LOD (Lift-Off Distance) Test',
        description: 'Check how high you can lift your mouse before the sensor stops tracking.',
        category: 'Mouse Skills',
        iconName: 'ArrowUp',
        keywords: ['lift off distance test', 'mouse lod check', 'gaming mouse sensor', 'mouse tracking height'],
        longDescription: 'LOD is critical for low-sensitivity players who "reset" their mouse position frequently. This tool provides a visual interface to help you measure if your mouse sensor stops tracking at the ideal 1-2mm height, preventing unwanted cursor "jitter" during resets.',
        requires: ['mouse']
    },
    {
        slug: 'right-click-speed-test',
        title: 'Right Click Speed Test',
        description: 'Measure your Clicks Per Second (CPS) specifically for the right mouse button.',
        category: 'Mouse Skills',
        iconName: 'MousePointer2',
        keywords: ['right click cps', 'right button speed', 'moba clicking speed', 'right clicker test'],
        longDescription: 'Your right click is just as important as your left, especially in MOBAs and RTS games. Test your dexterity and speed with our dedicated right-button CPS tester. Track your performance and see if you have any imbalance between your index and middle finger speed.',
        requires: ['mouse']
    },
    {
        slug: 'scroll-speed-tester',
        title: 'Scroll Speed Tester',
        description: 'Measure how many pixels or lines you can scroll per second.',
        category: 'Mouse Skills',
        iconName: 'Mouse',
        keywords: ['scroll speed test', 'mouse wheel speed', 'scrolling performance', 'fast scroll check'],
        longDescription: 'Perfect for infinite scroll wheels and competitive browsing! Measure your maximum scrolling velocity in pixels per second. This tool is great for testing the mechanics of your mouse wheel and your finger speed for rapid weapon switching or inventory management.',
        requires: ['mouse']
    },
    {
        slug: 'mouse-sensor-jitter-test',
        title: 'Sensor Jitter & Skip Test',
        description: 'Detect if your mouse sensor is skipping pixels or jittering at high speeds.',
        category: 'Mouse Skills',
        iconName: 'Activity',
        keywords: ['mouse jitter test', 'pixel skipping check', 'sensor malfunction', 'high dpi jitter'],
        longDescription: 'Ensure your sensor is flawless. At high DPI or on certain surfaces, sensors can "jitter" or "skip". This tool analyzes your mouse path at high frequency to detect anomalies in movement, ensuring every millimeter of your hand movement is translated to the screen.',
        requires: ['mouse']
    },
    {
        slug: 'mouse-pixel-skipping-check',
        title: 'Pixel Skipping Checker',
        description: 'Identify if your Windows or in-game sensitivity is causing pixel skipping.',
        category: 'Mouse Skills',
        iconName: 'LayoutGrid',
        keywords: ['pixel skipping test', 'windows sensitivity check', 'raw input validator', 'aim precision check'],
        longDescription: 'Don\'t let software ruin your aim. If your sensitivity is too high in Windows or certain games, your cursor might "skip" pixels. Use our visual checker to ensure your input is pixel-perfect and you aren\'t missing targets due to mathematical rounding errors in your settings.',
        requires: ['mouse']
    },
    {
        slug: 'cursor-precision-bench',
        title: 'Cursor Precision Bench',
        description: 'Test your ability to stop your cursor exactly in the center of a target.',
        category: 'Mouse Skills',
        iconName: 'Crosshair',
        keywords: ['cursor precision test', 'mouse control benchmark', 'stopping power test', 'click accuracy'],
        longDescription: 'Speed is nothing without control. This benchmark tests your "stopping power"—the ability to snap to a target and stop exactly in the center without shaky micro-adjustments. A high score here indicates elite level mouse control and muscle memory.',
        requires: ['mouse']
    },
    {
        slug: 'mouse-latency-tester',
        title: 'Mouse Input Latency Test',
        description: 'Measure the delay between your mouse click and the screen response.',
        category: 'Mouse Skills',
        iconName: 'Timer',
        keywords: ['mouse latency', 'click delay test', 'input lag mouse', 'gaming mouse lag'],
        longDescription: 'Measure the raw responsiveness of your gaming setup. This tool calculates the end-to-end latency of your mouse input, helping you identify if your wireless connection, USB port, or monitor is adding unnecessary delay to your actions.',
        requires: ['mouse']
    },
    // Keyboard Skills Expansion
    {
        slug: 'key-repeat-rate-test',
        title: 'Key Repeat Rate Test',
        description: 'Measure the frequency of key repeats when a button is held down.',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['key repeat test', 'keyboard repeat rate', 'held key speed', 'linux repeat rate'],
        longDescription: 'Is your keyboard sluggish? Measure exactly how many characters per second your OS registers when you hold a key. This is vital for programmers and gamers who need high-frequency inputs for rapid actions or scrolling through code.',
        requires: ['keyboard']
    },
    {
        slug: 'keyboard-debounce-tester',
        title: 'Keyboard Debounce Test',
        description: 'Detect unintended multiple keystrokes caused by mechanical switch "chatter".',
        category: 'Keyboard Skills',
        iconName: 'Zap',
        keywords: ['keyboard debounce test', 'key chatter check', 'mechanical switch failure', 'double type fix'],
        longDescription: 'Mechanical switches can fail as they age, causing "chatter" (registering two presses for one click). Our debounce tester monitors your inputs at millisecond intervals to catch these double-triggers, letting you know if it\'s time for a new switch or a cleaning.',
        requires: ['keyboard']
    },
    {
        slug: 'blind-typing-challenge',
        title: 'Blind Typing Challenge',
        description: 'Test your typing speed and muscle memory with a blank screen.',
        category: 'Keyboard Skills',
        iconName: 'EyeOff',
        keywords: ['blind typing test', 'muscle memory typing', 'touch typing challenge', 'keyboard mastery'],
        longDescription: 'Are you a true touch-typist? Our challenge hides the text as you type it, forcing you to rely entirely on your muscle memory. Any mistake will be revealed only at the end—the ultimate test for keyboard masters.',
        requires: ['keyboard']
    },
    {
        slug: 'code-typing-speed',
        title: 'Code Snippet Speed Test',
        description: 'Practice typing code syntax for JS, Python, HTML, and CSS.',
        category: 'Keyboard Skills',
        iconName: 'Code',
        keywords: ['code typing test', 'developer speed test', 'programming WPM', 'syntax typing practice'],
        longDescription: 'Typing code is different from typing prose. Practice your specialized WPM on actual code snippets. Master brackets, semicolons, and indentation to become a faster, more efficient developer.',
        requires: ['keyboard']
    },
    {
        slug: 'keyboard-polling-rate-check',
        title: 'Keyboard Polling Rate Checker',
        description: 'Measure the reporting frequency of your keyboard (e.g., 1000Hz).',
        category: 'Keyboard Skills',
        iconName: 'Activity',
        keywords: ['keyboard polling rate', 'keyboard hz test', 'input frequency', 'gaming keyboard latency'],
        longDescription: 'Verify your keyboard s performance. High-end gaming keyboards advertise 1000Hz or even 8000Hz polling rates. Use our checker to measure the actual frequency of data packets being sent to your computer, ensuring you have the lowest possible technical latency.',
        requires: ['keyboard']
    },
    {
        slug: 'n-key-rollover-pro',
        title: 'N-Key Rollover Pro visualizer',
        description: 'Advanced visualizer for simultaneous multi-key presses (NKRO).',
        category: 'Keyboard Skills',
        iconName: 'Layers',
        keywords: ['nkro pro', 'multi key visualizer', 'ghosting test advanced', 'keyboard rollover check'],
        longDescription: 'A premium visualizer for your keyboard inputs. Press as many keys as you want and see them light up on a virtual layout. Perfect for testing "chords" in rhythm games or verifying if your keyboard can handle complex simultaneous inputs without ghosting.',
        requires: ['keyboard']
    },
    {
        slug: 'keyboard-audio-latency',
        title: 'Keyboard Audio Latency Test',
        description: 'Measure the time between your keypress and the hearing of a sound cue.',
        category: 'Keyboard Skills',
        iconName: 'Volume2',
        keywords: ['keyboard audio delay', 'input to sound lag', 'rhythm game latency', 'audio sync test'],
        longDescription: 'Critical for rhythm game players! This tool measures the total delay between your physical keypress and the audio feedback through your speakers/headphones. Calibrate your game settings by knowing your exact system audio latency.',
        requires: ['keyboard']
    },
    {
        slug: 'full-keyboard-health-check',
        title: 'Full Keyboard Health Check',
        description: 'An interactive full-layout map to test the functionality of every key.',
        category: 'Keyboard Skills',
        iconName: 'CheckCircle',
        keywords: ['keyboard tester', 'key health check', 'full layout test', 'broken key finder'],
        longDescription: 'Just bought a new keyboard or spilled something on your old one? Use our interactive map to test every single key on a standard 100% layout. Keys turn green as they are registered, helping you quickly identify dead or failing switches.',
        requires: ['keyboard']
    },
    {
        slug: 'numpad-speed-test',
        title: 'Numpad Speed Test',
        description: 'Dedicated speed test for numerical data entry on your numpad.',
        category: 'Keyboard Skills',
        iconName: 'LayoutGrid',
        keywords: ['numpad speed', '10 key speed test', 'data entry test', 'number typing speed'],
        longDescription: 'Master the 10-key layout. For accountants, data entry professionals, and gamers using numpad binds, this dedicated speed test measures your numerical accuracy and speed, helping you become a faster data wrangler.',
        requires: ['keyboard']
    },
    // Development Tools Expansion
    {
        slug: 'jwt-decoder-pro',
        title: 'JWT Decoder Pro',
        description: 'Decode and inspect JSON Web Tokens (JWT) safely in your browser.',
        category: 'Development Tools',
        iconName: 'Shield',
        keywords: ['jwt decoder', 'decode jwt online', 'json web token', 'auth token inspector'],
        longDescription: 'Debug your authentication layer with ease. Our JWT decoder breaks down tokens into Header, Payload, and Signature, providing a clear human-readable format of the encoded data without sending your sensitive tokens to any server.'
    },
    {
        slug: 'http-status-lookup',
        title: 'HTTP Status Lookup',
        description: 'Instant reference for all HTTP response status codes and their meanings.',
        category: 'Development Tools',
        iconName: 'Globe',
        keywords: ['http status codes', '404 error meaning', '500 internal server error', 'http response tool'],
        longDescription: 'Stop searching for error codes. Our instant lookup provides detailed explanations for all standard HTTP status codes, including 1xx, 2xx, 3xx, 4xx, and 5xx series, with common causes and solutions for developers.'
    },
    {
        slug: 'yaml-json-converter',
        title: 'YAML ↔ JSON Converter',
        description: 'Seamlessly convert data between YAML and JSON formats with validation.',
        category: 'Development Tools',
        iconName: 'FileCode',
        keywords: ['yaml to json', 'json to yaml', 'convert yaml', 'configuration tool'],
        longDescription: 'Switch between configuration formats in seconds. Whether you are managing Kubernetes manifests (YAML) or web application data (JSON), our converter ensures perfect syntax and provides instant validation of your data structure.'
    },
    {
        slug: 'cron-expression-gen',
        title: 'Cron Expression Generator',
        description: 'Build complex Crontab schedules using a simple visual interface.',
        category: 'Development Tools',
        iconName: 'Clock',
        keywords: ['cron generator', 'crontab builder', 'cron schedule helper', 'visual cron'],
        longDescription: 'Master scheduled tasks without the headache. Our visual cron generator lets you select minutes, hours, and days using intuitive dropdowns, generating the exact crontab string you need for your server automation or background jobs.'
    },
    {
        slug: 'sql-formatter-pro',
        title: 'SQL Formatter Pro',
        description: 'Prettify and format SQL queries for multiple database dialects.',
        category: 'Development Tools',
        iconName: 'Database',
        keywords: ['sql formatter', 'prettify sql', 'format sql query', 'sql beautifier'],
        longDescription: 'Clean up messily written queries in an instant. Our SQL Formatter supports multiple dialects including MySQL, PostgreSQL, and SQLite, adding proper indentation and capitalization to make your complex joins and subqueries readable.'
    },
    {
        slug: 'js-minifier-tiny',
        title: 'JavaScript Minifier',
        description: 'Compress your JS code for faster load times and production deployment.',
        category: 'Development Tools',
        iconName: 'FileJson',
        keywords: ['js minifier', 'compress javascript', 'uglify js', 'minify code online'],
        longDescription: 'Optimize your web performance. This tool removes unnecessary whitespace, comments, and shortens variable names in your JavaScript files, drastically reducing the payload size for your end-users.'
    },
    {
        slug: 'bash-script-validator',
        title: 'Bash Script Validator',
        description: 'Check your shell scripts for common syntax errors and best practices.',
        category: 'Development Tools',
        iconName: 'Terminal',
        keywords: ['bash validator', 'shell script checker', 'shelllint', 'bash syntax test'],
        longDescription: 'Prevent production script failures. Our Bash validator scans your shell scripts for common errors like missing brackets, unquoted variables, and syntax mistakes, providing helpful tips to improve script reliability.'
    },
    // SEO & Web Expansion
    {
        slug: 'keyword-density-checker',
        title: 'Keyword Density Checker',
        description: 'Analyze article text to find the most frequent keywords and phrases.',
        category: 'SEO & Web',
        iconName: 'Search',
        keywords: ['keyword density', 'seo analyzer', 'word frequency search', 'keyword stuffing check', 'lsi keywords tool', 'content optimization', 'semantic seo'],
        longDescription: 'Optimize your content for better search rankings with our Keyword Density Checker. This tool analyzes the frequency of words and phrases within your text, helping you strike the perfect balance between strategic optimization and natural reading flow.\n\n### Why Keyword Density Matters:\n- **Avoid Penalties**: Search engines penalize "keyword stuffing." Our tool helps you stay within safe limits (usually 1-3%).\n- **Discover LSI Keywords**: Identify the main topics your content is covering and adjust for better semantic relevance.\n- **Beat Competitors**: Compare your word usage against top-ranking pages in your niche.\n\n### Pro Tip:\nFocus on your primary keyword in the first 100 words and use variations throughout. Let our analyzer show you exactly how frequently your core terms are appearing.'
    },
    {
        slug: 'heading-hierarchy-analyzer',
        title: 'Heading Hierarchy Scan',
        description: 'Verify the H1-H6 structure of your page for SEO and accessibility.',
        category: 'SEO & Web',
        iconName: 'Type',
        keywords: ['heading analyzer', 'h1 check', 'seo structure', 'heading hierarchy', 'outline checker', 'web accessibility', 'html structure'],
        longDescription: 'Ensure your website\'s skeletal structure is optimized for both search engines and accessibility with our Heading Hierarchy Scan. A clear, logical heading structure (H1 through H6) helps Google understand your content\'s intent and allows screen readers to navigate your pages efficiently.\n\n### Features of the Analyzer:\n- **Hierarchy Validation**: Detect missing heading levels (like jumping from H1 to H3).\n- **H1 Check**: Ensure every page has exactly one H1 tag with relevant keywords.\n- **Logical Outline**: See your page content as an outline to check flow and readability.\n- **Accessibility Alerts**: Identify structural issues that might hinder users with disabilities.\n\n### SEO Impact:\nSearch engines use headings to determine the hierarchy of information on a page. A clean structure ensures your main topics are correctly identified and ranked.'
    },
    {
        slug: 'google-serp-preview',
        title: 'Google SERP Preview',
        description: 'Visualize exactly how your page will look in Google Search results.',
        category: 'SEO & Web',
        iconName: 'Layout',
        keywords: ['serp preview', 'google search simulator', 'meta preview', 'seo snippet tool'],
        longDescription: 'Boost your Click-Through Rate (CTR). This simulator generates a pixel-perfect preview of your Google search result, allowing you to optimize your Title and Meta Description to fit within visual limits and attract more visitors.'
    },
    {
        slug: 'twitter-card-preview',
        title: 'Twitter Card Generator',
        description: 'Preview and generate meta tags for Twitter social sharing.',
        category: 'SEO & Web',
        iconName: 'Twitter',
        keywords: ['twitter card preview', 'social meta gen', 'twitter seo', 'card validator'],
        longDescription: 'Stand out on the timeline. Our generator helps you build and preview "Large Image" or "Summary" cards, ensuring your content looks professional and clickable when shared on Twitter (X).'
    },
    {
        slug: 'open-graph-inspector',
        title: 'Open Graph Inspector',
        description: 'Validate and preview OG tags for Facebook, LinkedIn, and Discord.',
        category: 'SEO & Web',
        iconName: 'Share2',
        keywords: ['open graph preview', 'og tag checker', 'facebook share preview', 'social metadata'],
        longDescription: 'Master your social presence. This tool inspects your meta tags to provide a live preview of how your URL will appear on major social platforms, highlighting missing "og:image" or "og:title" tags that could hurt your engagement.'
    },
    {
        slug: 'backlink-anchor-gen',
        title: 'Backlink Anchor Generator',
        description: 'Create diverse anchor text profiles for safe and effective link building.',
        category: 'SEO & Web',
        iconName: 'Link',
        keywords: ['anchor text generator', 'backlink strategy', 'seo link building', 'varied anchors'],
        longDescription: 'Avoid SEO penalties with a natural anchor profile. Our generator suggests a mix of Branded, Naked URL, Generic, and Keyword-rich anchor texts to help you build a diverse and safe backlink profile for your domains.'
    },
    {
        slug: 'canonical-url-checker',
        title: 'Canonical URL Validator',
        description: 'Check if your page correctly identifies its primary source to avoid duplicates.',
        category: 'SEO & Web',
        iconName: 'CheckCircle',
        keywords: ['canonical check', 'duplicate content fix', 'rel canonical', 'seo url validator'],
        longDescription: 'Prevent duplicate content issues. This tool verifies if your "rel=canonical" tag is correctly implemented, ensuring search engines give ranking credit to the correct version of your page if it exists under multiple URLs.'
    },
    {
        slug: 'alt-text-accessibility',
        title: 'ALT Text Accessibility Scan',
        description: 'Check image tags for descriptive ALT text to improve SEO and screen-reading.',
        category: 'SEO & Web',
        iconName: 'Eye',
        keywords: ['alt text check', 'image seo', 'web accessibility', 'missing alt tags'],
        longDescription: 'Boost your Image SEO. Our scanner identifies images missing ALT descriptions and provides suggestions for descriptive, keyword-rich text that helps search engines understand your visuals and improves accessibility for disabled users.'
    },
    {
        slug: 'page-load-simulator',
        title: 'Page Load Time Estimator',
        description: 'Estimate your page speed score and identify slow-loading bottlenecks.',
        category: 'SEO & Web',
        iconName: 'Zap',
        keywords: ['page speed estimator', 'load time test', 'seo performance', 'speed bottleneck'],
        longDescription: 'Performance is a ranking factor. Our simulator estimates your page load phases (DNS, TCP, DOM) and provides a "Speed Score", helping you identify if large images or heavy scripts are slowing down your user experience.'
    },
    {
        slug: 'favicon-generator-pro',
        title: 'Favicon Generator Pro',
        description: 'Create multi-size favicons for browsers, iOS, and Android from a single image.',
        category: 'SEO & Web',
        iconName: 'Image',
        keywords: ['favicon generator', 'apple touch icon', 'android favicon', 'manifest.json gen'],
        longDescription: 'Ensure your brand looks consistent everywhere. Upload one logo and generate every single icon size needed for modern browsers, bookmarks, iPhones, and Android devices, including the required HTML meta tags.'
    },
    {
        slug: 'domain-history-lookup',
        title: 'Domain History Explorer',
        description: 'A dedicated UI for researching the age and past versions of any domain.',
        category: 'SEO & Web',
        iconName: 'History',
        keywords: ['domain age checker', 'whois history', 'wayback search', 'domain research'],
        longDescription: 'Research your competition or a new domain purchase. Our explorer provides quick links and data visualization for domain age, registration history, and historical snapshots to understand a site\'s past SEO performance.'
    },
    {
        slug: 'niche-keyword-research',
        title: 'Basic Niche Research Tool',
        description: 'Find related long-tail keywords for your primary niche or topic.',
        category: 'SEO & Web',
        iconName: 'Search',
        keywords: ['keyword research', 'niche finder', 'long tail keywords', 'seo topic research'],
        longDescription: 'Discover untapped ranking opportunities. Enter a seed keyword, and our tool generates a list of related long-tail phrases and questions people are actually searching for, helping you plan a content strategy that covers the entire topic.'
    },
    {
        slug: 'internal-link-strategist',
        title: 'Internal Link Strategist',
        description: 'Map out your site structure for optimal "link juice" distribution.',
        category: 'SEO & Web',
        iconName: 'Shield',
        keywords: ['internal linking', 'site structure', 'seo silo', 'link juice'],
        longDescription: 'Master your site architecture. This tool helps you plan SILO structures and internal linking patterns, ensuring your most important "Power Pages" receive the most authority through strategic connecting links.'
    },
    {
        slug: 'structured-data-bench',
        title: 'Structured Data Benchmark',
        description: 'Preview Rich Snippets like Reviews, Recipes, and FAQs for search results.',
        category: 'SEO & Web',
        iconName: 'Layout',
        keywords: ['schema markup preview', 'rich snippets', 'json-ld test', 'seo faq preview'],
        longDescription: 'Take up more space on the SERP. Preview exactly how your FAQ, Review, or Product schema will appear as a "Rich Snippet" in Google search results, ensuring your schema markup is visually optimized for higher clicks.'
    },
    {
        slug: 'adsense-revenue-calc',
        title: 'AdSense Revenue Calculator',
        description: 'Estimate your website potential earnings based on traffic and niche.',
        category: 'SEO & Web',
        iconName: 'DollarSign',
        keywords: ['adsense calculator', 'website earnings', 'cpc estimator', 'blog revenue'],
        longDescription: 'Plan your content monetization. Input your monthly pageviews and niche (e.g., Tech, Finance, Health) to estimate your potential Google AdSense earnings based on average CTR and CPC data for your industry.'
    },
    {
        slug: 'robots-txt-validator',
        title: 'Robots.txt Validator',
        description: 'Check your robots.txt file for syntax errors and blocking conflicts.',
        category: 'SEO & Web',
        iconName: 'FileText',
        keywords: ['robots.txt test', 'crawler access', 'googlebot block', 'seo indexing'],
        longDescription: 'Ensure search engines can crawl your site. Our validator parses your robots.txt rules to detect syntax mistakes or accidental blocks on critical pages, ensuring your SEO effort is not wasted by a single "Disallow" line.'
    },
    // Unit Converters Expansion
    {
        slug: 'temperature-converter',
        title: 'Temperature Converter',
        description: 'Convert between Celsius, Fahrenheit, and Kelvin instantly.',
        category: 'Unit Converters',
        iconName: 'Thermometer',
        keywords: ['celsius to fahrenheit', 'f to c', 'kelvin converter', 'temperature tool'],
        longDescription: 'Precise temperature conversion for cooking, science, and travel. Switch between Celsius, Fahrenheit, and Kelvin with real-time updates and helpful reference points like boiling and freezing temperatures.'
    },
    {
        slug: 'speed-converter',
        title: 'Speed Converter',
        description: 'Convert between km/h, mph, knots, and m/s.',
        category: 'Unit Converters',
        iconName: 'Zap',
        keywords: ['kmh to mph', 'mph to kmh', 'knots to kmh', 'speed conversion online'],
        longDescription: 'Essential for travelers and automotive enthusiasts. Convert speed measurements across metric and imperial systems, including nautical knots and scientific meters per second.'
    },
    {
        slug: 'volume-converter',
        title: 'Volume Converter',
        description: 'Convert between Liters, Gallons, Quarts, and more.',
        category: 'Unit Converters',
        iconName: 'Beaker',
        keywords: ['liters to gallons', 'ml to oz', 'volume conversion', 'liquid measure tool'],
        longDescription: 'Master liquid and solid volume measurements. Perfect for international recipes or shipping logistics, covering everything from milliliters and fluid ounces to gallons and cubic meters.'
    },
    {
        slug: 'area-converter',
        title: 'Area Converter',
        description: 'Convert between Square Meters, Square Feet, Acres, and more.',
        category: 'Unit Converters',
        iconName: 'Maximize',
        keywords: ['sq ft to sq m', 'acres to hectares', 'area conversion', 'realty calculator'],
        longDescription: 'Ideal for real estate and construction. Convert between common area units like square feet, square meters, acres, and hectares with precision.'
    },
    {
        slug: 'pressure-converter',
        title: 'Pressure Converter',
        description: 'Convert between PSI, Bar, Pascal, and Atmospheres.',
        category: 'Unit Converters',
        iconName: 'Gauge',
        keywords: ['psi to bar', 'pascal to psi', 'pressure tool', 'atmospheric pressure conversion'],
        longDescription: 'Professional grade pressure conversion for engineering and automotive needs. Toggle between PSI, Bar, Kilopascals, and standard atmospheres.'
    },
    {
        slug: 'energy-converter',
        title: 'Energy Converter',
        description: 'Convert between Joules, Calories, BTU, and kWh.',
        category: 'Unit Converters',
        iconName: 'Zap',
        keywords: ['joules to calories', 'kwh to joules', 'energy conversion', 'physics calculator'],
        longDescription: 'Analyze energy consumption and physics data. Convert between scientific Joules, nutritional Calories, and electrical Kilowatt-hours (kWh) instantly.'
    },
    {
        slug: 'power-converter',
        title: 'Power Converter',
        description: 'Convert between Watts, Horsepower, and BTUs/hr.',
        category: 'Unit Converters',
        iconName: 'Zap',
        keywords: ['watts to horsepower', 'hp to watts', 'power conversion', 'electrical tool'],
        longDescription: 'Compare power outputs across different domains. Bridge the gap between electrical Watts, mechanical Horsepower, and thermal BTU per hour.'
    },
    {
        slug: 'angle-converter',
        title: 'Angle Converter',
        description: 'Convert between Degrees, Radians, and Gradians.',
        category: 'Unit Converters',
        iconName: 'Compass',
        keywords: ['degrees to radians', 'rad to deg', 'angle calculation', 'geometry tool'],
        longDescription: 'Essential geometry utility for students and engineers. Seamlessly switch between DEG, RAD, and GRAD units for mathematical and CAD precision.'
    },
    {
        slug: 'fuel-economy-converter',
        title: 'Fuel Economy Converter',
        description: 'Convert between MPG (US/UK) and L/100km.',
        category: 'Unit Converters',
        iconName: 'Fuel',
        keywords: ['mpg to l100km', 'fuel efficiency converter', 'gas mileage tool', 'car efficiency'],
        longDescription: 'Understand your vehicle s efficiency better. Convert between international fuel economy standards like Miles Per Gallon and Liters per 100 Kilometers.'
    },
    {
        slug: 'torque-converter',
        title: 'Torque Converter',
        description: 'Convert between Newton-meters (Nm) and Pound-feet (lb-ft).',
        category: 'Unit Converters',
        iconName: 'Wrench',
        keywords: ['nm to lbft', 'torque conversion', 'automotive tools', 'wrench settings'],
        longDescription: 'Perfect for mechanics and DIY enthusiasts. Accurately translate torque specifications from car manuals between metric Nm and imperial lb-ft.'
    },
    {
        slug: 'force-converter',
        title: 'Force Converter',
        description: 'Convert between Newtons, Pound-force, and Dynes.',
        category: 'Unit Converters',
        iconName: 'Hammer',
        keywords: ['newtons to pounds', 'force conversion', 'physics tools', 'kn to lbs'],
        longDescription: 'Convert physical force measurements. Supports scientific Newtons (N), imperial pound-force (lbf), and kiloponds for engineering applications.'
    },
    {
        slug: 'number-base-converter',
        title: 'Number Base Converter',
        description: 'Convert numbers between Decimal, Binary, Hex, and Octal.',
        category: 'Unit Converters',
        iconName: 'Binary',
        keywords: ['binary to decimal', 'hex to binary', 'octal converter', 'base 10 to base 16'],
        longDescription: 'A must-have for computer science students and developers. Convert any integer between base 2 (Binary), base 8 (Octal), base 10 (Decimal), and base 16 (Hexadecimal).'
    },
    {
        slug: 'roman-numeral-converter',
        title: 'Roman Numeral Converter',
        description: 'Convert standard numbers to Roman numerals and vice versa.',
        category: 'Unit Converters',
        iconName: 'History',
        keywords: ['number to roman', 'roman numerals decoder', 'classic numbers tool'],
        longDescription: 'Easily translate between the modern Hindu-Arabic numeral system and classic Roman Numerals (I, V, X, L, C, D, M). Great for history projects, clock reading, and legal docs.'
    },
    {
        slug: 'data-rate-converter',
        title: 'Data Rate Converter',
        description: 'Convert between Mbps, MB/s, and other transfer speeds.',
        category: 'Unit Converters',
        iconName: 'Activity',
        keywords: ['mbps to mbs converter', 'internet speed tool', 'download speed calculator'],
        longDescription: 'Calculate actual download times. Understand the difference between Megabits and Megabytes per second to accurately estimate file transfer speeds based on your ISP plan.'
    },
    {
        slug: 'digital-storage-pro',
        title: 'Digital Storage Pro',
        description: 'Advanced conversion between bits, Bytes, KiB, MiB, and GiB.',
        category: 'Unit Converters',
        iconName: 'Database',
        keywords: ['mb to mib', 'binary storage converter', 'gb to gib', 'data size tool'],
        longDescription: 'Decode the difference between Decimal (MB) and Binary (MiB) storage standards. Essential for server admins and developers auditing file sizes and disk space.'
    },
    {
        slug: 'cooking-unit-converter',
        title: 'Cooking Unit Converter',
        description: 'Convert between Cups, Spoons, Ounces, and Grams.',
        category: 'Unit Converters',
        iconName: 'Utensils',
        keywords: ['cups to grams', 'tbsp to tsp', 'baking converter', 'kitchen unit tool'],
        longDescription: 'Your kitchen companion for international recipes. Convert volume (cups, spoons) to weight (grams, ounces) for common baking ingredients like flour, sugar, and butter.'
    },
    {
        slug: 'frequency-converter',
        title: 'Frequency Converter',
        description: 'Convert between Hertz, MHz, and GHz.',
        category: 'Unit Converters',
        iconName: 'Radio',
        keywords: ['hz to mhz', 'frequency conversion', 'radio wave tool', 'system clock converter'],
        longDescription: 'Quickly switch between audio, radio, and CPU frequencies ranging from standard Hertz to high-end Gigahertz.'
    },
    // Finance Expansion
    {
        slug: 'mortgage-calculator',
        title: 'Mortgage Calculator',
        description: 'Plan your home purchase with detailed monthly breakdowns.',
        category: 'Finance',
        iconName: 'Home',
        keywords: ['home loan calculator', 'mortgage payment', 'realty finance', 'piti calculator'],
        longDescription: 'Estimate your monthly home ownership costs. Includes Principal, Interest, Property Taxes, and Home Insurance (PITI) with interactive amortization schedules.'
    },
    {
        slug: 'investment-roi-calc',
        title: 'Investment ROI Calculator',
        description: 'Measure the Return on Investment for any capital outlay.',
        category: 'Finance',
        iconName: 'PieChart',
        keywords: ['roi calculator', 'profit percentage', 'investment gain', 'finance tracker'],
        longDescription: 'Calculate the total gain or loss onto your investments. Analyze the annualized ROI and net profit based on your initial buy price and final sell/current value.'
    },
    {
        slug: 'retirement-planner',
        title: 'Retirement Goal Planner',
        description: 'Estimate how much you need to save to retire comfortably.',
        category: 'Finance',
        iconName: 'Palmtree',
        keywords: ['retirement calculator', '401k planner', 'pension estimator', 'savings target'],
        longDescription: 'Visualize your future. Calculate the required monthly savings to reach your retirement nest egg based on your current age, desired retirement age, and expected inflation.'
    },
    {
        slug: 'savings-goal-calc',
        title: 'Savings Goal Calculator',
        description: 'Find out how much to save monthly to reach your target.',
        category: 'Finance',
        iconName: 'PiggyBank',
        keywords: ['savings target', 'money goal calculator', 'budgeting tool', 'emergency fund planner'],
        longDescription: 'Determine the exact monthly contribution needed to reach your financial milestones, whether it is for a new car, a vacation, or an emergency fund.'
    },
    {
        slug: 'crypto-price-converter',
        title: 'Crypto Price Converter',
        description: 'Check current values of BTC, ETH, and other coins in USD.',
        category: 'Finance',
        iconName: 'Coins',
        keywords: ['btc to usd', 'eth price converter', 'crypto calculator', 'bitcoin value tool'],
        longDescription: 'Stay updated with its global crypto markets. Convert between major cryptocurrencies and fiat currencies using simulated real-time market averages.'
    },
    {
        slug: 'inflation-calculator',
        title: 'Inflation Calculator',
        description: 'See how much your money has lost or gained value over time.',
        category: 'Finance',
        iconName: 'TrendingDown',
        keywords: ['inflation check', 'purchasing power', 'historical money value', 'cpi calculator'],
        longDescription: 'Understand the "hidden tax" of inflation. Calculate how the purchasing power of your currency has changed over historical periods using CPI data simulation.'
    },
    {
        slug: 'unit-price-calc',
        title: 'Unit Price Comparison',
        description: 'Find the best deal by comparing prices per unit/weight.',
        category: 'Finance',
        iconName: 'Scale',
        keywords: ['price comparison', 'grocery calculator', 'best deal finder', 'shopping tool'],
        longDescription: 'Don t be fooled by packaging. Compare the actual cost per kilogram, liter, or ounce between two products to find the truly cheaper option every time you shop.'
    },
    {
        slug: 'break-even-calc',
        title: 'Break Even Calculator',
        description: 'Find the point where your business starts making profit.',
        category: 'Finance',
        iconName: 'BarChart2',
        keywords: ['break even point', 'business finance tool', 'profitability calculator', 'startup metrics'],
        longDescription: 'A vital tool for entrepreneurs. Calculate the number of units you must sell to cover your fixed and variable costs, reaching the critical "Zero-Profit" point.'
    },
    {
        slug: 'margin-markup-calc',
        title: 'Margin vs Markup Calculator',
        description: 'Switch between profit margin and mark-up percentages.',
        category: 'Finance',
        iconName: 'TrendingUp',
        keywords: ['margin calculator', 'markup tool', 'business profit', 'retail finance'],
        longDescription: 'Clarify your pricing strategy. Instantly calculate profit margin based on cost/sell and understand the difference between gross margin and markup percentage.'
    },
    {
        slug: 'credit-card-payoff-calc',
        title: 'Credit Card Payoff Tool',
        description: 'See how long it will take to be debt-free.',
        category: 'Finance',
        iconName: 'CreditCard',
        keywords: ['debt payoff', 'credit card interest', 'finance freedom', 'loan repayment'],
        longDescription: 'Visualize your path to financial freedom. Calculate the time and total interest paid based on your balance, APR, and monthly payment strategy.'
    },
    {
        slug: 'net-worth-calc',
        title: 'Net Worth Calculator',
        description: 'Map out your total assets and liabilities.',
        category: 'Finance',
        iconName: 'ShieldCheck',
        keywords: ['net worth check', 'personal finance snapshot', 'wealth tracker', 'assets minus liabilities'],
        longDescription: 'Get a snapshot of your financial health. Log your cash, investments, and property vs your debts and loans to find your true Net Worth value.'
    },
    {
        slug: 'dividend-reinvestment-calc',
        title: 'Dividend Reinvestment (DRIP)',
        description: 'See the power of reinvesting your stock dividends.',
        category: 'Finance',
        iconName: 'ArrowRightCircle',
        keywords: ['drip calculator', 'dividend growth', 'passive income', 'stock market tools'],
        longDescription: 'Analyze the impact of reinvesting dividends back into your portfolio. Watch how your share count and passive income grow exponentially over decades.'
    },
    // Daily Tools Expansion
    {
        slug: 'alarm-clock',
        title: 'Online Alarm Clock',
        description: 'Set custom alarms with multiple sound options and snooze features.',
        category: 'Daily Tools',
        iconName: 'AlarmClock',
        keywords: ['alarm clock', 'online alarm', 'wake up timer', 'reminder tool'],
        longDescription: 'A reliable online alarm clock that works in your browser. Features multiple alarm sounds, snooze functionality, and a beautiful full-screen mode for your nightstand or desk.'
    },
    {
        slug: 'world-clock',
        title: 'World Clock',
        description: 'Track time across multiple cities worldwide in a single dashboard.',
        category: 'Daily Tools',
        iconName: 'Globe',
        keywords: ['world clock', 'global time', 'city time zones', 'world time dashboard'],
        longDescription: 'Keep track of global time zones. Add multiple cities to your custom dashboard and see the current time and day/night status across the world at a glance.'
    },
    {
        slug: 'daily-planner',
        title: 'Visual Daily Planner',
        description: 'A simple, local-storage based task list to organize your day.',
        category: 'Daily Tools',
        iconName: 'ListChecks',
        keywords: ['daily planner', 'to do list', 'day organizer', 'task tracker'],
        longDescription: 'Stay organized with our privacy-focused daily planner. All your tasks are saved locally in your browser, ensuring your schedule remains private while providing a clean, aesthetic interface for productivity.'
    },
    {
        slug: 'bmi-calculator',
        title: 'BMI Calculator',
        description: 'Calculate your Body Mass Index and see your health category.',
        category: 'Daily Tools',
        iconName: 'Activity',
        keywords: ['bmi calculator', 'body mass index', 'health weight check', 'fitness calculator'],
        longDescription: 'Calculate your Body Mass Index (BMI) using metric or imperial units. Get instant feedback on your health category and see where you fall on the clinical spectrum.'
    },
    {
        slug: 'calorie-calculator',
        title: 'Calorie Requirement Calc',
        description: 'Estimate your daily calorie needs based on age, weight, and activity.',
        category: 'Daily Tools',
        iconName: 'Flame',
        keywords: ['calorie calculator', 'tdee calculator', 'daily calories', 'weight loss tool'],
        longDescription: 'Find your Total Daily Energy Expenditure (TDEE). Our calculator helps you determine how many calories you burn per day based on your lifestyle, helping you plan for weight loss, maintenance, or muscle gain.'
    },
    {
        slug: 'water-intake-tracker',
        title: 'Water Intake Tracker',
        description: 'Track your daily water consumption and set hydration goals.',
        category: 'Daily Tools',
        iconName: 'Droplet',
        keywords: ['water tracker', 'hydration goal', 'drink water reminder', 'daily intake tracker'],
        longDescription: 'Stay hydrated for peak performance. Set your daily water goal and log your consumption throughout the day with our interactive, animated water tracker.'
    },
    {
        slug: 'meditation-timer',
        title: 'Zen Meditation Timer',
        description: 'Guided mindfulness timer with ambient sounds and intervals.',
        category: 'Daily Tools',
        iconName: 'Wind',
        keywords: ['meditation timer', 'zen timer', 'mindfulness tool', 'breath timer'],
        longDescription: 'Find your calm with our specialized meditation timer. Features soft bell sounds for intervals, ambient background noise, and a minimalist design to help you focus on your breath.'
    },
    {
        slug: 'metronome',
        title: 'Professional Metronome',
        description: 'Keep perfect time for your music practice with adjustable BPM.',
        category: 'Daily Tools',
        iconName: 'Music',
        keywords: ['metronome online', 'tempo keeper', 'music timer', 'bpm counter'],
        longDescription: 'A rock-solid metronome for musicians. Adjust BPM, choose time signatures, and select from multiple click sounds to stay in perfect time during practice or recording sessions.'
    },
    {
        slug: 'virtual-ruler',
        title: 'Virtual Screen Ruler',
        description: 'A precise on-screen ruler for measuring small objects or screen elements.',
        category: 'Daily Tools',
        iconName: 'Ruler',
        keywords: ['screen ruler', 'online ruler', 'measure on screen', 'px to cm ruler'],
        longDescription: 'Measure small physical objects by calibrating your screen ruler, or use it to measure digital assets. Supports pixels, centimeters, and inches with easy calibration tools.'
    },
    {
        slug: 'dice-roller',
        title: '3D Dice Roller',
        description: 'Roll custom dice for board games, RPGs, or decision making.',
        category: 'Daily Tools',
        iconName: 'Dice5',
        keywords: ['dice roller', 'roll a die', 'dnd dice', 'random dice generator'],
        longDescription: 'Your digital dice bag for any occasion. Roll standard 6-sided dice or specialized D20s for tabletop games. Features physics-based movements and history tracking.'
    },
    {
        slug: 'random-number-gen',
        title: 'Random Number Generator',
        description: 'Generate sets of random numbers within your custom range.',
        category: 'Daily Tools',
        iconName: 'Hash',
        keywords: ['random number', 'number generator', 'pick a number', 'rng tool'],
        longDescription: 'Generate one or multiple random numbers instantly. Customize the range, allow or prevent duplicates, and sort your results. Perfect for lotteries, research, or games.'
    },
    {
        slug: 'coin-flipper',
        title: '3D Coin Flipper',
        description: 'Flip a virtual coin for quick 50/50 decisions.',
        category: 'Daily Tools',
        iconName: 'Circle',
        keywords: ['coin flip', 'heads or tails', 'toss a coin', 'decision maker'],
        longDescription: 'Heads or Tails? Settle arguments and make quick choices with our fast, animated coin flipper. Tracks your flip history to see your luck over time.'
    },
    {
        slug: 'anagram-solver',
        title: 'Anagram Solver',
        description: 'Find all possible words that can be formed from your letters.',
        category: 'Daily Tools',
        iconName: 'Languages',
        keywords: ['anagram solver', 'word unscrambler', 'scrabble helper', 'letter solver'],
        longDescription: 'Unscramble any set of letters into a list of valid words. A must-have for word games like Scrabble, Words with Friends, or solving difficult anagram puzzles.'
    },
    {
        slug: 'scrabble-score-calc',
        title: 'Scrabble Score Calc',
        description: 'Calculate the point value of words with multipliers.',
        category: 'Daily Tools',
        iconName: 'Type',
        keywords: ['scrabble score', 'word points', 'scrabble helper', 'score calculator'],
        longDescription: 'Never argue over points again. Enter your words and apply Double/Triple Letter and Word bonuses to calculate your exact Scrabble score instantly.'
    },
    {
        slug: 'quote-generator',
        title: 'Inspirational Quote Gen',
        description: 'Generate random inspirational quotes to boost your mood.',
        category: 'Daily Tools',
        iconName: 'Quote',
        keywords: ['quote generator', 'daily quotes', 'inspirational text', 'random wisdom'],
        longDescription: 'Get a boost of motivation. Our generator provides thousands of curated quotes from history\'s greatest minds, perfectly formatted for social media sharing.'
    },
    {
        slug: 'wheel-of-fortune',
        title: 'Decision Wheel',
        description: 'Create custom spinning wheels to make fun decisions.',
        category: 'Daily Tools',
        iconName: 'Disc',
        keywords: ['decision wheel', 'spin the wheel', 'random picker', 'prize wheel'],
        longDescription: 'Customize your own spinning wheel with names, prizes, or choices. Perfect for picking a winner, deciding where to eat, or adding fun to group activities.'
    },
    {
        slug: 'password-strength-tester',
        title: 'Password Strength Tester',
        description: 'Check how secure your password is and how long it would take to crack.',
        category: 'Daily Tools',
        iconName: 'ShieldCheck',
        keywords: ['password strength', 'security check', 'password crack time', 'secure password test'],
        longDescription: 'Analyze your password security. This tool checks for complexity, entropy, and common patterns to estimate how long a brute-force attack would take to succeed.'
    },

    // Design & UI Expansion
    {
        slug: 'box-shadow-generator',
        title: 'Box Shadow Generator',
        description: 'Create layered, realistic CSS box shadows with ease.',
        category: 'Design & UI',
        iconName: 'Layers',
        keywords: ['box shadow generator', 'css shadow maker', 'ui shadow tool', 'realistic shadows'],
        longDescription: 'Design professional UI shadows. Adjust spread, blur, and opacity for multiple layers to create the trendy "layered shadow" effect used in modern top-tier interfaces.'
    },
    {
        slug: 'border-radius-customizer',
        title: 'Fancy Border Radius',
        description: 'Generate complex organic shapes using the 8-value border-radius property.',
        category: 'Design & UI',
        iconName: 'MousePointer2',
        keywords: ['border radius generator', 'fancy border radius', 'css blobs', 'organic shapes'],
        longDescription: 'Go beyond simple rounded corners. Create organic, blob-like shapes using the advanced 8-value CSS border-radius attribute, perfect for modern brand elements and background assets.'
    },
    {
        slug: 'flexbox-playground',
        title: 'Flexbox Playground',
        description: 'Visualize and generate CSS for flexbox layouts interactively.',
        category: 'Design & UI',
        iconName: 'Layout',
        keywords: ['flexbox generator', 'css flexbox tool', 'layout playground', 'flex visualizer'],
        longDescription: 'Master CSS Flexbox through visualization. Drag and click to see how justify-content, align-items, and flex-direction affect your elements in real-time.'
    },
    {
        slug: 'grid-layout-helper',
        title: 'CSS Grid Helper',
        description: 'Design complex CSS Grid structures and export the clean code.',
        category: 'Design & UI',
        iconName: 'Grid',
        keywords: ['css grid generator', 'grid layout tool', 'web design grid', 'grid code gen'],
        longDescription: 'Take the complexity out of CSS Grid. Visually define your rows, columns, and gaps to generate robust, production-ready grid code for your layouts.'
    },
    {
        slug: 'pixel-to-rem-converter',
        title: 'Pixel to REM Converter',
        description: 'Convert PX measurements to accessible REM units for typography.',
        category: 'Design & UI',
        iconName: 'Scaling',
        keywords: ['px to rem', 'rem converter', 'accessible typography', 'web design units'],
        longDescription: 'Ensure your typography is responsive and accessible. Convert standard pixels to REM units based on your base font size, a best practice for modern web development.'
    },
    {
        slug: 'typographic-scale-gen',
        title: 'Typographic Scale Gen',
        description: 'Create harmonious font size hierarchies based on musical scales.',
        category: 'Design & UI',
        iconName: 'Type',
        keywords: ['type scale generator', 'font size hierarchy', 'musical typography', 'design system tool'],
        longDescription: 'Build a solid typography system. Use mathematical ratios like the Golden Ratio or Perfect Fourth to generate a balanced scale for your headers and body text.'
    },
    {
        slug: 'golden-ratio-calc',
        title: 'Golden Ratio Calculator',
        description: 'Calculate perfectly balanced dimensions based on the 1.618 ratio.',
        category: 'Design & UI',
        iconName: 'Compass',
        keywords: ['golden ratio', 'phi calculator', 'design proportions', 'aesthetic math'],
        longDescription: 'Apply nature\'s math to your designs. Quickly find the golden proportions for your UI elements, layouts, and typography for peak aesthetic balance.'
    },
    {
        slug: 'color-blindness-sim',
        title: 'Color Blindness Sim',
        description: 'Preview how your brand colors look to users with color vision deficiencies.',
        category: 'Design & UI',
        iconName: 'Eye',
        keywords: ['color blindness simulator', 'inclusive design', 'accessibility tool', 'color vision check'],
        longDescription: 'Design for everyone. Simulate Protanopia, Deuteranopia, and Tritanopia on your color themes to ensure your UI remains usable and readable for all users.'
    },
    {
        slug: 'mesh-gradient-gen',
        title: 'CSS Mesh Gradient Gen',
        description: 'Create stunning, complex mesh gradients with liquid-like movements.',
        category: 'Design & UI',
        iconName: 'Palette',
        keywords: ['mesh gradient generator', 'liquid gradient css', 'abstract background generator', 'modern ui design'],
        longDescription: 'Design high-end, abstract backgrounds. Create organic "liquid" mesh gradients with multiple control points and export the CSS/Canvas code and animated styles.'
    },
    {
        slug: 'neuomorphism-gen',
        title: 'Neuomorphism Generator',
        description: 'Generate soft, extruded UI elements with perfectly matched shadows.',
        category: 'Design & UI',
        iconName: 'Box',
        keywords: ['neuomorphism generator', 'soft ui maker', 'css neumo tool', 'modern ui effects'],
        longDescription: 'Master the "Soft UI" aesthetic. Adjust depth, light source, and color to generate the perfect neumorphic CSS for your buttons, cards, and input fields.'
    },
    {
        slug: 'tailwind-color-picker',
        title: 'Tailwind Color Picker',
        description: 'Browse the full Tailwind CSS color palette and copy color codes.',
        category: 'Design & UI',
        iconName: 'Palette',
        keywords: ['tailwind colors', 'tailwind color picker', 'utility-first colors', 'web design palette'],
        longDescription: 'A quick reference for Tailwind CSS developers. Search and copy Hex, RGB, or HSL codes from the official Tailwind palette with a simple, grouped interface.'
    },
    {
        slug: 'svg-path-editor',
        title: 'SVG Path Editor',
        description: 'Visually edit and optimize SVG path data strings in real-time.',
        category: 'Design & UI',
        iconName: 'Wind',
        keywords: ['svg editor', 'path data tool', 'vector editor online', 'svg optimization'],
        longDescription: 'Manipulate vector paths without complex software. Directly edit and visualize SVG path commands (M, L, C, Z) and see the results instantly on a high-precision grid.'
    },
    {
        slug: 'custom-button-generator',
        title: 'Premium Button Gen',
        description: 'Design high-end CSS buttons with hover effects and animations.',
        category: 'Design & UI',
        iconName: 'Square',
        keywords: ['button generator', 'css buttons', 'ui button maker', 'hover effects'],
        longDescription: 'Create call-to-action buttons that pop. Customize gradients, borders, shadows, and secondary transition effects to build premium buttons for your landing pages.'
    },
    {
        slug: 'glassmorphism-pro',
        title: 'Glassmorphism Pro',
        description: 'Advanced glass effect generator with texture and grain options.',
        category: 'Design & UI',
        iconName: 'Layers',
        keywords: ['glassmorphism pro', 'frosted glass css', 'noise texture generator', 'modern ui backgrounds'],
        longDescription: 'Take the glass effect to the next level. includes advanced options for adding noise textures, secondary highlights, and complex backdrop filters for a truly premium feel.'
    },

    // Image Tools Expansion
    {
        slug: 'image-compressor',
        title: 'Smart Image Compressor',
        description: 'Reduce image file size with controlled quality for web optimization.',
        category: 'Image Tools',
        iconName: 'Minimize',
        keywords: ['image compressor', 'shrink photo', 'web optimization', 'reduce size'],
        longDescription: 'Optimize your assets for the web. Reduce file sizes by up to 80% with our smart compression algorithm while maintaining visual clarity. All processing happens in-browser.'
    },
    {
        slug: 'image-filters-pro',
        title: 'Image Filters Pro',
        description: 'Apply professional filters like Grayscale, Sepia, and Blur to your photos.',
        category: 'Image Tools',
        iconName: 'Sliders',
        keywords: ['image filters', 'photo effects', 'blur image', 'grayscale converter', 'online photo editor'],
        longDescription: 'Quickly modify your images with professional filters. Adjust brightness, contrast, saturation, and apply artistic effects directly in your browser with zero upload wait.'
    },
    {
        slug: 'exif-data-viewer',
        title: 'EXIF Metadata Viewer',
        description: 'Extract and view hidden metadata (ISO, Camera, Location) from JPG images.',
        category: 'Image Tools',
        iconName: 'Info',
        keywords: ['exif viewer', 'image metadata', 'photo info', 'gps data from image'],
        longDescription: 'See the technical story behind your photos. Extract hidden EXIF data including camera settings, timestamp, and even GPS coordinates where the photo was taken.'
    },
    {
        slug: 'svg-to-png-converter',
        title: 'SVG to PNG Converter',
        description: 'Convert vector SVG files into high-resolution transparent PNGs.',
        category: 'Image Tools',
        iconName: 'RefreshCw',
        keywords: ['svg to png', 'vector to raster', 'transparent image converter', 'svg export'],
        longDescription: 'Transform your scalable vectors into standard raster images. Select custom resolutions and maintain transparency, perfect for app icons and web assets.'
    },
    {
        slug: 'webp-to-image-converter',
        title: 'WebP to JPG/PNG',
        description: 'Convert modern WebP images to standard JPG or PNG formats.',
        category: 'Image Tools',
        iconName: 'RefreshCw',
        keywords: ['webp to jpg', 'webp to png', 'convert webp online', 'image legacy tool'],
        longDescription: 'Make modern web images compatible with legacy software. Quickly convert WebP files back into the widely supported JPG or PNG formats without data loss.'
    },
    {
        slug: 'image-to-base64',
        title: 'Image to Base64',
        description: 'Convert any image file into a Base64 string for embedding.',
        category: 'Image Tools',
        iconName: 'Code',
        keywords: ['image to base64', 'encode image', 'b64 image maker', 'inline css image'],
        longDescription: 'Turn your images into text for easy embedding. Generate clean Base64 data strings that can be used directly in your CSS or HTML without extra file requests.'
    },
    {
        slug: 'base64-to-image',
        title: 'Base64 to Image',
        description: 'Convert a Base64 data string back into a downloadable image file.',
        category: 'Image Tools',
        iconName: 'Image',
        keywords: ['base64 to image', 'decode base64', 'b64 to png', 'restore image from text'],
        longDescription: 'Restore your images from text strings. Paste a Base64 URI to instantly visualize and download the corresponding image file in its original quality.'
    },
    {
        slug: 'color-picker-from-image',
        title: 'Image Color Picker',
        description: 'Upload an image and extract exact Hex/RGB codes from any pixel.',
        category: 'Image Tools',
        iconName: 'Pipette',
        keywords: ['color picker', 'extract colors from photo', 'get hex from image', 'palette from photo'],
        longDescription: 'Get the exact colors from your inspiration. Upload any photo and click anywhere to get precise Hex, RGB, and HSL codes for your design projects.'
    },
    {
        slug: 'favicon-generator-utility',
        title: 'Quick Favicon Gen',
        description: 'Generate standard 16x16 and 32x32 favicons from your logo.',
        category: 'Image Tools',
        iconName: 'Target',
        keywords: ['favicon generator', 'make favicon', 'ico file creator', 'web identity tool'],
        longDescription: 'The fastest way to create a website icon. Upload your logo and get perfectly sized .ico and .png files for your browser tabs and bookmarks.'
    },
    {
        slug: 'gif-to-frames-extractor',
        title: 'GIF to Frames',
        description: 'Extract individual static frames from any animated GIF.',
        category: 'Image Tools',
        iconName: 'Layers',
        keywords: ['gif frames', 'extract gif', 'animated to static', 'gif analyzer'],
        longDescription: 'Deconstruct animations. Upload an animated GIF to see and download every individual frame, allowing you to salvage specific moments or analyze the animation sequence.'
    },
    {
        slug: 'image-sprite-sheet-gen',
        title: 'Sprite Sheet Maker',
        description: 'Combine multiple images into a single sprite sheet for gaming or web.',
        category: 'Image Tools',
        iconName: 'Grid',
        keywords: ['sprite sheet generator', 'atlas maker', 'combine images', 'gaming textures'],
        longDescription: 'Optimize your game or web app by merging multiple assets into one texture atlas. Reduce loading times and manage your frames with our visual sprite sheet packager.'
    },
    {
        slug: 'qr-code-scanner',
        title: 'QR Code Scanner',
        description: 'Upload an image to scan and decode QR codes instantly.',
        category: 'Image Tools',
        iconName: 'Scan',
        keywords: ['scan qr code', 'qr decoder', 'read qr from image', 'qr link finder'],
        longDescription: 'Read QR codes without a camera. Simply upload a photo or screenshot containing a QR code to instantly extract the encoded URL or text information.'
    },
    {
        slug: 'barcode-generator',
        title: 'Barcode Generator',
        description: 'Create standard barcodes (EAN, UPC, Code 128) for print or retail.',
        category: 'Image Tools',
        iconName: 'Barcode',
        keywords: ['barcode generator', 'make barcode', 'upc creator', 'ean13 tool'],
        longDescription: 'Generate professional barcodes for inventory or retail. Supports all major international standards including EAN-13, UPC-A, and Code 128 with high-resolution export.'
    },
    {
        slug: 'image-upscaler-ui',
        title: 'Visual Image Upscaler',
        description: 'Premium UI for upscaling small images with smooth resampling.',
        category: 'Image Tools',
        iconName: 'Maximize2',
        keywords: ['image upscaler', 'hq resize', 'enlarge photo', 'image resampling tool'],
        longDescription: 'Make small images usable. Our upscaler uses high-quality resampling algorithms to enlarge your images while minimizing pixelation and blurriness.'
    },
    {
        slug: 'image-mirror-tool',
        title: 'Horizontal/Vertical Mirror',
        description: 'Flip your images horizontally or vertically in one click.',
        category: 'Image Tools',
        iconName: 'ArrowLeftRight',
        keywords: ['mirror image', 'flip photo', 'reflect image', 'image orientation'],
        longDescription: 'Instantly mirror your graphics. Whether you need to flip a logo or create a reflected effect, our tool provides fast horizontal and vertical flipping at original quality.'
    },
    {
        slug: 'image-rotation-expert',
        title: 'Exact Image Rotator',
        description: 'Rotate images by precise degrees or standard 90/180 angles.',
        category: 'Image Tools',
        iconName: 'RefreshCw',
        keywords: ['rotate image', 'straighten photo', 'image angle tool', 'orientation fix'],
        longDescription: 'Fix tilted photos or change orientations. Rotate your images by 90-degree steps or use the fine-tuning slider to straighten horizons with precision.'
    },
    {
        slug: 'gpa-calculator',
        title: 'GPA Calculator Pro',
        description: 'Calculate your semester or cumulative GPA across multiple scales (4.0, 5.0, 10.0).',
        category: 'Education',
        iconName: 'Calculator',
        keywords: ['gpa calculator', 'calculate grades', 'cgpa to percentage', 'semester gpa', 'academic grades'],
        longDescription: 'Manage your academic success with our professional GPA calculator. Support for weighted credits, multiple grading scales, and cumulative semester tracking to keep you on top of your educational goals.'
    },
    {
        slug: 'scientific-calculator-pro',
        title: 'Adv. Scientific Calculator',
        description: 'Perform complex mathematical functions including trig, logs, and exponents.',
        category: 'Education',
        iconName: 'Calculator',
        keywords: ['scientific calculator', 'online math tool', 'trigonometry calculator', 'logarithm tool', 'engineering calculator'],
        longDescription: 'A fully-featured scientific calculator in your browser. Handles everything from basic arithmetic to advanced trigonometry, logarithms, power functions, and constant values for physics and chemistry.'
    },
    {
        slug: 'citation-generator-pro',
        title: 'Quick Citation Gen',
        description: 'Generate accurate APA, MLA, and Chicago style citations for books and web.',
        category: 'Education',
        iconName: 'Quote',
        keywords: ['citation generator', 'mla generator', 'apa citation maker', 'chicago style', 'bibliography tool'],
        longDescription: 'Eliminate the stress of academic formatting. Our citation generator creates perfectly structured references for your research papers, supporting the latest versions of MLA, APA, and Chicago styles.'
    },
    {
        slug: 'periodic-table-pro',
        title: 'Interactive Periodic Table',
        description: 'Explore chemical elements with detailed atomic, physical, and historical data.',
        category: 'Education',
        iconName: 'Grid',
        keywords: ['periodic table', 'chemistry elements', 'atomic mass', 'element groups', 'electron configuration'],
        longDescription: 'A comprehensive interactive reference for the chemical elements. View real-time data on atomic weights, electron shells, group properties, and discovery history for every element in the periodic table.'
    },
    {
        slug: 'math-step-solver',
        title: 'Visual Math Step-Solver',
        description: 'Visualize the logic behind solving algebra and basic math problems.',
        category: 'Education',
        iconName: 'Braces',
        keywords: ['math solver', 'step by step math', 'algebra calculator', 'math logic solver', 'equation solver'],
        longDescription: 'Dont just get the answer—understand the process. Our visual step-solver breaks down complex algebra problems into logical parts, helping students master the underlying concepts of mathematics.'
    },
    {
        slug: 'flashcard-study-pro',
        title: 'Interactive Flashcards',
        description: 'Create digital study decks with flip-animations for effective memorization.',
        category: 'Education',
        iconName: 'Layers',
        keywords: ['flashcard maker', 'study cards', 'memorization tool', 'active recall', 'online study aid'],
        longDescription: 'Harness the power of active recall and spaced repetition. Create custom study decks with our interactive flashcard tool, designed to help you memorize vocabulary, dates, and concepts for your upcoming exams.'
    },
    {
        slug: 'weighted-grade-calc',
        title: 'Weighted Grade Calc',
        description: 'Calculate your current grade based on category weights (Homework, Exams, etc.).',
        category: 'Education',
        iconName: 'BarChart3',
        keywords: ['grade calculator', 'weighted average', 'final grade calc', 'semester marks', 'weighted mean'],
        longDescription: 'Understand exactly where you stand in your courses. Input your category weights and scores to calculate your true current grade, allowing you to prioritize your study efforts where they matter most.'
    },
    {
        slug: 'final-exam-calc',
        title: 'Final Grade Required',
        description: 'Determine the exact score you need on your final exam to reach your target grade.',
        category: 'Education',
        iconName: 'Target',
        keywords: ['final exam calculator', 'needed grade calc', 'exam score solver', 'grade target tool'],
        longDescription: 'Calculate the pressure before the test. Our final grade required tool tells you exactly what score you need on your remaining assignments or final exams to achieve your desired course grade.'
    },
    {
        slug: 'essay-outline-gen',
        title: 'Essay Outline Generator',
        description: 'Generate structured academic outlines based on your thesis and arguments.',
        category: 'Education',
        iconName: 'ListChecks',
        keywords: ['essay outline', 'academic writing helper', 'thesis generator', 'paper structure tool', 'writing planner'],
        longDescription: 'Break through writer s block. Provide your main thesis and core arguments, and our generator will create a logical, professional outline to guide your academic writing process from introduction to conclusion.'
    },
    {
        slug: 'percentage-gpa-converter',
        title: 'Percent to GPA Solver',
        description: 'Convert between percentage marks and various GPA scales used globally.',
        category: 'Education',
        iconName: 'RefreshCw',
        keywords: ['percent to gpa', 'marks to gpa', 'grade conversion', 'global grade scales', 'cgpa converter'],
        longDescription: 'Simplify international grade comparisons. Convert your percentage marks into 4.0, 5.0, and 10.0 GPA scales instantly using standard academic conversion formulas used by universities worldwide.'
    },
    {
        slug: 'physics-formula-solver',
        title: 'Advanced Physics Solver',
        description: 'Solve for force, velocity, acceleration, and energy with step-by-step logic.',
        category: 'Education',
        iconName: 'Zap',
        keywords: ['physics calculator', 'force solver', 'velocity calculator', 'kinematics solver', 'physics homework helper'],
        longDescription: 'Master the laws of motion. Our Physics Solver handles core kinematic and dynamic equations, allowing you to solve for unknown variables while showing the mathematical steps involved in each derivation.'
    },
    {
        slug: 'chem-equation-balancer',
        title: 'Chem-Equator Balancer',
        description: 'Balance chemical reactions and calculate stoichiometric ratios instantly.',
        category: 'Education',
        iconName: 'Droplet',
        keywords: ['chemical balancer', 'reaction balancer', 'chemistry solver', 'stoichiometry tool', 'balancing equations'],
        longDescription: 'Ensure the conservation of mass. Our chemical equation balancer uses specialized algorithms to find the coefficients needed to balance any standard chemical reaction, saving you time on complex chemistry homework.'
    },
    {
        slug: 'study-planner-pro',
        title: 'Student Session Planner',
        description: 'Plan your study sessions with sub-tasks, timers, and subject-tracking.',
        category: 'Education',
        iconName: 'CalendarCheck',
        keywords: ['study planner', 'exam schedule', 'session tracker', 'academic planning', 'subject management'],
        longDescription: 'Organize your academic life. Break down your subjects into manageable study sessions with dedicated timers and task checklists, helping you maintain focus and hit your study goals during finals week.'
    },
    {
        slug: 'bibliography-automator',
        title: 'Bibliography Automator',
        description: 'Compile and format complete bibliography lists from multiple sources.',
        category: 'Education',
        iconName: 'ListChecks',
        keywords: ['bibliography maker', 'works cited tool', 'reference list', 'academic writing', 'source formatter'],
        longDescription: 'Build professional-grade bibliographies. This tool allows you to compile multiple citations into a single, alphabetized list formatted for your Works Cited or References page.'
    },
    {
        slug: 'vocabulary-builder-pro',
        title: 'Academic Vocab Builder',
        description: 'Master advanced academic vocabulary with interactive word exploration.',
        category: 'Education',
        iconName: 'Languages',
        keywords: ['vocabulary builder', 'sat vocab', 'academic words', 'language learning', 'word of the day'],
        longDescription: 'Expand your academic lexicon. Explore high-level vocabulary commonly found in peer-reviewed journals and standardized tests, with detailed definitions, synonyms, and contextual usage examples.'
    },
    {
        slug: 'graphing-tool-lite',
        title: 'Visual Graph Plotter',
        description: 'Plot and visualize linear and quadratic functions with an interactive graph.',
        category: 'Education',
        iconName: 'LineChart',
        keywords: ['graph plotter', 'function visualizer', 'math graph', 'linear function', 'quadratic plot'],
        longDescription: 'Bring mathematics to life. Plot your algebraic functions on our interactive grid to visualize intercepts, slopes, and curves, making abstract mathematical concepts easier to grasp.'
    },
    {
        slug: 'venn-diagram-maker',
        title: 'Interactive Venn Diagram',
        description: 'Visualize relationships between topic sets with overlapping diagrams.',
        category: 'Education',
        iconName: 'Circle',
        keywords: ['venn diagram generator', 'comparison tool', 'logical sets', 'subject analysis', 'visual organizer'],
        longDescription: 'Compare and contrast with clarity. Create perfectly proportioned Venn diagrams to visualize the intersections and differences between multiple concepts or data sets for your research projects.'
    },
    {
        slug: 'advanced-prime-analyzer',
        title: 'Prime Number Analyzer',
        description: 'Analyze primality, find factors, and explore prime distributions.',
        category: 'Education',
        iconName: 'Hash',
        keywords: ['prime number checker', 'factorization tool', 'primality test', 'math number theory', 'prime factors'],
        longDescription: 'Explore the building blocks of number theory. Our analyzer checks for primality using high-speed algorithms and provides complete factor trees for any integer within the educational range.'
    },
    {
        slug: 'matrix-calculator-pro',
        title: 'Linear Matrix Solver',
        description: 'Perform matrix addition, subtraction, and multiplication with step-display.',
        category: 'Education',
        iconName: 'Grid',
        keywords: ['matrix calculator', 'linear algebra', 'matrix math', 'array solver', 'matrix multiplication'],
        longDescription: 'Simplify linear algebra. Our matrix solver handles basic array operations while showing the specific row-column calculations, helping students understand the mechanics of matrix arithmetic.'
    },
    {
        slug: 'trig-unit-circle-pro',
        title: 'Unit Circle Interactive',
        description: 'Explore trigonometric functions (sin, cos, tan) through an interactive unit circle.',
        category: 'Education',
        iconName: 'Compass',
        keywords: ['unit circle', 'trigonometry tool', 'sin cos tan', 'angle visualizer', 'math trig help'],
        longDescription: 'Master trigonometry visually. Rotate the unit circle to see how sine, cosine, and tangent values change with the angle, providing a deep intuitive understanding of periodic functions.'
    },
    {
        slug: 'calculus-rule-solver',
        title: 'Differentiator & Integrator',
        description: 'Reference and solve derivative and integral problems using core calculus rules.',
        category: 'Education',
        iconName: 'Braces',
        keywords: ['calculus solver', 'derivative calculator', 'integral tool', 'math rules', 'derivation helper'],
        longDescription: 'Master the rules of change. Our calculus aid provides interactive solvers for power, product, and chain rules, helping students apply the fundamental theorems of calculus correctly.'
    },
    {
        slug: 'assignment-kanban-board',
        title: 'Student Task Board',
        description: 'Organize your academic workload with a visual Kanban task management board.',
        category: 'Education',
        iconName: 'Layout',
        keywords: ['assignment tracker', 'kanban for students', 'task board', 'study organization', 'project manager'],
        longDescription: 'Stop missing deadlines. Organize your assignments into "To Do", "In Progress", and "Done" columns with a visual board designed for the fast-paced academic workflow.'
    },
    {
        slug: 'standardized-test-conv',
        title: 'SAT & ACT Converter',
        description: 'Convert scores between SAT and ACT standardized tests using official scales.',
        category: 'Education',
        iconName: 'RefreshCw',
        keywords: ['sat to act converter', 'test score conversion', 'standardized testing', 'college prep', 'score solver'],
        longDescription: 'Compare your standardized test performance. Our converter uses the official concordance tables to provide accurate equivalent scores between the SAT and ACT formats for college admissions.'
    },
    {
        slug: 'mind-map-logic',
        title: 'Mind Map Visualizer',
        description: 'Brainstorm and map out your academic projects with visual node hierarchies.',
        category: 'Education',
        iconName: 'Layers',
        keywords: ['mind map creator', 'brainstorming tool', 'visual mapping', 'essay planning', 'concept map'],
        longDescription: 'Visualize your ideas. Create hierarchical branches for your research topics and essay arguments, allowing you to see the big picture and the fine details of your academic projects simultaneously.'
    },
    {
        slug: 'molar-mass-pro',
        title: 'Molar Mass Pro',
        description: 'Advanced chemical formula parser for calculating molar mass of complex compounds.',
        category: 'Education',
        iconName: 'Droplet',
        keywords: ['molar mass calculator', 'chemical formula parser', 'atomic weight', 'molecular mass', 'chemistry solver'],
        longDescription: 'A professional-grade chemical formula parser. Handles complex notation including parentheses, hydrates, and nested groups (e.g., (NH4)2SO4 or CuSO4*5H2O) with high-precision atomic weight data.'
    },
    {
        slug: 'projectile-simulator',
        title: 'Projectile Simulator',
        description: 'Interactive physics simulator to visualize 2D trajectories with air resistance.',
        category: 'Education',
        iconName: 'Zap',
        keywords: ['projectile motion', 'physics simulator', 'trajectory visualizer', 'kinematics tool', 'motion physics'],
        longDescription: 'Master kinematics with visual intuition. Adjust initial velocity, launch angle, and atmospheric drag to see real-time trajectory plotting and kinematic data breakdowns.'
    },
    {
        slug: 'circuit-solver-pro',
        title: 'Circuit Solver Pro',
        description: 'Analyze series and parallel circuits with visual resistance and voltage mapping.',
        category: 'Education',
        iconName: 'Zap',
        keywords: ['circuit calculator', 'ohms law', 'series parallel', 'electronics solver', 'dc circuit analyzer'],
        longDescription: 'A premium tool for DC circuit analysis. Build series and parallel resistor networks to calculate equivalent resistance, total current, and voltage drops across specific components.'
    },
    {
        slug: 'complex-number-pro',
        title: 'Complex Number Pro',
        description: 'Perform arithmetic and polar conversions on complex numbers (a + bi).',
        category: 'Education',
        iconName: 'Hash',
        keywords: ['complex numbers', 'imaginary numbers', 'polar coordinates', 'phasor calculator', 'advanced math'],
        longDescription: 'A dedicated calculator for imaginary and complex numbers. Supports basic arithmetic, modulus/argument calculation, and seamless switching between rectangular and polar forms.'
    },
    {
        slug: 'probability-pro',
        title: 'Probability Pro',
        description: 'Analyze Normal and Binomial distributions with interactive visualizations.',
        category: 'Education',
        iconName: 'BarChart3',
        keywords: ['probability distribution', 'normal distribution', 'binomial calculator', 'statistics tool', 'z-score solver'],
        longDescription: 'Deep statistical analysis in your browser. Visualize probability density functions, calculate cumulative probabilities, and find critical values for standard distributions.'
    },
    {
        slug: 'ph-calculator-pro',
        title: 'pH Calculator Pro',
        description: 'Calculate pH, pOH, and concentration for strong and weak acid-base systems.',
        category: 'Education',
        iconName: 'Droplet',
        keywords: ['ph calculator', 'acid base solver', 'titration math', 'poh calculator', 'chemistry tools'],
        longDescription: 'Master aqueous chemistry. Calculate the pH of various solutions, including weak acids and bases using equilibrium constants (Ka/Kb), with detailed molar concentration readouts.'
    },
    {
        slug: 'gas-law-advanced',
        title: 'Gas Law Advanced',
        description: 'Solve Ideal, Boyles, and Charles gas laws with integrated unit conversions.',
        category: 'Education',
        iconName: 'Wind',
        keywords: ['gas law calculator', 'ideal gas law', 'pv=nrt solver', 'chemistry thermodynamics', 'physics of gases'],
        longDescription: 'A comprehensive solver for gas thermodynamics. Handle variables for pressure, volume, temperature, and moles across multiple unit systems (atm, kPa, Celsius, Kelvin) flawlessly.'
    },
    {
        slug: 'differential-equation-pro',
        title: 'Differential Eq. Pro',
        description: 'Heuristic solver for first-order linear and separable differential equations.',
        category: 'Education',
        iconName: 'Braces',
        keywords: ['differential equation solver', 'calculus tool', 'separable equations', 'first order linear', 'math solver'],
        longDescription: 'Advance your calculus skills. Our heuristic solver identifies and breaks down standard first-order differential equations, providing step-by-step logic and integration constants.'
    },
    {
        slug: 'relativity-dilation',
        title: 'Relativity Time Dilation',
        description: 'Visualize Einsteins Special Relativity and calculate Lorentz time dilation.',
        category: 'Education',
        iconName: 'Clock',
        keywords: ['relativity', 'time dilation', 'lorentz factor', 'physics', 'special relativity', 'einstein'],
        longDescription: 'Experience the physics of the very fast. Calculate the time dilation between a moving observer and a stationary one using the Lorentz factor ($ \gamma $), with visual context for speeds approaching $c$.'
    },
    {
        slug: 'reaction-kinetics',
        title: 'Reaction Kinetics Pro',
        description: 'Advanced tool for calculating rate laws, half-life, and activation energy.',
        category: 'Education',
        iconName: 'Activity',
        keywords: ['reaction kinetics', 'rate law', 'half life', 'chemistry solver', 'arrhenius equation'],
        longDescription: 'A professional physical chemistry solver. Determine reaction order, calculate rate constants across temperatures using the Arrhenius equation, and track half-life decay patterns.'
    },
    {
        slug: 'laplace-solver-pro',
        title: 'Laplace Solver Pro',
        description: 'Reference and solver for Laplace and Inverse Laplace transforms.',
        category: 'Education',
        iconName: 'Calculator',
        keywords: ['laplace transform', 'inverse laplace', 'engineering math', 'signals and systems', 'math tool'],
        longDescription: 'The ultimate tool for engineering mathematics. Access a comprehensive library of s-domain transforms and apply them to standard time-domain functions with clear step-by-step logic.'
    },
    {
        slug: 'vector-calc-pro',
        title: 'Vector Calc Pro',
        description: 'Perform advanced vector operations including Cross Product and Dot Product.',
        category: 'Education',
        iconName: 'MoveUpRight',
        keywords: ['vector algebra', 'cross product', 'dot product', 'magnitude', 'linear algebra', 'math'],
        longDescription: 'High-precision vector algebra. Calculate cross products, dot products, vector magnitudes, and the angles between vectors in 3D space with visual coordinate readouts.'
    },
    {
        slug: 'titration-curve-sim',
        title: 'Titration Curve Sim',
        description: 'Interactive visual simulator for acid-base titration and equivalence points.',
        category: 'Education',
        iconName: 'Beaker',
        keywords: ['titration curve', 'chemistry simulator', 'equivalence point', 'buffer region', 'acid base'],
        longDescription: 'Visualize aqueous chemistry in motion. Simulate the titration of strong/weak acids and bases to see real-time pH curve plotting and identify fundamental equivalence points.'
    },
];

export const getToolBySlug = (slug: string) => {
    return tools.find((tool) => tool.slug === slug);
};

export const getToolsByCategory = (category: Tool['category'] | string) => {
    return tools.filter((tool) =>
        tool.category === category || slugifyCategory(tool.category) === category.toLowerCase()
    );
};

export const slugifyCategory = (category: string) => {
    return category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
};
