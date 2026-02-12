const apiKey = "AIzaSyAKzGlmqxKqUIVaQEbI7n3rMo4rFrUR63k";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            console.log("Found " + data.models.length + " models.");
            for (const m of data.models) {
                console.log(`- ${m.name} (${m.supportedGenerationMethods.join(", ")})`);
            }
        } else {
            console.log("No models found:", JSON.stringify(data));
        }
    } catch (e) {
        console.error("Fetch failed:", e.message);
    }
}

listModels();
