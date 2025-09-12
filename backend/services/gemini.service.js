import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const parseResumeWithGemini = async (resumeText) => {
  try {
    const prompt = `
      Extract structured information from the following resume:
      Resume: ${resumeText}

      Return in JSON format:
      {
        "name": "",
        "email": "",
        "phone": "",
        "skills": [],
        "experience": [],
        "education": []
      }
    `;

   const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Remove markdown formatting if present
    text = text.replace(/```json|```/g, "").trim();

    // Parse into real JSON
    return JSON.parse(text); // Gemini returns text output
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to parse resume with Gemini");
  }
};
