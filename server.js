import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json()); // Hey, prepare yourself to read JSON data sent from a user's web page.
app.use(cors());

// Initialize the AI SDK using an environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/tire-check", async (req, res) => {
  try {
    const { issueDescription } = req.body;

    if (!issueDescription) {
      return res.status(400).json({ error: "Please describe the tire issue." }); // if user does not type anything
    }

    // Call the AI model to get a mechanic's advice
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a GoMobile expert mechanic. A customer reports: "${issueDescription}". Provide 2 quick safety steps and the specific tools needed. Keep it short.`,
    });

    return res.status(200).json({ advice: response.text });
  } catch (error) {
    console.error("System Error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong on our server." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running smoothly on port ${PORT}`));
