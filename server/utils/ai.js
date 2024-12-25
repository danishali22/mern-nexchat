import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const google_api_key = process.env.GOOGLE_AI_KEY;

const genAI = new GoogleGenerativeAI(google_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateResult = async (prompt) => {
    const result = await model.generateContent(prompt);
    return result.response.text();
}
