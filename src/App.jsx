import React, { useState, useRef } from "react";
import UploadPdf from "./components/UploadPDF";
import Chat from "./components/Chat";
import PDFViewer from "./components/PDFViewer";
import { queryQuestion } from "./api";

export default function App() {
  const [filePath, setFilePath] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [messages, setMessages] = useState([]);
  const pdfRef = useRef(null);

  function handleUploadSuccess(newFilePath) {
    setFilePath(newFilePath);
    setMessages([]);

    // Clean the path to remove leading './', backslashes, and media prefix
    let cleanedPath = newFilePath
      .replace(/^\.\/+/, "")      // remove './' at start
      .replace(/\\/g, "/")        // convert backslash to slash
      .replace(/^\/?media\//, ""); // remove 'media/' or '/media/'

    // Build final URL for PDF viewer
    const url = `http://127.0.0.1:8000/media/${encodeURIComponent(cleanedPath)}`;
    console.log("Setting fileUrl to:", url);
    setFileUrl(url);
  }

  async function handleAsk(question) {
    if (!filePath) {
      return { answer: "Please upload a PDF first.", pages: [] };
    }
    const res = await queryQuestion(question, filePath);
    return res;
  }

  function gotoPage(page) {
    if (pdfRef.current) {
      pdfRef.current.goToPage(page);
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>PDF Chat App</h1>
      <UploadPdf onUploadSuccess={handleUploadSuccess} />

      <div style={{ marginTop: 20 }}>
        <PDFViewer ref={pdfRef} fileUrl={fileUrl} />
      </div>

      <Chat
        messages={messages}
        setMessages={setMessages}
        onAsk={handleAsk}
        citationsHandler={gotoPage}
      />
    </div>
  );
}
