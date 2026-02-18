import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateAIReport = async (data) => {
  try {
    const {
      name,
      age,
      gender,
      symptoms,
      duration,
      severity,
      description,
    } = data;

    const prompt = `
You are a professional medical AI assistant.

Generate a structured medical report.

Sections:
1. Patient Information
2. Symptoms Summary
3. Possible Causes
4. Preliminary Assessment
5. Recommended Tests
6. General Treatment Suggestions
7. Lifestyle Advice
8. Medical Disclaimer

Patient Details:
Name: ${name}
Age: ${age}
Gender: ${gender}
Symptoms: ${symptoms.join(", ")}
Duration: ${duration}
Severity: ${severity}
Additional Notes: ${description}

Make it detailed and professional.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log(response.text)
    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("AI generation failed");
  }
};
