import dotenv from "dotenv";
import path from "path";
const envPath = path.resolve(process.cwd(), "../../.env");
dotenv.config({ path: envPath });


import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const getModel = async(prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;

const text = await response.text(); // 👈 call the function
console.log(text);
  } catch (error) {
    console.log(error)
  }
}
