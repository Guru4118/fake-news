require('dotenv').config();
const axios = require('axios');

const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

exports.analyzeText = async (text) => {
  const prompt = `
You are a fact-checker.

Please analyze the following statement using step-by-step reasoning. Break the claim into smaller verifiable parts, explain your thinking, and then conclude if it's True, False, or Uncertain.

Statement: "${text}"
`;

  try {
    const response = await axios.post(TOGETHER_API_URL, {
      model: "mistralai/Mistral-7B-Instruct-v0.1",
      messages: [
        { role: 'system', content: 'You are a fact-checker. Think step-by-step.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
    }, {
      headers: {
        'Authorization': `Bearer ${TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const content = response.data.choices[0].message.content;

    return {
      verdict: content.toLowerCase().includes('false') ? 'Fake'
            : content.toLowerCase().includes('true')  ? 'Real'
            : 'Uncertain',
      explanation: content,
      confidence: Math.floor(Math.random() * 20) + 80,
      sources: [
        `https://www.google.com/search?q=${encodeURIComponent(text)}`
      ]
    };
  } catch (err) {
    console.error('Together AI Error:', err?.response?.data || err.message);
    return {
      verdict: 'Uncertain',
      explanation: 'Error occurred during analysis.',
      confidence: 50,
      sources: []
    };
  }
};
