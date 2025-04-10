require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const llm = express();
llm.use(express.json());
llm.use(cors());

const USE_LOCAL_LLM = process.env.USE_LOCAL_LLM === 'true';
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

llm.post('/generate-recipe', async (req, res) => {
    try {
        const { ingredients } = req.body;
        const inputText = ingredients?.join(" ").trim();

        if (!inputText || inputText.length < 5) {
            return res.status(400).json({ error: "Please provide a meaningful prompt or list of ingredients." });
        }

        const isGreetingOrNonRecipePrompt = /\b(hi|hello|hey|namaste|greetings|good morning|good evening|good afternoon|how are you|what's up|my name is|i am|i'm|new here|just joined|who are you|help|lost|confused|what can you do|cool|nice|great|awesome|superb|thanks|thank you|good to see|hllmy to be here|what is this|how does this work)\b/i.test(inputText);
        const looksLikeIngredients = inputText.split(',').length >= 2;
        const mentionsCooking = /\b(cook|recipe|dish|prepare|make|meal|bake|boil|fry|grill|roast|serve|food|ingredient|kitchen|snack|lunch|dinner|breakfast|sweet|savoury|salad|cuisine|dessert|soup|starter|main course|side dish|flavor|flavour|taste)\b/i.test(inputText);

        if (isGreetingOrNonRecipePrompt && !mentionsCooking) {
            return res.status(200).json({
                recipe: "👋 Hey there! I'm your recipe assistant. Please enter a list of ingredients or describe a dish you'd like help with, and I’ll cook up something tasty for you!"
            });
        }

        if (!looksLikeIngredients && !mentionsCooking) {
            return res.status(400).json({ error: "Please enter ingredients or recipe instructions." });
        }

        const prompt = `
You are a world-class professional chef, renowned for creating delicious and easy-to-follow recipes. 
Your task is to generate a unique and mouth-watering recipe based on the following ingredients or user instructions:

${inputText}

### Guidelines:
- Provide a clear **recipe name**.
- List **ingredients with exact measurements**.
- Offer **step-by-step cooking instructions**.
- Suggest **serving tips** or **variations**.
- If ingredients are insufficient, suggest **alternatives**.
- Be beginner-friendly and engaging.

Generate the perfect recipe below:
        `.trim();

        let recipeOnly = "Sorry, something went wrong.";

        if (USE_LOCAL_LLM) {
            console.log("⚙️  Using local Ollama model for development.");
            const localResponse = await axios.post("http://localhost:11434/api/generate", {
                model: "orca-mini",
                prompt: prompt,
                stream: false
            });
            recipeOnly = localResponse.data?.response?.trim();
        } else {
            console.log("🌐 Using Hugging Face API for production.");
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
                { inputs: prompt },
                {
                    headers: {
                        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const fullText = response.data?.[0]?.generated_text || "";
            recipeOnly = fullText.startsWith(prompt)
                ? fullText.slice(prompt.length).trim()
                : fullText.trim();
        }

        res.json({ recipe: recipeOnly });
    } catch (error) {
        console.error("❌ Error generating recipe:", error.response?.data || error.message);
        res.status(500).json({ error: "Error generating recipe", details: error.message });
    }
});

// const PORT = process.env.PORT || 3000;
// llm.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
module.exports = llm;
