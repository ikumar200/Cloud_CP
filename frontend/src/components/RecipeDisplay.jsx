// const RecipeDisplay = ({ recipe }) => {
//     return (
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mt-6">
//             <h2 className="text-2xl font-semibold text-gray-800">Generated Recipe</h2>
//             {recipe ? (
//                 <p className="mt-4 text-gray-700 whitespace-pre-wrap">{recipe}</p>
//             ) : (
//                 <p className="mt-4 text-gray-500">Your recipe will appear here...</p>
//             )}
//         </div>
//     );
// };

// export default RecipeDisplay;


import SavedRecipeCard from "./SavedRecipeCard";

const RecipeDisplay = ({ recipe, onDelete }) => {
  return (
    <div className="w-full flex justify-center mt-6">
      {recipe ? (
        <SavedRecipeCard recipe={{ recipe }} onDelete={onDelete || (() => {})} />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center text-gray-500">
          Your recipe will appear here...
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
