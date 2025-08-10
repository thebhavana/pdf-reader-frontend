import React, { useState } from "react";
import { uploadPDF } from "../api";

export default function UploadPdf({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadPDF(file);
      if (res.file_path) {
        onUploadSuccess(res.file_path);
      } else {
        alert("Upload failed: no file path returned");
      }
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
