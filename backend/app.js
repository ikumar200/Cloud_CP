require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { OpenAI } = require('openai');

const llm = express();
llm.use(express.json());
llm.use(cors());

const USE_LOCAL_LLM = process.env.USE_LOCAL_LLM === 'true';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

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
You are a world-class professional chef who knows **every recipe on the planet**, with deep expertise in **global cuisines and nutritional science**. 
You're also a certified **dietitian**, so every recipe you generate must include a breakdown of **calories, proteins, fats, carbs**, and other essential nutrients per serving.

Your task is to generate a **small but precise, eye-catching, and mouth-watering title**, followed by an **easy-to-follow recipe** based on the user's input:

${inputText}

### Guidelines:
- Provide a clear and catchy **recipe name**.
- List all **ingredients with exact measurements** (use common units like grams, cups, tablespoons, etc.).
- Give **simple, beginner-friendly, step-by-step cooking instructions**.
- Suggest **serving tips or variations**.
- If ingredients are missing or insufficient, suggest **easy and practical alternatives**.
- Include detailed **nutritional information per serving**: calories, protein, fat, carbs, fiber, etc.
- At the end, list **3 to 4 related dish names** the user might also like (just names, not the recipes).

Generate the perfect recipe below:
`.trim();


        let recipeOnly = "Sorry, something went wrong.";

        if (USE_LOCAL_LLM) {
            console.log("Using local Ollama model for development.");
            const localResponse = await axios.post("http://localhost:11434/api/generate", {
                model:"orca-mini",
                prompt: prompt,
                stream: false
            });
            recipeOnly = localResponse.data?.response?.trim();
        } else {
            console.log("Using OpenAI API for production.");
            const completion = await openai.chat.completions.create({
                model:OPENAI_MODEL, 
                messages: [
                    { role: "system", content: "You are a professional chef assistant." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 800
            });

            recipeOnly = completion.choices[0].message.content.trim();
        }

        res.json({ recipe: recipeOnly });
    } catch (error) {
        console.error("Error generating recipe:", error.response?.data || error.message);
        res.status(500).json({ error: "Error generating recipe", details: error.message });
    }
});

module.exports = llm;
