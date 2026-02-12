const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testModels() {
    const apiKey = "AIzaSyAKzGlmqxKqUIVaQEbI7n3rMo4rFrUR63k";
    const genAI = new GoogleGenerativeAI(apiKey);

    // Test gemini-1.5-flash-latest and gemini-2.0-flash-exp
    const models = ["gemini-1.5-flash-latest", "gemini-2.0-flash-exp", "gemini-1.5-pro", "gemini-1.5-flash"];

    for (const modelName of models) {
        try {
            console.log(`Testing ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log(`✅ ${modelName} works!`);
        } catch (e) {
            console.log(`❌ ${modelName} failed: ${e.message}`);
        }
    }
}

testModels();
