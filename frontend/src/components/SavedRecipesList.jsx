import { useEffect, useState } from "react";
import { getSavedRecipes, deleteSavedRecipe } from "../api/recipeApi";
import SavedRecipeCard from "./SavedRecipeCard";

const SavedRecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedRecipes().then((data) => {
      setRecipes(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSavedRecipe(id);
      setRecipes((prev) => prev.filter((r) => r._id !== id && r.id !== id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading your saved recipes...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Saved Recipes</h1>
      {recipes.length === 0 ? (
        <p className="text-gray-500 text-center">No saved recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <SavedRecipeCard
              key={r._id || r.id}
              recipe={r}
              onDelete={() => handleDelete(r._id || r.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipesList;
