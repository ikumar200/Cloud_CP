import { useState } from "react";
import InputForm from "../components/InputForm";
import RecipeDisplay from "../components/RecipeDisplay";
import { generateRecipe, saveGeneratedRecipe } from "../api/recipeApi";
import { downloadRecipePDF } from "../utils/pdfUtils";

const Home = () => {
  const [recipe, setRecipe] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleGenerateRecipe = async (userInput) => {
    setRecipe("Generating recipe... ⏳");
    setIsSaved(false); // Reset saved state when generating new recipe
    const ingredientsArray = userInput.split(",").map((item) => item.trim());
    const response = await generateRecipe(ingredientsArray);
    setRecipe(response.recipe || "Error generating recipe.");
  };

  const handleSaveRecipe = async () => {
    setIsSaving(true);

    const result = await saveGeneratedRecipe(JSON.stringify(recipe));

    if (result.message) {
      setIsSaved(true);
    } else {
      alert("Failed to save recipe: " + result.error);
    }    

    setIsSaving(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        AI Recipe Generator
      </h1>
      <InputForm onGenerate={handleGenerateRecipe} />
      <RecipeDisplay recipe={recipe} />

      {recipe && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => downloadRecipePDF(recipe)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Download PDF
          </button>

          <button
            onClick={handleSaveRecipe}
            disabled={isSaving || isSaved}
            className={`py-2 px-4 rounded text-white ${
              isSaved
                ? "bg-gray-500 cursor-not-allowed"
                : isSaving
                ? "bg-green-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSaving ? "Saving..." : isSaved ? "Saved!" : "Save Recipe"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
