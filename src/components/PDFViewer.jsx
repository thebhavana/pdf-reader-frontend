import React, { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = forwardRef(({ fileUrl }, ref) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useImperativeHandle(ref, () => ({
    goToPage: (p) => {
      if (p >= 1 && p <= numPages) setPageNumber(p);
    },
    nextPage: () => setPageNumber((n) => Math.min(numPages || 1, n + 1)),
    prevPage: () => setPageNumber((n) => Math.max(1, n - 1)),
  }));

  useEffect(() => {
    setPageNumber(1);
    setNumPages(null);
  }, [fileUrl]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div style={{ textAlign: "center" }}>
      {fileUrl ? (
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div>Loading PDF...</div>}
          error={<div>Failed to load PDF</div>}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      ) : (
        <div>No PDF loaded</div>
      )}

      {numPages && (
        <div style={{ marginTop: 8 }}>
          <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))} disabled={pageNumber <= 1}>
            Prev
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {pageNumber} / {numPages}
          </span>
          <button onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))} disabled={pageNumber >= numPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
});

export default PDFViewer;
