import React from "react";
import { jsPDF } from "jspdf";
import Button from "@mui/material/Button";
import { Download } from "@mui/icons-material";
import { Box } from "@mui/material";

const GenericPdfDownloader = ({ rootElementId, downloadFileName }) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(input, {
      callback: function (doc) {
        doc.setFontSize(8);
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          const pageSize = doc.internal.pageSize;
          const pageWidth = pageSize.width
            ? pageSize.width
            : pageSize.getWidth();
          const pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          const footer = `Page ${i} of ${pageCount} - System generated Invoice (fillOkart)`;
          doc.text(
            footer,
            pageWidth / 2 - doc.getTextWidth(footer) / 2,
            pageHeight - 30,
            { baseline: "bottom" }
          );
        }
        doc.save(`${downloadFileName}.pdf`);
      },
      html2canvas: { scale: 0.669 },
      x:30,
      margin:[40,0,48,0],
    });
  };

  return (
    <Box sx={{color:'green', cursor:'pointer', m:'15px 20px 0 3px'}} onClick={downloadPdfDocument}>
      <Download  />
    </Box>
  );
};

export default GenericPdfDownloader;
