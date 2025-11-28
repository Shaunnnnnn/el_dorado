const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv/config');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModels() {
  const models = ['gemini-pro', 'gemini-1.5-flash', 'gemini-1.5-pro'];
  
  for (const modelName of models) {
    try {
      console.log(`\nTesting model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hello');
      const response = result.response;
      console.log(`✅ ${modelName} works!`);
      console.log(`Response: ${response.text()}`);
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message}`);
    }
  }
}

testModels();
