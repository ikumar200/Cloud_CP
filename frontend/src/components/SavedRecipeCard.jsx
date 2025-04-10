const SavedRecipeCard = ({ recipe, onDelete }) => {
    const recipeText = recipe.recipe;
    const lines = recipeText.split("\n").map(line => line.trim()).filter(Boolean);
    const title = lines[0]?.replace("Recipe Name: ", "") || "Untitled";
    const ingredientsStart = lines.findIndex(line => line.startsWith("Ingredients:")) + 1;
    const instructionsStart = lines.findIndex(line => line.startsWith("Instructions:")) + 1;
    const ingredients = lines.slice(ingredientsStart, instructionsStart - 1);
    const steps = lines.slice(instructionsStart);
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition max-w-xl mx-auto mb-4 relative">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
        <p className="font-medium text-gray-800 mb-1">Ingredients:</p>
        <ul className="list-disc list-inside mb-2">
          {ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        <p className="font-medium text-gray-800 mb-1">Steps:</p>
        <ol className="list-decimal list-inside">
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
  
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    );
  };
  
  export default SavedRecipeCard;
  