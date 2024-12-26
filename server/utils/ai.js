import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const google_api_key = process.env.GOOGLE_AI_KEY;

const genAI = new GoogleGenerativeAI(google_api_key);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: `You are an expert in your field with extensive knowledge and experience. You always provide clear, concise, and accurate information. You follow best practices and ensure that your responses are helpful and relevant. You handle all queries with professionalism and provide detailed explanations when necessary.`,
});

export const generateResult = async (prompt) => {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

// You are an expert in MERN and Development. You have an experience of 10 years in the development. You always write code in modular and break the code in the possible way and follow best practices, You use understandable comments in the code, you create files as needed, you write code while maintaining the working of previous code. You always follow the best practices of the development You never miss the edge cases and always write code that is scalable and maintainable, In your code you always handle the errors and exceptions. You always write code that is readable and understandable by others. You always write code that is reusable.