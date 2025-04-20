import { useState } from "react";
import InputForm from "../components/InputForm";
import RecipeDisplay from "../components/RecipeDisplay";
import { generateRecipe } from "../api/recipeApi";
import { downloadRecipePDF } from "../utils/pdfUtils";
import { saveGeneratedRecipe } from "../api/recipeApi";
const Home = () => {
  const [recipe, setRecipe] = useState("");
    console.log(recipe);
  const handleGenerateRecipe = async (userInput) => {
    setRecipe("Generating recipe... ⏳");
    const ingredientsArray = userInput.split(",").map((item) => item.trim());
    const response = await generateRecipe(ingredientsArray);
    setRecipe(response.recipe || "Error generating recipe.");
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
      onClick={() => saveGeneratedRecipe(JSON.stringify(recipe))}
      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
    >
      Save Recipe
    </button>
  </div>
)}


    </div>
  );
};

export default Home;
