import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
})

let currentFilePath = null // stores uploaded PDF path for session

export async function uploadPDF(file) {
  const form = new FormData()
  form.append('file', file)
  const res = await API.post('/upload-pdf/', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  // Save the file_path for future queries
  currentFilePath = res.data?.file_path || null
  return res.data
}

export async function queryQuestion(question) {
  if (!currentFilePath) {
    throw new Error("No PDF uploaded yet. Please upload a file first.")
  }
  const res = await API.post('/query/', { 
    question, 
    file_path: currentFilePath 
  })
  return res.data
}

export default API
