import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const agriculturalAssistant = {
  async getAdvice(prompt: string, context?: any) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are HYPERBLOOM, an expert agricultural assistant for farmers in Sub-Saharan Africa. 
        Provide practical, localized, and timely advice on crop management, livestock health, pest control, and modern farming techniques.
        Keep your tone supportive, professional, and easy to understand.
        If the user asks about weather, pests, or vaccinations, provide specific actionable steps.
        Current context: ${JSON.stringify(context || {})}`,
      },
    });
    return response.text;
  },

  async generateAlerts(weatherData: any) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on this weather data: ${JSON.stringify(weatherData)}, identify potential pest or disease risks for common crops in Sub-Saharan Africa (e.g., maize, cassava, beans). Return a JSON array of alerts.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: "Pest or Disease" },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              severity: { type: Type.STRING, description: "Low, Medium, High" },
            },
            required: ["type", "title", "description", "severity"],
          },
        },
      },
    });
    return JSON.parse(response.text || "[]");
  },

  async getLearningContent(topic: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a short, educational guide for a farmer on the topic: ${topic}. Include 3-5 key modern practices.`,
    });
    return response.text;
  }
};
