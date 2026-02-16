
import { GoogleGenAI, Type } from "@google/genai";
import { MatchAnalysis } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const screenCandidate = async (jd: string, resume: string): Promise<MatchAnalysis> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      Analyze the following Candidate Resume against the Job Description.
      
      JOB DESCRIPTION:
      ${jd}
      
      CANDIDATE RESUME:
      ${resume}
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          matchPercentage: { type: Type.NUMBER, description: "Match score from 0-100" },
          keyStrengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Top 3-5 technical and soft skill strengths" },
          gapAnalysis: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific missing skills or experiences" },
          recommendation: { type: Type.STRING, description: "Final hiring recommendation brief" },
          suggestedQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "5 technical interview questions tailored to the candidate's specific background" }
        },
        required: ["matchPercentage", "keyStrengths", "gapAnalysis", "recommendation", "suggestedQuestions"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data as MatchAnalysis;
  } catch (error) {
    console.error("Failed to parse AI response", error);
    throw new Error("Could not process analysis");
  }
};
