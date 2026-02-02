export interface Tool {
    slug: string;
    title: string;
    description: string;
    category: 'Mouse Skills' | 'Keyboard Skills' | 'Aim & Reflex' | 'Gaming Utilities' | 'Text Tools' | 'Unit Converters' | 'Development Tools' | 'SEO & Web' | 'Design & UI' | 'Finance' | 'Daily Tools' | 'Image Tools' | 'Education' | 'Mathematics Tools' | 'Advanced Scholar Tools' | 'Chemistry';
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
### Professional Game Sensitivity Matching
Converting sensitivity between games is crucial for maintaining consistent aim and muscle memory across different First-Person Shooters (FPS). Our Mouse Sensitivity Converter is a professional-grade tool designed to help you transfer your exact 360-degree rotation distance from one game to another without any loss of precision. Whether you are transitioning from Counter-Strike 2 to Valorant, or from Apex Legends to Call of Duty, this tool ensures your mechanical skill stays sharp.

Competitive gaming thrives on "muscle memory"—the neural pathways your brain develops to perform flick shots and tracking without conscious thought. However, every game engine handles mouse input differently. For example, a sensitivity of "2.0" in Source Engine (CS:GO) is completely different from a "2.0" in Unreal Engine (Valorant). Without a conversion tool, you would have to spend hours "re-feeling" your aim, which can lead to performance slumps.

### How to Use the Sensitivity Converter
1.  **Select Input Game**: Choose the title you are currently comfortable with (e.g., CS:GO, Apex).
2.  **Enter Current Sensitivity**: Input the exact value from your game settings.
3.  **Select Target Game**: Choose the new game you want to play.
4.  **Enter DPI (Optional)**: If you are upgrading your mouse or changing DPI, enter both old and new DPI values for a compensated result.
5.  **Instantly Convert**: The tool will provide the exact sensitivity setting for the target game, calculated to the 5th decimal place.

### Key Features of Our Tool
*   **Engine-Level Accuracy**: We use specific yaw and pitch constants for each game engine (Source, Unreal, ID Tech, etc.) to ensure a perfect match.
*   **DPI Compensation**: If you move from 400 DPI to 1600 DPI, we automatically adjust the game multiplier so your physical mouse distance remains identical.
*   **Large Game Database**: Supports all major competitive titles including CS2, Valorant, Overwatch 2, Apex Legends, Warzone, and more.
*   **Zero Latency Engine**: No server-side processing ensures your results are instant and private.

### Use Cases & Scenarios
*   **Switching Main Games**: Ideal for players moving from older titles like CS:GO to modern tactical shooters like Valorant.
*   **Testing New Mice**: When you get a new mouse with a different native DPI, use this to keep your effective sensitivity the same.
*   **Esports Training**: Professional players use conversions to ensure their aim training in Kovaak's or Aim Lab matches their in-game settings perfectly.

### The Science of "cm/360"
The ultimate metric for sensitivity is "cm/360"—how many centimeters you move your mouse to spin 360 degrees in the game world. Most pro players fall into specific categories:
*   **Low Sens (40cm - 80cm)**: Best for precision and tactical shooters.
*   **High Sens (10cm - 25cm)**: Best for fast-paced movement shooters like Quake or Apex.

### Frequently Asked Questions (FAQs)
**Q: Does Field of View (FoV) affect sensitivity?**
A: In most games, sensitivity is independent of FoV for horizontal movement, but your "felt" speed might change. This tool matches the raw rotation distance.

**Q: Why does my aim feel different even after conversion?**
A: Different games have different graphics engines, input lag, and field of view settings. While the physical distance is matched, the visual feedback might differ.

**Q: Can I convert from Valorant to CS2?**
A: Yes! The converter works bidirectionally for all supported titles. Simply swap the input and output games.

### Expert Aiming Tip
Once you find a comfortable sensitivity (cm/360), try to stick with it for at least 3 months. Constantly changing sensitivity prevents your brain from mastering micro-corrections. Use our calculator as a bridge to consistency across your entire library.
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
### Standardize Your Aim with Effective DPI (eDPI)
The eDPI (Effective Dots Per Inch) Calculator is an essential utility for competitive gamers looking to standardize their sensitivity. While DPI refers to your mouse's hardware setting, eDPI is the "true" sensitivity of your setup, calculated by multiplying your mouse DPI by your in-game sensitivity. Standardizing this value is the only way to accurately compare your settings with professional players or friends who use different hardware.

In the world of esports, copying a pro player's "2.0 sensitivity" is meaningless unless you also know their DPI. For instance, a player using 400 DPI with 2.0 sensitivity has the exact same mouse speed as a player using 800 DPI with 1.0 sensitivity. Both result in an eDPI of 800. Our tool simplifies this math so you can find your perfect aiming rhythm.

### How to Calculate Your eDPI
1.  **Find Your Mouse DPI**: Check your mouse driver (G Hub, Razer Synapse, etc.) to see your current DPI setting (e.g., 800 DPI).
2.  **Locate In-Game Sensitivity**: Open your game settings (e.g., Valorant, CS2) and note your mouse sensitivity multiplier.
3.  **Enter Values**: Type both numbers into our calculator.
4.  **Get Results**: Your eDPI will be displayed instantly, allowing you to compare it to global benchmarks.

### Why Every Competitive Gamer Needs eDPI
*   **Standardization**: DPI varies between brands and sensors. eDPI provides a universal metric regardless of whether you use a heavy optical mouse or a lightweight wireless one.
*   **Pro Comparisons**: Platforms like ProSettings share the eDPI of top players. Using our tool, you can see if you are playing significantly faster or slower than the world's best.
*   **Muscle Memory**: Maintaining a consistent eDPI across different games (using a sensitivity converter) ensures that your aim training always carries over.

### Use Cases & Scenarios
*   **Upgrading Your Mouse**: If your new mouse has a higher native DPI, use eDPI to find the lower in-game sensitivity needed to keep your aiming speed identical.
*   **Coaching & Team Play**: If you're coaching a teammate, telling them your eDPI is much more helpful than just giving a sensitivity number.
*   **Sensitivity Experiments**: If you feel your aim is shaky, check your eDPI. You might find you're playing at a "High Sens" (1200+ eDPI) and might benefit from lowering it to a "Medium Sens" (800 eDPI).

### Common eDPI Ranges for Pro Titles
While personal preference is king, most pros stay within these eDPI ranges:
*   **CS2 (Source)**: 600 - 1200 eDPI (Lower for precise flicking).
*   **Valorant**: 200 - 450 eDPI (Focus on micro-adjustments).
*   **Apex Legends**: 800 - 1600 eDPI (higher for 360-degree tracking).

### Technical Deep Dive: DPI vs. eDPI
DPI (Dots Per Inch) is a hardware-level measurement of how many "counts" the sensor sends per inch of movement. In-game sensitivity is a software-level multiplier applied to those counts. Multiplying them creates your Effective DPI. Note that Windows Sensitivity (usually 6/11) should ideally be left at the default to avoid skipping pixels, or Raw Input should be enabled to bypass Windows settings entirely.

### Frequently Asked Questions (FAQs)
**Q: Is higher eDPI better for gaming?**
A: Not necessarily. While high eDPI (High Sens) allows fast turns, it makes micro-adjustments very difficult. Most pro players prefer a lower eDPI for better consistency.

**Q: Does my mousepad size affect what eDPI I should use?**
A: Yes! Low eDPI players need large "extended" mousepads (45cm+) because they move their entire arm to aim. High eDPI players can get away with smaller pads.

**Q: Can I use this for console gaming?**
A: Console games typically use "Sensitivity" sliders that don't translate directly to DPI, but if you use a keyboard and mouse on console (where supported), the principles still apply.

### Pro Tip for Aim Mastery
If you decide to change your eDPI, don't just change it by a tiny bit. Change it by 20% and play for an hour. This "shocks" your brain and helps you evaluate if a change is actually beneficial for your performance.
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
### Master Your Reflexes with the Professional CPS Test
Test and improve your finger speed with our professional-grade Click Speed Test (CPS Test). In the competitive world of gaming, especially in titles like Minecraft, League of Legends, and various FPS games, your ability to click rapidly and consistently can be the difference between victory and defeat. Whether you are a Minecraft pro mastering "Jitter Clicking" or a competitive gamer practicing "Butterfly Clicking," our tool provides the sub-millisecond accuracy and real-time visual feedback you need to reach peak performance.

The concept of CPS (Clicks Per Second) has evolved from a simple curiosity into a core benchmark for gamers. It measures how many times you can trigger your mouse's microswitch within a specific timeframe. High CPS allows for faster building in Minecraft, quicker ability casting in MOBAs, and more rapid firing in semi-automatic FPS weapons. Our tool is designed to help you quantify your current skill level and track your progress as you master advanced clicking techniques.

### How to Take the CPS Test
1.  **Select Your Challenge**: Choose a time duration that suits your goal. We offer 1s (Burst), 5s (Standard), 10s (Stamina), 30s, 60s, and even a 100s marathon mode.
2.  **Preparation**: Position your hand comfortably. Ensure your mouse sensor is stable and you have enough room for your preferred clicking technique.
3.  **Start Clicking**: Click the large, reactive "Arena" area as fast as possible. The high-precision timer starts automatically on your very first click.
4.  **Analyze Your Performance**: Once the time is up, our engine calculates your average CPS, peak speed, and total clicks, and assigns you a "Rank" based on global benchmarks.

### Global CPS Ranks & Benchmarks
Where do you stand in the world of fast clickers? 
*   **The Sloth (0-3 CPS)**: You're taking it easy. Perfect for casual browsing, but you'll need practice for gaming.
*   **The Human (4-6 CPS)**: The standard clicking speed for most computer users.
*   **The Cheetah (7-9 CPS)**: You have fast reflexes! This is the sweet spot for most competitive FPS players.
*   **The Rabbit (10-12 CPS)**: Professional level. You are likely using Jitter or Butterfly clicking techniques.
*   **The Flash (13+ CPS)**: Elite tier. You have mastered complex motor skills or high-frequency drag clicking.

### Popular Clicking Techniques Explained
*   **Normal Clicking**: The most common method, using one finger to tap the mouse button. It's easy on the hand but plateaus around 6-9 CPS.
*   **Jitter Clicking**: Involves tensing your arm and wrist muscles to create a high-frequency vibration that travels to your finger. It can reach 10-14 CPS but requires caution to avoid strain.
*   **Butterfly Clicking**: Using two fingers (usually index and middle) to alternate taps on a single mouse button. Many modern gaming mice are optimized for this, reaching 15-25 CPS.
*   **Drag Clicking**: By dragging your finger across the surface of the mouse button, friction causes the switch to "bounce" and register multiple clicks. This is the fastest method (up to 50+ CPS) but is often restricted in competitive Minecraft servers.

### Use Cases & Benefits
*   **Esports Warm-up**: Just like athletes stretch, pro gamers use CPS tests to "wake up" their nervous system before a match.
*   **Hardware Testing**: Use this tool to check if your mouse suffers from "double-clicking" issues or if your new mechanical switches are as responsive as advertised.
*   **Minecraft PvP Preparation**: Practice your "Reach" and "Knockback" consistency by maintaining a high CPS during combat simulations.

### Frequently Asked Questions (FAQs)
**Q: Can I use an autoclicker on this test?**
A: Our tool includes advanced anti-cheat logic that detects rhythmic, non-human patterns. It's designed for manual skill testing.

**Q: Is jitter clicking dangerous?**
A: If done incorrectly or for too long, it can lead to Carpal Tunnel Syndrome or RSI (Repetitive Strain Injury). Always take breaks and stop if you feel pain.

**Q: Does my mouse affect my CPS?**
A: Yes. Mice with mechanical switches (like Omron or Kailh) or optical switches have different travel distances and actuation forces, which can significantly affect your clicking speed.

### Pro Tip for Higher Scores
Don't just click with your finger; use your whole hand and forearm for stability. Also, ensure your mouse is on a non-slip surface so it doesn't move while you are vibrating your hand during high-speed attempts. Master the rhythm, and the speed will follow!
        `,
        requires: ['mouse']
    },
    {
        slug: 'keyboard-latency-tester',
        title: 'Keyboard Latency Tester',
        description: 'Measure the delay between your keypress and the system response in milliseconds.',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['keyboard latency test', 'input lag tester', 'keyboard delay check', 'mechanical keyboard response', 'scan rate tester', 'polling rate test'],
        longDescription: `
### Is Your Keyboard Holding You Back?
In fast-paced competitive gaming, every millisecond counts. Input lag—the delay between pressing a key and seeing the action on screen—can be the difference between winning a duel in CS2 or getting eliminated. Our Keyboard Latency Tester allows you to measure the responsiveness of your keyboard input pipeline right in your browser. While a browser-based test cannot measure the internal electrical processing of the keyboard PCB like a hardware probe, it provides a highly accurate comparative benchmark to see if your system, browser, or keyboard software is introducing unnecessary delay.

This tool is essential for gamers testing new mechanical keyboards, optimizing their "debounce" settings, or comparing the responsiveness of wired vs. Bluetooth connections.

### How to Test Your Input Lag
1.  **Prepare Your Environment**: Close unnecessary background applications (Discord overlays, heavy downloads) to ensure the browser has full system resources.
2.  **Start the Test**: Click the "Start Test" button to focus the capture engine.
3.  **Tap Rapidly**: Tap a specific key (like Spacebar or Z) repeatedly and rhythmically.
4.  **Analyze**: Watch the real-time graph. The tool measures the timing consistency and the interval between "keydown" events.
5.  **Review Stats**: Look at the "Shortest Event Interval" and "Estimated Latency Class".

### Understanding the Metrics
*   **Polling Rate**: Gaming keyboards typically communicate with the PC at 1000Hz (every 1 millisecond). Standard office keyboards often run at 125Hz (8ms). If your shortest interval is consistently 8ms or higher, your keyboard might be stuck on a low polling rate.
*   **Scan Rate**: This is how fast the keyboard's internal processor checks the key matrix. Real 8000Hz keyboards (like Razer Huntsman V3) have incredibly high scan rates.
*   **Debounce Time**: A delay intentionally added by firmware to prevent one press from registering as two (chatter). High debounce settings (e.g., 20ms) make a keyboard feel sluggish.

### How to Reduce Keyboard Latency
1.  **Use High Polling Rates**: Ensure your keyboard driver (Synapse, G Hub, iCUE) is set to 1000Hz or higher.
2.  **Switch to Wired**: Wireless interference can add variable latency. Wired connections are the gold standard for stability.
3.  **Enable Game Mode**: Windows "Game Mode" helps prioritize input processing over background tasks.
4.  **Check Debounce Settings**: If your keyboard software allows it, set the debounce time to the lowest value that doesn't cause double-typing (usually 2ms-5ms).

### Frequently Asked Questions (FAQs)
**Q: Can this tool measure my keyboard's exact hardware latency?**
A: No software-only test can measure the exact time continuously from physical actuation to USB report without external hardware sensors. However, this tool measures the *consistency* and *system reporting speed*, which correlates strongly with how "snappy" a keyboard feels.

**Q: Why do I get different results in Chrome vs. Firefox?**
A: Browsers handle input events differently. Chrome usually offers the lowest latency for input processing. We recommend using a Chromium-based browser for the most accurate benchmarks.

**Q: My keyboard is 1000Hz but feels slow. Why?**
A: It could be your monitor's refresh rate (60Hz = 16.6ms visual lag) or V-Sync being enabled. Always disable V-Sync in competitive games.
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
### Elevate Your Aim with Professional Training
Sharpen your reflexes and master mouse precision with our browser-based Pro Aim Trainer. Designed for aspiring competitive players of FPS games like Valorant, Counter-Strike 2, Apex Legends, and Overwatch 2, this tool helps you build the specific "muscle memory" required for pixel-perfect headshots and consistent tracking. Unlike heavy desktop applications that take minutes to load, our aim trainer runs instantly in your browser with **zero input lag**, making it the perfect pre-game warm-up tool.

Aiming is a complex motor skill that combines visual reaction time, hand-eye coordination, and fine muscle control. By isolating these mechanics from game-specific variables (like movement or recoil), you can improve your raw mechanical skill significantly faster than by just playing the game.

### How to Use the Aim Trainer
1.  **Choose Your Drill**: Select from our curated modes: "Standard" (balanced), "Precision" (small targets), or "Reflex" (fast targets).
2.  **Customize Settings**: Adjust the target size, duration, and even the colors to match your game's enemy outline settings (e.g., Red, Yellow, or Purple).
3.  **Start the Session**: Click "Start" to begin. The timer counts down, and targets will begin appearing.
4.  **Click to Eliminate**: Move your mouse and click on targets as fast as possible. Missed shots lower your accuracy score.
5.  **Analyze Performance**: At the end of the round, review your "Time to Kill" (TTK), Accuracy Percentage, and total Score.

### Training Modes Explained
*   **Flick Training (Standard)**: Targets spawn in random locations across a wide area. This simulates "flicking" to an enemy who surprises you or checking corners. It builds large-muscle coordination (arm aiming).
*   **Micro-Correction (Precision)**: Tiny targets spawn near the center or near your last shot. This simulates the micro-adjustments needed when holding an angle in tactical shooters like Valorant. It builds fine-motor control (wrist/fingertip aiming).
*   **Reaction Speed (Reflex)**: Targets appear and disappear rapidly. You must click them before they vanish. This trains your raw visual processing speed and decision-making.

### The Science of Aiming
*   **Muscle Memory**: Repetitive, accurate motions strengthen the neural pathways in your cerebellum. Over time, "aiming" becomes subconscious, allowing you to focus on game sense.
*   **Reactive vs. Predictive**: "Reactive" aim is adjusting to a target you see. "Predictive" aim is placing your crosshair where you expect a target to be. Our trainer focuses on **Reactive Aim**.
*   **Hand Health**: Proper ergonomics are vital. Ensure your elbow is supported (if you arm aim) and you aren't gripping the mouse too tightly ("death grip"), which ruins precision.

### Frequently Asked Questions (FAQs)
**Q: What sensitivity should I use?**
A: Use our "Mouse Sensitivity Converter" to find the exact sensitivity value from your main game. Consistency is key; don't train on a different sensitivity than you play on.

**Q: Changing sensitivity feels weird. Why?**
A: In 2D browser games, "Field of View" (FoV) implementation differs from 3D engines. However, the *distance* you move your mouse to cross the screen is consistent. Focus on hand control, not just visual matching.

**Q: How long should I train?**
A: We recommend 10-15 minutes before your gaming session as a warm-up. Training for more than 45 minutes can lead to fatigue and diminishing returns.

### Pro Tip: Accuracy > Speed
Beginners often try to click as fast as possible, leading to 70-80% accuracy. This builds bad habits. Slow down until you can hit 95%+ accuracy consistently, *then* gradually increase your speed. "Slow is smooth, and smooth is fast."
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
### Is Your Mouse Performing at Its Peak?
The "Polling Rate" of a mouse determines how many times per second it reports its position and click status to your computer. Measured in Hertz (Hz), a higher polling rate results in smoother cursor movement and lower input latency—both critical factors for competitive gaming. Our Mouse Polling Rate Checker is a diagnostic tool that measures the *actual* real-time reporting frequency of your device, helping you identify driver issues, USB bottlenecks, or unstable sensors.

Most modern gaming mice advertise 1000Hz (1ms), but cheap office mice are often locked to 125Hz (8ms). In a game like Counter-Strike 2, that 7ms difference is a huge disadvantage.

### How to Check Your Polling Rate
1.  **Prepare**: Ensure your browser is the active window and no heavy background tasks are running.
2.  **Start Moving**: Place your mouse cursor over the capture area (or anywhere on the page).
3.  **Move Continuously**: Move your mouse in fast, continuous circles or figure-eights. The faster you move, the more data points the browser receives.
4.  **Observe**: Watch the "Current Hz" (real-time) and "Average Hz" (session average) values.
5.  **Analyze Stability**: A good gaming mouse should hold a steady rate (e.g., fluctuating slightly between 980Hz - 1020Hz for a 1000Hz setting).

### Understanding Polling Rate vs. Latency
*   **125 Hz**: Reports every **8 milliseconds**. Standard for office mice. feels "floaty" in games.
*   **500 Hz**: Reports every **2 milliseconds**. A good balance for older CPUs or wireless battery life.
*   **1000 Hz**: Reports every **1 millisecond**. The gold standard for esports.
*   **4000 Hz / 8000 Hz**: Reports every **0.25ms / 0.125ms**. Only available on enthusiast mice (Razer Viper 8K, etc.). Requires a powerful CPU.

### Troubleshooting: Why is my rate low?
*   **Movement Speed**: You must move the mouse fast enough to generate events. If you move slowly, the mouse sends fewer updates to save power, resulting in a lower reading.
*   **Browser Limits**: Some browsers (specifically Firefox or Safari on older macOS) may cap input events to 60Hz or 125Hz for performance. Use Chrome or Edge for the best results.
*   **Driver Settings**: Check your mouse software (Razer Synapse, Logitech G Hub). Ensure "Polling Rate" is set to the maximum available.
*   **USB Port**: Ensure your mouse is plugged directly into the motherboard, not a USB 2.0 hub, which might throttle data.

### Frequently Asked Questions (FAQs)
**Q: Is 1000Hz better than 500Hz?**
A: Yes, objectively. It reduces input lag by 1ms. However, some players prefer the "smoother" feel of 500Hz on older sensors.

**Q: Does high polling rate use more CPU?**
A: 1000Hz uses negligible CPU on modern systems. However, 4000Hz and 8000Hz can use significant CPU resources (up to 5-10% of a core), potentially causing FPS drops in poorly optimized games.

**Q: Why does the graph show spikes?**
A: Micro-stutters in the browser or Windows interrupt handling can cause spikes. Look at the *average* value over 10 seconds for the true performance.
        `,
    },
    {
        slug: 'cm-360-calculator',
        title: 'CM per 360° Calculator',
        description: 'Calculate the physical distance required to perform a full 360° turn in-game.',
        category: 'Gaming Utilities',
        iconName: 'Ruler',
        keywords: ['cm 360 calculator', 'mouse sensitivity distance', 'gaming mouse pad space', 'physical sensitivity'],
        longDescription: `
### The Universal Metric for Perfect Aim
"CM/360" (Centimeters per 360-degree turn) is the gold standard for measuring mouse sensitivity. Unlike generic "Sensitivity" numbers which vary wildly between games (e.g., 2.0 in CS:GO is 0.6 in Valorant), CM/360 describes the actual physical distance your mouse travels to complete a full rotation in-game. By knowing this value, you can flawlessly transfer your aim mechanics to *any* First-Person Shooter, regardless of its engine or settings.

This calculator eliminates the guesswork. Whether you are setting up a new game, buying a new mousepad, or trying to copy a pro player's config, converting everything to CM/360 ensures you are comparing apples to apples.

### How to Calculate Your CM/360
1.  **Select Your Game**: Choose the game you play from our dropdown (supports all major titles like Overwatch 2, Quake, Apex Legends, etc.).
2.  **Input Mouse DPI**: Enter your mouse's hardware DPI setting (e.g., 400, 800, 1600).
3.  **Input In-Game Sensitivity**: Enter the numerical value from your game's options menu.
4.  **Get Result**: The tool instantly displays the centimeters (and inches) required for a full 360° turn.

### Understanding Aim Styles via CM/360
*   **Wrist Aiming (10cm - 30cm)**: High sensitivity. Requires very little physical movement. Great for fast-paced games like *Quake* or *Fortnite* closerange building. Pros: Fast reaction. Cons: Hard to be precise at long range.
*   **Hybrid Aiming (30cm - 45cm)**: The sweet spot for many modern shooters like *Apex Legends* or *Overwatch*. Allows for both tracking speed and decent precision.
*   **Arm Aiming (45cm - 80cm+)**: Low sensitivity. Requires a large mousepad. The standard for tactical shooters like *CS2* and *Valorant*. Pros: Incredible micro-precision. Cons: Tiring for 180° turns.

### Why Mousepad Size Matters
This tool is vital for hardware compatibility. If your sensitivity is **60cm/360** (Low Sens) but your mousepad is only **30cm** wide, you physically cannot turn around without lifting your mouse twice. This puts you at a severe disadvantage. Always ensure your mousepad is at least 1.5x wider than your CM/360 value for comfortable gameplay.

### Frequently Asked Questions (FAQs)
**Q: What is the average CM/360 for pros?**
A: In tactical shooters (CS/Valorant), the average is around 50-60cm/360. In tracking shooters (Apex/Overwatch), it's around 30-40cm/360.

**Q: Does Windows Sensitivity affect this?**
A: Most modern games use "Raw Input," ignoring Windows settings. However, if Raw Input is OFF, Windows pointer speed will affect your CM/360.

**Q: My result is "Infinite". Why?**
A: You likely entered 0 sensitivity or 0 DPI. Enter valid positive numbers.
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
### Visualize Your Gaming Performance
The "FPS & Refresh Rate Calculator" bridges the gap between your hardware capabilities and your in-game experience. It helps you understand the critical relationship between "Frames Per Second" (FPS) generated by your PC and the "Refresh Rate" (Hz) of your monitor. Knowing how these two metrics interact is key to fixing stuttering, reducing input lag, and eliminating screen tearing.

Most gamers blindly aim for "higher numbers," but an unstable 200 FPS can feel worse than a locked 144 FPS. This tool calculates frame times and potential bottleneck scenarios to help you optimize your settings.

### How to Use This Calculator
1.  **Enter Monitor Hz**: Input your screen's refresh rate (e.g., 60, 144, 240, 360Hz).
2.  **Enter Game FPS**: Input the average FPS your PC outputs in your favorite game.
3.  **Analyze Frame Times**: The tool calculates the exact duration (in milliseconds) each frame stays on screen.
4.  **Check for Bottlenecks**: See if you are "Monitor Bound" (wasting GPU power) or "GPU Bound" (underutilizing your monitor).

### Key Concepts Explained
*   **Frame Time (ms)**: The time it takes to render a single frame. Lower is better. 60 FPS = 16.6ms. 144 FPS = 6.9ms. 240 FPS = 4.1ms. Consistent low frame times are smoother than high but "spiky" FPS.
*   **Screen Tearing**: Occurs when the GPU pushes frames faster than the monitor can refresh (FPS > Hz). The monitor displays parts of two frames at once. Fix: Cap FPS below Hz or use G-Sync/FreeSync.
*   **Input Lag**: Higher FPS *always* reduces input lag, even if it exceeds your monitor's refresh rate, because the displayed frame is "fresher".

### Optimization Scenarios
*   **Scenario A (FPS > Hz)**: You have a 60Hz screen but run CS2 at 300FPS.
    *   *Result*: Massive screen tearing, but very low input lag. Good for competitive gaming, bad for visual immersion.
*   **Scenario B (FPS < Hz)**: You have a 144Hz screen but run Cyberpunk at 60FPS.
    *   *Result*: Stuttering or repeated frames. You aren't getting the smoothness you paid for. Turn down graphics settings to reach 144FPS.

### Frequently Asked Questions (FAQs)
**Q: Should I cap my FPS?**
A: For consistent frame times and G-Sync, cap your FPS 3-4 frames *below* your max refresh rate (e.g., 141 FPS on a 144Hz screen).

**Q: Is 240Hz worth it over 144Hz?**
A: The jump from 60Hz to 144Hz is massive. 144Hz to 240Hz is noticeable but diminishing. It helps mostly in ultra-fast games like Overwatch.

**Q: What is V-Sync?**
A: V-Sync forces the GPU to wait for the monitor. It eliminates tearing but adds massive input lag. **Never** use V-Sync in competitive shooters.
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
### How Fast Is Your Brain?
Reaction time is the duration between the onset of a stimulus and the initiation of a physical response. In gaming, it is the fundamental limit of your performance. Whether it's flashing to avoid a Malphite ultimate in League of Legends or flicking to a head in CS2, your raw neurological speed defines your ceiling. Our Reaction Time Test is a clinical-grade "Go/No-Go" task designed to measure your simple visual reaction time (SRT) with millisecond precision.

This tool strips away game-specific variables like input lag, rendering delays, and complex decision making, giving you a raw benchmark of your nervous system's processing speed.

### How to Take the Test Properly
1.  **Wait for Green**: The screen will initially be red. This is the "warning" phase. Focus intensely on the color.
2.  **React Instantly**: The moment the screen turns green, click your mouse (or tap your screen) as fast as possible.
3.  **Repeat 5 Times**: A single test can be lucky or unlucky. We average 5 attempts to calculate your true reaction speed.
4.  **Avoid Anticipation**: If you click before the green light (anticipating the change), the attempt is flagged as "Too Early" and voided to maintain accuracy.

### Global Benchmarks: Where Do You Rank?
*   **< 150ms (Superhuman)**: This range is usually populated by F1 drivers, Olympic sprinters, and top-tier esports AWPers. Be wary; scores consistently below 130ms may indicate hardware prediction or luck.
*   **150ms - 200ms (Elite)**: The standard for high-level competitive gamers. If you are here, your reflexes are not your bottleneck.
*   **200ms - 250ms (Average Human)**: The global average for young adults. Perfectly adequate for most gaming, especially strategy or MOBA titles.
*   **250ms - 350ms (Casual)**: Typical for older adults or tired individuals.
*   **> 400ms (Impaired)**: Indicates severe distraction, fatigue, or high input latency (TV mode, wireless interference).

### Science of Reflexes
Your reaction time is influenced by:
1.  **Transmission Speed**: The time it takes the signal to travel from retina to visual cortex to motor cortex to finger muscles.
2.  **Hardware Latency**: Your monitor's refresh rate (60Hz = 16ms delay) and mouse click latency add to your score. A 144Hz monitor can instantly "improve" your reaction time by 10-15ms.
3.  **Physical State**: Sleep deprivation, dehydration, and age all slow down neural transmission. Caffeine can slightly improve it.

### Expert Tips for Lower Scores
*   **Pre-Tension**: Don't relax your finger. Apply 90% of the pressure needed to click, so you only need a tiny twitch to trigger the switch.
*   **Focus on the Center**: Stare at the center of the box to utilize your foveal vision, which processes color changes faster than peripheral vision.
*   **Upgrade Hardware**: Using a high-refresh monitor (144Hz+) and a low-latency optical mouse is the easiest "pay-to-win" method to shave off 20-30ms.
        `,
    },
    {
        slug: 'double-click-test',
        title: 'Mouse Double Click Test',
        description: 'Detect if your mouse is suffering from unintended double-clicking issues.',
        category: 'Mouse Skills',
        iconName: 'MousePointer2',
        keywords: ['mouse double click test', 'mouse chatter test', 'logitech double click fix', 'mouse button tester'],
        longDescription: `
### Diagnose the "Double-Click of Death"
"Double-clicking" (or Switch Chatter) is the most frustrating hardware failure for gamers. It occurs when a single physical button press registers as two (or more) signals sent to the computer. This causes you to accidentally un-scope sniper rifles, buy items twice, or drag-and-drop files incorrectly. Our Mouse Double Click Test is a forensic utility designed to detect even the rarest micro-chatter in your mouse switches.

Whether you suspect your Logitech G Pro is failing or you are testing a new mouse for quality control, this tool gives you definitive proof of switch health.

### How to Use the Diagnostic Tool
1.  **Select Button**: Left click, Right click, or Middle click on the large target area.
2.  **Perform "Single" Clicks**: Tap the mouse button crisply and deliberately. Do not drag or hold.
3.  **Monitor the Log**: The tool counts exactly how many "Down" and "Up" events are received.
4.  **Watch for Errors**: If the background flashes RED and the "Double Click Detected" counter increases, your mouse sent two signals within a superhuman timeframe (usually < 80ms), indicating a hardware fault.
5.  **Sample Size**: perform at least 100 clicks to catch intermittent issues.

### Why Do Mice Double Click?
*   **Contact Oxidation**: Standard mechanical microswitches (like Omron 50M) use metal contacts. Over time, humidity and electricity cause oxidation, creating a "bouncy" electrical signal.
*   **Metal Fatigue**: The tiny copper spring inside the switch loses tension after millions of clicks, causing it to vibrate (chatter) upon actuation.
*   **Low Voltage**: Modern wireless mice run at lower voltages to save battery, which makes them more susceptible to signal noise/corrosion than older wired mice.

### How to Fix Double Clicking
1.  **Software Debounce**: Increase the "Debounce Time" in your mouse driver (e.g., from 2ms to 10ms). This tells the firmware to ignore the second click if it happens too fast. This fixes the symptom but adds input lag.
2.  **Static Discharge**: Unplug the mouse and click the buttons rapidly for 30 seconds to discharge static buildup.
3.  **Compressed Air**: Blow air under the button shell to dislodge dust or debris interfering with the contact.
4.  **Replacement**: This is usually a permanent hardware failure. If you are under warranty, RMA the mouse. If not, soldering new switches (like Kailh GM 8.0) is the only permanent fix.

### Frequently Asked Questions (FAQs)
**Q: My mouse double clicks on this test but not in games. Why?**
A: Games often have their own internal debounce logic. However, if it shows up here, the hardware is definitely failing, and it will eventually get worse.

**Q: Are Optical Switches better?**
A: Yes. Optical switches (used in Razer and reliable newer mice) use light beams instead of physical contacts. They are immune to oxidation and double-clicking issues.
        `,
    },
    {
        slug: 'keyboard-rollover-tester',
        title: 'Keyboard NKRO Tester',
        description: 'Test how many keys your keyboard can register simultaneously (N-Key Rollover).',
        category: 'Keyboard Skills',
        iconName: 'Keyboard',
        keywords: ['nkro test', 'keyboard rollover test', 'key ghosting tester', 'gaming keyboard check'],
        longDescription: `
### Test Your Keyboard's Limits (N-Key Rollover)
"Ghosting" and "Jamming" are the enemies of high-performance gaming. **N-Key Rollover (NKRO)** is a feature that ensures every single key you press is registered individually, no matter how many keys are held down simultaneously. Our NKRO Tester visualizes your keyboard's matrix, helping you identify if your keyboard is "6-Key Rollover" (limited) or "N-Key Rollover" (unlimited).

This is critical for games like Rhythm games (OSU!), Fighting games (Tekken/Street Fighter), and FPS games where you might be sprinting (Shift), moving diagonally (W+A), crouching (Ctrl), and switching weapons (1) all at the same time.

### How to Test for Ghosting
1.  **Focus the App**: Click anywhere on the tool to ensure it captures your keyboard input.
2.  **The "Palm Test"**: Press both palms down on your keyboard to hit as many keys as possible at once.
3.  **Check the Matrix**: Look at the virtual keyboard on screen. Green keys are registered. Gray keys are not.
4.  **Count the max**: Check the "Max Detected Keys" counter.
    *   **If it caps at 6**: Your keyboard is likely 6KRO (common for older USB devices).
    *   **If it shows 10+**: You likely have full Anti-Ghosting support.

### Understanding the Tech: Ghosting vs. Rollover
*   **Ghosting**: A hardware design flaw in cheap keyboards where pressing 3 specific keys causes a 4th "Phantom" key to activate that you didn't press.
*   **Blocking / Jamming**: The keyboard detects the confusion and ignores the extra key presses to prevent ghosting. Ideally, you want neither.
*   **N-Key Rollover (NKRO)**: The keyboard scans each key independently, usually using Diode-per-switch logic in mechanical keyboards. This allows unlimited inputs.

### Why Do Some Keyboards Fail?
Standard office membrane keyboards use a shared "matrix" of wires. If you press 'W', 'A', and 'Q' together, they might share the same column/row wire, confusing the controller. Gaming keyboards solve this with better matrix design or individual diodes.

### Frequently Asked Questions (FAQs)
**Q: I have a mechanical keyboard but it only detects 6 keys. Why?**
A: Check your keyboard manual. Some keyboards (like older Corsair or Ducky models) have a "BIOS Mode" or "Compatibility Mode" that forces 6KRO for older PCs. Look for a shortcut (e.g., FN + F12) to toggle NKRO mode.

**Q: Does NKRO matter for typing?**
A: Not for standard typing. But for super-fast typists (>120 WPM), "rollover" helps when you press the next key before fully releasing the previous one.

**Q: Is "Anti-Ghosting" the same as NKRO?**
A: Marketing often uses "Anti-Ghosting" to mean "We optimized the WASD zone so you can press those together." Real NKRO covers the *entire* keyboard.
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
### The Silent Killer of Muscle Memory
Mouse acceleration is a "feature" where your cursor moves farther depending on how *fast* you move the mouse, not just how *far*. While this is useful for small office trackpads, it is disastrous for gaming. In a First-Person Shooter, you want 1:1 raw input—moving your mouse 5cm right should always turn your character 90 degrees, whether you move that 5cm in 0.1 seconds or 1 second.

Our Mouse Acceleration Checker helps you perform a physical diagnostic test to see if Windows "Enhance Pointer Precision" or a hidden driver setting is sabotaging your aim.

### How to Detect Acceleration (The Swipe Test)
1.  **Setup**: Clear a wide space on your mousepad. Place your mouse against a physical object (like the edge of your keyboard) to mark the start point.
2.  **Aim**: Place your in-game crosshair (or the tool's cursor) on a specific target.
3.  **Slow Move**: Move the mouse slowly to the right until you hit the edge of your mousepad. Note where the cursor ends.
4.  **Fast Return**: Quickly flick the mouse back to the left, hitting the keyboard edge (the start point).
5.  **Evaluate**:
    *   **No Accel**: The cursor returns exactly to the target.
    *   **Positive Accel**: The cursor overshoots (moves too far) because you moved fast.
    *   **Negative Accel**: The cursor undershoots (stops short) because the sensor malfunctioned (spun out).

### How to Disable Acceleration Permanently
*   **Windows Settings**: Go to Start > Mouse Settings > Additional Mouse Options > Pointer Options. Uncheck **"Enhance Pointer Precision"**. This is the #1 culprit.
*   **Mouse Software**: Check Razer Synapse, Logitech G Hub, or SteelSeries GG. Ensure "Acceleration" is set to 0.
*   **In-Game**: Always enable **"Raw Input"** in games like CS2, Valorant, and Overwatch. This forces the game to ignore Windows settings.

### Advanced: The "MarkC Mouse Fix"
For older games (like CS 1.6 or Quake Live) that don't support Raw Input, you may need a registry edit known as the "MarkC Mouse Fix" to completely remove the Windows acceleration curve. Modern games generally don't need this, but it's a good safety measure for retro gamers.
        `,
    },
    {
        slug: 'sensitivity-randomizer',
        title: 'Sensitivity Randomizer',
        description: 'Variation-based aim practice tool to improve mouse control and adaptability.',
        category: 'Gaming Utilities',
        iconName: 'Shuffle',
        keywords: ['sensitivity randomizer', 'aim training variety', 'mouse control practice', 'fps training tool'],
        longDescription: `
### Break Through Aim Plateaus
The Sensitivity Randomizer is a cutting-edge training concept popularized by top aim coaches and researchers in neuroplasticity. The theory is simple: if you practice on the exact same sensitivity for years, your brain stops "learning" and starts "automating." While automation is good for consistency, it makes you lazy at adapting to micro-errors.

By slightly randomizing your sensitivity (e.g., +/- 10%) every few seconds during practice, you force your nervous system to stay hyper-aware. You are constantly recalibrating your hand-eye coordination, which drastically improves your raw mouse control and reactivity.

### How to Use This Tool
1.  **Set Base Sens**: Enter your preferred Cm/360 or in-game sensitivity.
2.  **Define Range**: Choose a spread (e.g., 0.8x to 1.2x). Beginners should start with a small range (0.9x - 1.1x).
3.  **Set Frequency**: Decide how often the value changes. "Every 30 seconds" is good for lengthy drills. "Every Target" is good for reaction training.
4.  **Train**: Use this tool in the background while playing our Aim Trainer or Kovaak's.

### Why It Works: The Science
*   **Neuroplasticity**: Novelty drives learning. Constant variation keeps the brain in a "high-learning" state.
*   **Smoothness**: When you can't rely on muscle memory distance, you rely on visual feedback loop reading, which smooths out your tracking.
*   **Adaptability**: After training with a randomizer, your normal sensitivity will feel incredibly "locked in" and stable.

### Frequently Asked Questions (FAQs)
**Q: Should I use this in real matches?**
A: **NO!** This is strictly for training scenarios (Aim Lab, Kovaak's, Deathmatch). In a ranked competitive match, you want absolute consistency.

**Q: Will this ruin my muscle memory?**
A: No. It actually strengthens your general mouse control. Think of it like a baseball batter practicing with a heavier bat; when they switch back to a normal bat, they swing faster and more precisely.

**Q: Who uses this?**
A: Many pro players in the Overwatch and Apex Legends community swear by sensitivity randomization for breaking skill ceilings.
        `,
    },
    {
        slug: 'aim-consistency-tracker',
        title: 'Aim Consistency Tracker',
        description: 'Track your hits vs misses over time to analyze your aiming performance.',
        category: 'Aim & Reflex',
        iconName: 'LineChart',
        longDescription: `
### Data-Driven Aim Improvement
"What gets measured, gets managed." The Aim Consistency Tracker is your personal analytics dashboard for mechanical skill. Many players aimlessly grind hours of deathmatch without knowing if they are actually improving. Are your flicks getting faster? Is your tracking getting smoother? Or are you just auto-piloting?

This tool allows you to log data points from your daily training sessions—whether from our internal Aim Trainer, Kovaak's, Aim Lab, or in-game stats—and visualize your progression over weeks and months.

### How to Track Your Progress
1.  **Log a Session**: After finishing a drill (e.g., "Gridshot Ultimate" or "Ascent Headshots"), input your Score and Accuracy percentage.
2.  **Add Context**: Tag the entry with the Scenario Name and Date.
3.  **Analyze Trends**: Look at the generated graph. A healthy trend line shows gradual improvement with occasional dips (which are normal).
4.  **Identify Weaknesses**: If your Accuracy is high (95%+) but your Score is stagnant, you need to push for more speed. If your Score is high but Accuracy is low (<85%), you are "cheesing" the drill and need to slow down.

### Understanding Improvement Curves
*   **Newbie Gains**: Rapid improvement in the first 2-3 weeks as you learn mouse control.
*   **The Plateau**: After a month, scores flatten out. This is where most people quit. Pushing through the plateau requires deliberate practice (like using our Sensitivity Randomizer).
*   **The Slump**: Sometimes scores drop. This is often due to fatigue, burnout, or changing hardware. Take a break!

### Metrics That Matter
*   **TTK (Time to Kill)**: Lower is better. Measures raw speed.
*   **Accuracy %**: Higher is better. Measures precision.
*   **Score**: A composite metric. Good for general ranking.

### Pro Tip
Consistency is key. 15 minutes of tracked training every day is infinitely better than a 5-hour binge once a week. Use this tracker to maintain a streak.
        `,
    },
    {
        slug: 'crosshair-generator',
        title: 'Crosshair Generator',
        description: 'Design and customize your perfect crosshair with real-time preview.',
        category: 'Gaming Utilities',
        iconName: 'Crosshair',
        keywords: ['crosshair generator', 'custom crosshair maker', 'fps crosshair preview', 'valorant crosshair tool'],
        longDescription: `
### Design Your Perfect Reticle
Your crosshair is the most looked-at pixels on your screen. It is the bridge between your eyes and the game world. If it blends into the background, lacks contrast, or is too distracting, your performance *will* suffer. Our Crosshair Generator allows you to visually design, test, and export professional-grade crosshairs for games like Counter-Strike 2 (CS2), Valorant, and Overwatch 2.

Whether you prefer a simple "Dot" for precision or a dynamic "Classic" crosshair to learn spray patterns, this tool gives you granular control over every pixel.

### How to Use the Generator
1.  **Select Style**: Choose from "Cross", "Dot", "Circle", or "T-Shape".
2.  **Adjust Layout**: Use the sliders for Length, Gap, Thickness, and Outline to shape the reticle.
3.  **Pick Color**: Choose a high-contrast color. We recommend Cyan (#00FFFF) or Green (#00FF00) as they are rare in most map environments.
4.  **Test It**: Move the crosshair over our test backgrounds (Dust2 doors, Ascent sky, etc.) to ensure it remains visible.
5.  **Export**: Click "Copy Code" to get the console command (CS2) or settings profile (Valorant) to paste directly into your game.

### Crosshair Theory: What Pros Use
*   **The Dot**: Used by "headshot machines" like ScreaM. Extremely precise but can be easy to lose in chaotic fights.
*   **Small Cross (Gap 0)**: The most common pro crosshair. Offers a clear center point without blocking vision.
*   **Gap Cross**: A crosshair with a small hole in the middle. Good for long-range visibility so you can see the enemy's head *inside* the gap.
*   **Dynamic**: Expands when you move or shoot. Essential for beginners learning weapon inaccuracy and movement error.

### FAQs
**Q: What is the best color?**
A: Cyan (Light Blue) and Green are scientifically proven to be the most visible colors to the human eye against earth-toned maps (Tan/Brown). Avoid Red (blends with blood) or White (blends with sky).

**Q: Should I use Outlines?**
A: Outlines (black borders) ensure visibility on *any* background but make the crosshair look thicker. Use a thin (1px) outline if you play on bright maps.

**Q: Can I import this to console?**
A: Console games (like COD or Overwatch on PS5) usually have menu sliders that correspond to our values, but you cannot copy-paste the code strings directly.
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
### Perfect Your Setup Transition
Switching to a new mouse or changing your mousepad is exciting, but it often comes with a period of "awkwardness" where your aim feels off. The Sensitivity Match Analyzer helps you quantify the exact difference between your old setup and your new one, allowing you to adjust your muscle memory expectations or fine-tune your settings to match perfectly.

This tool calculates the percentage difference in "Real Sensitivity" (eDPI) and "Physical Distance" (cm/360) between two configurations.

### How to Use
1.  **Profile A (Current)**: Enter the DPI and In-Game Sensitivity of your current comfortable setup.
2.  **Profile B (New)**: Enter the DPI and Sensitivity of the new setup you are testing.
3.  **Analyze**: The tool instantly shows the **Delta (Δ)**.
    *   *Example*: "New setup is 12.5% Faster."
    *   *Action*: You know you need to lower your new sensitivity by roughly 12.5% to match your old muscle memory.

### When to Use This Tool
*   **Changing Games**: If you play CS2 at 1.5 sens and want to play Apex, you might guess a sensitivity. This tool tells you if your guess is physically faster or slower.
*   **Changing Hardware**: If you move from a heavy mouse (which requires higher sens to move) to a lightweight mouse (which moves effortlessly), you might want to lower your sens by 5-10% to compensate. This tool helps you track that adjustment.
*   **Copying Pros**: You want to try s1mple's settings but don't have his exact mouse DPI. Use this to find a close match with your own hardware.

### Pro Tip: The "Feel" Factor
Numbers aren't everything. A 50g mouse will *feel* faster than a 100g mouse even if the cm/360 is identical, because un-stopping the mouse takes less force. Use this tool as a baseline, but always trust your hand's feeling for the final 5% adjustment.
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
### Is Your Latency Killing Your Performance?
Input lag (or system latency) is the invisible enemy of every competitive gamer. It is the delay between your physical action (pressing a mouse button) and the visual reaction on your screen (gun firing). Even if you have 300 FPS, high input lag can make your game feel "sluggish," "heavy," or "floaty," causing you to lose duels you should have won.

Our Input Lag Estimator breaks down the complex pipeline of your PC—from your USB port to your eyeball—to give you a theoretical minimum latency estimate. While it cannot replace a high-speed camera test, it allows you to see how much delay each component of your setup is adding.

### The 4 Stages of Input Lag
1.  **Peripheral Lag (USB)**: The time it takes your mouse to send data to the CPU. A 1000Hz mouse takes 1ms. A 125Hz mouse takes 8ms.
2.  **Game Engine (CPU/Sim)**: The time your CPU spends processing game logic (physics, netcode). This scales with your IPC and game optimization.
3.  **Render Queue (GPU)**: The time the frame waits in buffer before being drawn. If your GPU is maxed out (99% usage), this queue increases drastically (this is why NVIDIA Reflex exists).
4.  **Display Lag (Monitor)**: The time it takes pixels to change color (Response Time) + the time wait for the next refresh cycle (Refresh Rate). A 60Hz monitor waits up to 16.6ms. A 240Hz monitor waits only 4.1ms.

### How to Use This Tool
1.  **Enter Specifications**: Input your Mouse Polling Rate, Monitor Refresh Rate, and Average In-Game FPS.
2.  **Select Technologies**: Toggle V-Sync (Vertical Sync), G-Sync/FreeSync, and Low Latency modes (like NVIDIA Reflex).
3.  **Calculate**: The tool sums up the probabilistic delays to give you a "Total System Latency" range.

### How to Lower Your Input Lag
*   **Turn Off V-Sync**: This is the most important step. V-Sync can add 20-50ms of delay.
*   **Enable NVIDIA Reflex / AMD Anti-Lag**: These technologies reduce the Render Queue to nearly zero.
*   **Fullscreen Mode**: Always play in "Exclusive Fullscreen" (not Borderless Windowed) to bypass the Windows Desktop Window Manager (DWM) buffer.
*   **Cap Your FPS**: If you don't use Reflex, cap your FPS slightly below your GPU's max potential to prevent the render queue from filling up.

### Frequently Asked Questions (FAQs)
**Q: What is a "good" input lag?**
A: < 20ms is excellent (Esports standard). 20-40ms is good. > 60ms feels noticeably sluggish.

**Q: Does wireless add lag?**
A: Modern pro-grade wireless mice (Logitech Lightspeed, Razer HyperSpeed) have effectively the same latency as wired mice. Cheap Bluetooth mice, however, add massive delay.
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
### The UFO Test for Clarity
Motion Blur is the smearing of fast-moving objects on your screen. It is one of the biggest disadvantages in competitive gaming because it makes tracking enemies difficult. In a fast flick, a blurry monitor turns your opponent into an indistinct blob. Our Motion Blur Test (inspired by the famous "Blur Busters" UFO test) allows you to visually audit your monitor's pixel response time and clarity.

This tool is essential for setting up "Overdrive" or "MBR" (Motion Blur Reduction) features on your gaming monitor.

### How to Run the Diagnostics
1.  **Select Speed**: Use the slider to adjust how fast the test object moves (measured in pixels per second). Faster speeds make blur more obvious.
2.  **Track the Object**: Your eyes *must* follow the moving object across the screen. Do not stare at a fixed point.
3.  **Observe the Trail**: Look at the trailing edge of the object.
    *   **Ghosting**: A faint, blurry trail of the object's previous position. (Pixels are changing color too slowly).
    *   **Coronas (Inverse Ghosting)**: A bright white or dark halo around the object. (Pixels are being pushed too hard by Overdrive).
    *   **Clear**: The image looks sharp and identical to the static version.

### How to Fix Monitor Ghosting
1.  **Adjust "Overdrive"**: Open your Monitor's OSD (On-Screen Display). Look for settings named "Response Time," "Overdrive," or "Trace Free."
2.  **Test Levels**: Set it to "Low" and look at the test. Then "Medium." Then "High."
3.  **Find the Sweet Spot**: "High" often causes Coronas (Inverse Ghosting). The best setting is usually "Medium" or "Normal," where there is minimal blur and no halos.

### Key Terminology
*   **GtG (Gray-to-Gray)**: How fast a pixel changes from one shade of gray to another. 1ms GtG is the target for esports.
*   **MPRT (Moving Picture Response Time)**: A more accurate measure of perceived motion blur.
*   **Backlight Strobing (ULMB/DyAc)**: Advanced tech that turns the backlight off between frames to kill blur. Use this tool to see if enabling DyAc improves your clarity (it usually does!).
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
### Prime Your Brain for Victory
You wouldn't run a sprint without stretching your hamstrings, so why play a ranked match without warming up your aim? The Esports Warm-Up Tool is a scientifically designed 5-minute browser routine that activates your nervous system, improves blood flow to your hand muscles, and synchronizes your hand-eye coordination before you even launch the game.

Based on routines used by pro players in Valorant and League of Legends, this tool guides you through specific micro-drills to target different aspects of mechanical skill.

### The 5-Phase Routine
1.  **Activation (Grid Clicking)**: Determine target locations and click them. Wakes up the visual cortex.
2.  **Smoothness (Tracking)**: Follow a moving orb without jittering. Essential for "tracing" enemies in games like Apex or Overwatch.
3.  **Reactivity (Color Reflex)**: Click only when a specific color appears. Primes your reaction time for holding angles.
4.  **Extension (Flicking)**: Targets appear in corners, forcing you to move your mouse drastically. Warms up the arm/wrist tendons.
5.  **Stabilization (Precision)**: Click tiny targets to focus on fine motor control.

### Why You Should Warm Up Every Time
*   **Consistency**: A warm-up ensures your "first game" feels like your third game. You skip the "cold hands" phase where you miss easy shots.
*   **Injury Prevention**: Rapid clicking with cold tendons can lead to RSI. Warming up encourages blood flow and elasticity.
*   **Mental State**: The routine acts as a ritual, signaling to your brain that it's time to focus, effectively blocking out distractions from your day.

### How to Use
 Simply click "Start Routine." The tool will automatically cycle through the 5 phases, giving you a 10-second break between each. Do this once before your gaming session for maximum effect.
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
### Empower Your Writing with Precision
Whether you are writing a university essay, crafting the perfect tweet, or optimizing a blog post for SEO, hitting the right length is crucial. Our Word Counter & Text Analyzer is more than just a simple tally; it is a comprehensive writing assistant that provides real-time insights into the structure, readability, and density of your text.

Unlike basic counters, this privacy-focused tool processes everything locally in your browser, ensuring your confidential manuscripts or legal documents never leave your device.

### Detailed Metrics Breakdown
*   **Word Count**: The standard metric. Essential for meeting assignment requirements or article quotas.
*   **Character Count (with & without spaces)**: Critical for platforms like Twitter (X) limit (280 chars) or Google Meta Descriptions (160 chars).
*   **Sentence & Paragraph Count**: Helps you analyze the flow and pacing of your writing. Short paragraphs improve readability online.
*   **Reading Time**: Estimates how long an average reader (200 wpm) will take to consume your content. Perfect for "5 min read" labels on blogs.
*   **Speaking Time**: Estimates how long it will take to read the text aloud (130 wpm). Invaluable for speechwriters and video script creators.

### Keyword Density Analysis
For SEO specialists and copywriters, avoiding "keyword stuffing" is key. Our tool analyzes the frequency of 1-word, 2-word, and 3-word phrases, showing you exactly which terms you are overusing. This helps you maintain a natural flow while targeting your specific topic.

### How to Use the Analyzer
1.  **Type or Paste**: Enter your text into the large input area.
2.  **Live Updates**: Watch the statistics update instantly with every keystroke. Use the "Clear" button to start fresh.
3.  **Check Density**: Scroll down to see the "Top Keywords" list to ensure your main topic is clear but not repetitive.
4.  **Copy Report**: Use the copy feature to save your stats for reference.

### Frequently Asked Questions (FAQs)
**Q: Does this count symbols as words?**
A: No. We use standard linguistic algorithms to ignore punctuation marks when counting words.

**Q: Is there a limit to how much text I can check?**
A: Since it runs in your browser, the limit depends on your computer's RAM. You can easily paste entire books (100,000+ words) without lag.

**Q: Do you save my text?**
A: **Absolutely not.** Your privacy is our priority. The text is processed in your browser memory and disappears the moment you close the tab.
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
### Tame Your JSON Data
JSON (JavaScript Object Notation) is the language of the internet. APIs, configuration files, and databases all use it. But raw JSON is often a messy, unreadable block of text. Our JSON Formatter is the ultimate developer utility to instantly **Validate**, **Beautify**, and **Minify** your code.

Designed for full-stack developers and data analysts, this tool handles large datasets with ease and includes helpful error highlighting to debug broken syntax in seconds.

### Three Essential Modes
1.  **Beautify (Pretty Print)**: Takes minified, ugly JSON and indents it perfectly (2 spaces, 4 spaces, or tabs). This turns a wall of text into a readable, collapsible tree structure.
2.  **Minify (Compress)**: Strips all unnecessary whitespace and newlines. This reduces file size (often by 30-40%) which is critical for production API responses to save bandwidth.
3.  **Validate (Debug)**: Instantly checks if your JSON is valid RFC 8259 output. If there is a missing comma or an unclosed bracket, we tell you exactly which line number caused the error.

### How to Use
1.  **Input Data**: Paste your JSON string into the left panel. (Or type it manually).
2.  **Choose Action**: Click "Format" to beautify or "Minify" to compress.
3.  **Fix Errors**: If the border turns red, check the error message below the box. Fix the syntax until it turns green.
4.  **Copy Output**: Click the Copy icon to grab the result instantly.

### Why Use an Online Formatter?
 IDEs like VS Code are great, but sometimes you just need a quick check without opening a new file. Our tool loads instantly, runs offline (PWA support), and respects your privacy.

### Security Promise
**Your Data Is Safe.** We understand that JSON often contains sensitive API keys, user data, or proprietary configs. Unlike other "free" formatters that upload your data to a server for processing, our tool runs 100% Client-Side using JavaScript. Your data never leaves your browser tab.
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
### Fortify Your Digital Security
In an age of daily data breaches, reusing "Password123" is a recipe for disaster. Security experts unanimously recommend using long, high-entropy, random passwords for every single account. Our secure Password Generator creates military-grade credentials that are mathematically impossible to guess.

Whether you need a complex 32-character key for your AWS root account or a memorable but strong password for your email, this tool gives you full control.

### The Mathematics of Entropy
Entropy is a measure of "randomness" or "un-guessability."
*   **Low Entropy**: "monkey123" (Easy for brute-force scripts to crack in seconds).
*   **High Entropy**: "x9#mK2$pL9@vN" (Would take a supercomputer millions of years to crack).
Our generator uses the browser's \`crypto.getRandomValues()\` API, which is a cryptographically secure pseudo-random number generator (CSPRNG), ensuring true randomness that cannot be predicted.

### Customization Features
*   **Length Control**: Generate passwords from 8 to 128 characters. (We recommend 16+ for primary accounts).
*   **Character Sets**: Toggle Uppercase, Lowercase, Numbers, and Special Symbols (!@#$).
*   **Avoid Ambiguity**: Option to remove easily confused characters like 'I' (capital i), 'l' (lowercase L), and '1' (number one), preventing "read-out-loud" errors.
*   **Memorable Mode**: Coming soon - generate Diceware-style passphrases (e.g., "horse-battery-staple-correct").

### Security Architecture
**Trust No One (Not Even Us).**
This tool is "Client-Side Only." The password logic runs entirely on your device's CPU. The generated password is never sent over the internet, never stored in a database, and never cached. You can even disconnect your internet (Go Offline) and use this tool safely.

### Expert Password Tips
1.  **Use a Password Manager**: Don't try to remember these. Use Bitwarden, 1Password, or Apple Keychain.
2.  **Enable 2FA**: A strong password is only half the battle. Always turn on Two-Factor Authentication.
3.  **Rotate Important Keys**: Change your banking and email passwords at least once a year.
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
### Master the Art of High-Speed Clicking
"Jitter Clicking" is an advanced technique used primarily by Minecraft PvP players to achieve extremely high Clicks Per Second (CPS). By vibrating the muscles in the forearm and wrist, players can generate a "shaking" motion that triggers the mouse switch 10 to 14 times per second. This Jitter Click Test allows you to practice, measure, and refine this difficult mechanical skill in a controlled environment.

Unlike normal clicking (which relies on finger movement), jitter clicking relies on **arm tension**. This tool helps you learn to control that tension so you can aim while vibrating—a skill known as "Jitter Aiming."

### How to Jitter Click: A Step-by-Step Guide
1.  **The Grip**: Use a "Claw" or "Fingertip" grip. You need your finger to be stiff, acting as a hammer.
2.  **The Tension**: Lock your wrist. Flex your forearm muscles until your hand starts to naturally vibrate or shake.
3.  **Transfer Force**: Direct that vibration into your index finger tip on the left mouse button.
4.  **Aim Control**: This is the hardest part. The vibration makes the mouse shake. You must use your thumb and ring finger to grip the mouse sides firmly to minimize cursor movement.

### Why Learn This?
*   **Minecraft PvP**: High CPS reduces "Knockback" taken from enemies and increases your chance of landing the first hit.
*   **Burst Damage**: In games with semi-automatic weapons, jittering can maximize fire rate.

### ⚠️ IMPORTANT HEALTH WARNING ⚠️
**Proceed with Caution.** Jitter clicking involves tensing muscles for extended periods, which can lead to strain.
*   **Do NOT** do this if you feel sharp pain.
*   **Do NOT** practice for more than 5-10 minutes at a time.
*   **Stretch**: Always stretch your wrists and fingers before and after sessions.
*   **Risk**: Improper technique can lead to Carpal Tunnel Syndrome or Tendonitis. If it hurts, STOP.
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
### The Legendary Minecraft PvP Benchmark
The **Kohi Click Test** is a piece of internet gaming history. Originating from the "Kohi" Minecraft server (a hardcore PvP faction server), this specific test became the gold standard for verifying a player's legitimacy. Unlike generic speed tests, the Kohi algorithm is known for its strict registration window, designed to mimic the exact hit-registration feel of a Minecraft Java Edition server.

If you are applying to a PvP clan or checking if your new mouse can "Drag Click" or "Butterfly Click" without skipping inputs, this is the most authentic test you can use.

### Why Is Kohi Different?
*   **Debounce Logic**: It handles input timing similarly to Java, meaning it favors stable, rhythmic clicking over chaotic spam.
*   **Server Accuracy**: It replicates the "tick" feel of online play, offering a realistic expectation of your in-game CPS.
*   **Community Standard**: Saying "I get 12 CPS on Kohi" is a universally understood metric in the PvP community.

### Advanced PvP Clicking Styles
1.  **Butterfly Clicking**: Alternating your index and middle finger on the Left Mouse Button (LMB). Requires a mouse wide enough for two fingers. Capable of 15-25 CPS.
2.  **Drag Clicking**: Dragging a dry finger across the mouse button to create friction bounches. Used for "God Bridging." Capable of 30+ CPS (often banned on servers).
3.  **Bolt Clicking**: An extreme variation of butterfly clicking.

### Tips for High Scores
*   **Mouse Choice**: Mice like the **Glorious Model O**, **Roccat Kone**, or **Logitech G Pro** are favorites for Kohi tests due to their switch implementation.
*   **Texture**: Use grip tape (like razer grip tape) to increase friction for Drag Clicking.
*   **Rhythm**: Consistency beats burst speed. A steady 12 CPS triggers better hit-reg than a burst of 20 followed by a pause.
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
### Master Your Text Formatting
Conventions matter. Whether you are a programmer switching between Python (snake_case) and Java (camelCase), or a marketer needing to clean up a messy headline (Title Case), manual retyping is slow and error-prone. Our Case Converter is a universal text transformation utility that instantly standardizes your text into any format you need.

Paste a messy paragraph, and with one click, transform it into a perfectly formatted block ready for your codebase, newsletter, or database.

### Supported Case Styles
1.  **UPPERCASE**: Converts all letters to capitals. Useful for headers, warnings, or SQL keywords.
    *   *Example*: "HELLO WORLD"
2.  **lowercase**: Converts all letters to small caps. Useful for tags, slugs, or data normalization.
    *   *Example*: "hello world"
3.  **Title Case**: Capitalizes the first letter of major words. Perfect for blog titles and headlines.
    *   *Example*: "The Quick Brown Fox"
4.  **Sentence case**: Capitalizes only the very first letter (and proper nouns if detected). Standard for body text.
    *   *Example*: "The quick brown fox."
5.  **camelCase**: First word lowercase, subsequent words capitalized. The standard for JavaScript/Java variables.
    *   *Example*: "userId", "getProfileData"
6.  **snake_case**: All lowercase separated by underscores. The standard for Python and Databases.
    *   *Example*: "user_id", "get_profile_data"
7.  **kebab-case**: All lowercase separated by hyphens. The standard for URLs (slugs) and CSS classes.
    *   *Example*: "user-id", "profile-data"
8.  **PascalCase**: Like camelCase, but the first letter is also capitalized. Used for Classes in OOP.
    *   *Example*: "UserProfile", "AuthService"

### Developer Productivity
Stop wasting time manually editing variable names when refactoring code. Paste a list of SQL column headers (often SHOUTY_SNAKE_CASE) and convert them to camelCase properties for your frontend in seconds.

### How to Use
1.  **Paste Text**: Enter your text into the box.
2.  **Select Format**: Click the button for the desired case (e.g., "MOCKING SPONGEBOB").
3.  **Copy**: The text automatically updates. Click copy to grab it.
4.  **Export**: You can also download the result as a .txt file for large conversions.
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
        slug: 'binary-to-text-converter',
        title: 'Binary to Text Converter',
        description: 'Convert binary code into human-readable text.',
        category: 'Text Tools',
        iconName: 'Braces',
        keywords: ['binary to text', 'binary decoder', 'b64 converter', 'online binary tool', 'decode binary string'],
        longDescription: `
### Decode the Digital Matrix
Found a string of "01001000 01100101 01101100 01101100 01101111"? Our Binary to Text Converter translates these machine-language bytes back into readable English (or any other language). Whether you are solving a cryptic puzzle, debugging a data stream, or just translating a nerd joke, this tool is accurate and fast.

### Understanding the format
*   **8-Bit Bytes**: We expect binary in groups of 8 (e.g., 01010101).
*   **Spaces**: Spaces between bytes help readability, but our smart parser can often handle continuous streams if aligned correctly.
*   **Encoding**: We use UTF-8, so we can decode emojis and special characters (like © or ™) if they are correctly encoded.

### Troubleshooting "Garbage Output"
If you decode binary and get weird symbols ( or Ã), it usually means:
1.  **Offset**: You missed the first '0' or '1' of the sequence, shifting everything by one bit.
2.  **Encoding Mismatch**: The binary might be in an obscure format like EBCDIC (rare).
3.  **Not Text**: The binary might represent an image file or executable, not text.

### Fun Challenge
Try decoding this:
\`01001110 01100101 01110110 01100101 01110010 00100000 01000111 01101111 01101110 01101110 01100001 00100000 01000111 01101001 01110110 01100101 00100000 01011001 01101111 01110101 00100000 01010101 01110000\`
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
        longDescription: `
### The Standard for Layout Prototyping
"Lorem Ipsum" is the design world's industry-standard dummy text. Used since the 1500s, it allows designers and developers to showcase visual layouts (UI/UX) without distracting the client with "readable" content. If you write "Content here content here," the viewer focuses on the text. If you use Lorem Ipsum, they focus on the *design*.

Our generator creates perfectly randomized pseudo-Latin passages that mimic the sentence structure and word frequency of real English, ensuring your mockups look natural.

### Customization Options
*   **Paragraphs**: Generate long blocks of text for blog layouts.
*   **Sentences**: Short bursts for captions or tooltips.
*   **Words**: Precise control for button labels or headers.
*   **Start with "Lorem ipsum..."**: Toggle standard intro or pure random generation.

### Fun Fact
The text is actually a scrambled section of "De Finibus Bonorum et Malorum", a philosophical treatise by Cicero written in 45 BC. It discusses the ethics of pleasure and pain.

### Why not just mash the keyboard?
Randomly typing "asdfjkl" looks messy and breaks visual immersion. Lorem Ipsum has a normal distribution of letters, making it look like expensive, professional copy.
        `
    },
    {
        slug: 'text-diff-checker',
        title: 'Text Diff Checker',
        description: 'Compare two pieces of text and highlight the differences between them.',
        category: 'Text Tools',
        iconName: 'Shuffle',
        keywords: ['text diff checker', 'compare text online', 'diff tool', 'text difference finder', 'compare two files'],
        longDescription: `
### Spot the Difference
Tracking changes between two versions of a document or code snippet can be a nightmare if done manually. Our Text Diff Checker automates this process, highlighting every addition, deletion, and modification in vivid color. Whether you are a programmer debugging a breaking change or a writer editing a draft, this tool acts as your visual proofreader.

### How It Works
1.  **Original Text**: Paste the old version on the left.
2.  **Modified Text**: Paste the new version on the right.
3.  **Compare**: The tool uses the standard "Diff" algorithm to compute the minimum number of edits required to transform Text A into Text B.

### Features
*   **Side-by-Side View**: See both versions next to each other with lines aligned.
*   **Character Highlighting**: We don't just highlight lines; we highlight the exact *words* or *characters* that changed within the line.
*   **Privacy**: Comparisons are done locally in your browser.

### Use Cases
*   **Programming**: Compare two config files to see why one server is crashing.
*   **Legal**: Compare two contracts to ensure no subtle clauses were added.
*   **Plagiarism**: Check how much an article has been rewritten from the original source.
        `,
    },
    {
        slug: 'remove-duplicate-lines',
        title: 'Remove Duplicate Lines',
        description: 'Clean up your list by removing all duplicate lines instantly.',
        category: 'Text Tools',
        iconName: 'Trash2',
        keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines extractor', 'text cleaner online'],
        longDescription: `
### Clean Your Data in Seconds
Whether you are managing a mailing list, cleaning up a database export, or organizing a list of SKUs, duplicate entries can cause errors and waste resources. Our "Remove Duplicate Lines" tool (De-Duplicator) instantly scans your text and filters out every redundancy, leaving you with a perfectly unique list.

### Advanced Filtering Options
1.  **Case Sensitivity**: Choose whether "Apple" and "apple" are treated as the same item.
2.  **Trim Whitespace**: Automatically ignore invisible spaces at the start/end of lines (e.g., "  User1" vs "User1").
3.  **Sort Output**: Optionally sort your clean list A-Z or Z-A for better readability.

### Common Use Cases
*   **Email Marketing**: Upload a CSV of email addresses and remove duplicates to save money on your ESP (Email Service Provider) bill.
*   **Coding**: Clean up a list of CSS classes or potential SQL injection vectors.
*   **Data Analysis**: Sanitize your dataset before importing it into Excel or Google Sheets.

### Performance
Designed for heavy lifting. You can paste lists with 50,000+ lines, and it will deduplicate them in milliseconds using an optimized JavaScript Set algorithm.
        `,
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
        longDescription: `
### Batch Editing Made Simple
Editing a large document one word at a time is slow. Our "Find and Replace" tool gives you the power of a developer's code editor right in your browser. Update product names, fix recurring typos, or reformat data across thousands of lines instantly.

### Powerful Features
1.  **Global Replace**: Replaces *all* instances, not just the first one.
2.  **Case Sensitivity Toggle**: Decide if "Word" and "word" should be treated differently.
3.  **Real-Time Preview**: See how many matches were found before you execute the replacement.

### Examples
*   **Fixing Typos**: Replace "teh" with "the" across a whole essay.
*   **Rebranding**: Replace "OldCompany" with "NewCompany" in a contract.
*   **Coding**: Replace "var" with "const" in a legacy JavaScript file.
*   **Formatting**: Replace ", " (comma space) with "\n" (newline) to turn a CSV row into a vertical list.

### Privacy Note
This tool runs exclusively in your browser. If you paste sensitive legal documents or proprietary code, rest assured it is processed locally and never uploaded to any server.
        `,
    },
    {
        slug: 'reverse-text',
        title: 'Reverse Text',
        description: 'Reverse the order of characters, words, or lines in your text.',
        category: 'Text Tools',
        iconName: 'Shuffle',
        keywords: ['reverse text', 'backwards text generator', 'reverse words', 'mirror text tool'],
        longDescription: `
### Mirror, Flip, and Reverse
Need to send a cryptic message? Or maybe you are fixing a string that was exported backwards? The Reverse Text Generator is a versatile utility that flips your text in three distinct ways.

### Three Modes of Reversal
1.  **Reverse Text**: Flips the entire string character by character.
    *   *Input*: "Hello World"
    *   *Output*: "dlroW olleH"
2.  **Reverse Words**: Keeps the words intact but flips their order.
    *   *Input*: "The quick brown fox"
    *   *Output*: "fox brown quick The"
3.  **Reverse List**: Flips the order of lines (Perfect for reordering a chronological log).
    *   *Input*:
        Line 1
        Line 2
    *   *Output*:
        Line 2
        Line 1

### Fun & Practical Uses
*   **Social Media**: Create "mirror writing" for unique bio text.
*   **Encryption**: A simple way to obscure spoilers (e.g., "eulB si raliK ehT").
*   **Data Repair**: Fix CSVs where columns were exported in reverse chronological order.
        `,
    },
    {
        slug: 'whitespace-remover',
        title: 'Whitespace Remover',
        description: 'Clean up your text by removing extra spaces, tabs, and blank lines.',
        category: 'Text Tools',
        iconName: 'Type',
        keywords: ['remove extra spaces', 'whitespace cleaner', 'trim text online', 'remove blank lines'],
        longDescription: `
### Sanitize Your Strings
Copying text from PDFs, emails, or websites often brings along unwanted garbage: double spaces, tab characters, and weird line breaks. The Whitespace Remover serves as a "detergent" for your text, scrubbing away the invisible clutter that breaks code and ruins formatting.

### Cleaning Modes
1.  **Trim Ends**: Removes spaces from the start and end of the text (Essential for database inputs).
2.  **Remove Extra Spaces**: Converts "Hello   World" into "Hello World" (Single spacing).
3.  **Remove Line Breaks**: Turns a vertical list into a single paragraph.
4.  **Remove All Whitespace**: "HelloWorld" (Useful for generating IDs or minifying code).

### Who Needs This?
*   **Developers**: Minify CSS/JSON strings to save space.
*   **Writers**: Fix "broken" formatting when copy-pasting from a PDF.
*   **Data Analysts**: Clean up columns in Excel that aren't sorting correctly due to hidden leading spaces.
        `,
    },
    {
        slug: 'text-to-binary',
        title: 'Text to Binary Converter',
        description: 'Convert plain text into binary code and vice versa.',
        category: 'Text Tools',
        iconName: 'Braces',
        keywords: ['text to binary', 'binary translator', 'binary to text', 'ascii to binary converter'],
        longDescription: `
### Talk to the Machines
Computers don't understand "A" or "B". They only understand "0" and "1" (Off and On). This Text to Binary Converter allows you to translate human language into the machine code that powers the digital world. It is an excellent educational tool for computer science students or a fun way to send "secret messages" to your geeky friends.

### How Conversion Works (ASCII/UTF-8)
Every character on your keyboard has a numeric ID code (ASCII).
*   The letter **'A'** is ID 65.
*   65 in Binary is **01000001**.
*   The letter **'a'** is ID 97.
*   97 in Binary is **01100001**.
Our tool automates this 8-bit translation for every character, identifying spaces, symbols, and emojis correctly.

### Educational Use
*   **Students**: Visualize how much more space binary takes compared to text (8 bits vs 1 char).
*   **Developers**: Debug encoding issues or understand bitwise operations.
*   **Gamers**: Decode "Binary Hints" in CTF (Capture The Flag) challenges or ARGs.

### Features
*   **Real-Time**: Converts as you type.
*   **Bidirectional**: Switch to "Binary to Text" mode instantly if you made a mistake.
*   **Copy Friendly**: Outputs standard space-separated bytes for easy reading.
        `
    },
    {
        slug: 'random-string-generator',
        title: 'Random String Generator',
        description: 'Generate secure, random text strings with customizable character sets.',
        category: 'Text Tools',
        iconName: 'Sparkles',
        keywords: ['random string generator', 'random text maker', 'generate random characters', 'string generator for testing'],
        longDescription: `
### Controlled Chaos
Sometimes you need randomness. Whether you are generating a session token, testing a database field, or creating a temporary password, the Random String Generator is your tool. Unlike simple "random number" generators, this tool gives you granular control over the *types* of characters included in your output.

### High-Security Randomness
We do not use \`Math.random()\` (which is predictable). We use \`window.crypto.getRandomValues()\`, the same CSPRNG (Cryptographically Secure Pseudo-Random Number Generator) used by banking apps. This means the strings generated here are safe to use for:
*   **API Keys**
*   **Salt/Pepper for Hashing**
*   **Session IDs**

### Configuration
*   **Length**: How many characters? (e.g., 64 for a SHA-256 equivalent feel).
*   **Character Sets**:
    *   *Numeric (0-9)*: Good for PINs.
    *   *Alpha (a-z, A-Z)*: Good for coupons.
    *   *Special (!@#)*: Good for passwords.

### Why not just mash the keyboard?
Human randomness is flawed. If you mash keys, you likely prioritize the center of the keyboard (ASDFGH). A true generator ensures every byte has an equal probability of occurrence, which is critical for security.
        `,
    },
    {
        slug: 'text-to-slug',
        title: 'Text to Slug Converter',
        description: 'Convert any text into a URL-friendly slug.',
        category: 'Text Tools',
        iconName: 'Link',
        keywords: ['text to slug', 'url slug generator', 'permalink creator', 'seo friendly url generator'],
        longDescription: `
### SEO-Friendly URLs Made Easy
A "slug" is the part of a URL that identifies a specific page.
*   *Bad URL*: \`example.com/post.php?id=832\`
*   *Good URL*: \`example.com/how-to-bake-cake\`
Search engines like Google prioritize readable, descriptive URLs. Our Text to Slug Converter takes any title—no matter how messy—and transforms it into a clean, valid URL slug.

### What It Does
1.  **Lowercases**: "Hello World" -> "hello world"
2.  **Hyphenates**: Replaces spaces with dashes ("hello-world").
3.  **Sanitizes**: Removes special characters like ?, !, @, #.
4.  **Transliterates**: Converts accented characters (é, ü, ñ) to their ASCII equivalents (e, u, n).

### Why Slugs Matter
*   **Click-Through Rate (CTR)**: Users are more likely to click safe-looking links.
*   **Keywords**: Placing keywords in the URL (e.g., /best-gaming-mouse) is a ranking factor.
*   **Shareability**: Clean URLs look better on social media cards.
        `,
    },
    {
        slug: 'morse-code-translator',
        title: 'Morse Code Translator',
        description: 'Translate text to Morse code and decode Morse back to text.',
        category: 'Text Tools',
        iconName: 'Activity',
        keywords: ['morse code translator', 'text to morse', 'morse code decoder', 'international morse code'],
        longDescription: `
### The Original Digital Language
Long before the internet, there was Morse Code. Developed in the 1830s by Samuel Morse, this system of dots (.) and dashes (-) revolutionized communication. Today, it remains a critical skill in amateur radio (HAM), aviation (VOR beacons), and even survival scenarios. Our Morse Code Translator instantly converts your text into International Morse Code and vice versa.

### How It Works
*   **Dot (.)**: A short signal (1 unit of time).
*   **Dash (-)**: A long signal (3 units of time).
*   **Space**: Separates letters (3 units) and words (7 units).

### Educational and Fun Uses
*   **Learn a Skill**: Challenge your friends to decode messages without using the tool.
*   **Secret Messages**: Send "hidden" notes that look like random punctuation to the untrained eye.
*   **Auditory Training**: Use the visual output to practice tapping out rhythms on your desk.

### Common Codes
*   **SOS**: \`... --- ...\` (Save Our Souls)
*   **HELLO**: \`.... . .-.. .-.. -- - \`
*   **I LOVE YOU**: \`.. / .-.. -- - ...- . / -.-- -- - ..- \`
        `,
    },
    {
        slug: 'zalgo-text-generator',
        title: 'Zalgo Text Generator',
        description: 'Generate "glitchy" or "corrupted" text for creative effects.',
        category: 'Text Tools',
        iconName: 'Zap',
        keywords: ['zalgo text', 'glitch text generator', 'corrupted text maker', 'distorted text generator'],
        longDescription: `
### Unwrap the Chaos
Zalgo text (or "glitch text") looks like your screen is melting. It’s a popular internet aesthetic used in memes, horror fiction (Creepypasta), and edgy social media bios. It works by abusing a feature of Unicode called "Combining Diacritical Marks."

### How It Works
In normal text, you might have one accent mark, like "é" (e + acute accent). Unicode allows you to stack *infinite* accent marks on a single letter.
*   **Input**: "He comes"
*   **Zalgo**: "HÌ€ÌƒÌ‚ÌµÌ—ÌŠÌŽeÌ‰Ì’Ì’Ì« cÌ´ÌŸÌŠoÌ Ì˜ÌŒÌ•ÌšmÌ†ÌŠÌ Ì•Ì–eÌ“Ì‘ÌŠÌ‡Ì’sÌ Ì—ÌŠÌ "

### Customization
Our tool allows you to control the "Chaos Level":
1.  **Mini**: Subtle distortion, readable. Good for emphasis.
2.  **Normal**: The classic glitched look.
3.  **Max**: Complete destruction. The text becomes a black tower of ink, extending far above and below the line.

### Note on Compatibility
Since this relies on standard Unicode, it works on Twitter, Discord, WhatsApp, and most browsers. However, very heavy Zalgo text might lag older phones or get truncated by platforms with strict vertical spacing.
        `,
    },
    {
        slug: 'upside-down-text',
        title: 'Upside Down Text',
        description: 'Flip your text 180 degrees for a funny upside-down look.',
        category: 'Text Tools',
        iconName: 'RefreshCw',
        keywords: ['upside down text', 'flip text generator', 'backwards text maker', 'inverted text tool'],
        longDescription: `
### ¿noclip uɐɔ noʎ ɟI
Want to confuse your friends? The Upside Down Text Generator flips your text 180 degrees using special characters from the International Phonetic Alphabet (IPA) and other Unicode blocks. It matches each standard letter with a lookalike character that is inverted.

### How It Works (The Magic)
Computers can't actually "rotate" text. Instead, we swap characters:
*   "a" becomes "É "
*   "b" becomes "q"
*   "c" becomes "É”"
*   "?" becomes "¿"

### Use Cases
*   **Social Media**: Make your tweets or Instagram comments stand out in the feed.
*   **Passwords**: Use flipped characters to increase password entropy (though not recommended for accounts you need to type on mobile!).
*   **Creative Designs**: Use it for "Mirror Dimension" themes in web projects or roleplay.

### Limitations
While most letters have a perfect upside-down match, some (like 'j' or 'q') rely on approximations. The result is readable but stylized.
        `,
    },
    {
        slug: 'small-text-generator',
        title: 'Small Text Generator',
        description: 'Convert text into tiny caps, superscript, or subscript formats.',
        category: 'Text Tools',
        iconName: 'Type',
        keywords: ['small text generator', 'tiny caps maker', 'superscript generator', 'subscript text tool'],
        longDescription: `
### ³Ë¡áµ—áµ—áµ¡áµ‰ Ë¡áµ‰áµ—áµ—áµ‰Ê³Ë¢, Bá´„Ë¢ á´€áµ‰Ë¢áµ—Ê°áµ‰áµ—á´„Ë¢
Sometimes you just need to whisper. The Small Text Generator (or Tiny Text Maker) converts your standard alphabet into three distinct "small" font styles using Unicode. These aren't just smaller font sizes; they are entirely different characters that work anywhere—Twitter, TikTok, Discord, and Instagram bios.

### The Three Styles
1.  **Small Caps (á´€Ê™á´„)**: Looks like capitalized letters but at the height of lowercase. Very clean and professional. Excellent for headers.
2.  **Superscript (Ê°áµ‰Ë¡Ë¡áµ’)**: Tiny letters that float above the line. Used in math (xÂ²) or footnotes.
3.  **Subscript (â‚‘â‚‘â‚—â‚—â‚’)**: Tiny letters that sink below the line. Used in chemistry (Hâ‚‚O). *Note: The Unicode "Subscript" alphabet is incomplete, so some letters may look like normal size.*

### Where to Use
*   **Twitter/X Names**: "á´Šá´€É´á´‰á´„á´‰á´€" looks more unique than "Janicia".
*   **Tumblr/Discord**: Add a "whispering" effect to your posts.
*   **Scientific Notation**: Easily write E = mcÂ² or Câ‚ˆHâ‚ â‚ˆ.

### Is it accessible?
Screen readers (for the blind) may have trouble pronouncing these characters. It is best to use them for decoration (usernames, aesthetic phrases) rather than critical information.
        `,
    },
    {
        slug: 'html-entity-encoder',
        title: 'HTML Entity Encoder/Decoder',
        description: 'Encode special characters to HTML entities or decode them back.',
        category: 'Text Tools',
        iconName: 'Code',
        keywords: ['html entity encoder', 'html character codes', 'encode special characters', 'decode html entities'],
        longDescription: `
### Speak the Browser's Language
HTML reserved characters are the bane of every web developer's existence. If you try to write "<div>" on a website, the browser thinks you are starting a code block. To display it as text, you *must* encode it as \`&lt;div&gt;\`.

Our HTML Entity Encoder/Decoder automates this tedious process, ensuring your code snippets are safe to display and your special characters render correctly.

### What gets Encoded?
1.  **Reserved Characters**: \`<\` becomes \`&lt;\`, \`>\` becomes \`&gt;\`, \`&\` becomes \`&amp;\`.
2.  **Invisible Characters**: Non-breaking spaces become \`&nbsp;\`.
3.  **Symbols**: \`©\` becomes \`&copy;\`, \`™\` becomes \`&trade;\`.

### Security: XSS Prevention
Encoding is the first line of defense against Cross-Site Scripting (XSS) attacks. If you accept user input and display it without encoding, a hacker can inject malicious JavaScript (\`<script>alert(1)</script>\`). By running it through this tool (or a similar function in your code), you neutralize the script, turning it into harmless text \`&lt;script&gt;...\`.

### Features
*   **Bidirectional**: Encode text to entities OR Decode entities back to text.
*   **Live Preview**: See how the browser will render your output strings.
        `,
    },
    {
        slug: 'text-to-hex-converter',
        title: 'Text to Hex Converter',
        description: 'Convert plain text into its Hexadecimal (Hex) representation.',
        category: 'Text Tools',
        iconName: 'Braces',
        keywords: ['text to hex', 'hexadecimal converter', 'string to hex online', 'hex to string decoder'],
        longDescription: `
### See the Raw Data
Every digital letter is just a number in disguise. Hexadecimal (Base-16) is the preferred notation for developers to view binary data because it is compact and aligns perfectly with 8-bit bytes. Our Text to Hex Converter reveals the underlying byte structure of your text.

### How it works
It takes the UTF-8 numeric value of each character and converts it to Base-16.
*   **A** (Decimal 65) -> **41** (Hex)
*   **B** (Decimal 66) -> **42** (Hex)
*   **Space** (Decimal 32) -> **20** (Hex)

### Use Cases
*   **Color Codes**: Understanding how #FF0000 works (Red=255).
*   **Debugging**: Finding "invisible" characters (like line breaks or non-breaking spaces) that are breaking your code.
*   **Encoding**: Sending data in URLs or JSON where special characters might break the format.
        `,
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
    {
        slug: 'color-shades-generator',
        title: 'Color Shades Generator',
        description: 'Generate monochrome tints and shades for any base color.',
        category: 'Design & UI',
        iconName: 'Palette',
        keywords: ['color shades', 'color tints', 'monochrome palette', 'css colors'],
        longDescription: 'Create perfect color scales. Generate 10 lighter and 10 darker variations of any hex color, perfect for building cohesive UI themes and states.'
    },
    {
        slug: 'color-harmony-tool',
        title: 'Color Harmony Tool',
        description: 'Explore classical color relationships based on the color wheel.',
        category: 'Design & UI',
        iconName: 'Sparkles',
        keywords: ['color harmony', 'complementary colors', 'triadic colors', 'analogous colors', 'palette generator'],
        longDescription: 'Master color theory. Generate complementary, analogous, triadic, and tetradic color schemes instantly from a single base color.'
    },
    {
        slug: 'contrast-checker-pro',
        title: 'Contrast Checker Pro',
        description: 'Verify WCAG 2.1 accessibility standards for color combinations.',
        category: 'Design & UI',
        iconName: 'ShieldCheck',
        keywords: ['wcag contrast', 'accessibility checker', 'color contrast', 'a11y tool'],
        longDescription: 'Ensure your designs are accessible. Check contrast ratios against WCAG 2.1 AA and AAA standards for both normal and large text.'
    },
    {
        slug: 'material-design-palette',
        title: 'Material Design Palette',
        description: 'Official Google Material Design color system reference.',
        category: 'Design & UI',
        iconName: 'Palette',
        keywords: ['material design colors', 'google color palette', 'android design colors', 'ui color reference'],
        longDescription: 'Access the complete Material Design color system. Browse official shades and weights from 50 to 900 for every primary Material color.'
    },
    {
        slug: 'flat-ui-colors',
        title: 'Flat UI Colors',
        description: 'Handpicked color palettes for flat design interfaces.',
        category: 'Design & UI',
        iconName: 'Palette',
        keywords: ['flat design colors', 'ui palettes', 'spanish palette', 'american palette', 'german palette'],
        longDescription: 'Curated collection of beautiful flat UI colors. Includes popular palettes like Spanish, American, and German for modern, clean interface designs.'
    },
    {
        slug: 'css-filter-generator',
        title: 'CSS Filter Generator',
        description: 'Visually adjust CSS filters and generate optimized code.',
        category: 'Design & UI',
        iconName: 'Sliders',
        keywords: ['css filters', 'image effects', 'css brightness', 'css contrast', 'hue-rotate'],
        longDescription: 'Create stunning image effects with pure CSS. Adjust brightness, contrast, saturation, blur, and more with a live preview and instant code generation.'
    },
    {
        slug: 'css-text-shadow-generator',
        title: 'CSS Text Shadow Generator',
        description: 'Layer multiple shadows for realistic and aesthetic text effects.',
        category: 'Design & UI',
        iconName: 'Type',
        keywords: ['text shadow', 'css text effects', 'layered shadows', 'text styling'],
        longDescription: 'Add depth to your typography. Create complex, multi-layered text shadows with individual control over blur, spread, and color.'
    },
    {
        slug: 'css-clip-path-generator',
        title: 'CSS Clip Path Generator',
        description: 'Drag the handles to create custom polygon shapes with clip-path.',
        category: 'Design & UI',
        iconName: 'Scissors',
        keywords: ['clip path', 'css shapes', 'polygon generator', 'masking css'],
        longDescription: 'Break out of the box. Use our interactive editor to create custom polygon clip-paths with drag-and-drop point manipulation and presets.'
    },
    {
        slug: 'css-animation-keyframes',
        title: 'CSS Animation Keyframes',
        description: 'Generate keyframes and utility classes for common UI animations.',
        category: 'Design & UI',
        iconName: 'Zap',
        keywords: ['css animation', 'keyframes generator', 'ui motion', 'bounce animation', 'pulse effect'],
        longDescription: 'Bring your UI to life. Generate ready-to-use CSS keyframes for animations like bounce, shake, fade, and spin with customizable timing and duration.'
    },
    {
        slug: 'css-scrollbar-customizer',
        title: 'CSS Scrollbar Customizer',
        description: 'Design custom scrollbars for Webkit browsers (Chrome, Edge, Safari).',
        category: 'Design & UI',
        iconName: 'MousePointer',
        keywords: ['scrollbar styling', 'webkit scrollbar', 'custom scrollbar', 'css ui'],
        longDescription: 'Style your scrollbars to match your brand. Customize thumb and track colors, rounded corners, and borders for a cohesive browsing experience.'
    },
    {
        slug: 'css-loader-generator',
        title: 'CSS Loader Generator',
        description: 'Create lightweight, CSS-only loading indicators.',
        category: 'Design & UI',
        iconName: 'Loader2',
        keywords: ['css loader', 'loading spinner', 'css activity indicator', 'wait animation'],
        longDescription: 'Zero-dependency loading animations. Design spinners, bouncing dots, and progress bars using pure CSS for maximum performance.'
    },
    {
        slug: 'css-tooltip-generator',
        title: 'CSS Tooltip Generator',
        description: 'Generate clean, arrow-tip css tooltips with easy customization.',
        category: 'Design & UI',
        iconName: 'MessageSquareAction',
        keywords: ['css tooltip', 'hover label', 'ui tooltips', 'pure css components'],
        longDescription: 'Professional tooltips without JavaScript. Generate accessible tooltips for any element with customizable positions (top, bottom, left, right).'
    },
    {
        slug: 'css-ribbon-generator',
        title: 'CSS Ribbon Generator',
        description: 'Create decorative corner ribbons for cards and product listing.',
        category: 'Design & UI',
        iconName: 'Bookmark',
        keywords: ['css ribbon', 'badge generator', 'corner ribbon', 'ecommerce ui'],
        longDescription: 'Add "New" or "Sale" ribbons to your components. Customize size, offset, and rotate positions for perfect corner badges.'
    },
    {
        slug: 'css-input-field-stylizer',
        title: 'CSS Input Field Stylizer',
        description: 'Custom style generator for text inputs with focus states.',
        category: 'Design & UI',
        iconName: 'Type',
        keywords: ['input styling', 'css text input', 'form design', 'focus states'],
        longDescription: 'Design beautiful, interactive form fields. Customize padding, borders, and focus rings with smooth transitions and modern aesthetics.'
    },
    {
        slug: 'css-checkbox-stylizer',
        title: 'CSS Checkbox Stylizer',
        description: 'Design custom checkboxes without external image dependencies.',
        category: 'Design & UI',
        iconName: 'ToggleLeft',
        keywords: ['custom checkbox', 'css radio button', 'form components', 'checkbox style'],
        longDescription: 'Replace native checkboxes with custom designs. Lightweight CSS-only checkboxes that work across all modern browsers.'
    },
    {
        slug: 'svg-pattern-generator',
        title: 'SVG Pattern Generator',
        description: 'Generate lightweight CSS backgrounds using repeatable SVG patterns.',
        category: 'Design & UI',
        iconName: 'Grid3X3',
        keywords: ['svg patterns', 'css backgrounds', 'noise patterns', 'geometric backgrounds'],
        longDescription: 'Create infinite backgrounds with tiny file sizes. Generate polka dots, stripes, and squares using Base64-encoded SVG patterns directly in your CSS.'
    },
    {
        slug: 'component-mockup-generator',
        title: 'Component Mockup Generator',
        description: 'Present your web components in realistic CSS-based device frames.',
        category: 'Design & UI',
        iconName: 'Laptop',
        keywords: ['device mockup', 'ui presentation', 'laptop mockup', 'phone mockup', 'marketing assets'],
        longDescription: 'Showcase your work in context. Generate CSS-only laptop, phone, and desktop frames to present your UI snippets professionally.'
    },
    {
        slug: 'neumorphism-advanced',
        title: 'Neumorphism Advanced',
        description: 'Generate Soft UI effects with realistic inner and outer shadows.',
        category: 'Design & UI',
        iconName: 'Sparkles',
        keywords: ['neumorphism generator', 'soft ui pro', 'extruded ui', 'modern css effects'],
        longDescription: 'Master the art of soft shadows. Create complex convex, concave, and pressed neumorphic elements with precise control over light source and intensity.'
    },
    {
        slug: 'card-layout-visualizer',
        title: 'Card Layout Visualizer',
        description: 'Test and compare different card component styles and grid layouts.',
        category: 'Design & UI',
        iconName: 'Layout',
        keywords: ['card designs', 'grid layouts', 'ui patterns', 'layout testing'],
        longDescription: 'Prototype your card layouts instantly. Compare glassmorphism, minimal, and elevated designs across different grid configurations.'
    },
    {
        slug: 'css-buttons-pack',
        title: 'CSS Buttons Pack',
        description: 'A collection of premium web button styles with copy-paste code.',
        category: 'Design & UI',
        iconName: 'MousePointerClick',
        keywords: ['premium buttons', 'css button pack', 'cta design', 'button styles'],
        longDescription: 'Jumpstart your UI with professional buttons. Includes Glow, Glass, Neumorphic, and Retro button styles with optimized CSS.'
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
        slug: 'image-masking-shapes',
        title: 'Image Masking & Shapes',
        description: 'Apply circular, star, or custom geometric masks to your images.',
        category: 'Image Tools',
        iconName: 'Shapes',
        keywords: ['image masking', 'circular crop', 'shape crop', 'geometric image', 'avatar maker'],
        longDescription: 'Beyond square grids. Apply creative masks to your photos, turning them into circles, triangles, stars, or hexagons. Perfect for creating unique profile pictures or design assets.'
    },
    {
        slug: 'image-canvas-padding',
        title: 'Image Canvas Adder',
        description: 'Add specific padding or a colored background canvas around your images.',
        category: 'Image Tools',
        iconName: 'Maximize',
        keywords: ['image padding', 'add border', 'canvas resize', 'social media crop', 'image background'],
        longDescription: 'Prepare your images for framing or social media. Add whitespace or custom-colored padding around your image to fit specific aspect ratios without stretching.'
    },
    {
        slug: 'image-metadata-cleaner',
        title: 'Metadata Cleaner',
        description: 'Remove all hidden EXIF and location data from images for privacy.',
        category: 'Image Tools',
        iconName: 'ShieldCheck',
        keywords: ['remove exif', 'clean image', 'privacy photo', 'metadata remover', 'scrub location'],
        longDescription: 'Protect your privacy. Scrub all hidden metadata from your JPEG and PNG files, including GPS coordinates, camera models, and timestamps, before sharing them online.'
    },
    {
        slug: 'image-overlay-pro',
        title: 'Image Overlay Pro',
        description: 'Overlay logos, watermarks, or text onto your images with transparency.',
        category: 'Image Tools',
        iconName: 'Layers',
        keywords: ['watermark adder', 'image overlay', 'add logo to photo', 'branding tool', 'batch watermark'],
        longDescription: 'Protect your creative work. Overlay custom logos or watermarks onto your images with full control over opacity, positioning, and scale for professional branding.'
    },
    {
        slug: 'cyberpunk-glitcher',
        title: 'Cyberpunk Glitcher',
        description: 'Add stylistic digital artifacts and glitch effects to your photos.',
        category: 'Image Tools',
        iconName: 'Zap',
        keywords: ['image glitch', 'digital art', 'cyberpunk effect', 'photo artifacts'],
        longDescription: 'Embrace the aesthetic of digital error. Add RGB shifts, scanlines, and block distortions to your images to create a unique cyberpunk or retro-electronic look.'
    },
    {
        slug: 'pixel-art-generator',
        title: 'Pixel Art Generator',
        description: 'Convert any photo into high-quality retro pixel art.',
        category: 'Image Tools',
        iconName: 'Grid',
        keywords: ['pixelate image', '8bit converter', 'pixel art tool', 'retro photo'],
        longDescription: 'Go retro. Reduce your image resolution to a specific grid size while preserving color data to create authentic 8-bit or 16-bit style pixel art.'
    },
    {
        slug: 'photo-text-art',
        title: 'Photo Text Art',
        description: 'Quickly add stylized text captions or quotes onto your images.',
        category: 'Image Tools',
        iconName: 'Type',
        keywords: ['add text to image', 'photo caption', 'text overlay', 'meme maker'],
        longDescription: 'Make your images speak. Add beautiful, customizable text overlays to your photos with control over fonts, colors, shadow effects, and positioning.'
    },
    {
        slug: 'social-aspect-studio',
        title: 'Social Aspect Studio',
        description: 'Instantly crop or pad images for Instagram, TikTok, and YouTube.',
        category: 'Image Tools',
        iconName: 'Smartphone',
        keywords: ['aspect ratio', 'social media crop', 'instagram size', 'tiktok aspect', 'image resize'],
        longDescription: 'Prepare for the feed. Instantly adjust your image aspect ratio with professional presets for all major social platforms, ensuring your content looks perfect in every post.'
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
        category: 'Advanced Scholar Tools',
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
        category: 'Advanced Scholar Tools',
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
        category: 'Advanced Scholar Tools',
        iconName: 'Droplet',
        keywords: ['molar mass calculator', 'chemical formula parser', 'atomic weight', 'molecular mass', 'chemistry solver'],
        longDescription: 'A professional-grade chemical formula parser. Handles complex notation including parentheses, hydrates, and nested groups (e.g., (NH4)2SO4 or CuSO4*5H2O) with high-precision atomic weight data.'
    },
    {
        slug: 'projectile-simulator',
        title: 'Projectile Simulator',
        description: 'Interactive physics simulator to visualize 2D trajectories with air resistance.',
        category: 'Advanced Scholar Tools',
        iconName: 'Zap',
        keywords: ['projectile motion', 'physics simulator', 'trajectory visualizer', 'kinematics tool', 'motion physics'],
        longDescription: 'Master kinematics with visual intuition. Adjust initial velocity, launch angle, and atmospheric drag to see real-time trajectory plotting and kinematic data breakdowns.'
    },
    {
        slug: 'circuit-solver-pro',
        title: 'Circuit Solver Pro',
        description: 'Analyze series and parallel circuits with visual resistance and voltage mapping.',
        category: 'Advanced Scholar Tools',
        iconName: 'Zap',
        keywords: ['circuit calculator', 'ohms law', 'series parallel', 'electronics solver', 'dc circuit analyzer'],
        longDescription: 'A premium tool for DC circuit analysis. Build series and parallel resistor networks to calculate equivalent resistance, total current, and voltage drops across specific components.'
    },
    {
        slug: 'complex-number-pro',
        title: 'Complex Number Pro',
        description: 'Perform arithmetic and polar conversions on complex numbers (a + bi).',
        category: 'Advanced Scholar Tools',
        iconName: 'Hash',
        keywords: ['complex numbers', 'imaginary numbers', 'polar coordinates', 'phasor calculator', 'advanced math'],
        longDescription: 'A dedicated calculator for imaginary and complex numbers. Supports basic arithmetic, modulus/argument calculation, and seamless switching between rectangular and polar forms.'
    },
    {
        slug: 'probability-pro',
        title: 'Probability Pro',
        description: 'Analyze Normal and Binomial distributions with interactive visualizations.',
        category: 'Advanced Scholar Tools',
        iconName: 'BarChart3',
        keywords: ['probability distribution', 'normal distribution', 'binomial calculator', 'statistics tool', 'z-score solver'],
        longDescription: 'Deep statistical analysis in your browser. Visualize probability density functions, calculate cumulative probabilities, and find critical values for standard distributions.'
    },
    {
        slug: 'ph-calculator-pro',
        title: 'pH Calculator Pro',
        description: 'Calculate pH, pOH, and concentration for strong and weak acid-base systems.',
        category: 'Advanced Scholar Tools',
        iconName: 'Droplet',
        keywords: ['ph calculator', 'acid base solver', 'titration math', 'poh calculator', 'chemistry tools'],
        longDescription: 'Master aqueous chemistry. Calculate the pH of various solutions, including weak acids and bases using equilibrium constants (Ka/Kb), with detailed molar concentration readouts.'
    },
    {
        slug: 'gas-law-advanced',
        title: 'Gas Law Advanced',
        description: 'Solve Ideal, Boyles, and Charles gas laws with integrated unit conversions.',
        category: 'Advanced Scholar Tools',
        iconName: 'Wind',
        keywords: ['gas law calculator', 'ideal gas law', 'pv=nrt solver', 'chemistry thermodynamics', 'physics of gases'],
        longDescription: 'A comprehensive solver for gas thermodynamics. Handle variables for pressure, volume, temperature, and moles across multiple unit systems (atm, kPa, Celsius, Kelvin) flawlessly.'
    },
    {
        slug: 'differential-equation-pro',
        title: 'Differential Eq. Pro',
        description: 'Heuristic solver for first-order linear and separable differential equations.',
        category: 'Advanced Scholar Tools',
        iconName: 'Braces',
        keywords: ['differential equation solver', 'calculus tool', 'separable equations', 'first order linear', 'math solver'],
        longDescription: 'Advance your calculus skills. Our heuristic solver identifies and breaks down standard first-order differential equations, providing step-by-step logic and integration constants.'
    },
    {
        slug: 'relativity-dilation',
        title: 'Relativity Time Dilation',
        description: 'Visualize Einsteins Special Relativity and calculate Lorentz time dilation.',
        category: 'Advanced Scholar Tools',
        iconName: 'Clock',
        keywords: ['relativity', 'time dilation', 'lorentz factor', 'physics', 'special relativity', 'einstein'],
        longDescription: 'Experience the physics of the very fast. Calculate the time dilation between a moving observer and a stationary one using the Lorentz factor ($ \gamma $), with visual context for speeds approaching $c$.'
    },
    {
        slug: 'reaction-kinetics',
        title: 'Reaction Kinetics Pro',
        description: 'Advanced tool for calculating rate laws, half-life, and activation energy.',
        category: 'Advanced Scholar Tools',
        iconName: 'Activity',
        keywords: ['reaction kinetics', 'rate law', 'half life', 'chemistry solver', 'arrhenius equation'],
        longDescription: 'A professional physical chemistry solver. Determine reaction order, calculate rate constants across temperatures using the Arrhenius equation, and track half-life decay patterns.'
    },
    {
        slug: 'laplace-solver-pro',
        title: 'Laplace Solver Pro',
        description: 'Reference and solver for Laplace and Inverse Laplace transforms.',
        category: 'Advanced Scholar Tools',
        iconName: 'Calculator',
        keywords: ['laplace transform', 'inverse laplace', 'engineering math', 'signals and systems', 'math tool'],
        longDescription: 'The ultimate tool for engineering mathematics. Access a comprehensive library of s-domain transforms and apply them to standard time-domain functions with clear step-by-step logic.'
    },
    {
        slug: 'vector-calc-pro',
        title: 'Vector Calc Pro',
        description: 'Perform advanced vector operations including Cross Product and Dot Product.',
        category: 'Advanced Scholar Tools',
        iconName: 'MoveUpRight',
        keywords: ['vector algebra', 'cross product', 'dot product', 'magnitude', 'linear algebra', 'math'],
        longDescription: 'High-precision vector algebra. Calculate cross products, dot products, vector magnitudes, and the angles between vectors in 3D space with visual coordinate readouts.'
    },
    {
        slug: 'titration-curve-sim',
        title: 'Titration Curve Sim',
        description: 'Interactive visual simulator for acid-base titration and equivalence points.',
        category: 'Advanced Scholar Tools',
        iconName: 'Beaker',
        keywords: ['titration curve', 'chemistry simulator', 'equivalence point', 'buffer region', 'acid base'],
        longDescription: 'Visualize aqueous chemistry in motion. Simulate the titration of strong/weak acids and bases to see real-time pH curve plotting and identify fundamental equivalence points.'
    },
    // Mathematics Tools
    {
        slug: 'algebra-solver',
        title: 'Algebra Solver',
        description: 'Solve linear, quadratic, and polynomial equations instantly.',
        category: 'Mathematics Tools',
        iconName: 'Calculator',
        keywords: ['algebra solver', 'quadratic equation solver', 'polynomial calculator', 'factorization tool', 'math solver'],
        longDescription: `
The Algebra Solver is your all -in -one tool for mastering algebraic equations.Whether you're a high school student or a college engineering major, this tool handles the core problems you face daily.

### Features
        *   ** Linear Equations **: Solve simple equations like 2x + 5 = 15.
            *   ** Quadratic Equations **: Get roots for ax² + bx + c = 0 using the quadratic formula.
*   ** Polynomials **: Find roots for higher - degree polynomials.
*   ** Factorization **: Decompose algebraic expressions into factors.
*   ** Inequalities **: Solve and graph linear and quadratic inequalities.

### How to Use
    1. ** Select Mode **: Choose the type of problem (e.g., Quadratic).
2. ** Input Equation **: Enter your coefficients or the full equation.
3. ** Calculate **: Get step - by - step solutions(where applicable) and the final answer.
        `
    },
    {
        slug: 'calculus-solver',
        title: 'Calculus Solver',
        description: 'Compute limits, derivatives, and integrals.',
        category: 'Mathematics Tools',
        iconName: 'Sigma',
        keywords: ['calculus solver', 'derivative calculator', 'integral calculator', 'limit solver', 'differentiation'],
        longDescription: `
Focus on the solution, not the tedious arithmetic.Our Basic Calculus Solver helps you check your homework and understand the behavior of functions.

### Capabilities
        *   ** Limits **: Evaluate limits as x approaches a specific value or infinity.
*   ** Differentiation **: Find the first, second, or higher - order derivatives of a function.
*   ** Integration **: Calculate indefinite and definite integrals using standard formulas.
*   ** Maxima & Minima **: Find the local peaks and valleys of a function.

### Note
This tool is designed for standard high - school and college - level problems.
        `
    },
    {
        slug: 'trigonometry-solver',
        title: 'Trigonometry Solver',
        description: 'Solve triangles, verify identities, and calculate trig values.',
        category: 'Mathematics Tools',
        iconName: 'Triangle',
        keywords: ['trigonometry solver', 'triangle calculator', 'trig identities', 'heights and distances'],
        longDescription: `
Master the relationships between side lengths and angles of triangles.The Trigonometry Solver is perfect for board exams and entry tests.

### Features
        *   ** Trig Identities **: Verify standard identities.
*   ** Trig Equations **: Solve for theta in equations like sin(x) = 0.5.
*   ** Heights & Distances **: Calculate unknown heights using angle of elevation / depression.
*   ** Graphs **: Visualize sine, cosine, and tangent waves.
        `
    },
    {
        slug: 'coordinate-geometry',
        title: 'Coordinate Geometry',
        description: 'Analyze lines, circles, and parabolas on a 2D plane.',
        category: 'Mathematics Tools',
        iconName: 'Axis3d',
        keywords: ['coordinate geometry', 'circle equation', 'parabola calculator', 'distance formula', 'midpoint calculator'],
        longDescription: `
Visualize and solve problems in the Cartesian plane.

### Tools
        *   ** Straight Line **: Find the equation of a line given two points or slope and intercept.
*   ** Circle **: Find the center and radius from the general equation.
*   ** Parabola **: Analyze dimensions of basic parabolas.
*   ** Distance & Midpoint **: Calculate the distance between two points and find their center.
        `
    },
    {
        slug: 'matrix-determinant',
        title: 'Matrix & Determinants',
        description: 'Perform matrix operations and solve linear systems.',
        category: 'Mathematics Tools',
        iconName: 'Grid',
        keywords: ['matrix calculator', 'determinant solver', 'matrix multiplication', 'inverse matrix', 'system of equations'],
        longDescription: `
A lightweight tool for handling matrix algebra without the headache of manual calculations.

### Operations
        *   ** Basic Math **: Add, subtract, and multiply matrices.
*   ** Determinant **: Calculate the determinant of 2x2 and 3x3 matrices.
*   ** Linear Systems **: Solve systems of linear equations(Cramer's Rule / Inverse method).
            `
    },
    {
        slug: 'cramers-rule-solver',
        title: 'Cramer\'s Rule Solver',
        description: 'Solve systems of linear equations using Cramer\'s Rule with step-by-step details.',
        category: 'Mathematics Tools',
        iconName: 'Grid',
        keywords: ['cramers rule', 'system of equations', 'linear algebra solver', 'matrix solver', 'determinant method'],
        longDescription: `
Solve systems of linear equations(2x2, 3x3, 4x4) using the famous Cramer's Rule. This tool calculates the main determinant (D) and the determinants for each variable (Dx, Dy, Dz) to find the unique solution.

### How to Use
1. ** Enter Coefficients **: Input your matrix A(coefficients).
2. ** Enter Constants **: Input your vector B(constants).
3. ** Solve **: The calculator will show each determinant calculation and the final values for x, y, z.
        `
    },
    {
        slug: 'probability-statistics',
        title: 'Probability & Stats',
        description: 'Calculate mean, median, mode, and probability.',
        category: 'Mathematics Tools',
        iconName: 'BarChart3',
        keywords: ['statistics calculator', 'mean median mode', 'probability calculator', 'permutations combinations'],
        longDescription: `
Essential tools for data analysis and probability theory.

### Features
        *   ** Descriptive Stats **: Calculate Mean, Median, and Mode for a data set.
*   ** Simple Probability **: Calculate odds for simple events.
*   ** Counting **: Permutations(nPr) and Combinations(nCr) calculator.
        `
    },
    {
        slug: 'partial-fraction-decomposer',
        title: 'Partial Fraction Decomposer',
        description: 'Decompose rational functions into simpler partial fractions.',
        category: 'Mathematics Tools',
        iconName: 'Divide',
        keywords: ['partial fraction', 'rational function', 'math decomposition', 'algebra solver', 'calculus helper'],
        longDescription: 'Simplify complex rational expressions. Decompose algebraic fractions into sums of simpler distinct or repeated linear and quadratic factors, essential for integration and inverse Laplace transforms.'
    },
    {
        slug: 'binomial-expansion-tool',
        title: 'Binomial Expansion Tool',
        description: 'Expand binomial expressions (a+b)^n using Pascal\'s Triangle.',
        category: 'Mathematics Tools',
        iconName: 'Sigma',
        keywords: ['binomial theorem', 'polynomial expansion', 'pascals triangle', 'algebra expansion', 'math series'],
        longDescription: 'Expand powers of binomials instantly. Get the full expansion of (a + b)^n for any integer power n, showing coefficients derived from the Binomial Theorem.'
    },
    {
        slug: 'synthetic-division-calculator',
        title: 'Synthetic Division',
        description: 'Perform synthetic division of polynomials by linear divisors.',
        category: 'Mathematics Tools',
        iconName: 'Divide',
        keywords: ['synthetic division', 'polynomial division', 'remainder theorem', 'algebra tool', 'math division'],
        longDescription: 'Divide polynomials efficiently. Use synthetic division to divide a polynomial P(x) by a linear binomial (x - c), providing the quotient and remainder with a clear tabular step-by-step format.'
    },
    {
        slug: 'complex-roots-finder',
        title: 'Complex Roots Finder',
        description: 'Find all roots (real and complex) of polynomial equations.',
        category: 'Mathematics Tools',
        iconName: 'Hash',
        keywords: ['complex roots', 'polynomial solver', 'imaginary numbers', 'fundamental theorem of algebra', 'root finder'],
        longDescription: 'Solve for every solution. Find all n roots of an n-th degree polynomial, including complex conjugate pairs, ensuring no solution is missed.'
    },
    {
        slug: 'logarithm-solver',
        title: 'Logarithm Solver',
        description: 'Solve logarithmic equations and simplify log expressions.',
        category: 'Mathematics Tools',
        iconName: 'Calculator',
        keywords: ['logarithm calculator', 'log solver', 'natural log', 'log rules', 'exponential equations'],
        longDescription: 'Master logarithmic properties. Solve for x in logarithmic equations via exponentiation, change bases, and simplify expanded log expressions into single terms.'
    },
    {
        slug: 'sequence-series-solver',
        title: 'Sequence & Series (AP/GP)',
        description: 'Calculate nth term and sum of Arithmetic and Geometric progressions.',
        category: 'Mathematics Tools',
        iconName: 'ListOrdered',
        keywords: ['arithmetic progression', 'geometric progression', 'series sum', 'nth term', 'math sequences'],
        longDescription: 'Analyze mathematical patterns. Calculate the nth term, sum to n terms, and infinite sums (for GP) for Arithmetic and Geometric progressions effortlessly.'
    },
    {
        slug: 'conic-section-analyzer',
        title: 'Conic Section Analyzer',
        description: 'Analyze properties of Parabolas, Ellipses, and Hyperbolas.',
        category: 'Mathematics Tools',
        iconName: 'Circle',
        keywords: ['conics', 'parabola', 'ellipse', 'hyperbola', 'focus directrix'],
        longDescription: 'Explore the geometry of curves. Input standard equations to find vertices, foci, directrices, lattice rectum length, and eccentricity of any conic section.'
    },
    {
        slug: 'plane-geometry-3d',
        title: '3D Plane Geometry',
        description: 'Calculate plane equations and distances in 3D space.',
        category: 'Mathematics Tools',
        iconName: 'Box',
        keywords: ['3d geometry', 'plane equation', 'normal vector', 'distance to plane', 'math 3d'],
        longDescription: 'Navigate three-dimensional space. Find the equation of a plane from three points, calculate the distance from a point to a plane, and find the angle between two planes.'
    },
    {
        slug: 'limits-evaluator',
        title: 'Limits Evaluator',
        description: 'Evaluate limits of functions as they approach a value or infinity.',
        category: 'Mathematics Tools',
        iconName: 'ArrowRight',
        keywords: ['limit calculator', 'calculus limits', 'continuity', 'math analysis', 'infinity limits'],
        longDescription: 'Approach the answer. Evaluate one-sided and two-sided limits of functions, handling indeterminate forms and discontinuities with heuristic analysis.'
    },
    {
        slug: 'tangent-normal-calculator',
        title: 'Tangent & Normal',
        description: 'Find the equation of the tangent and normal lines at a point.',
        category: 'Mathematics Tools',
        iconName: 'TrendingUp',
        keywords: ['tangent line', 'normal line', 'derivative application', 'calculus tool', 'slope calculator'],
        longDescription: 'Visualize rates of change. Calculate the slope of the curve at a specific point to derive the exact linear equations for the tangent and normal lines.'
    },
    {
        slug: 'area-under-curve',
        title: 'Area Under Curve',
        description: 'Calculate the area under a function curve using definite integration.',
        category: 'Mathematics Tools',
        iconName: 'AreaChart',
        keywords: ['definite integral', 'area calculator', 'calculus area', 'integration tool', 'riemann sum'],
        longDescription: 'Measure accumulation. numeric integration to finding the exact area bounded by a function, the x-axis, and specified limits.'
    },
    {
        slug: 'improper-integral-solver',
        title: 'Improper Integrals',
        description: 'Evaluate integrals with infinite limits or discontinuities.',
        category: 'Mathematics Tools',
        iconName: 'Infinity',
        keywords: ['improper integral', 'infinite limits', 'calculus convergence', 'math integration', 'analysis'],
        longDescription: 'Go beyond finite bounds. Evaluate Type I and Type II improper integrals to determine convergence or divergence and calculate the finite value if it exists.'
    },
    {
        slug: 'arc-length-calculator',
        title: 'Arc Length Calculator',
        description: 'Calculate the length of a curve segment over an interval.',
        category: 'Mathematics Tools',
        iconName: 'Activity',
        keywords: ['arc length', 'curve length', 'calculus path', 'integration application', 'math geometry'],
        longDescription: 'Measure the path. Compute the exact length of a smooth curve segment f(x) between two points using the standard arc length integral formula.'
    },
    {
        slug: 'surface-area-revolution',
        title: 'Surface Area of Revolution',
        description: 'Calculate surface area generated by rotating a curve around an axis.',
        category: 'Mathematics Tools',
        iconName: 'Orbit',
        keywords: ['surface area', 'solid of revolution', 'calculus rotation', 'integration tool', 'math 3d'],
        longDescription: 'Spin into 3D. Determine the surface area formed when a 2D curve is rotated about the x-axis or y-axis using integral calculus.'
    },
    {
        slug: 'truth-table-generator',
        title: 'Truth Table Generator',
        description: 'Generate logic truth tables for boolean expressions.',
        category: 'Mathematics Tools',
        iconName: 'Binary',
        keywords: ['truth table', 'boolean logic', 'logic gates', 'discrete math', 'propositional logic'],
        longDescription: 'Verify logical arguments. Input complex boolean expressions using AND, OR, NOT, implies, and XOR to generate a complete truth table verifying all possible truth values.'
    },
    {
        slug: 'set-theory-visualizer',
        title: 'Set Theory Visualizer',
        description: 'Perform Union, Intersection, and Difference operations on sets.',
        category: 'Mathematics Tools',
        iconName: 'Combine',
        keywords: ['set theory', 'union intersection', 'venn diagram', 'discrete math', 'math sets'],
        longDescription: 'Manage collections. Input data sets to calculate their Union, Intersection, Difference, and Symmetric Difference, helpful for probability and logic problems.'
    },
    {
        slug: 'number-base-operations',
        title: 'Number Base Operations',
        description: 'Perform arithmetic (Add, Sub, Mul, Div) in any base system.',
        category: 'Mathematics Tools',
        iconName: 'Hash',
        keywords: ['base calculator', 'binary math', 'hexadecimal arithmetic', 'number systems', 'base converter'],
        longDescription: 'Calculate beyond base-10. Perform addition, subtraction, multiplication, and division directly in Binary, Octal, Hexadecimal, or any custom base up to 36.'
    },
    {
        slug: 'modulo-arithmetic-tool',
        title: 'Modulo Arithmetic',
        description: 'Calculate modular exponentiation, inverses, and congruences.',
        category: 'Mathematics Tools',
        iconName: 'Percent',
        keywords: ['modulo calculator', 'modular arithmetic', 'number theory', 'cryptography math', 'remainder tool'],
        longDescription: 'Explore the math of cycles. Compute (a^b) mod n, find modular inverses, and solve linear congruences, essential for understanding cryptography and number theory.'
    },
    {
        slug: 'prime-factorization-tree',
        title: 'Prime Factorization Tree',
        description: 'Visualize the prime factors of a number as a tree diagram.',
        category: 'Mathematics Tools',
        iconName: 'Network',
        keywords: ['prime factors', 'factor tree', 'divisibility', 'number theory', 'math visualizer'],
        longDescription: 'Break it down completely. Input any composite number to generate a visual hierarchical tree showing its breakdown into prime number building blocks.'
    },
    {
        slug: 'regression-analysis-tool',
        title: 'Regression Analysis',
        description: 'Find best-fit lines and curves (Linear, Quadratic, Exponential) for data.',
        category: 'Mathematics Tools',
        iconName: 'ScatterChart',
        keywords: ['regression calculator', 'best fit line', 'statistics modeling', 'linear regression', 'data analysis'],
        longDescription: 'Model your data. Input xy-data points to calculate the Equation of Best Fit (Linear, Quadratic, or Exponential) along with the R-squared correlation coefficient.'
    },
    {
        slug: 'quantum-level-solver',
        title: 'Quantum Level Solver',
        description: 'Calculate and visualize energy levels for a particle in a 1D infinite well.',
        category: 'Advanced Scholar Tools',
        iconName: 'Atom',
        keywords: ['quantum mechanics', 'schrodinger equation', 'energy levels', 'wave function', 'physics solver'],
        longDescription: 'Master the basics of quantum mechanics. This tool calculates the energy levels and wavefunctions for the classic "particle in a box" problem, showing both the math and the physical probability densities.'
    },
    {
        slug: 'thermo-cycle-analyzer',
        title: 'Thermodynamic Cycle Analyzer',
        description: 'Analyze Carnot and Rankine heat engine cycles for efficiency.',
        category: 'Advanced Scholar Tools',
        iconName: 'Thermometer',
        keywords: ['thermodynamics', 'carnot cycle', 'rankine cycle', 'thermal efficiency', 'entropy', 'physics'],
        longDescription: 'Explore the limits of heat engines. Compare the theoretical maximum efficiency of the Carnot cycle with real-world Rankine cycle estimations based on reservoir temperatures.'
    },
    {
        slug: 'orbit-simulator-pro',
        title: 'Astrophysics Orbit Simulator',
        description: 'Simulate orbital mechanics, escape velocity, and Keplerian paths.',
        category: 'Advanced Scholar Tools',
        iconName: 'Orbit',
        keywords: ['orbital mechanics', 'escape velocity', 'astrophysics', 'kepler laws', 'satellite physics'],
        longDescription: 'Calculate the physics of space travel. Determine orbital speeds, periods, and escape velocities for any planet or custom celestial body using gravitational field equations.'
    },
    {
        slug: 'em-wave-calculator',
        title: 'EM Wave Calculator',
        description: 'Explore the electromagnetic spectrum and calculate photon energy.',
        category: 'Advanced Scholar Tools',
        iconName: 'Waves',
        keywords: ['em spectrum', 'wavelength frequency', 'photon energy', 'light physics', 'planck constant'],
        longDescription: 'Navigate the electromagnetic spectrum. Convert between frequency and wavelength, calculate energy per photon (hf), and identify the spectrum range from radio to gamma rays.'
    },
    {
        slug: 'nuclear-decay-sim',
        title: 'Nuclear Decay Simulator',
        description: 'Simulate radioactive decay law and half-life calculations.',
        category: 'Advanced Scholar Tools',
        iconName: 'ShieldAlert',
        keywords: ['nuclear physics', 'radioactive decay', 'half life', 'carbon dating', 'activity rate'],
        longDescription: 'Visualize the exponential nature of time. Simulate radioactive decay for various isotopes, calculate remaining masses over time, and determine the decay constant (λ) and current activity.'
    },
    // Chemistry Category
    {
        slug: 'molar-mass-pro',
        title: 'Molar Mass Pro',
        description: 'Advanced molecular weight calculator with complex formula parsing.',
        category: 'Chemistry',
        iconName: 'Scale',
        keywords: ['molar mass', 'molecular weight', 'chemistry calculator', 'atomic mass', 'stoichiometry'],
        longDescription: 'Precision matters in the lab. Input complex chemical formulas (supporting brackets like Mg(OH)2 or hydrates like CuSO4·5H2O) to calculate precise molar masses based on the latest IUPAC atomic weights.'
    },
    {
        slug: 'equation-balancer',
        title: 'Auto Balancer Pro',
        description: 'Balance complex chemical equations and identify reaction types.',
        category: 'Chemistry',
        iconName: 'GitMerge',
        keywords: ['balance equation', 'chemical reaction', 'stoichiometry balancer', 'redox balancer'],
        longDescription: 'Stop guessing coefficients. This tool uses matrix algebra to balance any valid chemical equation instantly, including polyatomic ion groups and redox reactions.'
    },
    {
        slug: 'stoichiometry-solver',
        title: 'Stoichiometry Solver',
        description: 'Convert between grams, moles, and particles for any chemical reaction.',
        category: 'Chemistry',
        iconName: 'Repeat',
        keywords: ['stoichiometry', 'mole conversion', 'theoretical yield', 'mass mass conversion'],
        longDescription: 'The heart of chemistry. Enter a balanced equation and any known quantity to solve for all other reactants and products in grams, moles, or molecules.'
    },
    {
        slug: 'ideal-gas-law',
        title: 'Ideal Gas Pro',
        description: 'Solve for P, V, n, or T using the Ideal Gas Law (PV=nRT).',
        category: 'Chemistry',
        iconName: 'Wind',
        keywords: ['ideal gas law', 'boyles law', 'charles law', 'gas constant', 'chemistry physics'],
        longDescription: 'Simulate gas behavior. Toggle between units (atm, kPa, mmHg, Celsius, Kelvin) and solve for any unknown variable in the ideal gas equation.'
    },
    {
        slug: 'molarity-calculator',
        title: 'Molarity Plus',
        description: 'Calculate concentration, volume, and solute mass for solutions.',
        category: 'Chemistry',
        iconName: 'FlaskConical',
        keywords: ['molarity', 'concentration', 'solubility', 'chemistry solution', 'molality'],
        longDescription: 'Prepare your solutions accurately. Calculate molarity (M), molality (m), or mass percent by inputting solute and solvent details.'
    },
    {
        slug: 'dilution-calculator',
        title: 'Dilution Master',
        description: 'Quickly calculate final concentrations using M1V1 = M2V2.',
        category: 'Chemistry',
        iconName: 'Droplets',
        keywords: ['dilution', 'serial dilution', 'stock solution', 'chemistry lab'],
        longDescription: 'Master of the bench. Determine exact amounts of stock solution and solvent needed to reach your target concentration.'
    },
    {
        slug: 'ph-poh-calculator',
        title: 'pH/pOH Master',
        description: 'Calculate pH, pOH, and ion concentrations for acids and bases.',
        category: 'Chemistry',
        iconName: 'TestTube2',
        keywords: ['ph calculator', 'poh', 'acid base', 'h3o concentration', 'oh concentration'],
        longDescription: 'Navigate the logarithmic scale. Convert between pH, pOH, [H+], and [OH-] instantly for any aqueous solution.'
    },
    {
        slug: 'buffer-calculator',
        title: 'Henderson-Hasselbalch Pro',
        description: 'Calculate the pH of buffer solutions with specific pKa values.',
        category: 'Chemistry',
        iconName: 'Pipette',
        keywords: ['buffer solution', 'pKa', 'henderson hasselbalch', 'acid base equilibrium'],
        longDescription: 'Predict buffer behavior. Input the concentrations of a weak acid and its conjugate base to find the resulting pH, or determine the required ratio for a target pH.'
    },
    {
        slug: 'enthalpy-calculator',
        title: 'Enthalpy Solver',
        description: 'Calculate ΔH using bond energies or heats of formation.',
        category: 'Chemistry',
        iconName: 'Flame',
        keywords: ['enthalpy', 'delta H', 'heat of reaction', 'thermochemistry', 'hess law'],
        longDescription: 'Measure the heat. Calculate the enthalpy change of a reaction using standard heats of formation (Hess Law) or by analyzing bond dissociation energies.'
    },
    {
        slug: 'gibbs-free-energy',
        title: 'Gibbs & Spontaneity',
        description: 'Predict reaction spontaneity using ΔG = ΔH - TΔS.',
        category: 'Chemistry',
        iconName: 'Zap',
        keywords: ['gibbs free energy', 'spontaneity', 'entropy', 'thermodynamics', 'delta G'],
        longDescription: 'Will it react? Determine if a process is spontaneous by analyzing the balance between enthalpy, entropy, and temperature.'
    },
    {
        slug: 'specific-heat-calc',
        title: 'Specific Heat (q=mcΔT)',
        description: 'Calculate heat transfer, mass, or temperature changes.',
        category: 'Chemistry',
        iconName: 'Thermometer',
        keywords: ['specific heat', 'calorimetry', 'heat flow', 'thermodynamics'],
        longDescription: 'Understand energy transfer. Solve for any variable in the specific heat equation, including final temperatures in calorimetry problems.'
    },
    {
        slug: 'rate-law-calculator',
        title: 'Kinetics Rate Law',
        description: 'Determine reaction orders and rate constants from data.',
        category: 'Chemistry',
        iconName: 'Timer',
        keywords: ['rate law', 'kinetics', 'reaction order', 'rate constant', 'chemistry'],
        longDescription: 'Crack the code of speed. Input concentration and rate data to determine the mathematical rate law and the overall order of a reaction.'
    },
    {
        slug: 'arrhenius-equation',
        title: 'Arrhenius Pro',
        description: 'Calculate activation energy (Ea) and temperature effects.',
        category: 'Chemistry',
        iconName: 'ArrowUpRight',
        keywords: ['arrhenius equation', 'activation energy', 'reaction rate', 'temperature effect'],
        longDescription: 'Speed up your chemistry. Use the Arrhenius equation to solve for activation energy or predict how warming a reaction will increase the rate constant.'
    },
    {
        slug: 'equilibrium-constant',
        title: 'Equilibrium (Kc/Kp)',
        description: 'Solve for equilibrium concentrations or constants.',
        category: 'Chemistry',
        iconName: 'RefreshCw',
        keywords: ['equilibrium constant', 'Kc', 'Kp', 'ICE table', 'le chatelier'],
        longDescription: 'The balance of nature. Calculate equilibrium constants from concentrations, or use Kc values to predict the final composition of a reaction mixture.'
    },
    {
        slug: 'solubility-product',
        title: 'Ksp & Solubility',
        description: 'Calculate molar solubility and precipitate formation.',
        category: 'Chemistry',
        iconName: 'Microscope',
        keywords: ['Ksp', 'solubility product', 'molar solubility', 'precipitation', 'common ion effect'],
        longDescription: 'Will it dissolve? Calculate the solubility product constant (Ksp) or determine if a precipitate will form when two solutions are mixed.'
    },
    {
        slug: 'nernst-equation',
        title: 'Nernst Pro',
        description: 'Calculate cell potential under non-standard conditions.',
        category: 'Chemistry',
        iconName: 'BatteryCharging',
        keywords: ['nernst equation', 'cell potential', 'electrochemistry', 'voltage', 'redox'],
        longDescription: 'Power your calculations. Adjust standard reduction potentials for temperature and concentration to find the real-world voltage of an electrochemical cell.'
    },
    {
        slug: 'faradays-law',
        title: 'Faraday’s Electrolysis',
        description: 'Calculate mass deposited during electrolysis.',
        category: 'Chemistry',
        iconName: 'Zap',
        keywords: ['faraday law', 'electrolysis', 'plating', 'charge', 'coulombs'],
        longDescription: 'Electroplating precision. Calculate the mass of a metal deposited or the time required for a specific current to plate a surface.'
    },
    {
        slug: 'half-life-calculator',
        title: 'Nuclear Half-Life',
        description: 'Track radioactive decay and remaining isotope mass.',
        category: 'Chemistry',
        iconName: 'Radiation',
        keywords: ['half life', 'radioactive decay', 'isotope', 'nuclear chemistry', 'decay constant'],
        longDescription: 'Time and transition. Use isotopes half-lives to calculate remaining quantities, total time elapsed, or the decay constant.'
    },
    {
        slug: 'vsepr-predictor',
        title: 'VSEPR Shape Master',
        description: 'Predict molecular geometry based on steric numbers.',
        category: 'Chemistry',
        iconName: 'Shapes',
        keywords: ['vsepr theory', 'molecular geometry', 'lone pairs', 'chemical bonding', 'hybridization'],
        longDescription: 'Visualize the 3D world. Input the number of bonding atoms and lone pairs on a central atom to determine the molecular and electron geometry.'
    },
    {
        slug: 'formal-charge-calc',
        title: 'Formal Charge Solver',
        description: 'Calculate formal charges to find the best Lewis structure.',
        category: 'Chemistry',
        iconName: 'PlusMinus',
        keywords: ['formal charge', 'lewis structure', 'valence electrons', 'chemistry bonding'],
        longDescription: 'Perfect your Lewis structures. Calculate formal charges for every atom in a molecule to identify the most stable resonance structures.'
    },
    {
        slug: 'electronegativity-diff',
        title: 'Bond Polarity Pro',
        description: 'Predict bond types based on Pauling electronegativity.',
        category: 'Chemistry',
        iconName: 'ArrowLeftRight',
        keywords: ['electronegativity', 'bond polarity', 'ionic vs covalent', 'pauling scale'],
        longDescription: 'Ionic or Covalent? Calculate the ΔEN between atoms to classify bonds and predict dipole moments.'
    },
    {
        slug: 'empirical-formula',
        title: 'Empirical Finder',
        description: 'Convert percentage composition to empirical formulas.',
        category: 'Chemistry',
        iconName: 'Search',
        keywords: ['empirical formula', 'molecular formula', 'percent composition', 'chemistry analysis'],
        longDescription: 'Solve the chemical puzzle. Input mass percentages of elements to derive the simplest whole-number ratio of atoms in a compound.'
    },
    {
        slug: 'percentage-composition',
        title: 'Percent Composition',
        description: 'Calculate the percent by mass of each element in a formula.',
        category: 'Chemistry',
        iconName: 'PieChart',
        keywords: ['percent composition', 'mass percent', 'formula mass', 'chemical analysis'],
        longDescription: 'Anatomize your molecules. Determine exactly what percentage of a compound’s mass comes from each constituent element.'
    },
    {
        slug: 'limiting-reagent',
        title: 'Yield & Limiting Reagent',
        description: 'Identify the limiting reactant and calculate percent yield.',
        category: 'Chemistry',
        iconName: 'Activity',
        keywords: ['limiting reagent', 'theoretical yield', 'percent yield', 'stoichiometry'],
        longDescription: 'Efficiency in the lab. Identify which reactant will run out first and calculate the theoretical maximum vs actual yield of your reaction.'
    },
    {
        slug: 'beer-lambert-law',
        title: 'Beer-Lambert Solver',
        description: 'Calculate absorbance, molar absorptivity, or concentration.',
        category: 'Chemistry',
        iconName: 'Sun',
        keywords: ['beer lambert law', 'absorbance', 'spectrophotometry', 'molar absorptivity'],
        longDescription: 'The chemistry of light. Use spectroscopy data to determine solute concentration or identify standard coefficients for specific substances.'
    },
    {
        slug: 'boiling-point-elevation',
        title: 'Boiling Point Pro',
        description: 'Calculate boiling point changes for non-volatile solutes.',
        category: 'Chemistry',
        iconName: 'ArrowUp',
        keywords: ['boiling point elevation', 'colligative properties', 'molality', 'van t hoff'],
        longDescription: 'Turning up the heat. Predict how adding a solute changes the boiling point of a solvent using the ebullioscopic constant and van \'t Hoff factor.'
    },
    {
        slug: 'freezing-point-depression',
        title: 'Freezing Point Pro',
        description: 'Calculate freezing point changes for solutions.',
        category: 'Chemistry',
        iconName: 'ArrowDown',
        keywords: ['freezing point depression', 'colligative properties', 'cryoscopic constant', 'chemistry'],
        longDescription: 'Cooling calculations. Determine the new freezing point of a solution, essential for understanding antifreeze and biological cryoprotectants.'
    },
    {
        slug: 'density-calculator',
        title: 'Precision Density',
        description: 'Solve for Density, Mass, or Volume with precision units.',
        category: 'Chemistry',
        iconName: 'Table',
        keywords: ['density calculator', 'mass volume', 'specific gravity', 'chemistry basics'],
        longDescription: 'Fundamental measurements. Convert between various units and solve the density equation with high numerical precision.'
    },
    {
        slug: 'celsius-kelvin-conv',
        title: 'Advanced Temp Lab',
        description: 'Professional kelvin, celsius, and rankine conversions.',
        category: 'Chemistry',
        iconName: 'Thermometer',
        keywords: ['kelvin converter', 'celsius to kelvin', 'rankine', 'absolute zero', 'temperature'],
        longDescription: 'Absolute precision. Convert between scientific temperature scales, keeping track of absolute zero and standard laboratory conditions.'
    },
    {
        slug: 'molecular-weight-calc',
        title: 'Molecular Weight Pro',
        description: 'Fast weight lookup for thousand of chemical names.',
        category: 'Chemistry',
        iconName: 'Scale',
        keywords: ['molecular weight', 'chemical database', 'molar mass lookup', 'biochemistry'],
        longDescription: 'Beyond formulas. Look up or calculate molecular weights for complex reagents and biological molecules with ease.'
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
