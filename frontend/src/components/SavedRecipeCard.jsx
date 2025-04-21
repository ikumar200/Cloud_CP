// import { marked } from 'marked'; 
// import DOMPurify from "dompurify";

// const SavedRecipeCard = ({ recipe, onDelete }) => {
//   // Convert markdown to HTML
//   const rawHtml = marked(recipe.recipe || "");
//   const sanitizedHtml = DOMPurify.sanitize(rawHtml);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition max-w-xl mx-auto mb-4 relative">
//       <article
//         className="prose prose-sm sm:prose-base max-w-none text-gray-800"
//         dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
//       />

//       <button
//         onClick={onDelete}
//         className="absolute top-2 right-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// export default SavedRecipeCard;


import { useState } from 'react';
import { marked } from 'marked'; 
import DOMPurify from "dompurify";
import { downloadRecipePDF } from '../utils/pdfUtils'; // Adjust the path as needed

const SavedRecipeCard = ({ recipe, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  // Convert markdown to HTML
  const rawHtml = marked(recipe.recipe || "");
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);

  const handleCopy = () => {
    navigator.clipboard.writeText(recipe.recipe || "").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show 'Copied!' for 2 seconds
    });
  };

  const handleDownload = () => {
    downloadRecipePDF(recipe.recipe || "");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition max-w-xl mx-auto mb-4 relative">
      <article
        className="prose prose-sm sm:prose-base max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />

      {/* Dropdown Button */}
      <div className="absolute top-2 right-2 text-sm">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
        >
          ⋮
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
            <button
              onClick={onDelete}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Delete
            </button>
            <button
              onClick={handleDownload}
              className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
            >
              Download
            </button>
            <button
              onClick={handleCopy}
              className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-100"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipeCard;
