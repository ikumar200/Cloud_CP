// import { jsPDF } from "jspdf";

// export const downloadRecipePDF = (recipeText) => {
//   const doc = new jsPDF();
//   const lines = doc.splitTextToSize(recipeText, 180);
//   doc.text(lines, 10, 10);
//   doc.save("recipe.pdf");
// };


import { jsPDF } from "jspdf";

export const downloadRecipePDF = (recipeText) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;
  const lineHeight = 10;

  let y = margin;
  const lines = doc.splitTextToSize(recipeText, 180);

  lines.forEach((line) => {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  });

  doc.save("recipe.pdf");
};
