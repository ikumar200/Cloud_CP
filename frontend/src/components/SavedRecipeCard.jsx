import { marked } from 'marked'; 
import DOMPurify from "dompurify";

const SavedRecipeCard = ({ recipe, onDelete }) => {
  // Convert markdown to HTML
  const rawHtml = marked(recipe.recipe || "");
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition max-w-xl mx-auto mb-4 relative">
      <article
        className="prose prose-sm sm:prose-base max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />

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

