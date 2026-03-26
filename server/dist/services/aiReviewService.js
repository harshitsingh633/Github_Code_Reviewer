"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genai_1 = require("@google/genai");
require("dotenv/config");
const codeReviewPrompt_1 = require("../prompts/codeReviewPrompt");
const ai = new genai_1.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
async function main(code) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: (0, codeReviewPrompt_1.codeReviewPrompt)(code)
    });
    const raw = response.text;
    const json = raw?.match(/\{[\s\S]*\}/);
    if (!json)
        throw new Error("Invalid AI response");
    return JSON.parse(json[0]);
}
const sampleCode = `
function add(a,b){
    return a + b;    
}`;
main(sampleCode);
