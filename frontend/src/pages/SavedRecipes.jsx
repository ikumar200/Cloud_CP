import SavedRecipesList from "../components/SavedRecipesList";

const SavedRecipes = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <h1 className="text-3xl font-bold text-center py-6">Your Saved Recipes</h1> */}
      <SavedRecipesList />
    </div>
  );
};

export default SavedRecipes;
