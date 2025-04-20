import { auth } from "../firebase"; // assuming you have this



export const generateRecipe = async (ingredientsArray) => {
    try {
        const response = await fetch("https://34.227.190.136/llm/generate-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients: ingredientsArray }),
        });

        const data = await response.json();

        // Hugging Face response format: array of objects with 'generated_text'
        if (data.recipe && Array.isArray(data.recipe) && data.recipe[0]?.generated_text) {
            return { recipe: data.recipe[0].generated_text };
        }

        // If Hugging Face returns plain text or error format
        return { recipe: typeof data.recipe === "string" ? data.recipe : "Unexpected response format" };

    } catch (error) {
        console.error("Error generating recipe:", error);
        return { recipe: "Failed to fetch recipe." };
    }
};

export const saveGeneratedRecipe = async (recipeObject) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        const token = await user.getIdToken();

        const response = await fetch("https://34.227.190.136/save_recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ recipe: recipeObject }),
        });

        return await response.json();
    } catch (error) {
        console.error("Error saving recipe:", error);
        return { success: false, error: error.message };
    }
};

export const getSavedRecipes = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        const token = await user.getIdToken();

        const response = await fetch("https://34.227.190.136/get_saved_recipes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return await response.json();
    } catch (error) {
        console.error("Error fetching saved recipes:", error);
        return [];
    }
};

export const deleteSavedRecipe = async (id) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        const token = await user.getIdToken();

        const response = await fetch(`https://34.227.190.136/delete_recipe/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Failed to delete recipe");

        return await response.json();
    } catch (error) {
        console.error("Delete Error:", error);
        throw error;
    }
};