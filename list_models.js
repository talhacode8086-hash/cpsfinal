const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const apiKey = "AIzaSyAKzGlmqxKqUIVaQEbI7n3rMo4rFrUR63k";
    const genAI = new GoogleGenerativeAI(apiKey);

    const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-2.0-flash-exp", "gemini-1.5-flash-8b", "gemini-1.0-pro"];

    for (const modelName of modelsToTest) {
        console.log(`Checking ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            console.log(`${modelName} works:`, result.response.text().substring(0, 20) + "...");
        } catch (e) {
            console.error(`${modelName} failed:`, e.message);
        }
    }
}

listModels();
