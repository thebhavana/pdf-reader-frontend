// PdfContext.jsx
import React, { createContext, useContext, useState } from 'react';

const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [filePath, setFilePath] = useState('');

  return (
    <PdfContext.Provider value={{ fileUrl, setFileUrl, filePath, setFilePath }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdf = () => useContext(PdfContext);
