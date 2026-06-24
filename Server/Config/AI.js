import { OpenAI } from "openai";

const ai=new OpenAI({
    apiKey:process.env.GEMINI_API_KEY,
    baseURL:process.env.GEMINI_BASE_URL
});

async function main() {
  const interaction = await ai.interactions.create({
    model: process.env.GEMINI_MODEL,
    input: "Explain how AI works in a few words",
  });
  console.log(interaction.output_text);
}

main();

export default ai;