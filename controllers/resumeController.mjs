// import fs from 'fs';
// import dotenv from 'dotenv';
// import { PromptTemplate } from "@langchain/core/prompts";
// import { ChatOpenAI } from "@langchain/openai";


// dotenv.config();

// export const analyzeResume = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const resumeText = fs.readFileSync(filePath, 'utf-8');

//     // const model = new ChatOpenAI({
//     //   openAIApiKey: process.env.OPENAI_API_KEY,
//     //   temperature: 0.2,
//     // });

//     const model = new ChatOpenAI({
//   openAIApiKey: process.env.OPENAI_API_KEY,          // from your .env file
//   openAIBaseURL: "https://api.groq.com/openai/v1", // Groq's base URL
//   modelName: "mixtral-8x7b-32768",                 // or another Groq model
//   temperature: 0.2,
// });

//     const prompt = new PromptTemplate({
//       template: `
// You are a resume evaluator AI. Score the following resume from 1 to 10 based on:
// - Technical skills
// - Work experience
// - Relevance to software engineering
// - Clarity and structure

// Resume:
// {resume}

// Give a final score and a short explanation:
//       `,
//       inputVariables: ['resume'],
//     });

//     const promptText = await prompt.format({ resume: resumeText });
//     const response = await model.invoke([
//   { role: "user", content: promptText }
// ]);


//     fs.unlinkSync(filePath);
//     res.json({ result: response.content });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error analyzing resume' });
//   }
// };

// import fs from 'fs';
// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// export const analyzeResume = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const resumeText = fs.readFileSync(filePath, 'utf-8');

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const prompt = `
// You are a resume evaluator AI. Score the following resume from 1 to 10 based on:
// - Technical skills
// - Work experience
// - Relevance to software engineering
// - Clarity and structure

// Resume:
// ${resumeText}

// Give a final score and a short explanation:
// `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     fs.unlinkSync(filePath);
//     res.json({ result: text });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error analyzing resume with Gemini' });
//   }
// };


// import fs from 'fs';
// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// export const analyzeResume = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const resumeText = fs.readFileSync(filePath, 'utf-8');

//     console.log(process.env.GEMINI_API_KEY)
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//     // List models once to debug or find a working model
//     // const models = await genAI.listModels();
//     // console.log(models);

//     // Use a valid model here
//     const model = genAI.getGenerativeModel({ model: "text-bison-001" });

//     const prompt = `
// You are a resume evaluator AI. Score the following resume from 1 to 10 based on:
// - Technical skills
// - Work experience
// - Relevance to software engineering
// - Clarity and structure

// Resume:
// ${resumeText}

// Give a final score and a short explanation:
// `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     fs.unlinkSync(filePath);
//     res.json({ result: text });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error analyzing resume with Gemini' });
//   }
// };





// import fs from 'fs';
// import dotenv from 'dotenv';
// import fetch from 'node-fetch';

// dotenv.config();

// export const analyzeResume = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const resumeText = fs.readFileSync(filePath, 'utf-8');

//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

//     const requestBody = {
//       contents: [
//         {
//           parts: [{
//             text: `
// You are a resume evaluator AI. Score the following resume from 1 to 10 based on:
// - Technical skills
// - Work experience
// - Relevance to software engineering
// - Clarity and structure

// Resume:
// ${resumeText}

// Give a final score and a short explanation:
// `
//           }]
//         }
//       ]
//     };

//     const apiResponse = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(requestBody)
//     });

//     if (!apiResponse.ok) {
//       throw new Error('Failed to generate content from Gemini API');
//     }

//     const result = await apiResponse.json();
//     const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

//     fs.unlinkSync(filePath); // Remove the temporary file
    
//     res.json({ result: generatedText || "No response text found." });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error analyzing resume with Gemini' });
//   }
// };



// import fs from 'fs';
// import dotenv from 'dotenv';
// import fetch from 'node-fetch';

// dotenv.config();

// export const analyzeResume = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const resumeText = fs.readFileSync(filePath, 'utf-8');

//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

//     const prompt = `
// You are a resume evaluator AI. Analyze the following resume and return the result in this exact JSON format:

// {
//   "overall_score": <score out of 10>,
//   "technical_skills": {
//     "score": <score out of 10>,
//     "feedback": "<short feedback>"
//   },
//   "work_experience": {
//     "score": <score out of 10>,
//     "feedback": "<short feedback>"
//   },
//   "relevance_to_software_engineering": {
//     "score": <score out of 10>,
//     "feedback": "<short feedback>"
//   },
//   "clarity_and_structure": {
//     "score": <score out of 10>,
//     "feedback": "<short feedback>"
//   },
//   "recommendations": [
//     "<tip 1>",
//     "<tip 2>",
//     "<tip 3>"
//   ]
// }

// Resume:
// ${resumeText}
// `;

//     const requestBody = {
//       contents: [
//         {
//           parts: [{ text: prompt }]
//         }
//       ]
//     };

//     const apiResponse = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(requestBody)
//     });

//     if (!apiResponse.ok) {
//       throw new Error(`Gemini API Error: ${apiResponse.statusText}`);
//     }

//     const result = await apiResponse.json();
//     const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

//     let parsedResult;
//     try {
//       parsedResult = JSON.parse(rawText);
//     } catch (err) {
//       console.warn("Warning: Failed to parse AI response as JSON. Returning raw text.");
//       parsedResult = { raw_text: rawText };
//     }

//     fs.unlinkSync(filePath); // Clean up uploaded file
//     res.json({ result: parsedResult });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error analyzing resume with Gemini' });
//   }
// };



import fs from 'fs';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export const analyzeResume = async (req, res) => {
  try {
    const filePath = req.file.path;
    const resumeText = fs.readFileSync(filePath, 'utf-8');

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const prompt = `
You are a resume evaluator AI. Analyze the following resume and return the result in *pure JSON format only*, without markdown or explanations.

Use the exact structure below:

{
  "overall_score": <score out of 10>,
  "technical_skills": {
    "score": <score out of 10>,
    "feedback": "<short feedback>"
  },
  "work_experience": {
    "score": <score out of 10>,
    "feedback": "<short feedback>"
  },
  "relevance_to_software_engineering": {
    "score": <score out of 10>,
    "feedback": "<short feedback>"
  },
  "clarity_and_structure": {
    "score": <score out of 10>,
    "feedback": "<short feedback>"
  },
  "recommendations": [
    "<tip 1>",
    "<tip 2>",
    "<tip 3>"
  ]
}

Resume:
${resumeText}
`;

    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!apiResponse.ok) {
      throw new Error(`Gemini API Error: ${apiResponse.statusText}`);
    }

    const result = await apiResponse.json();
    const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    let parsedResult;
    try {
      // Remove markdown code block formatting if present
      const cleanedText = rawText
        .replace(/^```json\s*/, '')
        .replace(/```$/, '')
        .trim();

      parsedResult = JSON.parse(cleanedText);
    } catch (err) {
      console.warn("Warning: Failed to parse AI response as JSON. Returning raw text.");
      parsedResult = { raw_text: rawText };
    }

    fs.unlinkSync(filePath); // Clean up uploaded resume
    res.json({ result: parsedResult });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error analyzing resume with Gemini' });
  }
};
