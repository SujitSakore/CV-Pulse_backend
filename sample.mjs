import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function listModels() {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Available models:', data);
  } catch (err) {
    console.error('Error listing models:', err);
  }
}

listModels();
