const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Basic .env parser
function loadEnv() {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
            const [key, ...value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.join('=').trim();
            }
        });
    }
}

async function testAI() {
    loadEnv();
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Checking API Key:", apiKey ? "Found (Starts with " + apiKey.substring(0, 7) + ")" : "Not Found");

    if (!apiKey) return;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    try {
        console.log("Sending test request...");
        const result = await model.generateContent("Say 'AI is working'");
        console.log("Response:", result.response.text());
    } catch (e) {
        console.error("AI Error Details:", JSON.stringify(e, null, 2));
    }
}

testAI();
