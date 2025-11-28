const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv/config');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('API Key:', process.env.GEMINI_API_KEY ? 'Set (length: ' + process.env.GEMINI_API_KEY.length + ')' : 'NOT SET');
    console.log('\nAttempting to list models...\n');
    
    // Try a simple request
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('Hello');
    console.log('Success!', result.response.text());
  } catch (error) {
    console.error('Error:', error.message);
    console.error('\nFull error:', error);
  }
}

listModels();
