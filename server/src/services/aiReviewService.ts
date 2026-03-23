import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { codeReviewPrompt } from "../prompts/codeReviewPrompt";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function main(code : string){
    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents: codeReviewPrompt(code)
        
    });

    const raw = response.text;

    const json = raw?.match(/\{[\s\S]*\}/);

    if(!json) throw new Error("Invalid AI response");

    return JSON.parse(json[0]);

}

const sampleCode = `
function add(a,b){
    return a + b;    
}`


main(sampleCode);