import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { PdfProvider } from './components/PdfContext'  // Adjust path if needed
import './styles.css'

createRoot(document.getElementById('root')).render(
  <PdfProvider>
    <App />
  </PdfProvider>
)
