import { jsPDF } from "jspdf";

export const downloadRecipePDF = (recipeText) => {
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(recipeText, 180);
  doc.text(lines, 10, 10);
  doc.save("recipe.pdf");
};
